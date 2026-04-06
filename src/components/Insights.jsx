import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { getMonthlyData, getCategoryData, CATEGORIES } from "../data/mockData";

export default function Insights() {
  const { state } = useApp();
  const { transactions } = state;

  const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

  const insights = useMemo(() => {
    const monthly = getMonthlyData(transactions);
    const categories = getCategoryData(transactions);
    const currentMonth = monthly[monthly.length - 1];
    const prevMonth = monthly[monthly.length - 2];

    const topCat = categories[0];
    const totalExpenses = categories.reduce((s, c) => s + c.amount, 0);

    const avgMonthlyIncome = monthly.reduce((s, m) => s + m.income, 0) / (monthly.length || 1);
    const avgMonthlyExpense = monthly.reduce((s, m) => s + m.expenses, 0) / (monthly.length || 1);

    const expenseChange = prevMonth
      ? ((currentMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100
      : 0;
    const incomeChange = prevMonth
      ? ((currentMonth.income - prevMonth.income) / prevMonth.income) * 100
      : 0;

    const savingsRate = avgMonthlyIncome > 0
      ? ((avgMonthlyIncome - avgMonthlyExpense) / avgMonthlyIncome * 100).toFixed(1)
      : 0;

    const topCatPct = totalExpenses > 0 ? (topCat?.amount / totalExpenses * 100).toFixed(1) : 0;

    return { monthly, categories, currentMonth, prevMonth, topCat, totalExpenses, avgMonthlyIncome, avgMonthlyExpense, expenseChange, incomeChange, savingsRate, topCatPct };
  }, [transactions]);

  const { monthly, categories, currentMonth, prevMonth, topCat, expenseChange, incomeChange, savingsRate, topCatPct, avgMonthlyIncome, avgMonthlyExpense } = insights;

  const maxCatAmt = categories[0]?.amount || 1;

  return (
    <div className="page insights-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Insights</h1>
          <p className="page-subtitle">Smart observations from your financial data</p>
        </div>
      </header>

      <div className="insight-cards">
        <div className="card insight-card">
          <div className="insight-icon" style={{ color: "#C8A96E" }}>◈</div>
          <div className="insight-title">Savings Rate</div>
          <div className="insight-value" style={{ color: "#C8A96E" }}>{savingsRate}%</div>
          <div className="insight-desc">
            {savingsRate >= 20
              ? "Excellent! You're saving well above the recommended 20%."
              : savingsRate >= 10
              ? "Good start. Aim for 20% for long-term financial health."
              : "Consider reducing expenses to improve your savings rate."}
          </div>
        </div>

        <div className="card insight-card">
          <div className="insight-icon" style={{ color: topCat?.color }}>
            {topCat ? CATEGORIES[topCat.name]?.icon : "◎"}
          </div>
          <div className="insight-title">Biggest Spender</div>
          <div className="insight-value" style={{ color: topCat?.color }}>
            {topCat ? topCat.name : "—"}
          </div>
          <div className="insight-desc">
            {topCat
              ? `${fmt(topCat.amount)} spent · ${topCatPct}% of all expenses`
              : "No expense data available"}
          </div>
        </div>

        <div className="card insight-card">
          <div className="insight-icon" style={{ color: expenseChange > 0 ? "#E05C5C" : "#10B981" }}>
            {expenseChange > 0 ? "↑" : "↓"}
          </div>
          <div className="insight-title">Monthly Expense Change</div>
          <div className="insight-value" style={{ color: expenseChange > 0 ? "#E05C5C" : "#10B981" }}>
            {expenseChange > 0 ? "+" : ""}{expenseChange.toFixed(1)}%
          </div>
          <div className="insight-desc">
            {prevMonth
              ? `vs ${prevMonth.label}: ${fmt(prevMonth.expenses)} → ${fmt(currentMonth?.expenses)}`
              : "Insufficient data for comparison"}
          </div>
        </div>

        <div className="card insight-card">
          <div className="insight-icon" style={{ color: "#06B6D4" }}>⇄</div>
          <div className="insight-title">Monthly Average</div>
          <div className="insight-value" style={{ color: "#06B6D4" }}>{fmt(avgMonthlyIncome - avgMonthlyExpense)}</div>
          <div className="insight-desc">
            Avg income {fmt(avgMonthlyIncome)} · Avg spend {fmt(avgMonthlyExpense)}
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="card chart-card">
          <h2 className="chart-title">Category Breakdown</h2>
          <div className="cat-bars">
            {categories.map(cat => (
              <div key={cat.name} className="cat-bar-row">
                <div className="cat-bar-label">
                  <span>{cat.icon} {cat.name}</span>
                  <span className="cat-bar-amt">{fmt(cat.amount)}</span>
                </div>
                <div className="cat-bar-track">
                  <div
                    className="cat-bar-fill"
                    style={{
                      width: `${(cat.amount / maxCatAmt) * 100}%`,
                      background: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card chart-card">
          <h2 className="chart-title">Month-over-Month</h2>
          <div className="mom-table">
            <div className="mom-header">
              <span>Month</span>
              <span>Income</span>
              <span>Expenses</span>
              <span>Net</span>
            </div>
            {[...monthly].reverse().map(m => {
              const net = m.income - m.expenses;
              return (
                <div key={m.key} className="mom-row">
                  <span className="mom-month">{m.label}</span>
                  <span className="income">{fmt(m.income)}</span>
                  <span className="expense">{fmt(m.expenses)}</span>
                  <span className={net >= 0 ? "income" : "expense"}>{net >= 0 ? "+" : ""}{fmt(net)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card tip-card">
        <div className="tip-header">
          <span className="tip-icon">💡</span>
          <h2 className="chart-title">Financial Tips</h2>
        </div>
        <div className="tips-grid">
          {[
            { icon: "◈", tip: "The 50/30/20 rule: 50% needs, 30% wants, 20% savings", color: "#C8A96E" },
            { icon: "↑", tip: "Automate savings on payday to build wealth effortlessly", color: "#10B981" },
            { icon: "◎", tip: `Your top spending category is ${topCat?.name || "Food"}. Review it monthly`, color: topCat?.color || "#F59E0B" },
            { icon: "⇄", tip: "Track every expense for at least 3 months to identify patterns", color: "#3B82F6" },
          ].map((t, i) => (
            <div key={i} className="tip-item">
              <span className="tip-item-icon" style={{ color: t.color }}>{t.icon}</span>
              <p>{t.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
