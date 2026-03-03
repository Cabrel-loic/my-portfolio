import React, { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulsePhase: number;
  connectionStrength: number[];
}

const NeuralNetwork: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const NODE_COUNT = 12;
  const CONNECTION_DISTANCE = 180;
  const NODE_RADIUS = 3;

  useEffect(() => {
    // Set dimensions on mount
    if (svgRef.current) {
      const rect = svgRef.current.parentElement?.getBoundingClientRect();
      if (rect) {
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    }

    // Initialize nodes
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * 400 + 100,
      y: Math.random() * 400 + 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      pulsePhase: Math.random() * Math.PI * 2,
      connectionStrength: Array(NODE_COUNT).fill(0),
    }));
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const animate = () => {
      const nodes = nodesRef.current;
      const svg = svgRef.current;

      if (!dimensions.width || !dimensions.height) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Update node positions with subtle drift
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Soft boundaries
        if (node.x < 20) {
          node.x = 20;
          node.vx *= -0.5;
        }
        if (node.x > dimensions.width - 20) {
          node.x = dimensions.width - 20;
          node.vx *= -0.5;
        }
        if (node.y < 20) {
          node.y = 20;
          node.vy *= -0.5;
        }
        if (node.y > dimensions.height - 20) {
          node.y = dimensions.height - 20;
          node.vy *= -0.5;
        }

        // Random direction changes
        if (Math.random() < 0.01) {
          node.vx += (Math.random() - 0.5) * 0.2;
          node.vy += (Math.random() - 0.5) * 0.2;
        }

        // Limit velocity
        const speed = Math.sqrt(node.vx ** 2 + node.vy ** 2);
        if (speed > 1) {
          node.vx = (node.vx / speed) * 1;
          node.vy = (node.vy / speed) * 1;
        }

        node.pulsePhase += 0.02;
      });

      // Calculate connection strengths
      nodes.forEach((node, i) => {
        node.connectionStrength = nodes.map((other, j) => {
          if (i === j) return 0;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return Math.max(0, 1 - dist / CONNECTION_DISTANCE);
        });
      });

      // Clear and redraw
      const lines = svg?.querySelectorAll("line");
      const circles = svg?.querySelectorAll("circle");

      // Update lines
      let lineIndex = 0;
      nodes.forEach((node, i) => {
        node.connectionStrength.forEach((strength, j) => {
          if (strength > 0.1 && lineIndex < (lines?.length || 0)) {
            const line = lines?.[lineIndex] as SVGLineElement;
            if (line) {
              const other = nodes[j];
              line.setAttribute("x1", String(node.x));
              line.setAttribute("y1", String(node.y));
              line.setAttribute("x2", String(other.x));
              line.setAttribute("y2", String(other.y));
              line.setAttribute("stroke-opacity", String(strength * 0.3));
            }
            lineIndex++;
          }
        });
      });

      // Update circles with pulse animation
      circles?.forEach((circle, i) => {
        const node = nodes[i];
        if (node) {
          circle.setAttribute("cx", String(node.x));
          circle.setAttribute("cy", String(node.y));
          const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.3;
          circle.setAttribute("r", String((NODE_RADIUS * pulseScale) / 2));
          const pulseOpacity = 0.6 + Math.sin(node.pulsePhase) * 0.4;
          circle.setAttribute("fill-opacity", String(pulseOpacity));
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  // Create initial lines
  const lines: JSX.Element[] = [];
  let lineCount = 0;
  const maxLines = NODE_COUNT * 3;
  nodesRef.current.forEach((node, i) => {
    nodesRef.current.forEach((other, j) => {
      if (i < j && lineCount < maxLines) {
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DISTANCE) {
          lines.push(
            <line
              key={`line-${i}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={other.x}
              y2={other.y}
              stroke="rgba(0, 245, 255, 0.3)"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
          );
          lineCount++;
        }
      }
    });
  });

  const circles = nodesRef.current.map((node, i) => (
    <circle
      key={`node-${i}`}
      cx={node.x}
      cy={node.y}
      r={NODE_RADIUS / 2}
      fill="rgba(0, 245, 255, 0.8)"
      fillOpacity={0.6}
      filter="url(#glow)"
      className="neural-node"
    />
  ));

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.4 }}
    >
      <defs>
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {lines}
      {circles}
    </svg>
  );
};

export default NeuralNetwork;
