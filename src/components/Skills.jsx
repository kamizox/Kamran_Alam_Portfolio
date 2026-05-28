import React, { useRef, useEffect } from 'react';

const skills = [
  { name: 'JavaScript', color: '#d4af37', text: 'JS' },
  { name: 'React',      color: '#61dafb', text: 'Rect' },
  { name: 'Node.js',    color: '#339933', text: 'Nodjs' },
  { name: 'CSS3',       color: '#1572b6', text: 'CSS' },
  { name: 'HTML5',      color: '#e34f26', text: 'HTML' },
  { name: 'MongoDB',    color: '#47a248', text: 'Mongo' },
  { name: 'PostgreSQL', color: '#336791', text: 'PostG' },
  { name: 'Git',        color: '#f05032', text: 'Git' },
  { name: 'Java',       color: '#007396', text: 'Java' },
  { name: 'C++',        color: '#00599c', text: 'C++' },
  { name: 'TypeScript', color: '#3178c6', text: 'TS' },
  { name: 'Python',     color: '#1e466e', text: 'Py' },
];



function makeTexture(skill) {
  const s = 128;
  const tc = document.createElement('canvas');
  tc.width = s; tc.height = s;
  const t = tc.getContext('2d');
  const g = t.createRadialGradient(s * .45, s * .38, s * .05, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.82)');
  g.addColorStop(1, 'rgba(220,228,240,0.6)');
  t.beginPath(); t.arc(s / 2, s / 2, s / 2 - 1, 0, Math.PI * 2);
  t.fillStyle = g; t.fill();
  t.beginPath(); t.arc(s / 2, s / 2, s / 2 - 1, 0, Math.PI * 2);
  t.strokeStyle = 'rgba(255,255,255,0.4)'; t.lineWidth = 1.5; t.stroke();
  t.font = `bold ${s * 0.32}px monospace`;
  t.textAlign = 'center'; t.textBaseline = 'middle';
  t.fillStyle = skill.color;
  t.fillText(skill.text, s / 2, s / 2 + 2);
  return tc;
}

