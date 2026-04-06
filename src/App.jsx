import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import "./styles.css";

function AppInner() {
  const { state } = useApp();
  const { activeView, theme } = state;

  return (
    <div className={`app-root ${theme}`} data-theme={theme}>
      <Sidebar />
      <main className="main-content">
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "transactions" && <Transactions />}
        {activeView === "insights" && <Insights />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
