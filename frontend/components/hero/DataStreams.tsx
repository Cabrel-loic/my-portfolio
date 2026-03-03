import React from "react";

const DataStreams: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{
        height: "100%",
        overflow: "visible",
        filter: "drop-shadow(0 0 2px rgba(0, 245, 255, 0.3))",
      }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 600"
    >
      <defs>
        <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 245, 255, 0)" />
          <stop offset="50%" stopColor="rgba(0, 245, 255, 0.4)" />
          <stop offset="100%" stopColor="rgba(0, 245, 255, 0)" />
        </linearGradient>

        <linearGradient id="streamGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 245, 255, 0)" />
          <stop offset="50%" stopColor="rgba(0, 245, 255, 0.3)" />
          <stop offset="100%" stopColor="rgba(0, 245, 255, 0)" />
        </linearGradient>

        <style>{`
          @keyframes stream-flow-1 {
            0% {
              stroke-dashoffset: 1000;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes stream-flow-2 {
            0% {
              stroke-dashoffset: 800;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes stream-flow-3 {
            0% {
              stroke-dashoffset: 600;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes particle-rise {
            0% {
              transform: translateY(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-600px);
              opacity: 0;
            }
          }

          .stream {
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
          }

          .stream-1 {
            animation: stream-flow-1 8s linear infinite;
          }

          .stream-2 {
            animation: stream-flow-2 10s linear infinite;
          }

          .stream-3 {
            animation: stream-flow-3 12s linear infinite;
          }

          .particle {
            animation: particle-rise var(--duration) ease-out infinite;
          }
        `}</style>

        <circle id="dataParticle" r="2" fill="rgba(0, 245, 255, 0.6)" />
      </defs>

      {/* Horizontal curved streams - bottom */}
      <path
        className="stream stream-1"
        d="M0,500 Q300,480 600,490 T1200,500"
        stroke="url(#streamGradient)"
        strokeWidth="2"
        strokeDasharray="1000"
      />

      <path
        className="stream stream-2"
        d="M0,520 Q300,510 600,520 T1200,520"
        stroke="url(#streamGradient)"
        strokeWidth="1.5"
        strokeDasharray="800"
        opacity="0.6"
      />

      <path
        className="stream stream-3"
        d="M0,540 Q300,530 600,540 T1200,540"
        stroke="url(#streamGradient)"
        strokeWidth="1"
        strokeDasharray="600"
        opacity="0.4"
      />

      {/* Vertical rising particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`column-${i}`}>
          {Array.from({ length: 3 }).map((_, j) => (
            <use
              key={`particle-${i}-${j}`}
              href="#dataParticle"
              x={150 + i * 150}
              y={580}
              style={
                {
                  "--duration": `${4 + j * 2}s`,
                  animation: `particle-rise ${4 + j * 2}s ease-out infinite`,
                  animationDelay: `${j * 1.5}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </g>
      ))}

      {/* Glow effect layer */}
      <defs>
        <filter id="softGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      <path
        d="M0,500 Q300,480 600,490 T1200,500"
        stroke="rgba(0, 245, 255, 0.15)"
        strokeWidth="8"
        fill="none"
        filter="url(#softGlow)"
        opacity="0.5"
      />
    </svg>
  );
};

export default DataStreams;
