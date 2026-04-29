import { useState, useEffect, useRef } from "react";

const CONFIG = {
  FREE_USES: 3,
  WOMPI_LINK: "https://checkout.wompi.co/l/TN9fuP",
  PRICE_MENSUAL: "29.900",
  PRICE_UNICO: "19.900",
  WHATSAPP: "573001234567",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --pink: #FF3CAC; --pink2: #FF6BD6; --gold: #FFD700;
    --purple: #784BA0; --purple-dark: #5A2D8A; --blue: #2B86C5;
    --bg: #0A0A0F; --surface: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08); --white: #FFFFFF; --muted: rgba(255,255,255,0.5);
    --green: #25D366;
  }
  body { background: var(--bg); }
  .app { min-height:100vh; background:var(--bg); color:var(--white); font-family:'Inter',sans-serif; overflow-x:hidden; }
  .bg-main {
    position:fixed; inset:0; z-index:0;
    background:
      radial-gradient(ellipse 100% 60% at 0% 0%, rgba(255,60,172,0.18) 0%, transparent 55%),
      radial-gradient(ellipse 80% 80% at 100% 100%, rgba(43,134,197,0.15) 0%, transparent 55%),
      radial-gradient(ellipse 60% 40% at 50% 50%, rgba(120,75,160,0.10) 0%, transparent 60%);
    pointer-events:none;
  }
  .wrap { position:relative; z-index:1; max-width:860px; margin:0 auto; padding:60px 32px 80px; }
  .hero { text-align:center; margin-bottom:56px; }
  .badge { display:inline-flex; align-items:center; gap:8px; padding:6px 18px; border-radius:100px; border:1px solid rgba(255,60,172,0.4); background:rgba(255,60,172,0.1); font-size:10px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:var(--pink2); margin-bottom:28px; }
  .badge-dot { width:6px; height:6px; border-radius:50%; background:var(--pink); animation:blink 1.5s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .hero-glow-text { font-family:'Syne',sans-serif; font-size:clamp(44px,8.5vw,72px); font-weight:800; line-height:1.1; letter-spacing:-1px; margin-bottom:20px; background:linear-gradient(135deg,#FF3CAC 0%,#FF6BD6 30%,#784BA0 60%,#2B86C5 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; filter:drop-shadow(0 0 30px rgba(255,60,172,0.25)); display:block; width:100%; }
  .hero-title { font-family:'Syne',sans-serif; font-size:clamp(24px,4.5vw,46px); font-weight:800; line-height:1.1; margin-bottom:20px; color:var(--white); }
  .hero-title .grad { background:linear-gradient(135deg,#FF3CAC,#FFD700); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .hero-sub { font-size:16px; color:var(--muted); max-width:560px; margin:0 auto 36px; line-height:1.7; }
  .hero-ctas { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:48px; }
  .hero-proof { display:flex; align-items:center; justify-content:center; gap:32px; flex-wrap:wrap; margin-bottom:56px; }
  .proof-item { text-align:center; }
  .proof-num { display:block; font-family:'Syne',sans-serif; font-size:28px; font-weight:800; background:linear-gradient(135deg,#FF3CAC,#FFD700); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .proof-label { font-size:11px; color:var(--muted); letter-spacing:1px; text-transform:uppercase; }
  .proof-divider { width:1px; height:40px; background:var(--border); }
  .feature-banner { background:linear-gradient(135deg,rgba(37,211,102,0.1),rgba(43,134,197,0.1)); border:1px solid rgba(37,211,102,0.25); border-radius:20px; padding:24px 28px; margin-bottom:28px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
  .feature-banner-icon { font-size:36px; flex-shrink:0; }
  .feature-banner-content { flex:1; min-width:200px; }
  .feature-banner-title { font-family:'Syne',sans-serif; font-size:16px; font-weight:700; color:var(--white); margin-bottom:6px; }
  .feature-banner-desc { font-size:13px; color:var(--muted); line-height:1.6; }
  .feature-banner-badge { background:linear-gradient(135deg,var(--green),#128C7E); color:#fff; font-size:10px; font-weight:700; letter-spacing:2px; padding:5px 14px; border-radius:100px; white-space:nowrap; }
  .pricing-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:40px; }
  .price-card { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:28px 24px; position:relative; overflow:hidden; }
  .price-card.featured { border-color:rgba(120,75,160,0.5); background:rgba(120,75,160,0.06); }
  .price-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--pink),var(--purple),var(--blue)); opacity:0.5; }
  .price-card.featured::before { opacity:1; }
  .price-badge { display:inline-block; padding:3px 10px; border-radius:100px; font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:12px; }
  .price-badge.nuevo { background:rgba(37,211,102,0.15); color:#6ddb85; border:1px solid rgba(37,211,102,0.3); }
  .price-badge.clasico { background:rgba(255,60,172,0.1); color:var(--pink2); border:1px solid rgba(255,60,172,0.2); }
  .price-name { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; margin-bottom:8px; }
  .price-amount { font-family:'Syne',sans-serif; font-size:36px; font-weight:800; background:linear-gradient(135deg,#FF3CAC,#784BA0,#2B86C5); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:4px; }
  .price-period { font-size:11px; color:var(--muted); letter-spacing:1px; text-transform:uppercase; margin-bottom:16px; }
  .price-features { list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:20px; }
  .price-feature { font-size:13px; color:rgba(255,255,255,0.75); display:flex; align-items:flex-start; gap:8px; line-height:1.5; }
  .price-feature-icon { flex-shrink:0; margin-top:1px; }
  .benefits { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:72px; }
  .benefit-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:24px 20px; text-align:center; }
  .benefit-icon { font-size:32px; margin-bottom:12px; }
  .benefit-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; margin-bottom:6px; }
  .benefit-desc { font-size:12px; color:var(--muted); line-height:1.6; }
  .btn-generate { width:100%; margin-top:24px; padding:18px; border:none; border-radius:14px; background:linear-gradient(135deg,#FF3CAC 0%,#784BA0 50%,#2B86C5 100%); color:#fff; font-family:'Syne',sans-serif; font-size:14px; font-weight:800; letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:all 0.25s; position:relative; overflow:hidden; box-shadow:0 8px 32px rgba(255,60,172,0.3); text-decoration:none; display:flex; align-items:center; justify-content:center; gap:10px; }
  .btn-generate:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 40px rgba(255,60,172,0.4); }
  .btn-generate:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
  .btn-gold { width:100%; margin-top:12px; padding:16px; border:none; border-radius:14px; background:linear-gradient(135deg,#FF3CAC 0%,#784BA0 50%,#2B86C5 100%); color:#fff; font-family:'Syne',sans-serif; font-size:13px; font-weight:800; letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:all 0.25s; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:10px; box-shadow:0 8px 24px rgba(255,60,172,0.3); }
  .btn-gold:hover { transform:translateY(-2px); }
  .btn-hero-secondary { padding:18px 36px; border-radius:14px; border:2px solid #9B5ED4; background:linear-gradient(135deg,#5A2D8A,#784BA0); color:#fff; font-family:'Syne',sans-serif; font-size:14px; font-weight:800; letter-spacing:2px; text-transform:uppercase; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:10px; transition:all 0.25s; box-shadow:0 8px 24px rgba(120,75,160,0.45); }
  .btn-hero-secondary:hover { transform:translateY(-2px); }
  .shimmer { position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent); animation:shimmer 1.5s infinite; }
  @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
  .section-label { text-align:center; font-size:10px; font-weight:600; letter-spacing:4px; text-transform:uppercase; color:var(--pink2); margin-bottom:16px; }
  .section-title { text-align:center; font-family:'Syne',sans-serif; font-size:clamp(28px,5vw,48px); font-weight:800; background:linear-gradient(135deg,#fff 0%,#FF3CAC 40%,#FFD700 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:8px; }
  .section-sub { text-align:center; color:var(--muted); font-size:14px; margin-bottom:36px; }
  .uses-counter { display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:20px; }
  .uses-dots { display:flex; gap:6px; }
  .uses-dot { width:10px; height:10px; border-radius:50%; border:2px solid var(--border); background:transparent; transition:all 0.3s; }
  .uses-dot.used { background:var(--pink); border-color:var(--pink); }
  .uses-text { color:var(--muted); font-size:12px; }
  .card { background:var(--surface); border:1px solid var(--border); border-radius:24px; padding:36px; margin-bottom:24px; position:relative; overflow:hidden; }
  .card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--pink),var(--gold),var(--blue)); }
  .card-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; margin-bottom:24px; }
  .fields { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .field-full { grid-column:1/-1; }
  label { display:block; font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; background:linear-gradient(90deg,var(--pink),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:8px; }
  input, select, textarea { width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px 16px; color:var(--white); font-family:'Inter',sans-serif; font-size:14px; font-weight:300; outline:none; transition:all 0.2s; }
  input::placeholder, textarea::placeholder { color:rgba(255,255,255,0.2); }
  input:focus, select:focus, textarea:focus { border-color:rgba(255,60,172,0.5); background:rgba(255,60,172,0.05); box-shadow:0 0 0 3px rgba(255,60,172,0.1); }
  select option { background:#0A0A0F; }
  textarea { resize:vertical; min-height:80px; }
  .err-box { margin-top:16px; padding:12px 16px; border:1px solid rgba(255,80,80,0.3); border-radius:10px; background:rgba(255,50,50,0.07); font-size:12px; color:#ff8080; }
  .info-box { margin-top:16px; padding:12px 16px; border:1px solid rgba(37,211,102,0.3); border-radius:10px; background:rgba(37,211,102,0.07); font-size:12px; color:#6ddb85; }
  .ai-badge { display:inline-flex; align-items:center; gap:6px; padding:4px 12px; border-radius:100px; border:1px solid rgba(120,75,160,0.4); background:rgba(120,75,160,0.1); font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#c084fc; }
  .ai-dot { width:5px; height:5px; border-radius:50%; background:#c084fc; animation:blink 1s infinite; }
  .tabs { display:flex; gap:6px; margin-bottom:20px; overflow-x:auto; padding-bottom:4px; flex-wrap:wrap; }
  .tab { padding:10px 14px; border:1px solid var(--border); border-radius:12px; background:var(--surface); color:var(--muted); font-family:'Syne',sans-serif; font-size:11px; font-weight:700; letter-spacing:1px; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
  .tab.active { border-color:rgba(255,60,172,0.4); color:var(--pink2); background:rgba(255,60,172,0.1); box-shadow:0 4px 20px rgba(255,60,172,0.15); }
  .tab.pro-tab.active { border-color:rgba(255,215,0,0.4); color:var(--gold); background:rgba(255,215,0,0.08); }
  .tab.pro-tab { border-color:rgba(255,215,0,0.2); }
  .tab.wsp-tab.active { border-color:rgba(37,211,102,0.4); color:#6ddb85; background:rgba(37,211,102,0.08); }
  .tab.wsp-tab { border-color:rgba(37,211,102,0.2); }
  .results-card { background:var(--surface); border:1px solid var(--border); border-radius:24px; overflow:hidden; }
  .result-item { padding:24px 28px; border-bottom:1px solid var(--border); animation:up 0.35s ease both; }
  .result-item:last-child { border-bottom:none; }
  @keyframes up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .result-label { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--pink2); margin-bottom:12px; display:flex; align-items:center; gap:8px; }
  .result-num-badge { width:22px; height:22px; border-radius:6px; background:linear-gradient(135deg,var(--pink),var(--purple)); display:flex; align-items:center; justify-content:center; font-size:11px; color:#fff; font-weight:700; flex-shrink:0; }
  .result-text { font-size:14px; line-height:1.8; color:rgba(255,255,255,0.82); font-weight:300; white-space:pre-wrap; }
  .copy-btn { margin-top:12px; padding:7px 18px; border:1px solid rgba(255,60,172,0.3); border-radius:20px; background:transparent; color:var(--pink2); font-family:'Syne',sans-serif; font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; cursor:pointer; transition:all 0.2s; }
  .copy-btn:hover { background:rgba(255,60,172,0.1); }
  .copy-btn.ok { color:#6ddb85; border-color:rgba(109,219,133,0.4); }
  .streaming-text { font-size:14px; line-height:1.8; color:rgba(255,255,255,0.82); font-weight:300; white-space:pre-wrap; }
  .streaming-cursor { display:inline-block; width:2px; height:14px; background:var(--pink2); margin-left:2px; animation:blink 0.7s infinite; vertical-align:text-bottom; }
  .stream-section { padding:24px 28px; border-bottom:1px solid var(--border); }
  .cal-semana-title { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:var(--gold); padding:16px 28px 8px; letter-spacing:2px; text-transform:uppercase; border-bottom:1px solid rgba(255,215,0,0.1); }
  .cal-dia { padding:16px 28px; border-bottom:1px solid var(--border); display:grid; grid-template-columns:70px 1fr auto; gap:16px; align-items:start; }
  .cal-dia-nombre { font-family:'Syne',sans-serif; font-size:12px; font-weight:700; color:var(--white); }
  .cal-dia-tema { font-size:10px; letter-spacing:1px; text-transform:uppercase; color:var(--muted); margin-top:2px; }
  .cal-caption { font-size:13px; line-height:1.7; color:rgba(255,255,255,0.75); font-weight:300; }
  .prompt-item { padding:24px 28px; border-bottom:1px solid var(--border); }
  .prompt-uso { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--gold); margin-bottom:10px; }
  .prompt-box { background:rgba(0,0,0,0.3); border:1px solid rgba(255,215,0,0.15); border-radius:10px; padding:14px 16px; font-size:13px; line-height:1.7; color:rgba(255,255,255,0.8); font-style:italic; margin-bottom:10px; }
  .prompt-tip { font-size:11px; color:var(--muted); }
  .wsp-delivery { padding:32px; }
  .wsp-delivery-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:700; margin-bottom:8px; display:flex; align-items:center; gap:10px; }
  .wsp-delivery-sub { color:var(--muted); font-size:14px; line-height:1.7; margin-bottom:28px; }
  .wsp-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; }
  .wsp-card { background:rgba(37,211,102,0.06); border:1px solid rgba(37,211,102,0.2); border-radius:16px; padding:20px; }
  .wsp-card-icon { font-size:28px; margin-bottom:8px; }
  .wsp-card-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; margin-bottom:4px; }
  .wsp-card-desc { font-size:12px; color:var(--muted); line-height:1.5; }
  .wsp-form-row { display:flex; gap:12px; margin-bottom:16px; }
  .wsp-input { flex:1; background:rgba(255,255,255,0.06); border:1px solid var(--border); border-radius:10px; padding:12px 16px; color:var(--white); font-family:'Inter',sans-serif; font-size:14px; outline:none; }
  .wsp-input:focus { border-color:rgba(37,211,102,0.4); }
  .wsp-input::placeholder { color:rgba(255,255,255,0.2); }
  .btn-wsp { display:flex; align-items:center; justify-content:center; gap:10px; width:100%; padding:16px 28px; border-radius:14px; border:none; background:linear-gradient(135deg,#25D366,#128C7E); color:#fff; font-family:'Syne',sans-serif; font-size:14px; font-weight:800; letter-spacing:1px; text-transform:uppercase; cursor:pointer; transition:all 0.25s; text-decoration:none; box-shadow:0 8px 24px rgba(37,211,102,0.3); }
  .btn-wsp:hover { transform:translateY(-2px); }
  .wsp-schedule { margin-top:20px; padding:16px 20px; background:rgba(37,211,102,0.05); border:1px solid rgba(37,211,102,0.15); border-radius:12px; font-size:12px; color:rgba(255,255,255,0.5); line-height:1.7; }
  .wsp-schedule strong { color:#6ddb85; }
  .loading-state { padding:72px; text-align:center; }
  .bars { display:flex; justify-content:center; align-items:flex-end; gap:5px; height:40px; margin-bottom:24px; }
  .bar { width:6px; border-radius:3px; background:linear-gradient(to top,var(--pink),var(--gold)); animation:dance 1s ease-in-out infinite; }
  .bar:nth-child(2){animation-delay:.1s} .bar:nth-child(3){animation-delay:.2s} .bar:nth-child(4){animation-delay:.3s} .bar:nth-child(5){animation-delay:.4s}
  @keyframes dance { 0%,100%{height:10px;opacity:0.5} 50%{height:36px;opacity:1} }
  .loading-text { font-family:'Syne',sans-serif; font-size:15px; font-weight:600; color:var(--muted); }
  .loading-step { font-size:12px; color:rgba(255,60,172,0.6); margin-top:8px; animation:blink 1.5s infinite; }
  .pro-lock { padding:48px 32px; text-align:center; }
  .pro-lock-icon { font-size:44px; margin-bottom:16px; }
  .pro-lock-title { font-family:'Syne',sans-serif; font-size:20px; font-weight:700; margin-bottom:10px; }
  .pro-lock-desc { color:var(--muted); font-size:14px; margin-bottom:24px; line-height:1.6; max-width:380px; margin-left:auto; margin-right:auto; }
  .modal-overlay { position:fixed; inset:0; z-index:1000; background:rgba(0,0,0,0.85); backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; padding:24px; animation:fadeIn 0.3s ease; overflow-y:auto; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .modal { background:#111118; border:1px solid rgba(255,60,172,0.3); border-radius:28px; padding:48px 40px; max-width:520px; width:100%; text-align:center; position:relative; animation:slideUp 0.3s ease; }
  @keyframes slideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
  .modal::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; border-radius:28px 28px 0 0; background:linear-gradient(90deg,var(--pink),var(--gold),var(--blue)); }
  .modal-emoji { font-size:52px; margin-bottom:20px; display:block; }
  .modal-title { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; margin-bottom:12px; background:linear-gradient(135deg,#fff,#FF3CAC); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .modal-desc { color:var(--muted); font-size:14px; line-height:1.7; margin-bottom:24px; }
  .modal-plans { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px; }
  .modal-plan { padding:20px 16px; border-radius:16px; border:1px solid var(--border); background:rgba(255,255,255,0.03); cursor:pointer; transition:all 0.2s; text-align:left; }
  .modal-plan:hover { border-color:rgba(255,215,0,0.3); }
  .modal-plan.selected { border-color:rgba(255,215,0,0.5); background:rgba(255,215,0,0.06); }
  .modal-plan-label { font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
  .modal-plan-price { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:var(--white); margin-bottom:2px; }
  .modal-plan-period { font-size:10px; color:var(--muted); }
  .modal-plan-note { font-size:11px; color:#6ddb85; margin-top:6px; }
  .modal-features { text-align:left; margin-bottom:24px; display:flex; flex-direction:column; gap:8px; }
  .modal-feat { display:flex; align-items:center; gap:12px; font-size:13px; color:rgba(255,255,255,0.8); }
  .btn-wompi { width:100%; padding:18px; border:none; border-radius:14px; background:linear-gradient(135deg,#FF3CAC,#784BA0,#2B86C5); color:#fff; font-family:'Syne',sans-serif; font-size:15px; font-weight:800; letter-spacing:2px; text-transform:uppercase; cursor:pointer; text-decoration:none; transition:all 0.25s; box-shadow:0 8px 32px rgba(255,60,172,0.4); margin-bottom:10px; display:flex; align-items:center; justify-content:center; }
  .btn-wsp-modal { display:flex; align-items:center; justify-content:center; width:100%; padding:14px; border-radius:14px; border:1px solid rgba(37,211,102,0.4); background:rgba(37,211,102,0.08); color:#25D366; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; text-decoration:none; cursor:pointer; transition:all 0.2s; margin-bottom:10px; }
  .modal-close { position:absolute; top:20px; right:20px; background:transparent; border:none; color:var(--muted); font-size:20px; cursor:pointer; padding:4px; }
  .modal-guarantee { font-size:11px; color:rgba(255,255,255,0.25); }
  .footer { text-align:center; margin-top:60px; padding-top:32px; border-top:1px solid var(--border); }
  .footer-logo { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; margin-bottom:8px; color:var(--pink2); }
  .footer-text { font-size:12px; color:rgba(255,255,255,0.2); letter-spacing:1px; }
  @media(max-width:700px){
    .benefits{grid-template-columns:1fr} .pricing-grid{grid-template-columns:1fr}
    .fields{grid-template-columns:1fr} .field-full{grid-column:1}
    .card{padding:24px 18px} .wrap{padding:40px 16px 60px}
    .hero-ctas{flex-direction:column;align-items:center}
    .cal-dia{grid-template-columns:60px 1fr;}
    .modal{padding:32px 20px} .modal-plans{grid-template-columns:1fr}
    .wsp-grid{grid-template-columns:1fr} .wsp-form-row{flex-direction:column}
  }
`;

const emojis = {
  color: ["✨","💫","🌟","💎","👑","🔥","💅","🪄"],
  corte: ["✂️","💇‍♀️","✨","👸","💫","🌟"],
  unas:  ["💅","✨","💎","🌸","💖","👑"],
  facial:["🌿","✨","💆‍♀️","🌸","💎","🫶"],
  default:["✨","💫","🌟","💎","👑","🔥"],
};
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
function detectType(txt) {
  const t = txt.toLowerCase();
  if (t.includes("color")||t.includes("balayage")||t.includes("tinte")||t.includes("mechas")) return "color";
  if (t.includes("corte")||t.includes("pelo")||t.includes("cabello")) return "corte";
  if (t.includes("uña")||t.includes("nail")||t.includes("manicure")) return "unas";
  if (t.includes("facial")||t.includes("piel")||t.includes("skin")) return "facial";
  return "default";
}

const DIAS_SEMANA = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const TEMAS_DIA = [
  { tema:"Motivación", emoji:"🔥", idea:"Post de motivación para arrancar la semana" },
  { tema:"Servicio", emoji:"💅", idea:"Presenta tu servicio estrella con detalle" },
  { tema:"Antes/Después", emoji:"✨", idea:"Transformación de clienta real" },
  { tema:"Testimonio", emoji:"💬", idea:"Reseña o comentario de clienta feliz" },
  { tema:"Promoción", emoji:"🎁", idea:"Oferta especial de fin de semana" },
  { tema:"Lifestyle", emoji:"🌟", idea:"Foto del ambiente del salón o equipo" },
  { tema:"Educación", emoji:"💎", idea:"Tip de cuidado en casa para tus clientas" },
];

async function callClaudeStream(prompt, onChunk, signal) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, stream: true, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error("API error");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === "content_block_delta" && parsed.delta?.text) onChunk(parsed.delta.text);
      } catch {}
    }
  }
}

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

function buildPostsPrompt({ salon, especialidad, servicio, promo, tono }) {
  return `Eres una experta en marketing de salones de belleza en Colombia. Genera exactamente 5 captions para Instagram para el salón "${salon}".
Datos: Especialidad: ${especialidad}, Servicio estrella: ${servicio}, Promoción: ${promo || "Ninguna"}, Tono: ${tono}
Genera 5 captions numerados:
POST 1:\n[caption]\n\nPOST 2:\n[caption]\n\n... hasta POST 5.
Cada caption: emojis relevantes, hashtags colombianos al final, auténtico, menciona el salón, llamado a la acción, máx 280 chars sin hashtags.`;
}

function buildCalendarPrompt({ salon, especialidad, servicio, promo, tono }) {
  return `Eres experta en marketing de salones de belleza en Colombia. Genera un calendario de contenido para Instagram para el salón "${salon}" para 4 semanas (28 días).
Especialidad: ${especialidad}, Servicio: ${servicio}, Promoción: ${promo || "ninguna"}, Tono: ${tono}
Estructura: ${DIAS_SEMANA.map((d,i) => `${d}: ${TEMAS_DIA[i].tema}`).join(", ")}
Formato exacto por día:
DÍA 1 | Lunes | Semana 1 | Motivación\n[caption con emojis y hashtags]\n\nDÍA 2 | Martes | Semana 1 | Servicio\n[caption]\n\n... hasta DÍA 28.`;
}

function buildCanvaPrompt({ salon, especialidad, servicio, tono }) {
  const estiloMap = { "profesional y cálido": "warm golden tones, soft lighting, cozy salon", "divertido y fresco": "bright neon colors, fun energetic", "lujoso y exclusivo": "luxury black and gold, dramatic lighting", "cercano y familiar": "warm pastels, friendly, natural light", "moderno y minimalista": "minimalist white, clean lines" };
  return `Genera 6 prompts en inglés para Canva IA o Adobe Firefly para el salón "${salon}". Especialidad: ${especialidad}, Servicio: ${servicio}, Estilo: ${estiloMap[tono]||estiloMap["profesional y cálido"]}
Formato: USO: [nombre]\nPROMPT: [prompt 40-60 palabras en inglés]\nTIP: [consejo en español]\n---\nUsos: Post Antes/Después, Story Promoción, Post Ambiente, Reel cover, Story Testimonio, Post Educativo.`;
}

function buildStoriesPrompt({ salon, especialidad, servicio, promo }) {
  return `Genera 4 textos para Instagram Stories para "${salon}". Servicio: ${servicio}, Especialidad: ${especialidad}, Promo: ${promo || "ninguna"}
Tipos: 1.BIENVENIDA SEMANAL 2.ANTES Y DESPUÉS 3.TESTIMONIO 4.LLAMADO A ACCIÓN
Formato: STORY 1 | [tipo]:\n[texto máx 100 palabras con emojis]\n\nSTORY 2 | [tipo]:\n... hasta STORY 4.`;
}

function buildWhatsappPrompt({ salon, servicio, especialidad }) {
  return `Genera 5 respuestas WhatsApp Business para "${salon}". Especialidad: ${especialidad}, Servicio: ${servicio}
Preguntas: 1.¿Cuánto cuesta? 2.¿Citas disponibles? 3.¿Cómo agendar? 4.¿Qué productos usan? 5.¿Hacen domicilios?
Formato: PREGUNTA: [pregunta]\nRESPUESTA: [respuesta cálida con emojis máx 80 palabras]\n---`;
}

function parsePostsResponse(text) {
  const posts = [];
  const matches = text.matchAll(/POST\s*(\d+):\s*\n([\s\S]*?)(?=POST\s*\d+:|$)/gi);
  for (const m of matches) posts.push({ numero: parseInt(m[1]), caption: m[2].trim() });
  if (posts.length === 0) {
    text.split(/\n\n+/).filter(c => c.trim().length > 30).slice(0, 5).forEach((c, i) => posts.push({ numero: i+1, caption: c.trim() }));
  }
  return posts.slice(0, 5);
}

function parseCalendarResponse(text) {
  const semanas = [[], [], [], []];
  const lines = text.split("\n");
  let currentDay = null, captionLines = [];
  const flush = () => {
    if (currentDay && captionLines.length > 0) {
      const semIdx = Math.floor((currentDay.numero - 1) / 7);
      if (semIdx < 4) semanas[semIdx].push({ ...currentDay, caption: captionLines.join("\n").trim() });
    }
    captionLines = []; currentDay = null;
  };
  for (const line of lines) {
    const m = line.match(/DÍA\s*(\d+)\s*\|\s*(\w+)\s*\|\s*Semana\s*(\d+)\s*\|\s*(.+)/i);
    if (m) { flush(); currentDay = { numero: parseInt(m[1]), dia: m[2].trim(), semana: parseInt(m[3]), tema: m[4].trim() }; }
    else if (currentDay && line.trim()) captionLines.push(line);
  }
  flush();
  return semanas.map((dias, i) => ({ semana: `${["Primera","Segunda","Tercera","Cuarta"][i]} semana`, dias })).filter(s => s.dias.length > 0);
}

function parseCanvaResponse(text) {
  const prompts = [];
  const blocks = text.split("---").filter(b => b.trim());
  for (const block of (blocks.length > 1 ? blocks : [text])) {
    const u = block.match(/USO:\s*(.+)/i), p = block.match(/PROMPT:\s*([\s\S]*?)(?=TIP:|$)/i), t = block.match(/TIP:\s*(.+)/i);
    if (u && p) prompts.push({ uso: u[1].trim(), prompt: p[1].trim(), tip: t ? t[1].trim() : "Úsalo en Canva AI" });
  }
  if (prompts.length === 0) text.split(/\n\n+/).filter(c => c.length > 40).slice(0, 6).forEach((c, i) => prompts.push({ uso: `Imagen ${i+1}`, prompt: c.trim(), tip: "Úsalo en Canva AI" }));
  return prompts.slice(0, 6);
}

function parseStoriesResponse(text) {
  const stories = [];
  const matches = text.matchAll(/STORY\s*(\d+)\s*\|\s*([^:\n]+):\s*\n([\s\S]*?)(?=STORY\s*\d+|$)/gi);
  for (const m of matches) stories.push({ tipo: m[2].trim(), texto: m[3].trim() });
  if (stories.length === 0) {
    const tipos = ["Bienvenida semanal","Antes y Después","Testimonio","Llamado a Acción"];
    text.split(/\n\n+/).filter(c => c.trim().length > 20).slice(0, 4).forEach((c, i) => stories.push({ tipo: tipos[i]||`Story ${i+1}`, texto: c.trim() }));
  }
  return stories.slice(0, 4);
}

function parseWhatsappResponse(text) {
  const items = [];
  const matches = text.matchAll(/PREGUNTA:\s*(.+)\nRESPUESTA:\s*([\s\S]*?)(?=PREGUNTA:|---|\n\n\n|$)/gi);
  for (const m of matches) items.push({ pregunta: m[1].trim(), respuesta: m[2].trim() });
  if (items.length === 0) text.split("---").filter(c => c.trim().length > 20).slice(0, 5).forEach((c, i) => items.push({ pregunta: `Pregunta ${i+1}`, respuesta: c.trim() }));
  return items.slice(0, 5);
}

function buildWhatsAppMsg(form, posts) {
  return encodeURIComponent(`━━━━━━━━━━━━━━━━━━\n✨ CONTENIDO SEMANA - ${form.salon.toUpperCase()}\n━━━━━━━━━━━━━━━━━━\n\n📸 POST 1:\n${posts[0]?.caption||""}\n\n━━━━━━━━━━━━━━━━━━\n\n📸 POST 2:\n${posts[1]?.caption||""}\n\n━━━━━━━━━━━━━━━━━━\n\n📸 POST 3:\n${posts[2]?.caption||""}\n\n━━━━━━━━━━━━━━━━━━\n💅 Generado con GlamPost IA`);
}

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  return (
    <button className={`copy-btn${ok?" ok":""}`} onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(()=>setOk(false),2000); }}>
      {ok ? "✓ Copiado" : "⊕ Copiar"}
    </button>
  );
}

function PaywallModal({ onClose }) {
  const [plan, setPlan] = useState("mensual");
  const price = plan === "mensual" ? CONFIG.PRICE_MENSUAL : CONFIG.PRICE_UNICO;
  const wspMsg = encodeURIComponent(`Hola, quiero el plan ${plan === "mensual" ? "Pro Mensual" : "Pro Acceso Único"} de GlamPost 💅`);
  return (
    <div className="modal-overlay">
      <div className="modal">
        {onClose && <button className="modal-close" onClick={onClose}>✕</button>}
        <span className="modal-emoji">💅</span>
        <div className="modal-title">¡Activa tu acceso Pro!</div>
        <p className="modal-desc">Generaciones ilimitadas con IA real, calendario de 30 días, prompts Canva y entrega automática por WhatsApp.</p>
        <div className="modal-plans">
          <div className={`modal-plan${plan==="mensual"?" selected":""}`} onClick={()=>setPlan("mensual")}>
            <div className="modal-plan-label">⭐ Más popular</div>
            <div className="modal-plan-price">${CONFIG.PRICE_MENSUAL}</div>
            <div className="modal-plan-period">COP / mes</div>
            <div className="modal-plan-note">📲 Envío WhatsApp incluido</div>
          </div>
          <div className={`modal-plan${plan==="unico"?" selected":""}`} onClick={()=>setPlan("unico")}>
            <div className="modal-plan-label">💎 Pago único</div>
            <div className="modal-plan-price">${CONFIG.PRICE_UNICO}</div>
            <div className="modal-plan-period">COP · de por vida</div>
            <div className="modal-plan-note">Sin funciones de envío</div>
          </div>
        </div>
        <div className="modal-features">
          {[["✅","Generaciones ilimitadas con IA real"],["📅","Calendario 30 días personalizado"],["🎨","Prompts listos para Canva IA"],
            ...(plan==="mensual"?[["📲","Envío automático WhatsApp cada lunes"],["💬","Soporte directo por WhatsApp"]]:[])
          ].map(([icon,text])=>(<div key={text} className="modal-feat"><span style={{fontSize:16,flexShrink:0}}>{icon}</span><span>{text}</span></div>))}
        </div>
        <a href={CONFIG.WOMPI_LINK} target="_blank" rel="noopener noreferrer" className="btn-wompi">💳 Pagar ${price} con Wompi</a>
        <a href={`https://wa.me/${CONFIG.WHATSAPP}?text=${wspMsg}`} target="_blank" rel="noopener noreferrer" className="btn-wsp-modal">💬 Pagar por WhatsApp</a>
        <div className="modal-guarantee">🔒 Pago 100% seguro · Wompi Colombia</div>
      </div>
    </div>
  );
}

function ProLock() {
  return (
    <div className="pro-lock">
      <div className="pro-lock-icon">🔒</div>
      <div className="pro-lock-title">Función exclusiva Pro</div>
      <p className="pro-lock-desc">Esta función está disponible en el plan Pro. Generado con IA real para resultados profesionales.</p>
      <a href={CONFIG.WOMPI_LINK} target="_blank" rel="noopener noreferrer" className="btn-generate" style={{display:"inline-flex",width:"auto",marginTop:0,textDecoration:"none"}}>💎 Activar Pro</a>
    </div>
  );
}

const ALL_TABS = [
  { id:"posts", label:"📸 Posts IG", pro:false },
  { id:"stories", label:"⭕ Stories", pro:false },
  { id:"whatsapp", label:"💬 WhatsApp", pro:false },
  { id:"bio", label:"✨ Bio", pro:false },
  { id:"calendar", label:"📅 Calendario", pro:true },
  { id:"canva", label:"🎨 Canva IA", pro:true },
  { id:"share", label:"📲 Enviar WS", pro:true, wsp:true },
];

export default function GlamPost() {
  const [form, setForm] = useState({ salon:"", especialidad:"", servicio:"", promo:"", tono:"profesional y cálido" });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [error, setError] = useState("");
  const [uses, setUses] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [wspNum, setWspNum] = useState("");
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("gp_uses")||"0", 10);
    const pro = localStorage.getItem("gp_pro") === "true";
    setUses(saved); setIsPro(pro);
  }, []);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const usesLeft = Math.max(0, CONFIG.FREE_USES - uses);

  const generate = async () => {
    if (!form.salon || !form.especialidad || !form.servicio) { setError("Completa: nombre del salón, especialidad y servicio."); return; }
    if (!isPro && uses >= CONFIG.FREE_USES) { setShowPaywall(true); return; }
    setError(""); setLoading(true); setContent(null); setStreamText("");
    abortRef.current = new AbortController();
    try {
      setLoadingStep("✨ Generando posts con IA...");
      let postsRaw = "";
      setIsStreaming(true);
      await callClaudeStream(buildPostsPrompt(form), chunk => { postsRaw += chunk; setStreamText(postsRaw); }, abortRef.current.signal);
      setIsStreaming(false);
      const posts = parsePostsResponse(postsRaw);
      setLoadingStep("⭕ Creando stories...");
      const stories = parseStoriesResponse(await callClaude(buildStoriesPrompt(form)));
      setLoadingStep("💬 Generando respuestas WhatsApp...");
      const whatsapp = parseWhatsappResponse(await callClaude(buildWhatsappPrompt(form)));
      const type = detectType(form.servicio + " " + form.especialidad);
      const bio = `${pick(emojis[type])} ${form.especialidad} | ${form.salon}\n📍 Reservas por DM\n${form.promo ? "🎁 " + form.promo.slice(0,30) : "💎 Resultados que enamoran"}`.slice(0, 150);
      let calendar = null, canva = null;
      if (isPro) {
        setLoadingStep("📅 Construyendo calendario 30 días...");
        calendar = parseCalendarResponse(await callClaude(buildCalendarPrompt(form)));
        setLoadingStep("🎨 Generando prompts para Canva IA...");
        canva = parseCanvaResponse(await callClaude(buildCanvaPrompt(form)));
      }
      const newUses = isPro ? uses : uses + 1;
      if (!isPro) { localStorage.setItem("gp_uses", String(newUses)); setUses(newUses); }
      setContent({ posts, stories, whatsapp, bio, calendar, canva });
      setActiveTab("posts"); setStreamText("");
      if (!isPro && newUses >= CONFIG.FREE_USES) setTimeout(() => setShowPaywall(true), 12000);
    } catch (err) {
      if (err.name !== "AbortError") setError("Error al conectar con la IA. Por favor intenta de nuevo.");
    } finally {
      setLoading(false); setLoadingStep(""); setIsStreaming(false);
    }
  };

  const renderTab = () => {
    if (!content) return null;
    const tab = ALL_TABS.find(t => t.id === activeTab);
    if (tab?.pro && !isPro) return <ProLock />;
    if (activeTab === "posts") return content.posts.map((p, i) => (
      <div key={i} className="result-item" style={{animationDelay:`${i*0.06}s`}}>
        <div className="result-label"><div className="result-num-badge">{p.numero}</div>Post para Instagram<div className="ai-badge" style={{marginLeft:"auto"}}><div className="ai-dot"/>IA Real</div></div>
        <div className="result-text">{p.caption}</div><CopyBtn text={p.caption}/>
      </div>
    ));
    if (activeTab === "stories") return content.stories.map((s, i) => (
      <div key={i} className="result-item" style={{animationDelay:`${i*0.06}s`}}>
        <div className="result-label"><div className="result-num-badge">{i+1}</div>{s.tipo}</div>
        <div className="result-text">{s.texto}</div><CopyBtn text={s.texto}/>
      </div>
    ));
    if (activeTab === "whatsapp") return content.whatsapp.map((w, i) => (
      <div key={i} className="result-item" style={{animationDelay:`${i*0.06}s`}}>
        <div className="result-label"><div className="result-num-badge" style={{background:"linear-gradient(135deg,#25D366,#128C7E)"}}>?</div>{w.pregunta}</div>
        <div className="result-text">{w.respuesta}</div><CopyBtn text={w.respuesta}/>
      </div>
    ));
    if (activeTab === "bio") return (
      <div className="result-item">
        <div className="result-label"><div className="result-num-badge" style={{background:"linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)"}}>IG</div>Bio de Instagram</div>
        <div className="result-text" style={{fontSize:17}}>{content.bio}</div>
        <div style={{marginTop:8,fontSize:10,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase"}}>{content.bio?.length||0} / 150 caracteres</div>
        <CopyBtn text={content.bio}/>
      </div>
    );
    if (activeTab === "calendar") {
      if (!content.calendar) return (<div className="pro-lock"><div className="pro-lock-icon">📅</div><div className="pro-lock-title">Generando tu calendario...</div><p className="pro-lock-desc">El calendario se genera con IA real al activar Pro.</p></div>);
      return content.calendar.map((semana, si) => (
        <div key={si}>
          <div className="cal-semana-title">✦ {semana.semana}</div>
          {semana.dias.map((d, di) => (
            <div key={di} className="cal-dia">
              <div><div className="cal-dia-nombre">{TEMAS_DIA[di%7]?.emoji} {d.dia}</div><div className="cal-dia-tema">{d.tema}</div></div>
              <div className="cal-caption">{d.caption}</div>
              <CopyBtn text={d.caption}/>
            </div>
          ))}
        </div>
      ));
    }
    if (activeTab === "canva") return (
      <>
        <div style={{padding:"20px 28px 0",fontSize:12,color:"var(--muted)",lineHeight:1.6}}>💡 Copia cada prompt y pégalo en <strong style={{color:"var(--gold)"}}>Canva AI → Text to Image</strong> o en <strong style={{color:"var(--gold)"}}>Adobe Firefly</strong>.</div>
        {content.canva?.map((p, i) => (
          <div key={i} className="prompt-item">
            <div className="prompt-uso">{i+1}. {p.uso}</div>
            <div className="prompt-box">{p.prompt}</div>
            <div className="prompt-tip">💡 {p.tip}</div>
            <CopyBtn text={p.prompt}/>
          </div>
        ))}
      </>
    );
    if (activeTab === "share") {
      const msg = buildWhatsAppMsg(form, content.posts);
      return (
        <div className="wsp-delivery">
          <div className="wsp-delivery-title">📲 Entrega semanal por WhatsApp<div className="ai-badge"><div className="ai-dot"/>Pro</div></div>
          <p className="wsp-delivery-sub">Envía el contenido de la semana directo al WhatsApp de tu clienta cada lunes. Ella solo copia y pega en Instagram.</p>
          <div className="wsp-grid">
            {[{icon:"📲",title:"5 posts listos",desc:"Captions para toda la semana"},{icon:"🎨",title:"Prompts Canva",desc:"Imágenes IA incluidas"},{icon:"📅",title:"Calendario mes",desc:"30 días planificados"},{icon:"⏰",title:"Envío automático",desc:"Cada lunes en la mañana"}].map(c=>(
              <div key={c.title} className="wsp-card"><div className="wsp-card-icon">{c.icon}</div><div className="wsp-card-title">{c.title}</div><div className="wsp-card-desc">{c.desc}</div></div>
            ))}
          </div>
          <div className="wsp-form-row">
            <input className="wsp-input" placeholder="WhatsApp de tu clienta (+57 300 000 0000)" value={wspNum} onChange={e=>setWspNum(e.target.value)}/>
          </div>
          <a href={`https://wa.me/${wspNum.replace(/\D/g,"")}?text=${msg}`} target="_blank" rel="noopener noreferrer" className="btn-wsp">💬 ENVIAR CONTENIDO AHORA POR WHATSAPP</a>
          <div className="wsp-schedule"><strong>💡 Consejo Pro:</strong> Envía cada lunes antes de las 9am. <strong>Así funciona el modelo de suscripción mensual.</strong></div>
        </div>
      );
    }
  };

  return (
    <>
      <style>{css}</style>
      {showPaywall && <PaywallModal onClose={()=>setShowPaywall(false)}/>}
      <div className="app">
        <div className="bg-main"/>
        <div className="wrap">
          <div className="hero">
            <div className="badge"><div className="badge-dot"/>🇨🇴 Hecho para Colombia</div>
            <div className="hero-glow-text">GLAMPOST</div>
            <h2 className="hero-title">Vende más en Instagram<br/><span className="grad">con IA que entiende de belleza</span></h2>
            <p className="hero-sub">Posts, stories, calendario 30 días y prompts Canva generados con IA real — en segundos.</p>
            <div className="hero-ctas">
              <a href="#generador" className="btn-generate" style={{width:"auto",marginTop:0,textDecoration:"none",padding:"18px 32px"}}>✨ PROBAR GRATIS · {usesLeft} USOS</a>
              <a href={CONFIG.WOMPI_LINK} target="_blank" rel="noopener noreferrer" className="btn-hero-secondary">💎 PRO · ${CONFIG.PRICE_MENSUAL}/mes</a>
            </div>
            <div className="hero-proof">
              <div className="proof-item"><span className="proof-num">500+</span><span className="proof-label">Salones Colombia</span></div>
              <div className="proof-divider"/>
              <div className="proof-item"><span className="proof-num">30 días</span><span className="proof-label">Calendario IA</span></div>
              <div className="proof-divider"/>
              <div className="proof-item"><span className="proof-num">IA real</span><span className="proof-label">Claude integrado</span></div>
            </div>
          </div>

          <div className="feature-banner">
            <div className="feature-banner-icon">📲</div>
            <div className="feature-banner-content">
              <div className="feature-banner-title">Nuevo: Entrega automática por WhatsApp cada lunes</div>
              <div className="feature-banner-desc">En vez de que el cliente entre a la app, tú le mandas el contenido directo a su WhatsApp. Ellas solo copian y pegan. Modelo de suscripción mensual desde $29.900.</div>
            </div>
            <div className="feature-banner-badge">NUEVO</div>
          </div>

          <div className="benefits">
            {[{icon:"🤖",title:"IA Real integrada",desc:"Powered by Claude. Contenido auténtico y personalizado."},{icon:"📅",title:"Calendario 30 días",desc:"Un mes completo de contenido temático listo para programar."},{icon:"🎨",title:"Prompts Canva IA",desc:"Genera las fotos perfectas con IA. Sin fotógrafo."}].map(b=>(
              <div key={b.title} className="benefit-card"><div className="benefit-icon">{b.icon}</div><div className="benefit-title">{b.title}</div><div className="benefit-desc">{b.desc}</div></div>
            ))}
          </div>

          <div style={{marginBottom:60}}>
            <div className="section-label">Planes</div>
            <div className="section-title" style={{marginBottom:32}}>ELIGE TU PLAN</div>
            <div className="pricing-grid">
              <div className="price-card">
                <div className="price-badge clasico">Clásico</div>
                <div className="price-name">Acceso Pro</div>
                <div className="price-amount">${CONFIG.PRICE_UNICO}</div>
                <div className="price-period">COP · Pago único · De por vida</div>
                <ul className="price-features">
                  {["✅ Generaciones ilimitadas con IA","📅 Calendario 30 días","🎨 Prompts para Canva IA","💬 Soporte básico"].map(f=>(
                    <li key={f} className="price-feature"><span className="price-feature-icon">{f.slice(0,2)}</span>{f.slice(2)}</li>
                  ))}
                </ul>
                <a href={CONFIG.WOMPI_LINK} target="_blank" rel="noopener noreferrer" className="btn-generate" style={{marginTop:0,textDecoration:"none"}}>💳 Comprar acceso</a>
              </div>
              <div className="price-card featured">
                <div className="price-badge nuevo">⭐ Más popular</div>
                <div className="price-name">Pro + Entrega WhatsApp</div>
                <div className="price-amount">${CONFIG.PRICE_MENSUAL}</div>
                <div className="price-period">COP / mes · Cancela cuando quieras</div>
                <ul className="price-features">
                  {["✅ Todo lo del plan clásico","📲 Entrega automática cada lunes","💬 Soporte directo por WhatsApp","🔄 Contenido nuevo cada semana","💰 Modelo de suscripción a tus clientas"].map(f=>(
                    <li key={f} className="price-feature"><span className="price-feature-icon">{f.slice(0,2)}</span>{f.slice(2)}</li>
                  ))}
                </ul>
                <a href={CONFIG.WOMPI_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{textDecoration:"none"}}>🌟 Suscribirme ahora</a>
              </div>
            </div>
          </div>

          <div id="generador">
            <div className="section-label">Generador con IA Real</div>
            <div className="section-title">GLAMPOST</div>
            <div className="section-sub">Powered by Claude · Contenido personalizado · Listo para publicar</div>
            <div className="uses-counter">
              <div className="uses-dots">
                {isPro ? <span style={{fontSize:14}}>⭐</span> : Array.from({length:CONFIG.FREE_USES}).map((_,i)=><div key={i} className={`uses-dot${i<uses?" used":""}`}/>)}
              </div>
              <span className="uses-text">
                {isPro ? "Acceso Pro activo · Generaciones ilimitadas" : usesLeft > 0 ? `${usesLeft} uso${usesLeft!==1?"s":""} gratis restante${usesLeft!==1?"s":""}` : "Sin usos gratis · Activa Pro"}
              </span>
            </div>
            <div style={{textAlign:"center",marginBottom:16}}>
              {!isDemo ? (
                <button onClick={()=>{setIsDemo(true);setIsPro(true);}} style={{background:"transparent",border:"1px dashed rgba(255,255,255,0.15)",borderRadius:100,padding:"5px 16px",color:"rgba(255,255,255,0.25)",fontSize:10,fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer"}}>
                  🔓 Modo demo
                </button>
              ) : (
                <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"6px 16px",borderRadius:100,background:"rgba(109,219,133,0.1)",border:"1px solid rgba(109,219,133,0.3)"}}>
                  <span style={{fontSize:10,color:"#6ddb85",fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>✓ Demo activo — Pro simulado</span>
                  <button onClick={()=>{setIsDemo(false);setIsPro(false);}} style={{background:"transparent",border:"none",color:"rgba(109,219,133,0.6)",fontSize:12,cursor:"pointer",padding:0}}>✕</button>
                </div>
              )}
            </div>
            <div className="card">
              <div className="card-title">✦ Datos de tu salón</div>
              <div className="fields">
                <div><label>Nombre del salón *</label><input name="salon" value={form.salon} onChange={onChange} placeholder="Ej. Studio Noir"/></div>
                <div><label>Especialidad *</label><input name="especialidad" value={form.especialidad} onChange={onChange} placeholder="Ej. Colorimetría, Uñas"/></div>
                <div className="field-full"><label>Servicio estrella esta semana *</label><input name="servicio" value={form.servicio} onChange={onChange} placeholder="Ej. Balayage con keratina"/></div>
                <div><label>Promoción activa</label><input name="promo" value={form.promo} onChange={onChange} placeholder="Ej. 20% off primer servicio"/></div>
                <div>
                  <label>Tono de comunicación</label>
                  <select name="tono" value={form.tono} onChange={onChange}>
                    <option value="profesional y cálido">Profesional y cálido</option>
                    <option value="divertido y fresco">Divertido y fresco</option>
                    <option value="lujoso y exclusivo">Lujoso y exclusivo</option>
                    <option value="cercano y familiar">Cercano y familiar</option>
                    <option value="moderno y minimalista">Moderno y minimalista</option>
                  </select>
                </div>
              </div>
              {error && <div className="err-box">⚠ {error}</div>}
              <button className="btn-generate" onClick={generate} disabled={loading}>
                {loading && <span className="shimmer"/>}
                {loading ? "✨ Generando con IA..." : (!isPro && uses >= CONFIG.FREE_USES) ? "💎 Activa Pro para continuar" : "✨ GENERAR CON IA AHORA"}
              </button>
              {loading && loadingStep && <div className="info-box">{loadingStep}</div>}
            </div>

            {isStreaming && streamText && (
              <div className="results-card" style={{marginBottom:16}}>
                <div className="stream-section">
                  <div className="result-label"><div className="result-num-badge">✨</div>Generando posts con IA...<div className="ai-badge" style={{marginLeft:"auto"}}><div className="ai-dot"/>EN VIVO</div></div>
                  <div className="streaming-text">{streamText}<span className="streaming-cursor"/></div>
                </div>
              </div>
            )}

            {content && (
              <div className="tabs">
                {ALL_TABS.map(t=>(
                  <button key={t.id} className={`tab${t.pro?" pro-tab":""}${t.wsp?" wsp-tab":""}${activeTab===t.id?" active":""}`} onClick={()=>setActiveTab(t.id)}>
                    {t.label}{t.pro && !isPro ? " 🔒" : ""}
                  </button>
                ))}
              </div>
            )}

            <div className="results-card">
              {loading && !isStreaming ? (
                <div className="loading-state">
                  <div className="bars">{[1,2,3,4,5].map(i=><div key={i} className="bar"/>)}</div>
                  <div className="loading-text">IA trabajando en tu contenido…</div>
                  {loadingStep && <div className="loading-step">{loadingStep}</div>}
                </div>
              ) : content ? renderTab() : (
                <div className="loading-state" style={{padding:"56px 40px"}}>
                  <div style={{fontSize:44,marginBottom:16}}>💅✨</div>
                  <div style={{color:"var(--muted)",fontSize:14,lineHeight:1.7}}>Completa los datos de tu salón<br/>y genera contenido con IA real en segundos</div>
                </div>
              )}
            </div>
          </div>

          <div className="footer">
            <div className="footer-logo">GlamPost</div>
            <div className="footer-text">IA para salones que crecen · Colombia 🇨🇴 · 2026</div>
          </div>
        </div>
      </div>
    </>
  );
}
