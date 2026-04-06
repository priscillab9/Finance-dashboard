import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { getMonthlyData, getCategoryData, CATEGORIES } from "../data/mockData";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";
import SparkLine from "./charts/SparkLine";

export default function Dashboard() {
  const { state } = useApp();
  const { transactions } = state;

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0);
    const balance = income - expenses;
    const savingsRate = income > 0 ? ((income - expenses) / income * 100).toFixed(1) : 0;
    return { income, expenses, balance, savingsRate };
  }, [transactions]);

  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categories = useMemo(() => getCategoryData(transactions), [transactions]);

  const recentTxns = useMemo(() =>
    [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
    [transactions]
  );

  const balanceTrend = useMemo(() => {
    let running = 0;
    return [...transactions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(t => {
        running += t.type === "income" ? t.amount : -Math.abs(t.amount);
        return running;
      });
  }, [transactions]);

  const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

  return (
    <div className="page dashboard-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Financial Overview</h1>
          <p className="page-subtitle">March 2026 · All accounts</p>
        </div>
      </header>

      <div className="summary-cards">
        <div className="card card--balance">
          <div className="card-label">Net Balance</div>
          <div className="card-value card-value--xl">{fmt(stats.balance)}</div>
          <SparkLine data={balanceTrend} color="#C8A96E" />
          <div className="card-meta">Savings rate: <strong>{stats.savingsRate}%</strong></div>
        </div>
        <div className="card card--income">
          <div className="card-icon">↑</div>
          <div className="card-label">Total Income</div>
          <div className="card-value card-value--income">{fmt(stats.income)}</div>
          <div className="card-meta">{transactions.filter(t => t.type === "income").length} transactions</div>
        </div>
        <div className="card card--expense">
          <div className="card-icon">↓</div>
          <div className="card-label">Total Expenses</div>
          <div className="card-value card-value--expense">{fmt(stats.expenses)}</div>
          <div className="card-meta">{transactions.filter(t => t.type === "expense").length} transactions</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="card chart-card chart-card--bar">
          <div className="chart-header">
            <h2 className="chart-title">Monthly Cash Flow</h2>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-dot" style={{background:"#C8A96E"}} />Income</span>
              <span className="legend-item"><span className="legend-dot" style={{background:"#E05C5C"}} />Expenses</span>
            </div>
          </div>
          <BarChart data={monthly} />
        </div>

        <div className="card chart-card chart-card--donut">
          <div className="chart-header">
            <h2 className="chart-title">Spending by Category</h2>
          </div>
          <DonutChart data={categories.slice(0, 6)} />
        </div>
      </div>

      <div className="card recent-card">
        <div className="section-header">
          <h2 className="chart-title">Recent Transactions</h2>
        </div>
        <div className="txn-mini-list">
          {recentTxns.length === 0 ? (
            <div className="empty-state">No transactions yet</div>
          ) : recentTxns.map(t => (
            <div key={t.id} className="txn-mini-row">
              <span className="txn-mini-icon">{CATEGORIES[t.category]?.icon}</span>
              <div className="txn-mini-info">
                <span className="txn-mini-desc">{t.description}</span>
                <span className="txn-mini-cat">{t.category} · {t.date}</span>
              </div>
              <span className={`txn-mini-amt ${t.type}`}>
                {t.type === "income" ? "+" : ""}{fmt(t.type === "income" ? t.amount : -t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
