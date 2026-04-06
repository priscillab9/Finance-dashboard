export default function BarChart({ data }) {
  if (!data || data.length === 0) return <div className="chart-empty">No data</div>;

  const maxVal = Math.max(...data.flatMap(d => [d.income, d.expenses]), 1);
  const H = 160;
  const BAR_W = 16;
  const GAP = 6;
  const GROUP_W = BAR_W * 2 + GAP + 16;
  const W = data.length * GROUP_W + 40;

  return (
    <div className="bar-chart-wrap">
      <svg viewBox={`0 0 ${W} ${H + 40}`} preserveAspectRatio="xMidYMid meet" className="bar-chart-svg">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(frac => (
          <line
            key={frac}
            x1={0} x2={W}
            y1={H * (1 - frac)} y2={H * (1 - frac)}
            stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"
          />
        ))}

        {data.map((d, i) => {
          const x = i * GROUP_W + 20;
          const incH = (d.income / maxVal) * H;
          const expH = (d.expenses / maxVal) * H;

          return (
            <g key={d.key}>
              {/* Income bar */}
              <rect
                x={x} y={H - incH} width={BAR_W} height={incH}
                fill="#C8A96E" rx="3" opacity="0.9"
                className="bar-rect"
              >
                <title>{d.label} Income: ${d.income.toFixed(0)}</title>
              </rect>
              {/* Expense bar */}
              <rect
                x={x + BAR_W + GAP} y={H - expH} width={BAR_W} height={expH}
                fill="#E05C5C" rx="3" opacity="0.85"
                className="bar-rect"
              >
                <title>{d.label} Expenses: ${d.expenses.toFixed(0)}</title>
              </rect>
              {/* Label */}
              <text
                x={x + BAR_W + GAP / 2} y={H + 20}
                textAnchor="middle" fontSize="10"
                fill="currentColor" opacity="0.5"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
