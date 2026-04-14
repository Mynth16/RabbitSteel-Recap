/**
 * Character definitions for RabbitSteel
 * Indexed by ID (0-13)
 */
export const RABBITS = [
  {
    key: 'wizard',
    name: 'Wizard',
    code: 'Wiz',
    color: '#694DDD',
    id: 0,
  },
  {
    key: 'assassin',
    name: 'Assassin',
    code: 'ASS',
    color: '#4C81FF',
    id: 1,
  },
  {
    key: 'hblade',
    name: 'Heavyblade',
    code: 'HB',
    color: '#E873A8',
    id: 2,
  },
  {
    key: 'dancer',
    name: 'Dancer',
    code: 'Dan',
    color: '#FFE0A1',
    id: 3,
  },
  {
    key: 'druid',
    name: 'Druid',
    code: 'Dru',
    color: '#59DF87',
    id: 4,
  },
  {
    key: 'spellsword',
    itemKey: 'spsword',
    code: 'SS',
    name: 'Spellsword',
    color: '#C268FF',
    id: 5,
  },
  {
    key: 'sniper',
    name: 'Sniper',
    code: 'Sni',
    color: '#597BFF',
    id: 6,
  },
  {
    key: 'bruiser',
    name: 'Bruiser',
    code: 'Bru',
    color: '#D14040',
    id: 7,
  },
  {
    key: 'defender',
    name: 'Defender',
    code: 'Def',
    color: '#FFFAE8',
    id: 8,
  },
  {
    key: 'ancient',
    name: 'Ancient',
    code: 'Anc',
    color: '#6DDAA7',
    id: 9,
  },
  {
    key: 'hammer',
    name: 'Hammermaid',
    code: 'HM',
    color: '#FFDCE6',
    id: 10,
  },
  {
    key: 'pyro',
    name: 'Pyromancer',
    code: 'Pyro',
    color: '#FF6F66',
    id: 11,
  },
  {
    key: 'gunner',
    name: 'Grenadier',
    code: 'Gunny',
    color: '#6BFFCD',
    id: 12,
  },
  {
    key: 'shadow',
    name: 'Shadow',
    code: 'Sh',
    color: '#9C9C9C',
    id: 13,
  },
];

/**
 * Item definitions (subset of full list for now)
 * Bitmask flags in ItemDiscovery: bit 0=seen, bit 1=held, bits 2-5=cute/normal/hard/lunar
 */
export const ITEMS = [
  { key: 'it_raven_grimoire', name: 'Raven Grimoire', id: '0' },
  { key: 'it_blackwing_staff', name: 'Blackwing Staff', id: '1' },
  { key: 'it_curse_talon', name: 'Curse Talon', id: '2' },
  { key: 'it_darkmagic_blade', name: 'Darkmagic Blade', id: '3' },
  { key: 'it_witchs_cloak', name: "Witch's Cloak", id: '4' },
  { key: 'it_crowfeather_hairpin', name: 'Crowfeather Hairpin', id: '5' },
  { key: 'it_redblack_ribbon', name: 'Redblack Ribbon', id: '6' },
  { key: 'it_opal_necklace', name: 'Opal Necklace', id: '7' },
  { key: 'it_sleeping_greatbow', name: 'Sleeping Greatbow', id: '8' },
  { key: 'it_crescentmoon_dagger', name: 'Crescentmoon Dagger', id: '9' },
];

/**
 * Gem definitions (subset for now)
 * type: 0=unclear, 1+=valid; cId: character id; slot: gem slot
 */
export const GEMS = [
  { key: 'mv_wizard_0', type: 1, cId: 0, slot: 0, name: 'Wizard Gem 0', id: '0' },
  { key: 'mv_wizard_1', type: 1, cId: 0, slot: 1, name: 'Wizard Gem 1', id: '1' },
  { key: 'mv_assassin_0', type: 1, cId: 1, slot: 0, name: 'Assassin Gem 0', id: '2' },
  { key: 'mv_assassin_1', type: 1, cId: 1, slot: 1, name: 'Assassin Gem 1', id: '3' },
];

/**
 * Difficulty names mapping
 */
export const DIFFICULTIES = ['Cute', 'Normal', 'Hard', 'Lunar'];

/**
 * Map difficulty indices to names
 */
export function getDifficultyName(index) {
  return DIFFICULTIES[index] || 'Unknown';
}

/**
 * Get rabbit by ID
 */
export function getRabbitById(id) {
  return RABBITS.find((r) => r.id === id);
}

/**
 * Get rabbit by class key
 */
export function getRabbitByKey(key) {
  return RABBITS.find((r) => r.key === key || r.itemKey === key);
}
