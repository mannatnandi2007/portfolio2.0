import React from 'react';
import { 
  Gamepad2, Unlock, Lock, Brain, GitBranch, 
  ExternalLink, Rocket, CheckCircle2, Clock, Mail, 
  Linkedin, Instagram, PenTool, Sparkles, Terminal
} from 'lucide-react';

export default function MainPortfolio({ darkMode, playSound, setActiveTab }) {
  return (
    <div className="page-content-wrapper">

      {/* ========================================== */}
      {/* HERO SECTION: RETRO CONSOLE & 3D SPATIAL */}
      {/* ========================================== */}
      <section className="hero-section" id="hero">
        <div className="retro-console-housing">
          
          <div className="console-top-strip">
            <span className="console-led"></span>
            <span className="console-brand"><Gamepad2 size={16} /> PORTFOLIO 2.0 SYSTEM</span>
            <span className="console-battery">100% <i className="fa-solid fa-battery-full text-cyan"></i></span>
          </div>

          <div className="console-screen">
            <div className="screen-scanlines"></div>
            
            <div className="screen-content">
              <span className="pixel-tag text-gold">2026 EDITION</span>
              <h1 className="pixel-game-title">PORTFOLIO 2.0</h1>
              <p className="hero-subtitle">
                3rd Year Student • Part-Time Creative Director • Content Creator • Agentic AI Developer
              </p>
              <div className="hero-cta-group">
                <a href="#projects" className="comic-btn btn-large btn-gold" onClick={() => playSound && playSound('click')}>
                  <Rocket size={18} /> VIEW TECHNICAL PROJECTS
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* LEVEL 01: SKILLS & MASTERY LOG */}
      {/* ========================================== */}
      <section className="game-level-section" id="skills">
        <div className="level-badge-header">
          <span className="level-num">LEVEL 01</span>
          <h2 className="level-title">PLAYER STATS & SKILL TREE</h2>
        </div>

        <div className="retro-window-grid">
          
          {/* WINDOW 1: CURRENT SKILLS (UNLOCKED) */}
          <div className="comic-window-card">
            <div className="window-header bar-blue">
              <span className="win-title"><Unlock size={14} className="text-gold" /> CURRENT SKILLS (UNLOCKED)</span>
              <div className="win-controls"><span></span><span></span><span></span></div>
            </div>
            <div className="window-body">
              <p className="win-intro">Mastered abilities currently deployed in production:</p>
              <div className="skills-flex-tags">
                <div className="skill-badge unlocked"><i className="fa-brands fa-html5 text-orange"></i> HTML</div>
                <div className="skill-badge unlocked"><i className="fa-brands fa-css3-alt text-blue"></i> CSS</div>
                <div className="skill-badge unlocked"><i className="fa-brands fa-js text-yellow"></i> JS</div>
                <div className="skill-badge unlocked"><i className="fa-brands fa-python text-cyan"></i> PYTHON</div>
                <div className="skill-badge unlocked"><i className="fa-brands fa-java text-red"></i> JAVA</div>
                <div className="skill-badge unlocked special-agentic"><Sparkles size={14} className="text-gold" /> AGENTIC AI</div>
                <div className="skill-badge unlocked"><i className="fa-solid fa-film text-purple"></i> PREMIERE PRO</div>
              </div>
            </div>
          </div>

          {/* WINDOW 2: CURRENTLY LEARNING */}
          <div className="comic-window-card">
            <div className="window-header bar-cyan">
              <span className="win-title"><Brain size={14} className="text-dark" /> CURRENTLY LEARNING</span>
              <div className="win-controls"><span></span><span></span><span></span></div>
            </div>
            <div className="window-body">
              <p className="win-intro">Active training modules in progress:</p>
              <div className="skills-flex-tags">
                <div className="skill-badge learning"><Brain size={14} className="text-cyan" /> MACHINE LEARNING (ML)</div>
                <div className="skill-badge learning"><GitBranch size={14} className="text-blue" /> DSA (DATA STRUCTURES & ALGO)</div>
              </div>
              <div className="progress-bar-box">
                <div className="progress-label">TRAINING PROGRESS: 75%</div>
                <div className="bar-outer"><div className="bar-fill" style={{ width: '75%' }}></div></div>
              </div>
            </div>
          </div>

          {/* WINDOW 3: FUTURE SKILLS TO UNLOCK */}
          <div className="comic-window-card">
            <div className="window-header bar-navy">
              <span className="win-title"><Lock size={14} className="text-gold" /> FUTURE SKILLS TO UNLOCK</span>
              <div className="win-controls"><span></span><span></span><span></span></div>
            </div>
            <div className="window-body">
              <p className="win-intro">Locked skill tree nodes reserved for future expansions:</p>
              <div className="skills-flex-tags">
                <div className="skill-badge locked"><Lock size={12} /> AFTER EFFECTS</div>
                <div className="skill-badge locked"><Lock size={12} /> NLP</div>
                <div className="skill-badge locked"><Lock size={12} /> ADVANCED ML</div>
                <div className="skill-badge locked"><Lock size={12} /> SYSTEM DESIGN</div>
                <div className="skill-badge locked"><Lock size={12} /> MORE EXPANSIONS...</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* LEVEL 02: TECHNICAL PROJECTS (QUEST LOGS) */}
      {/* ========================================== */}
      <section className="game-level-section" id="projects">
        <div className="level-badge-header">
          <span className="level-num">LEVEL 02</span>
          <h2 className="level-title">QUEST LOGS (TECHNICAL PROJECTS)</h2>
        </div>

        <div className="projects-grid">

          {/* PROJECT 1: KINSYNC */}
          <div className="comic-quest-card highlight-card">
            <div className="quest-tag-header">
              <span className="quest-number">MISSION 01</span>
              <span className="quest-status status-active"><CheckCircle2 size={14} /> DEPLOYED</span>
            </div>

            <h3 className="quest-title"><i className="fa-solid fa-sync text-cyan"></i> KinSync</h3>

            {/* DESCRIPTION PLACEHOLDER (EMPTY FOR USER INPUT) */}
            <div className="user-input-highlight-box">
              <div className="input-badge"><PenTool size={12} /> INPUT REQUIRED (DESCRIPTION)</div>
              <p className="description-placeholder-text">
                {/* 🌟 [INPUT REQUIRED HERE]: ADD YOUR KINSYNC PROJECT DESCRIPTION BELOW */}
                <span className="editable-hint"> KinSync Project Description (Click code to edit or fill in src/pages/MainPortfolio.jsx line ~120)</span>
              </p>
            </div>

            {/* BIG HIGHLIGHTED DEPLOYED LINK CODE BLOCK */}
            <div className="code-highlight-deployment-banner">
              <div className="banner-top-label">
                <Rocket size={14} className="text-gold" /> DEPLOYED LIVE DEMO LINK PLACEHOLDER
              </div>
              
              {/* 🌟 ========================================================= */}
              {/* 🌟 [INPUT REQUIRED HERE]: ADD YOUR KINSYNC DEPLOYED LINK BELOW */}
              {/* 🌟 ========================================================= */}
              <a href="#" target="_blank" rel="noreferrer" className="live-link-big-btn">
                <ExternalLink size={16} /> 
                LIVE DEMO LINK: <span className="highlight-url-code">YOUR_KINSYNC_LIVE_DEPLOYED_URL_HERE</span>
              </a>

              <div className="code-snippet-help">
                <code>&lt;!-- EDIT src/pages/MainPortfolio.jsx Line ~130: href="https://your-kinsync-link.com" --&gt;</code>
              </div>
            </div>
          </div>

          {/* PROJECT 2: YUVA SAARTHI */}
          <div className="comic-quest-card">
            <div className="quest-tag-header">
              <span className="quest-number">MISSION 02</span>
              <span className="quest-status status-ongoing"><Clock size={14} /> PROGRESS ON-GOING</span>
            </div>

            <h3 className="quest-title"><i className="fa-solid fa-compass text-gold"></i> Yuva Saarthi</h3>

            {/* DESCRIPTION PLACEHOLDER (EMPTY FOR USER INPUT) */}
            <div className="user-input-highlight-box">
              <div className="input-badge"><PenTool size={12} /> INPUT REQUIRED (DESCRIPTION)</div>
              <p className="description-placeholder-text">
                {/* 🌟 [INPUT REQUIRED HERE]: ADD YOUR YUVA SAARTHI PROJECT DESCRIPTION BELOW */}
                <span className="editable-hint"> Yuva Saarthi Project Description (Click code to edit or fill in src/pages/MainPortfolio.jsx line ~155)</span>
              </p>
            </div>

            {/* HIGHLIGHTED LINK PLACEHOLDER FOR YUVA SAARTHI */}
            <div className="code-highlight-deployment-banner muted-banner">
              <div className="banner-top-label">
                <Terminal size={14} className="text-cyan" /> DEVELOPMENT IN PROGRESS LINK PLACEHOLDER
              </div>
              
              {/* 🌟 ========================================================= */}
              {/* 🌟 [INPUT REQUIRED HERE]: ADD YOUR YUVA SAARTHI LINK HERE   */}
              {/* 🌟 ========================================================= */}
              <a href="#" target="_blank" rel="noreferrer" className="live-link-big-btn btn-secondary-code">
                <Clock size={16} /> 
                LINK: <span className="highlight-url-code">YOUR_YUVA_SAARTHI_LINK_HERE</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* LEVEL 03: CREATIVE QUEST (REELS ROUTE)     */}
      {/* ========================================== */}
      <section className="game-level-section" id="creative-quest">
        <div className="level-badge-header">
          <span className="level-num">LEVEL 03</span>
          <h2 className="level-title">CREATIVE REEL REALM</h2>
        </div>

        <div className="comic-connect-card" style={{ borderColor: 'var(--gold-yellow)' }}>
          <div className="connect-window-bar" style={{ borderColor: 'var(--gold-yellow)' }}>
            <span><Sparkles size={14} className="text-gold" /> CREATIVE QUEST GATEWAY</span>
          </div>

          <p className="connect-subtext">
            Explore premium collaborations, Bigsmile Gaming Zone projects, and social content reels on my dedicated Creative Reels page:
          </p>

          <div style={{ marginTop: '20px' }}>
            <button 
              className="comic-btn btn-large btn-gold" 
              onClick={() => {
                if (playSound) playSound('click');
                setActiveTab('reels');
              }}
            >
              🎬 ENTER DEDICATED CREATIVE REELS PAGE
            </button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* LEVEL 04: DIRECT CONNECT TRANSMITTER */}
      {/* ========================================== */}
      <section className="game-level-section" id="contact">
        <div className="level-badge-header">
          <span className="level-num">LEVEL 04</span>
          <h2 className="level-title">DIRECT CONNECT TRANSMITTER</h2>
        </div>

        <div className="comic-connect-card">
          <div className="connect-window-bar">
            <span>TRANSMISSION CHANNEL (NO FORM NEEDED)</span>
          </div>

          <p className="connect-subtext">Click any channel below to reach out directly:</p>

          <div className="contact-links-trio">
            
            {/* 🌟 LINKEDIN URL PLACEHOLDER */}
            {/* 🌟 [INPUT REQUIRED HERE]: REPLACE "#" WITH YOUR LINKEDIN URL */}
            <a href="#" target="_blank" rel="noreferrer" className="comic-social-btn btn-linkedin">
              <div className="social-icon"><Linkedin size={24} /></div>
              <div className="social-details">
                <span className="social-name">LINKEDIN</span>
                <span className="social-input-hint">🌟 [INPUT: ADD LINKEDIN URL]</span>
              </div>
            </a>

            {/* 🌟 INSTAGRAM URL PLACEHOLDER */}
            {/* 🌟 [INPUT REQUIRED HERE]: REPLACE "#" WITH YOUR INSTAGRAM URL */}
            <a href="#" target="_blank" rel="noreferrer" className="comic-social-btn btn-instagram">
              <div className="social-icon"><Instagram size={24} /></div>
              <div className="social-details">
                <span className="social-name">INSTAGRAM</span>
                <span className="social-input-hint">🌟 [INPUT: ADD INSTAGRAM URL]</span>
              </div>
            </a>

            {/* 🌟 EMAIL ADDRESS PLACEHOLDER */}
            {/* 🌟 [INPUT REQUIRED HERE]: REPLACE "mailto:#" WITH YOUR EMAIL */}
            <a href="mailto:#" className="comic-social-btn btn-email">
              <div className="social-icon"><Mail size={24} /></div>
              <div className="social-details">
                <span className="social-name">EMAIL TRANSMITTER</span>
                <span className="social-input-hint">🌟 [INPUT: ADD YOUR EMAIL]</span>
              </div>
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}
