import React from 'react';
import { Video, Star, Code2, Instagram, Film } from 'lucide-react';

export default function CreativeReels({ darkMode, playSound }) {
  return (
    <div className="page-content-wrapper creative-reels-page">
      
      {/* SECTION HEADER */}
      <div className="reels-hero-banner">
        <div className="banner-tag">
          <Film size={16} className="text-gold" /> DEDICATED REELS PAGE
        </div>
        <h1 className="reels-main-title">CREATIVE REEL SHOWCASE</h1>
        <p className="reels-subtitle">
          Creative Direction, Video Editing & Brand Collaborations Showcase
        </p>
      </div>

      {/* ========================================== */}
      {/* TOP SPOTLIGHT: COLLAB WITH BIGSMILE GAMING ZONE */}
      {/* ========================================== */}
      <div className="bigsmile-collab-wrapper">
        <div className="collab-header-banner">
          <span className="featured-star"><Star size={14} className="text-gold" /> TOP SPOTLIGHT</span>
          <h3>COLLAB WITH BIGSMILE GAMING ZONE</h3>
          <p>Creative Direction & Video Production Highlight</p>
        </div>

        <div className="reel-embed-frame bigsmile-frame">
          <div className="user-input-code-overlay">
            <Video size={16} className="text-gold" /> 
            <span>🌟 [INPUT REQUIRED]: EMBED YOUR BIGSMILE GAMING ZONE REEL CODE / URL HERE</span>
          </div>
          
          {/* 🌟 ========================================================= */}
          {/* 🌟 [INPUT REQUIRED HERE]: PASTE BIGSMILE GAMING ZONE REEL EMBED */}
          {/* 🌟 PASTE YOUR INSTAGRAM / YOUTUBE EMBED IFRAME BELOW         */}
          {/* 🌟 ========================================================= */}
          <div className="embed-container-placeholder">
            <iframe 
              className="reel-iframe" 
              src="about:blank" 
              title="Bigsmile Gaming Zone Collab Reel Placeholder"
            />
            <div className="embed-instructions">
              <p><strong>How to add your Reel embed:</strong></p>
              <code>&lt;!-- Open src/pages/CreativeReels.jsx Line ~28 & paste Instagram Embed code --&gt;</code>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 2 INSTAGRAM REELS GRID */}
      {/* ========================================== */}
      <div className="reels-dual-grid">
        
        {/* INSTAGRAM REEL 1 */}
        <div className="comic-reel-card">
          <div className="reel-card-header">
            <Instagram size={18} className="text-pink" /> INSTAGRAM REEL #01
          </div>
          <div className="reel-embed-frame">
            <div className="user-input-code-overlay">
              <Code2 size={16} className="text-cyan" />
              <span>🌟 [INPUT REQUIRED]: INSTAGRAM REEL 1 EMBED</span>
            </div>

            {/* 🌟 ========================================================= */}
            {/* 🌟 [INPUT REQUIRED HERE]: PASTE INSTAGRAM REEL 1 EMBED HERE */}
            {/* 🌟 ========================================================= */}
            <div className="embed-container-placeholder">
              <iframe 
                className="reel-iframe" 
                src="about:blank" 
                title="Instagram Reel 1 Placeholder"
              />
              <div className="embed-instructions">
                <code>&lt;!-- Paste Reel 1 embed in src/pages/CreativeReels.jsx Line ~58 --&gt;</code>
              </div>
            </div>
          </div>
        </div>

        {/* INSTAGRAM REEL 2 */}
        <div className="comic-reel-card">
          <div class="reel-card-header">
            <Instagram size={18} className="text-pink" /> INSTAGRAM REEL #02
          </div>
          <div className="reel-embed-frame">
            <div className="user-input-code-overlay">
              <Code2 size={16} className="text-cyan" />
              <span>🌟 [INPUT REQUIRED]: INSTAGRAM REEL 2 EMBED</span>
            </div>

            {/* 🌟 ========================================================= */}
            {/* 🌟 [INPUT REQUIRED HERE]: PASTE INSTAGRAM REEL 2 EMBED HERE */}
            {/* 🌟 ========================================================= */}
            <div className="embed-container-placeholder">
              <iframe 
                className="reel-iframe" 
                src="about:blank" 
                title="Instagram Reel 2 Placeholder"
              />
              <div className="embed-instructions">
                <code>&lt;!-- Paste Reel 2 embed in src/pages/CreativeReels.jsx Line ~82 --&gt;</code>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
