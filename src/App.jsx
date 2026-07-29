import React, { useState, useEffect } from 'react';
import ThreeCanvas3D from './components/ThreeCanvas3D';
import RunningPipelineCharacter from './components/RunningPipelineCharacter';
import { 
  Gamepad2, Unlock, Lock, Brain, GitBranch, 
  ExternalLink, Rocket, CheckCircle2, Clock, Mail, 
  Linkedin, Instagram, PenTool, Sparkles, Terminal,
  Film, Star, Video, Code2, ArrowLeft, Github, User,
  Code, Coffee
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to Dark Cosmos
  const [activeView, setActiveView] = useState('portfolio'); // 'portfolio' | 'reels'
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Sound generator
  const playSound = (type) => {
    if (!sfxEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Tracking Scroll progress for the active view page
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set correct progress on layout paint
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  // Reset scroll progress and scroll position when switching views
  useEffect(() => {
    setScrollProgress(0);
    window.scrollTo(0, 0);
  }, [activeView]);

  // Main Portfolio 3D card transform (8 stations: 0–7, peaks evenly at 0/7, 1/7, … 7/7)
  const getCardTransform = (stationIndex) => {
    const peak = stationIndex / 7;
    const diff = scrollProgress - peak;

    const transZ = -diff * 2200; 
    const transY = -diff * 180; 
    const transX = -diff * 250; 
    const rotY = diff * 45;      
    const rotX = diff * 20;      

    const opacity = Math.max(0, 1 - Math.abs(diff) * 8);
    const isVisible = opacity > 0.05;

    return {
      transform: `translate3d(${transX}px, ${transY}px, ${transZ}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
      opacity,
      pointerEvents: isVisible ? 'all' : 'none',
      display: isVisible ? 'block' : 'none',
      transition: 'transform 0.1s ease-out, opacity 0.15s ease-out'
    };
  };

  // Creative Reels 3D card transform (3 stations peak at 0.0, 0.50, 1.0)
  const getReelsCardTransform = (stationIndex) => {
    const peak = stationIndex * 0.5;
    const diff = scrollProgress - peak;

    const transZ = -diff * 2200; 
    const transY = -diff * 180; 
    const transX = -diff * 250; 
    const rotY = diff * 45;      
    const rotX = diff * 20;      

    const opacity = Math.max(0, 1 - Math.abs(diff) * 5.5);
    const isVisible = opacity > 0.05;

    return {
      transform: `translate3d(${transX}px, ${transY}px, ${transZ}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
      opacity,
      pointerEvents: isVisible ? 'all' : 'none',
      display: isVisible ? 'block' : 'none',
      transition: 'transform 0.1s ease-out, opacity 0.15s ease-out'
    };
  };

  return (
    <div className={`app-root ${darkMode ? 'theme-dark-cosmos' : 'theme-light-sky'}`}>
      
      {/* Samsy-style interactive 3D WebGL background */}
      <ThreeCanvas3D darkMode={darkMode} scrollProgress={scrollProgress} />

      {/* Floating Theme Switch Header */}
      <div className="minimal-header-controls">
        <button 
          className="comic-btn btn-theme-toggle" 
          onClick={() => { playSound('click'); setDarkMode(!darkMode); }}
          title="Toggle Light Sky / Dark Cosmos Theme"
        >
          {darkMode ? '☀️ LIGHT SKY' : '🌙 DARK COSMOS'}
        </button>

        <button 
          className="comic-btn btn-cyan btn-sm" 
          onClick={() => setSfxEnabled(!sfxEnabled)}
        >
          SFX: {sfxEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* ========================================== */}
      {/* VIEW: MAIN PORTFOLIO PAGE */}
      {/* ========================================== */}
      {activeView === 'portfolio' && (
        <div className="perspective-3d-stage">
          
          {/* Station 0: Title Console */}
          <div className="section-3d-card" style={getCardTransform(0)}>
            <div className="retro-console-housing">
              <div className="console-top-strip">
                <span className="console-led"></span>
                <span className="console-brand"><Gamepad2 size={16} /> PORTFOLIO SYSTEM</span>
                <span className="console-battery">100%</span>
              </div>

              <div className="console-screen">
                <div className="screen-scanlines"></div>
                <div className="screen-content">
                  <span className="pixel-tag text-gold">2026 EDITION</span>
                  <h1 className="pixel-game-title">PORTFOLIO</h1>
                  <p className="hero-subtitle">
                    3rd Year Student • Part-Time Creative Director • Content Creator • Agentic AI Developer
                  </p>
                  <div style={{ marginTop: '25px', fontFamily: 'var(--font-pixel)', fontSize: '0.65rem' }}>
                    <span className="text-cyan animate-pulse">👇 SCROLL TO TRAVERSE 3D ROOMS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Station 1: Level 0: About Me */}
          <div className="section-3d-card" style={getCardTransform(1)}>
            <div className="level-badge-header">
              <span className="level-num">LEVEL 00</span>
              <h2 className="level-title">ABOUT PLAYER 01</h2>
            </div>

            <div className="comic-window-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="window-header bar-blue">
                <span className="win-title"><User size={14} className="text-gold" /> About me </span>
                <div className="win-controls"><span></span><span></span><span></span></div>
              </div>
              <div className="window-body split-about-grid">
                
                {/* Theme Consistent Frame for Photo */}
                <div className="about-photo-wrapper">
                  <div className="retro-photo-comic-frame">
                    <img 
                      src="public/assets/profileimg.jpeg" 
                      alt="Player 01 Avatar" 
                      className="retro-photo-img" 
                    />
                  </div>
                </div>

                {/* Empty Bio window to add details */}
                <div className="about-bio-dossier">
                  <div className="user-input-highlight-box" style={{ height: '100%', marginBottom: 0 }}>
                    <div className="bio-dossier-labels">
                      <p><strong>NAME:</strong> Mannat Nandi</p>
                      <p><strong>ROLE:</strong> 3rd Year Student & Part-Time Creative Director</p>
                      <p><strong>STATUS:</strong> Leveling up DSA & Agentic systems</p>
                    </div>
                    <hr style={{ borderColor: 'var(--blue-electric)', margin: '15px 0', borderStyle: 'dashed' }} />
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
                      Just a not so normal Student. Striving to be better everyday. On my way to become the "Jack of all trades, and master of some".
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Station 2: Stats & Skill Tree (Level 01) */}
          <div className="section-3d-card" style={getCardTransform(2)}>
            <div className="level-badge-header">
              <span className="level-num">LEVEL 01</span>
              <h2 className="level-title">PLAYER STATS & SKILL TREE</h2>
            </div>

            <div className="retro-window-grid">
              <div className="comic-window-card">
                <div className="window-header bar-blue">
                  <span className="win-title"><Unlock size={14} className="text-gold" /> UNLOCKED SKILLS</span>
                  <div className="win-controls"><span></span><span></span><span></span></div>
                </div>
                <div className="window-body">
                  <div className="skills-flex-tags">
                    <div className="skill-badge unlocked"><Code2 size={14} className="text-orange" /> HTML</div>
                    <div className="skill-badge unlocked"><PenTool size={14} className="text-blue" /> CSS</div>
                    <div className="skill-badge unlocked"><Code size={14} className="text-yellow" /> JS</div>
                    <div className="skill-badge unlocked"><Terminal size={14} className="text-cyan" /> PYTHON</div>
                    <div className="skill-badge unlocked"><Coffee size={14} className="text-red" /> JAVA</div>
                    <div className="skill-badge unlocked special-agentic"><Sparkles size={14} className="text-gold" /> AGENTIC AI</div>
                    <div className="skill-badge unlocked"><Film size={14} className="text-purple" /> PREMIERE PRO</div>
                  </div>
                </div>
              </div>

              <div className="comic-window-card">
                <div className="window-header bar-cyan">
                  <span className="win-title"><Brain size={14} className="text-dark" /> CURRENTLY LEARNING</span>
                  <div className="win-controls"><span></span><span></span><span></span></div>
                </div>
                <div className="window-body">
                  <div className="skills-flex-tags">
                    <div className="skill-badge learning"><Brain size={14} className="text-cyan" /> MACHINE LEARNING (ML)</div>
                    <div className="skill-badge learning"><GitBranch size={14} className="text-blue" /> DSA</div>
                  </div>
                  <div className="progress-bar-box">
                    <div className="progress-label">TRAINING: 75%</div>
                    <div className="bar-outer"><div className="bar-fill" style={{ width: '75%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="comic-window-card">
                <div className="window-header bar-navy">
                  <span className="win-title"><Lock size={14} className="text-gold" /> FUTURE UNLOCKS</span>
                  <div className="win-controls"><span></span><span></span><span></span></div>
                </div>
                <div className="window-body">
                  <div className="skills-flex-tags">
                    <div className="skill-badge locked"><Lock size={12} /> AFTER EFFECTS</div>
                    <div className="skill-badge locked"><Lock size={12} /> NLP</div>
                    <div className="skill-badge locked"><Lock size={12} /> ADVANCED ML</div>
                    <div className="skill-badge locked"><Lock size={12} /> SYSTEM DESIGN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Station 3: Project Quest Logs Part 1 — Missions 01 & 02 */}
          <div className="section-3d-card" style={getCardTransform(3)}>
            <div className="level-badge-header">
              <span className="level-num">LEVEL 2.0</span>
              <h2 className="level-title">QUEST LOGS — MISSIONS 01 & 02</h2>
            </div>

            <div className="projects-grid">
              {/* MISSION 01: Portfolio 1.0 */}
              <div className="comic-quest-card highlight-card">
                <div className="quest-tag-header">
                  <span className="quest-number">MISSION 01</span>
                  <span className="quest-status status-active"><CheckCircle2 size={14} /> DEPLOYED</span>
                </div>
                <h3 className="quest-title">Portfolio 1.0</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  My first ever deployed website — built from scratch using pure HTML, CSS, and JavaScript. The origin story. No frameworks, no libraries, just raw code and a lot of curiosity.
                </p>
                <div className="code-highlight-deployment-banner">
                  <div className="banner-top-label"><Rocket size={14} className="text-gold" /> DEPLOYED LINK</div>
                  <a href="https://mannatnandiportfoliov1.netlify.app/" target="_blank" rel="noreferrer" className="live-link-big-btn">
                    <ExternalLink size={16} /> LIVE DEMO
                  </a>
                </div>
              </div>

              {/* MISSION 02: KinSync */}
              <div className="comic-quest-card">
                <div className="quest-tag-header">
                  <span className="quest-number">MISSION 02</span>
                  <span className="quest-status status-active"><CheckCircle2 size={14} /> DEPLOYED</span>
                </div>
                <h3 className="quest-title">KinSync</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  A full-stack web app that automatically places personalised AI voice calls on birthdays and anniversaries. Built with React, Node.js, MongoDB, Google Gemini (message generation), and Bland AI (voice delivery). Features JWT auth, a cron-based annual scheduler, and a clean dashboard with dark/light theming.
                </p>
                <div className="code-highlight-deployment-banner">
                  <div className="banner-top-label"><Rocket size={14} className="text-gold" /> DEPLOYED LINK</div>
                  <a href="https://kinsyncremind.vercel.app/" target="_blank" rel="noreferrer" className="live-link-big-btn">
                    <ExternalLink size={16} /> LIVE DEMO
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Station 4: Project Quest Logs Part 2 — Missions 03 & 04 */}
          <div className="section-3d-card" style={getCardTransform(4)}>
            <div className="level-badge-header">
              <span className="level-num">LEVEL 2.1</span>
              <h2 className="level-title">QUEST LOGS — MISSIONS 03 & 04</h2>
            </div>

            <div className="projects-grid">
              {/* MISSION 03: Portfolio 2.0 (this site) */}
              <div className="comic-quest-card highlight-card">
                <div className="quest-tag-header">
                  <span className="quest-number">MISSION 03</span>
                  <span className="quest-status status-active"><CheckCircle2 size={14} /> DEPLOYED</span>
                </div>
                <h3 className="quest-title">Portfolio 2.0</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  The very site you are exploring right now. A 3D scroll-driven portfolio built with React, Three.js, and Anime.js — featuring a WebGL particle canvas, a retro game aesthetic, a Creative Reels showcase, and a fully custom theme system. Leveled up from Portfolio 1.0 in every way.
                </p>
                <div className="code-highlight-deployment-banner">
                  <div className="banner-top-label"><Sparkles size={14} className="text-gold" /> YOU ARE HERE</div>
                  <a href="/" className="live-link-big-btn" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <ExternalLink size={16} /> MAIN DASHBOARD
                  </a>
                </div>
              </div>

              {/* MISSION 04: Yuva Saarthi */}
              <div className="comic-quest-card">
                <div className="quest-tag-header">
                  <span className="quest-number">MISSION 04</span>
                  <span className="quest-status status-ongoing"><Clock size={14} /> IN PROGRESS</span>
                </div>
                <h3 className="quest-title">Yuva Saarthi</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  Millions of young Indians suffer in silence — not because help doesn't exist, but because shame and taboo keep them from asking. YUVAA Saarthi is an AI guide that changes that: it detects the emotional distress hidden behind everyday questions about mental health, periods, sex, or relationships, responds with evidence-based, culturally aware support, and safely escalates real crises to professionals — never replacing them, always guiding toward them.
                </p>
                <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '8px' }}>
                  An AI that listens for what young people are too afraid to say out loud — and knows exactly when to help.
                </p>
                <div className="code-highlight-deployment-banner muted-banner">
                  <div className="banner-top-label"><Terminal size={14} className="text-cyan" /> Coming Soon</div>
                  <a href="#" target="_blank" rel="noreferrer" className="live-link-big-btn btn-secondary-code">
                    <Clock size={16} /> LINK
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Station 5: Gateway Card to Reels (Level 03 Route) */}
          <div className="section-3d-card" style={getCardTransform(5)}>
            <div className="level-badge-header">
              <span className="level-num">LEVEL 03</span>
              <h2 className="level-title">CREATIVE REEL REALM</h2>
            </div>

            <div className="comic-connect-card" style={{ borderColor: 'var(--gold-yellow)' }}>
              <div className="connect-window-bar" style={{ borderColor: 'var(--gold-yellow)' }}>
                <span><Sparkles size={14} className="text-gold" /> CREATIVE QUEST GATEWAY</span>
              </div>
              <p className="connect-subtext">
                Explore premium collaborations and social content reels on my dedicated Creative Reels page:
              </p>
              <div style={{ marginTop: '25px' }}>
                <button 
                  className="comic-btn btn-large btn-gold" 
                  onClick={() => { playSound('click'); setActiveView('reels'); }}
                >
                  🎬 ENTER CREATIVE REEL
                </button>
              </div>
            </div>
          </div>

          {/* Station 6: Contact links (Level 04) */}
          <div className="section-3d-card" style={getCardTransform(6)}>
            <div className="level-badge-header">
              <span className="level-num">LEVEL 04</span>
              <h2 className="level-title">DIRECT CONNECT TRANSMITTER</h2>
            </div>

            <div className="comic-connect-card">
              <div className="connect-window-bar">
                <span>TRANSMISSION CHANNEL</span>
              </div>
              <p className="connect-subtext">Reach out directly through these platforms:</p>
              
              <div className="contact-links-trio">
                <a href="https://www.linkedin.com/in/mannat-nandi-883917350/" target="_blank" rel="noreferrer" className="comic-social-btn btn-linkedin">
                  <div className="social-icon"><Linkedin size={24} /></div>
                  <div className="social-details">
                    <span className="social-name">LINKEDIN</span>
                  </div>
                </a>

                <a href="https://github.com/mannatnandi2007" target="_blank" rel="noreferrer" className="comic-social-btn btn-github">
                  <div className="social-icon"><Github size={24} /></div>
                  <div className="social-details">
                    <span className="social-name">GITHUB</span>
                  </div>
                </a>

                <a href="https://www.instagram.com/mannatnandi/" target="_blank" rel="noreferrer" className="comic-social-btn btn-instagram">
                  <div className="social-icon"><Instagram size={24} /></div>
                  <div className="social-details">
                    <span className="social-name">INSTAGRAM</span>
                  </div>
                </a>

                <a href="mailto:mannat.workwithme@gmail.com" className="comic-social-btn btn-email">
                  <div className="social-icon"><Mail size={24} /></div>
                  <div className="social-details">
                    <span className="social-name">EMAIL TRANSMITTER</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* VIEW: SCROLLABLE DEDICATED CREATIVE REELS PAGE */}
      {/* ========================================== */}
      {activeView === 'reels' && (
        <div className="perspective-3d-stage">
          
          {/* Reels Station 0: Header & Exit Gate */}
          <div className="section-3d-card reels-header-card-compact" style={getReelsCardTransform(0)}>
            <div style={{ marginBottom: '20px' }}>
              <button 
                className="comic-btn btn-sm btn-cyan" 
                onClick={() => { playSound('click'); setActiveView('portfolio'); }}
              >
                <ArrowLeft size={16} /> RETURN TO MAIN PORTFOLIO
              </button>
            </div>

            <div className="reels-hero-banner">
              <div className="banner-tag">
                <Film size={16} className="text-gold" /> LEVEL 03 REALM
              </div>
              <h1 className="reels-main-title">CREATIVE REEL SHOWCASE</h1>
              <p className="reels-subtitle">
                Creative Direction, Video Editing & Brand Collaborations Showcase
              </p>
              <div style={{ marginTop: '25px', fontFamily: 'var(--font-pixel)', fontSize: '0.65rem' }}>
                <span className="text-cyan animate-pulse">SCROLL TO TRAVERSE VIDEO REELS</span>
              </div>
            </div>
          </div>

          {/* Reels Station 1: Bigsmile Gaming Zone Collab (COMPACT WIDTH) */}
          <div 
            className="section-3d-card collab-card-compact" 
            style={getReelsCardTransform(1)}
            onMouseLeave={() => setActiveVideoId(null)}
          >
            <div className="bigsmile-collab-wrapper">
              <div className="collab-header-banner">
                <span className="featured-star"><Star size={14} className="text-gold" /> TOP SPOTLIGHT</span>
                <h3>COLLAB WITH BIGSMILE</h3>
                <p>Creative Direction Highlight</p>
              </div>

              <div className="reel-embed-frame bigsmile-frame" style={{ position: 'relative' }}>
                {activeVideoId !== 'collab' && (
                  <div 
                    className="video-interact-overlay"
                    onClick={() => setActiveVideoId('collab')}
                  >
                    <div className="interact-overlay-content">
                      <Sparkles size={24} className="text-gold animate-bounce" />
                      <span>CLICK TO INTERACT</span>
                    </div>
                  </div>
                )}
                <iframe
                  className="reel-iframe"
                  src="https://www.instagram.com/reel/DbI1MKcIp2M/embed"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  title="Bigsmile Gaming Zone Collab Reel"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    pointerEvents: activeVideoId === 'collab' ? 'auto' : 'none' 
                  }}
                />
              </div>
            </div>
          </div>

          {/* Reels Station 2: Instagram Reels Grid (COMPACT DUAL WIDTH) */}
          <div className="section-3d-card gallery-card-compact" style={getReelsCardTransform(2)}>
            <div className="level-badge-header">
              <span className="level-num">GALLERY</span>
              <h2 className="level-title">SOCIAL MEDIA REELS</h2>
            </div>

            <div className="reels-dual-grid">
              <div 
                className="comic-reel-card"
                onMouseLeave={() => setActiveVideoId(null)}
              >
                <div className="reel-card-header">
                  <Instagram size={18} className="text-pink" /> INSTAGRAM REEL #01
                </div>
                <div className="reel-embed-frame" style={{ position: 'relative' }}>
                  {activeVideoId !== 'reel1' && (
                    <div 
                      className="video-interact-overlay"
                      onClick={() => setActiveVideoId('reel1')}
                    >
                      <div className="interact-overlay-content">
                        <Instagram size={20} className="text-pink animate-bounce" />
                        <span>CLICK TO PLAY</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    className="reel-iframe"
                    src="https://www.instagram.com/reel/DZREWVjzyky/embed"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency="true"
                    title="Instagram Reel 1"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      border: 'none',
                      pointerEvents: activeVideoId === 'reel1' ? 'auto' : 'none'
                    }}
                  />
                </div>
              </div>

              <div 
                className="comic-reel-card"
                onMouseLeave={() => setActiveVideoId(null)}
              >
                <div className="reel-card-header">
                  <Instagram size={18} className="text-pink" /> INSTAGRAM REEL #02
                </div>
                <div className="reel-embed-frame" style={{ position: 'relative' }}>
                  {activeVideoId !== 'reel2' && (
                    <div 
                      className="video-interact-overlay"
                      onClick={() => setActiveVideoId('reel2')}
                    >
                      <div className="interact-overlay-content">
                        <Instagram size={20} className="text-pink animate-bounce" />
                        <span>CLICK TO PLAY</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    className="reel-iframe"
                    src="https://www.instagram.com/reel/DbASodaIoRh/embed"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency="true"
                    title="Instagram Reel 2"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      border: 'none',
                      pointerEvents: activeVideoId === 'reel2' ? 'auto' : 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Bottom Infinite Marquee Ticker */}
      <RunningPipelineCharacter darkMode={darkMode} />

    </div>
  );
}
