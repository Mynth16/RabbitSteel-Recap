import { useState } from 'react';
import { parseIni } from '../utils/parseIni';
import { shapeSaveData } from '../utils/shapeSaveData';

/**
 * Custom React hook for managing savedata.ini file uploads and parsing
 * @returns {object} { data, loading, error, uploadFile, reset }
 */
export function useSaveData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = (file) => {
    if (!file) {
      setError('No file selected');
      return;
    }

    // Validate file type
    if (file.name && !file.name.toLowerCase().endsWith('.ini')) {
      setError('Please select a .ini file');
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target.result;

        // Parse INI format
        const parsed = parseIni(content);

        // Validate that we have the expected sections
        if (!parsed.SaveInfo || Object.keys(parsed).length === 0) {
          throw new Error('Invalid or empty save file');
        }

        // Transform into clean structure
        const shaped = shapeSaveData(parsed);

        setData(shaped);
        setError(null);
      } catch (err) {
        console.error('Error parsing save file:', err);
        setError(
          err.message || 'Failed to parse save file. Make sure it is a valid savedata.ini file.'
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read file');
      setLoading(false);
    };

    reader.readAsText(file);
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    uploadFile,
    reset,
  };
}
