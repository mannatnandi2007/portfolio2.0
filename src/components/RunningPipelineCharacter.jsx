import React from 'react';

export default function RunningPipelineCharacter({ darkMode }) {
  return (
    <div className={`pipeline-fixed-footer ${darkMode ? 'dark-pipeline' : 'light-pipeline'}`}>
      
      {/* Marquee Ticker Track (No character rendering) */}
      <div className="pipeline-track-container" style={{ height: '45px' }}>
        <div className="rolling-ticker-text" style={{ top: '12px' }}>
          <span>★ 3RD YEAR STUDENT ★ CREATIVE DIRECTOR ★ CONTENT CREATOR ★ AGENTIC AI ★ PREMIERE PRO ★ LEVEL UP ★</span>
          <span>★ 3RD YEAR STUDENT ★ CREATIVE DIRECTOR ★ CONTENT CREATOR ★ AGENTIC AI ★ PREMIERE PRO ★ LEVEL UP ★</span>
        </div>
      </div>

    </div>
  );
}
