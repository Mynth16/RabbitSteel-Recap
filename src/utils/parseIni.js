/**
 * Parses an INI file format into a JavaScript object
 * Format: [Section]\nkey="value"\nkey="value"\n\n[NextSection]...
 * @param {string} iniContent - The raw INI file content
 * @returns {object} Parsed INI as nested object with sections as keys
 */
export function parseIni(iniContent) {
  const result = {};
  let currentSection = null;

  const lines = iniContent.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith(';')) {
      continue;
    }

    // Check for section header [SectionName]
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      currentSection = trimmed.slice(1, -1);
      result[currentSection] = {};
      continue;
    }

    // Parse key="value" pairs
    if (currentSection && trimmed.includes('=')) {
      const eqIndex = trimmed.indexOf('=');
      const key = trimmed.substring(0, eqIndex).trim();
      let value = trimmed.substring(eqIndex + 1).trim();

      // Remove surrounding quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Convert string numbers to actual numbers
      const numValue = parseFloat(value);
      result[currentSection][key] = isNaN(numValue) ? value : numValue;
    }
  }

  return result;
}
