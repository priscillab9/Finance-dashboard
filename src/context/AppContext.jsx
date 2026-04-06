import { createContext, useContext, useReducer, useEffect } from "react";
import { transactions as initialTxns } from "../data/mockData";

const AppContext = createContext(null);

const initialState = {
  transactions: JSON.parse(localStorage.getItem("fin_txns") || "null") || initialTxns,
  role: localStorage.getItem("fin_role") || "viewer",
  filters: { search: "", category: "All", type: "All", month: "All" },
  sortBy: { field: "date", dir: "desc" },
  theme: localStorage.getItem("fin_theme") || "dark",
  activeView: "dashboard",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE": {
      localStorage.setItem("fin_role", action.payload);
      return { ...state, role: action.payload };
    }
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_VIEW":
      return { ...state, activeView: action.payload };
    case "TOGGLE_THEME": {
      const t = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("fin_theme", t);
      return { ...state, theme: t };
    }
    case "ADD_TRANSACTION": {
      const updated = [action.payload, ...state.transactions];
      localStorage.setItem("fin_txns", JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case "EDIT_TRANSACTION": {
      const updated = state.transactions.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
      localStorage.setItem("fin_txns", JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case "DELETE_TRANSACTION": {
      const updated = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem("fin_txns", JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
