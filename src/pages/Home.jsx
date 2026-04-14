import { useRef } from 'react';
import { parseIni } from '../utils/parseIni';
import { shapeSaveData } from '../utils/shapeSaveData';
import { Card } from '../components/ui/Card';

/**
 * Home page: File upload entry point
 * @param {object} props
 * @param {function} props.onDataLoaded - Callback when file is successfully loaded
 */
export function Home({ onDataLoaded }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name && !file.name.toLowerCase().endsWith('.ini')) {
      alert('Please select a .ini file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const parsed = parseIni(content);
        const shaped = shapeSaveData(parsed);
        onDataLoaded(shaped);
      } catch (err) {
        console.error('Error parsing file:', err);
        alert('Failed to parse save file. Make sure it is a valid savedata.ini file.');
      }
    };
    reader.onerror = () => {
      alert('Failed to read file');
    };
    reader.readAsText(file);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <Card className="home-card">
          <div className="home-content">
            <h1 className="home-title">RabbitSteel Save Parser</h1>
            <p className="home-subtitle">Upload your savedata.ini to view your game statistics</p>

            <div className="upload-section">
              <input
                ref={fileInputRef}
                type="file"
                accept=".ini"
                onChange={handleFileSelect}
                hidden
              />
              <button
                className="upload-button"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose savedata.ini
              </button>
            </div>

            <div className="instructions">
              <h3>How to use:</h3>
              <ol>
                <li>Locate your savedata.ini file (typically in your RabbitSteel game folder)</li>
                <li>Click "Choose savedata.ini" above</li>
                <li>View your character progression, area statistics, and more</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}