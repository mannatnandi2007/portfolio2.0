import React from 'react';
import { Gamepad2, Crown, Sun, Moon, Volume2, VolumeX, Video, Code2 } from 'lucide-react';

export default function HUDNavbar({ darkMode, setDarkMode, activeTab, setActiveTab, sfxEnabled, setSfxEnabled, playSound }) {

  const handleTabChange = (tabName) => {
    if (playSound) playSound('click');
    setActiveTab(tabName);
  };

  const handleThemeToggle = () => {
    if (playSound) playSound('click');
    setDarkMode(!darkMode);
  };

  const handleSfxToggle = () => {
    setSfxEnabled(!sfxEnabled);
    if (!sfxEnabled && playSound) playSound('click');
  };

  return (
    <header className={`hud-navbar ${darkMode ? 'hud-dark' : 'hud-light'}`}>
      <div className="hud-container">
        
        {/* Left: XP Level */}
        <div className="hud-stat-box">
          <Gamepad2 className="hud-icon text-cyan" size={18} />
          <span className="hud-label">XP:</span>
          <span className="hud-val text-cyan">LEVEL 03 • AGENTIC DEV</span>
        </div>

        {/* Center: Multi-Page Tab Navigation (Main Portfolio vs Creative Reels) */}
        <div className="hud-tab-navigation">
          <button
            className={`nav-tab-btn ${activeTab === 'portfolio' ? 'active-tab' : ''}`}
            onClick={() => handleTabChange('portfolio')}
          >
            <Code2 size={16} /> 🎮 MAIN QUEST (PORTFOLIO)
          </button>
          
          <button
            className={`nav-tab-btn ${activeTab === 'reels' ? 'active-tab' : ''}`}
            onClick={() => handleTabChange('reels')}
          >
            <Video size={16} /> 🎬 CREATIVE REELS (SEPARATE PAGE)
          </button>
        </div>

        {/* Right: Theme Switcher & SFX */}
        <div className="hud-actions">
          {/* Light / Dark Mode Toggle */}
          <button 
            className="comic-btn btn-theme-toggle" 
            onClick={handleThemeToggle}
            title="Toggle Light Sky / Dark Cosmos 3D Theme"
          >
            {darkMode ? (
              <>
                <Sun className="text-gold" size={16} /> <span className="btn-text">☀️ SKY 3D MODE</span>
              </>
            ) : (
              <>
                <Moon className="text-purple" size={16} /> <span className="btn-text">🌙 COSMOS 3D MODE</span>
              </>
            )}
          </button>

          {/* Audio SFX Toggle */}
          <button 
            className="comic-btn btn-sm btn-cyan" 
            onClick={handleSfxToggle}
            title="Toggle Retro Web Audio SFX"
          >
            {sfxEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>SFX: {sfxEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
