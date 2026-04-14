import { RABBITS } from './collection.js';

/**
 * Transforms flat INI parsed data into a structured, queryable format
 * @param {object} parsedIni - Output from parseIni()
 * @returns {object} Structured save data with player, characters, and areas
 */
export function shapeSaveData(parsedIni) {
  const DIFFS = ['Cute', 'Normal', 'Hard', 'Lunar'];
  const TYPES = ['Offline', 'Online'];

  // Extract player-level data
  const saveInfo = parsedIni.SaveInfo || {};
  const playtimeSec = parsedIni.Playtime?.Playtime || 0;
  const totalRuns = saveInfo.runCountLocal || 0;
  const shopVisits = saveInfo.shopCountLocal_v3 || 0;

  // Get main character name
  const charNames = parsedIni.CharName || {};
  let mainCharName = '';
  for (let i = 0; i < 9; i++) {
    const name = charNames[`charName_${i}`];
    if (name && name.trim()) {
      mainCharName = name;
      break;
    }
  }

  // Initialize rabbit statistics indexed by class ID (0-13)
  const rabbitStats = {};
  for (let i = 0; i < RABBITS.length; i++) {
    const rabbit = RABBITS[i];
    rabbitStats[rabbit.id] = {
      id: rabbit.id,
      class: rabbit.key,
      name: rabbit.name,
      code: rabbit.code,
      color: rabbit.color,
      TotalWins: 0,
      OfflineWins: 0,
      OnlineWins: 0,
      FastestWinTime: 99999999,
      FastestWinDiff: -1,
      FastestWinType: -1,
      FastestOfflineTime: 99999999,
      FastestOfflineDiff: -1,
      FastestOnlineTime: 99999999,
      FastestOnlineDiff: -1,
    };
  }

  // Process AllyWin and AllyWinTime data
  const allyWinData = parsedIni.AllyWin || {};
  const allyWinTimeData = parsedIni.AllyWinTime || {};

  // First pass: aggregate win counts
  for (const [key, winCount] of Object.entries(allyWinData)) {
    // Pattern: al_[class]_rabbit_[type]_[diff]
    const match = key.match(/^al_(\w+)_rabbit_(\d)_(\d)$/);
    if (!match) continue;

    const className = match[1];
    const type = parseInt(match[2]); // 0=offline, 1=online
    const diff = parseInt(match[3]); // 0-3 = Cute, Normal, Hard, Lunar

    // Find rabbit by class key
    const rabbit = RABBITS.find((r) => r.key === className || r.itemKey === className);
    if (!rabbit) continue;

    const stats = rabbitStats[rabbit.id];
    const countKey = `${TYPES[type]}${DIFFS[diff]}Count`;
    stats[countKey] = winCount || 0;
    stats.TotalWins += winCount || 0;
    if (type === 0) stats.OfflineWins += winCount || 0;
    else stats.OnlineWins += winCount || 0;
  }

  // Second pass: process fastest times
  for (const [key, timeMs] of Object.entries(allyWinTimeData)) {
    const match = key.match(/^al_(\w+)_rabbit_(\d)_(\d)$/);
    if (!match) continue;

    const className = match[1];
    const type = parseInt(match[2]);
    const diff = parseInt(match[3]);

    const rabbit = RABBITS.find((r) => r.key === className || r.itemKey === className);
    if (!rabbit) continue;

    const stats = rabbitStats[rabbit.id];
    const fastestKey = `${TYPES[type]}${DIFFS[diff]}Fastest`;
    stats[fastestKey] = timeMs || 0;

    // Track overall fastest win
    if (timeMs > 0) {
      if (timeMs < stats.FastestWinTime) {
        stats.FastestWinTime = timeMs;
        stats.FastestWinDiff = diff;
        stats.FastestWinType = type;
      }

      // Track offline/online bests
      if (type === 0 && timeMs < stats.FastestOfflineTime) {
        stats.FastestOfflineTime = timeMs;
        stats.FastestOfflineDiff = diff;
      }
      if (type === 1 && timeMs < stats.FastestOnlineTime) {
        stats.FastestOnlineTime = timeMs;
        stats.FastestOnlineDiff = diff;
      }
    }
  }

  // Parse area data
  const areasData = {};
  const areaMap = {
    Outskirts: 'Outskirts',
    Nest: 'Nest',
    Arsenal: 'Arsenal',
    Lighthouse: 'Lighthouse',
    Streets: 'Streets',
    Lakeside: 'Lakeside',
    Keep: 'Keep',
    Pinnacle: 'Pinnacle',
    Geode: 'Geode',
    Sanctuary: 'Sanctuary',
    Depths: 'Depths',
    Aurum: 'Aurum',
    Darkhall: 'Darkhall',
    Reflection: 'Reflection',
  };

  const difficultyCodeMap = { C: 'Cute', N: 'Normal', H: 'Hard', L: 'Lunar' };

  // Build area structure
  for (const [areaKey, areaName] of Object.entries(areaMap)) {
    areasData[areaName] = {};
    for (const [code, diffName] of Object.entries(difficultyCodeMap)) {
      areasData[areaName][diffName] = {
        areaName,
        difficulty: diffName,
        visits: 0,
        wins: 0,
        playtime: 0,
        winrate: 0,
      };
    }
  }

  // Populate area visits from SaveInfo mapVisit keys
  if (saveInfo) {
    for (const [key, value] of Object.entries(saveInfo)) {
      const match = key.match(/^mapVisit(\w+)([CNHL])$/);
      if (match) {
        const areaKey = match[1];
        const diffCode = match[2];
        const areaName = areaMap[areaKey];
        const diffName = difficultyCodeMap[diffCode];

        if (areaName && diffName && areasData[areaName]) {
          areasData[areaName][diffName].visits = parseInt(value) || 0;
        }
      }
    }
  }

  // Populate area wins from SaveInfo mapWin keys
  if (saveInfo) {
    for (const [key, value] of Object.entries(saveInfo)) {
      const match = key.match(/^mapWin(\w+)([CNHL])$/);
      if (match) {
        const areaKey = match[1];
        const diffCode = match[2];
        const areaName = areaMap[areaKey];
        const diffName = difficultyCodeMap[diffCode];

        if (areaName && diffName && areasData[areaName]) {
          areasData[areaName][diffName].wins = parseInt(value) || 0;
        }
      }
    }
  }

  // Calculate winrates for areas
  for (const area of Object.values(areasData)) {
    for (const diffData of Object.values(area)) {
      if (diffData.visits > 0) {
        diffData.winrate = ((diffData.wins / diffData.visits) * 100).toFixed(1);
      } else {
        diffData.winrate = 0;
      }
    }
  }

  // Calculate total stats
  let totalWins = 0;
  let totalAttempts = 0;

  for (const stats of Object.values(rabbitStats)) {
    totalWins += stats.TotalWins;
    // Attempts = sum of all count keys
    for (const [key, value] of Object.entries(stats)) {
      if (key.endsWith('Count')) {
        totalAttempts += value || 0;
      }
    }
  }

  // Build final structure
  const result = {
    player: {
      name: mainCharName || 'Unknown',
      playtime: playtimeSec,
      playtimeFormatted: formatPlaytime(playtimeSec),
      totalRuns: parseInt(totalRuns),
      totalWins: totalWins,
      totalAttempts: totalAttempts,
      winrate:
        totalAttempts > 0 ? ((totalWins / totalAttempts) * 100).toFixed(1) : 0,
      shopVisits: parseInt(shopVisits),
    },
    rabbits: rabbitStats,
    areas: areasData,
  };

  return result;
}

/**
 * Formats seconds into a human-readable string
 * @param {number} sec - Seconds
 * @returns {string} Formatted time (e.g., "19.5 days")
 */
function formatPlaytime(sec) {
  const seconds = Math.floor(sec);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMin = minutes % 60;
    return `${hours}h ${remainingMin}m`;
  }
  if (minutes > 0) {
    const remainingSec = seconds % 60;
    return `${minutes}m ${remainingSec}s`;
  }
  return `${seconds}s`;
}
