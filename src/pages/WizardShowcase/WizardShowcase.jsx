import { Card } from '../../components/ui/Card/Card';
import './WizardShowcase.css';

/**
 * Dedicated showcase page for the Wizard character
 * Displays the wizard character card with the new design
 */
export function WizardShowcase({ data, onReset }) {
  if (!data || !data.rabbits) {
    return (
      <div className="wizard-showcase">
        <div className="wizard-header">
          <h1>Wizard Character</h1>
          <button onClick={onReset} className="btn-back">
            Back
          </button>
        </div>
        <div className="wizard-container">
          <Card>No character data found. Please upload a save file.</Card>
        </div>
      </div>
    );
  }

  const DIFFICULTIES = ['Cute', 'Normal', 'Hard', 'Lunar'];
  const DIFFICULTY_ICONS = {
    Cute: '○',
    Normal: '□',
    Hard: '◇',
    Lunar: '🌙'
  };

  const DIFFICULTY_COLORS = {
    Cute: '#5DADE2',      // Light Blue
    Normal: '#F4D03F',    // Gold
    Hard: '#E74C3C',      // Coral/Red
    Lunar: '#8E44AD'      // Purple
  };

  // Map character class to sprite filename
  const SPRITE_MAP = {
    wizard: 'Wizardidle',
    assassin: 'Assassinidle',
    hblade: 'Heavybladeidle',
    dancer: 'Danceridle',
    druid: 'Druididle',
    spellsword: 'Spellswordidle',
    sniper: 'Sniperidle',
    pyromancer: 'Pyromanceridle',
    grenadier: 'Grenadieridle',
    bruiser: 'Bruiseridle',
    defender: 'Defenderidle',
    ancient: 'Ancientidle',
    shadow: 'Shadowidle',
    hammermaid: 'Hammermaididle'
  };

  // Get wizard character (ID 0)
  const wizard = data.rabbits[0];

  if (!wizard) {
    return (
      <div className="wizard-showcase">
        <div className="wizard-header">
          <h1>Wizard Character</h1>
          <button onClick={onReset} className="btn-back">
            Back
          </button>
        </div>
        <div className="wizard-container">
          <Card>Wizard character data not found.</Card>
        </div>
      </div>
    );
  }

  const spriteFileName = SPRITE_MAP[wizard.class] || 'Wizardidle';

  return (
    <div className="wizard-showcase">
      <div className="wizard-header">
        <h1>Wizard Character Showcase</h1>
        <button onClick={onReset} className="btn-back">
          Upload New File
        </button>
      </div>

      <div className="wizard-container">
        <div className="wizard-card-template">
          <img src="/src/assets/samples/wizcard.png" alt="Card Template" className="card-template-image" />
          
          {/* Dynamic number overlays */}
          <div className="stat-overlay stat-total">
            {wizard.TotalWins}
          </div>
          
          <div className="stat-overlay stat-offline">
            {wizard.OfflineWins}
          </div>
          
          <div className="stat-overlay stat-online">
            {wizard.OnlineWins}
          </div>

          {/* Difficulty count overlays */}
          <div className="difficulty-count diff-cute">
            {wizard.OfflineCuteCount || 0}
          </div>
          
          <div className="difficulty-count diff-normal">
            {wizard.OfflineNormalCount || 0}
          </div>
          
          <div className="difficulty-count diff-hard">
            {wizard.OfflineHardCount || 0}
          </div>
          
          <div className="difficulty-count diff-lunar">
            {wizard.OfflineLunarCount || 0}
          </div>
        </div>
      </div>
    </div>
  );
}
