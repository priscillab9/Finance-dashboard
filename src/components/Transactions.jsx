import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { CATEGORIES } from "../data/mockData";

const CATS = ["All", ...Object.keys(CATEGORIES)];
const TYPES = ["All", "income", "expense"];
const MONTHS = [
  "All", "2026-03", "2026-02", "2026-01"
];
const MONTH_LABELS = { "All": "All Time", "2026-03": "Mar 2026", "2026-02": "Feb 2026", "2026-01": "Jan 2026" };

const EMPTY_FORM = { description: "", category: "Food", amount: "", type: "expense", date: new Date().toISOString().slice(0,10) };

export default function Transactions() {
  const { state, dispatch } = useApp();
  const { transactions, filters, sortBy, role } = state;
  const [showModal, setShowModal] = useState(false);
  const [editTxn, setEditTxn] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (filters.category !== "All") list = list.filter(t => t.category === filters.category);
    if (filters.type !== "All") list = list.filter(t => t.type === filters.type);
    if (filters.month !== "All") list = list.filter(t => t.date.startsWith(filters.month));

    list.sort((a, b) => {
      let va = a[sortBy.field], vb = b[sortBy.field];
      if (sortBy.field === "amount") { va = Math.abs(a.amount); vb = Math.abs(b.amount); }
      if (va < vb) return sortBy.dir === "asc" ? -1 : 1;
      if (va > vb) return sortBy.dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [transactions, filters, sortBy]);

  const setFilter = (k, v) => dispatch({ type: "SET_FILTER", payload: { [k]: v } });
  const setSort = (field) => {
    const dir = sortBy.field === field && sortBy.dir === "asc" ? "desc" : "asc";
    dispatch({ type: "SET_SORT", payload: { field, dir } });
  };

  const openAdd = () => { setEditTxn(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = (t) => { setEditTxn(t); setForm({ ...t, amount: String(Math.abs(t.amount)) }); setShowModal(true); };

  const handleSave = () => {
    if (!form.description || !form.amount || !form.date) return;
    const payload = {
      ...form,
      amount: form.type === "expense" ? -Math.abs(parseFloat(form.amount)) : Math.abs(parseFloat(form.amount)),
      id: editTxn ? editTxn.id : Date.now(),
    };
    if (editTxn) dispatch({ type: "EDIT_TRANSACTION", payload });
    else dispatch({ type: "ADD_TRANSACTION", payload });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const exportCSV = () => {
    const rows = [["Date","Description","Category","Type","Amount"],...filtered.map(t=>[t.date,t.description,t.category,t.type,t.amount])];
    const csv = rows.map(r=>r.join(",")).join("\n");
    const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8,"+encodeURIComponent(csv);
    a.download = "transactions.csv"; a.click();
  };

  const SortIcon = ({ field }) => {
    if (sortBy.field !== field) return <span className="sort-icon">⇅</span>;
    return <span className="sort-icon active">{sortBy.dir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="page txn-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">{filtered.length} of {transactions.length} records</p>
        </div>
        <div className="header-actions">
          <button className="btn btn--ghost" onClick={exportCSV}>⬇ Export CSV</button>
          {role === "admin" && (
            <button className="btn btn--primary" onClick={openAdd}>+ Add Transaction</button>
          )}
        </div>
      </header>

      <div className="card filters-bar">
        <input
          className="filter-input"
          placeholder="Search transactions…"
          value={filters.search}
          onChange={e => setFilter("search", e.target.value)}
        />
        <select className="filter-select" value={filters.category} onChange={e => setFilter("category", e.target.value)}>
          {CATS.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={filters.type} onChange={e => setFilter("type", e.target.value)}>
          {TYPES.map(t => <option key={t} value={t}>{t === "All" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
        <select className="filter-select" value={filters.month} onChange={e => setFilter("month", e.target.value)}>
          {MONTHS.map(m => <option key={m} value={m}>{MONTH_LABELS[m]}</option>)}
        </select>
      </div>

      <div className="card txn-table-card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <p>No transactions match your filters</p>
          </div>
        ) : (
          <table className="txn-table">
            <thead>
              <tr>
                <th onClick={() => setSort("date")} className="sortable">Date <SortIcon field="date" /></th>
                <th>Description</th>
                <th onClick={() => setSort("category")} className="sortable">Category <SortIcon field="category" /></th>
                <th>Type</th>
                <th onClick={() => setSort("amount")} className="sortable">Amount <SortIcon field="amount" /></th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="txn-row">
                  <td className="txn-date">{t.date}</td>
                  <td className="txn-desc">{t.description}</td>
                  <td>
                    <span className="cat-badge">
                      {CATEGORIES[t.category]?.icon} {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge type-badge--${t.type}`}>
                      {t.type === "income" ? "↑" : "↓"} {t.type}
                    </span>
                  </td>
                  <td className={`txn-amount ${t.type}`}>
                    {t.type === "income" ? "+" : ""}{fmt(t.type === "income" ? t.amount : -t.amount)}
                  </td>
                  {role === "admin" && (
                    <td className="txn-actions">
                      <button className="action-btn" onClick={() => openEdit(t)}>✎</button>
                      <button className="action-btn action-btn--delete" onClick={() => handleDelete(t.id)}>✕</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editTxn ? "Edit Transaction" : "New Transaction"}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Description</label>
                <input className="form-input" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="e.g. Grocery Store" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount ($)</label>
                  <input className="form-input" type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select className="form-input" value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-input" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                    {Object.keys(CATEGORIES).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input className="form-input" type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn--primary" onClick={handleSave}>
                {editTxn ? "Save Changes" : "Add Transaction"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
