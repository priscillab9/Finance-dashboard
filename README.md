# Finio — Finance Dashboard

A clean, interactive finance dashboard built with React. Track balances, explore transactions, and understand spending patterns through beautiful visualizations.



---

## Quick Start

```bash
npm install
npm run dev       # development server → http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

**Requirements:** Node.js 18+

---

## Features

### Dashboard Overview
- **Summary cards** — Net Balance (with sparkline trend), Total Income, Total Expenses + savings rate
- **Bar chart** — Monthly cash flow comparing income vs expenses across 4 months
- **Donut chart** — Interactive spending breakdown by category (hover to highlight)
- **Recent transactions** — Quick-glance list of the 5 most recent entries

### Transactions
- Full table with date, description, category badge, type badge, and amount
- **Search** — fuzzy-match on description or category
- **Filter by** category, type (income/expense), and month
- **Sort by** date, category, or amount (click column headers)
- **CSV export** of the current filtered view

### Insights
- **4 KPI cards** — Savings rate, biggest spending category, month-over-month expense change, monthly average net
- **Category bar chart** — horizontal bars showing proportional spend per category
- **Month-over-month table** — income, expenses, and net for each month
- **Financial tips** — contextual advice based on your data

### Role-Based UI
Switch roles using the toggle in the sidebar:

| Feature | Viewer | Admin |
|---------|--------|-------|
| View dashboard | ✓ | ✓ |
| Browse transactions | ✓ | ✓ |
| Add transaction | ✗ | ✓ |
| Edit transaction | ✗ | ✓ |
| Delete transaction | ✗ | ✓ |
| Export CSV | ✓ | ✓ |

---

## Technical Approach

### State Management
Uses React's built-in `useReducer` + Context API via `AppContext`. State shape:

```js
{
  transactions: [...],   // all transaction records
  role: "viewer",        // "viewer" | "admin"
  filters: {             // applied to transaction list
    search, category, type, month
  },
  sortBy: { field, dir },
  theme: "dark",         // "dark" | "light"
  activeView: "dashboard"
}
```

All state mutations go through typed `dispatch` actions — no direct state mutation. Transactions, role, and theme are persisted to `localStorage` between sessions.

### Component Architecture
```
src/
├── context/
│   └── AppContext.jsx      # Global state (useReducer + Context)
├── data/
│   └── mockData.js         # 48 mock transactions, category config, data helpers
├── components/
│   ├── Sidebar.jsx          # Navigation + role switcher + theme toggle
│   ├── Dashboard.jsx        # Overview page
│   ├── Transactions.jsx     # Table + filters + modal
│   ├── Insights.jsx         # Analytics + tips
│   └── charts/
│       ├── BarChart.jsx     # SVG grouped bar chart
│       ├── DonutChart.jsx   # SVG interactive donut
│       └── SparkLine.jsx    # SVG mini trend line
├── App.jsx
├── main.jsx
└── styles.css               # ~650 lines, CSS variables for theming
```

### Design System
- **Fonts:** Playfair Display (headings/numbers) + DM Sans (body) + DM Mono (amounts/dates)
- **Theme:** Dark-first with full light mode via CSS custom properties
- **Colors:** Deep navy background, gold (#C8A96E) accent, semantic green/red for income/expense
- **Motion:** Page fade-in, modal slide-up, bar/fill transitions via CSS

### Charts
All charts are hand-built SVG — no chart library dependency. This keeps the bundle small and gives full visual control.


## Data
38 mock transactions across Jan–Mar 2026 covering 10 categories: Food, Transport, Shopping, Entertainment, Health, Utilities, Salary, Freelance, Investment, Education.