const Skills = () => {
  const canvasRef = useRef(null);
  const labelRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const label  = labelRef.current;
    if (!canvas) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width  = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const textures = skills.map(makeTexture);

    const spheres = skills.map((sk, i) => {
      const r = 45 + Math.random() * 20 ;
      return {
        x: 80 + Math.random() * (W - 160),
        y: 80 + Math.random() * (H - 160),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r, displayR: r,
        skill: sk, idx: i,
        phase: Math.random() * Math.PI * 2,
        hovered: false,
      };
    });

    let mx = -999, my = -999;
    let rafId;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      if (label) {
        label.style.left = (mx + 12) + 'px';
        label.style.top  = (my - 18) + 'px';
      }
    };
    const onLeave = () => { mx = -999; my = -999; if (label) label.style.opacity = 0; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    let last = 0;
    const loop = (ts) => {
      const dt = Math.min((ts - last) / 16, 3); last = ts;
      ctx.clearRect(0, 0, W, H);

      let hoveredSphere = null;
      for (const sp of spheres) {
        const dx = mx - sp.x, dy = my - sp.y;
        sp.hovered = Math.sqrt(dx * dx + dy * dy) < sp.r * 1.1;
        if (sp.hovered) hoveredSphere = sp;
      }

      if (label) {
        label.style.opacity   = hoveredSphere ? '1' : '0';
        if (hoveredSphere) label.textContent = hoveredSphere.skill.name;
      }

      for (const sp of spheres) {
        sp.phase += 0.012;
        const bobY     = Math.sin(sp.phase) * 0.4;
        const targetR  = sp.hovered ? sp.r * 1.18 : sp.r;
        sp.displayR    = sp.displayR + (targetR - sp.displayR) * 0.15;

        const dx = mx - sp.x, dy = my - sp.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = 120;
        if (dist < repel && dist > 0) {
          const force = (repel - dist) / repel * 3.5;
          sp.vx -= (dx / dist) * force * 0.08;
          sp.vy -= (dy / dist) * force * 0.08;
        }

        sp.vx *= 0.97; sp.vy *= 0.97;
        sp.x  += sp.vx;
        sp.y  += sp.vy + bobY;

        if (sp.x - sp.displayR < 0)  { sp.x = sp.displayR;      sp.vx =  Math.abs(sp.vx) * 0.7; }
        if (sp.x + sp.displayR > W)  { sp.x = W - sp.displayR;  sp.vx = -Math.abs(sp.vx) * 0.7; }
        if (sp.y - sp.displayR < 0)  { sp.y = sp.displayR;      sp.vy =  Math.abs(sp.vy) * 0.7; }
        if (sp.y + sp.displayR > H)  { sp.y = H - sp.displayR;  sp.vy = -Math.abs(sp.vy) * 0.7; }

        for (const sp2 of spheres) {
          if (sp2 === sp) continue;
          const ex = sp.x - sp2.x, ey = sp.y - sp2.y;
          const ed = Math.sqrt(ex * ex + ey * ey);
          const minD = sp.r + sp2.r + 4;
          if (ed < minD && ed > 0) {
            const push = (minD - ed) / minD * 1.8;
            sp.vx += (ex / ed) * push * 0.3;
            sp.vy += (ey / ed) * push * 0.3;
          }
        }
      }

      const sorted = [...spheres].sort((a, b) => a.r - b.r);
      for (const sp of sorted) {
        const dr = sp.displayR;
        ctx.save();
        ctx.translate(sp.x, sp.y);

        if (sp.hovered) {
          ctx.beginPath(); ctx.arc(0, 0, dr + 8, 0, Math.PI * 2);
          const gl = ctx.createRadialGradient(0, 0, dr, 0, 0, dr + 10);
          gl.addColorStop(0, sp.skill.color + '60');
          gl.addColorStop(1, 'transparent');
          ctx.fillStyle = gl; ctx.fill();
        }

        ctx.beginPath(); ctx.arc(0, 0, dr, 0, Math.PI * 2);
        ctx.shadowColor = sp.skill.color + '40';
        ctx.shadowBlur  = sp.hovered ? 18 : 6;
        ctx.drawImage(textures[sp.idx], -dr, -dr, dr * 2, dr * 2);

        if (sp.hovered) {
          ctx.beginPath(); ctx.arc(0, 0, dr, 0, Math.PI * 2);
          ctx.strokeStyle = sp.skill.color + '99';
          ctx.lineWidth   = 2; ctx.stroke();
        }

        ctx.restore();
      }

      ctx.shadowBlur = 0;

      // red cursor orb
      if (mx > 0) {
        const cg = ctx.createRadialGradient(mx, my, 0, mx, my, 12);
        cg.addColorStop(0, 'rgba(255,80,80,1)');
        cg.addColorStop(1, 'rgba(255,80,80,0)');
        ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2);
        ctx.fillStyle = cg; ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-syne font-bold mb-16 text-center">
          My Tech <span className="text-primary">Stack</span>
        </h2>

        <div className="w-full h-[65vh] rounded-3xl overflow-hidden border border-white/5 bg-[#07080f] mb-16 relative" style={{ cursor: 'none' }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
          <div
            ref={labelRef}
            style={{
              position: 'absolute', top: 0, left: 0,
              pointerEvents: 'none', opacity: 0,
              transition: 'opacity 0.2s',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', fontFamily: 'monospace', fontSize: '13px',
              padding: '6px 14px', borderRadius: '20px', whiteSpace: 'nowrap',
            }}
          />
          <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            INTERACTIVE 3D SPACE
          </div>
          <div className="absolute top-4 left-4 text-xs text-gray-400 font-mono pointer-events-none">
            Move cursor to repel · Hover sphere to glow
          </div>
        </div>

        {/* Skill Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Frontend',  items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'] },
            { title: 'Backend',   items: ['Node.js', 'REST APIs', 'PostgreSQL', 'MongoDB'] },
            { title: 'Languages', items: ['Java', 'C', 'C++', 'C#', 'Go'] },
            { title: 'Tools',     items: ['Git', 'GitHub', 'VS Code', 'WordPress', 'Canva'] },
          ].map(({ title, items }) => (
            <div key={title}>
              <h4 className="text-xl font-syne font-bold mb-4 text-white">{title}</h4>
              <div className="flex flex-wrap gap-2">
                {items.map(s => (
                  <span
                    key={s}
                    className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:border-primary/50 transition-colors cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;