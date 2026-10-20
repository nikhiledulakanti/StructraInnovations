// How Radon Sentinel works, as a three-stage signal path: sense → decide → act.
export function SentinelDiagram() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-labelledby="diag-title diag-desc" style={{ width: "100%", maxWidth: 460, padding: 24 }}>
      <title id="diag-title">Radon Sentinel signal path</title>
      <desc id="diag-desc">
        The radon sensor feeds readings to an ESP32-S3 controller, which switches on HEPA filtration and sends an alert
        to your phone.
      </desc>
      <defs>
        <linearGradient id="flow" x1="0" x2="1">
          <stop offset="0" stopColor="#ffb547" />
          <stop offset="1" stopColor="#c5f25c" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="rgba(236,235,228,0.28)">
        <rect x="20" y="110" width="100" height="80" rx="12" />
        <rect x="160" y="100" width="100" height="100" rx="12" />
        <rect x="300" y="60" width="100" height="70" rx="12" />
        <rect x="300" y="170" width="100" height="70" rx="12" />
      </g>
      <g stroke="url(#flow)" strokeWidth="1.5" fill="none" strokeDasharray="4 6" className="diag-flow">
        <path d="M120 150 H160" />
        <path d="M260 135 C280 135 280 95 300 95" />
        <path d="M260 165 C280 165 280 205 300 205" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="11" fill="#a7aba3" textAnchor="middle" letterSpacing="1">
        <text x="70" y="146">RADON</text>
        <text x="70" y="162">SENSOR</text>
        <text x="210" y="146">ESP32-S3</text>
        <text x="210" y="162">CONTROL</text>
        <text x="350" y="92">HEPA</text>
        <text x="350" y="108">FILTER</text>
        <text x="350" y="202">PHONE</text>
        <text x="350" y="218">ALERT</text>
      </g>
      <g fill="#c5f25c">
        <circle cx="210" cy="122" r="4" />
      </g>
      <g fill="#ffb547">
        <circle cx="70" cy="128" r="3" />
      </g>
      <style>{`
        .diag-flow path { animation: diag 1.6s linear infinite; }
        @keyframes diag { to { stroke-dashoffset: -20; } }
        @media (prefers-reduced-motion: reduce) { .diag-flow path { animation: none; } }
      `}</style>
    </svg>
  );
}
