import { useState } from "react";

export default function DonutChart({ data }) {
  const [hovered, setHovered] = useState(null);
  if (!data || data.length === 0) return <div className="chart-empty">No data</div>;

  const total = data.reduce((s, d) => s + d.amount, 0);
  const R = 70, cx = 90, cy = 90, strokeW = 24;
  const circumference = 2 * Math.PI * R;

  let cumulative = 0;
  const slices = data.map((d, i) => {
    const pct = d.amount / total;
    const offset = circumference * (1 - cumulative - pct);
    const dashArray = `${circumference * pct} ${circumference * (1 - pct)}`;
    cumulative += pct;
    return { ...d, pct, dashArray, offset };
  });

  const active = hovered !== null ? slices[hovered] : null;

  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 180 180" width="180" height="180" className="donut-svg">
        {slices.map((s, i) => (
          <circle
            key={s.name}
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={hovered === i ? strokeW + 4 : strokeW}
            strokeDasharray={s.dashArray}
            strokeDashoffset={s.offset}
            strokeLinecap="round"
            style={{ transition: "all 0.2s ease", transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="donut-slice"
          >
            <title>{s.name}: ${s.amount.toFixed(0)} ({(s.pct * 100).toFixed(1)}%)</title>
          </circle>
        ))}
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.5">
          {active ? active.name : "Total"}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor">
          {active
            ? `$${active.amount.toFixed(0)}`
            : `$${total.toFixed(0)}`}
        </text>
        {active && (
          <text x={cx} y={cy + 28} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.5">
            {(active.pct * 100).toFixed(1)}%
          </text>
        )}
      </svg>

      <div className="donut-legend">
        {slices.map((s, i) => (
          <div
            key={s.name}
            className={`donut-legend-item ${hovered === i ? "active" : ""}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="legend-color" style={{ background: s.color }} />
            <span className="legend-name">{s.icon} {s.name}</span>
            <span className="legend-pct">{(s.pct * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
