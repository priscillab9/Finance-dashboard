export const CATEGORIES = {
  Food: { icon: '🍽️', color: '#F59E0B' },
  Transport: { icon: '🚗', color: '#3B82F6' },
  Shopping: { icon: '🛍️', color: '#EC4899' },
  Entertainment: { icon: '🎬', color: '#8B5CF6' },
  Health: { icon: '💊', color: '#10B981' },
  Utilities: { icon: '⚡', color: '#F97316' },
  Salary: { icon: '💼', color: '#22C55E' },
  Freelance: { icon: '💻', color: '#06B6D4' },
  Investment: { icon: '📈', color: '#A78BFA' },
  Education: { icon: '📚', color: '#FB923C' },
};

export const generateTransactions = () => {
  const now = new Date(2026, 3, 1); 
  const txns = [
    // January
    { id: 1, date: '2026-01-28', description: 'Grocery Store', category: 'Food', amount: -124.5, type: 'expense' },
    { id: 2, date: '2026-01-27', description: 'Monthly Salary', category: 'Salary', amount: 5800, type: 'income' },
    { id: 3, date: '2026-01-26', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, type: 'expense' },
    { id: 4, date: '2026-01-25', description: 'Uber Ride', category: 'Transport', amount: -22.40, type: 'expense' },
    { id: 5, date: '2026-01-24', description: 'Freelance Project', category: 'Freelance', amount: 1200, type: 'income' },
    { id: 6, date: '2026-01-23', description: 'Pharmacy', category: 'Health', amount: -45.00, type: 'expense' },
    { id: 7, date: '2026-01-22', description: 'Amazon Purchase', category: 'Shopping', amount: -89.99, type: 'expense' },
    { id: 8, date: '2026-01-21', description: 'Electric Bill', category: 'Utilities', amount: -110.00, type: 'expense' },
    { id: 9, date: '2026-01-20', description: 'Restaurant Dinner', category: 'Food', amount: -67.80, type: 'expense' },
    { id: 10, date: '2026-01-18', description: 'Stock Dividend', category: 'Investment', amount: 320.00, type: 'income' },
    { id: 11, date: '2026-01-17', description: 'Online Course', category: 'Education', amount: -199.00, type: 'expense' },
    { id: 12, date: '2026-01-15', description: 'Coffee Shop', category: 'Food', amount: -18.50, type: 'expense' },
    { id: 13, date: '2026-01-14', description: 'Gas Station', category: 'Transport', amount: -55.00, type: 'expense' },
    { id: 14, date: '2026-01-12', description: 'Clothing Store', category: 'Shopping', amount: -145.00, type: 'expense' },
    { id: 15, date: '2026-01-10', description: 'Gym Membership', category: 'Health', amount: -50.00, type: 'expense' },
    // February
    { id: 16, date: '2026-02-28', description: 'Monthly Salary', category: 'Salary', amount: 5800, type: 'income' },
    { id: 17, date: '2026-02-26', description: 'Grocery Store', category: 'Food', amount: -98.20, type: 'expense' },
    { id: 18, date: '2026-02-25', description: 'Movie Tickets', category: 'Entertainment', amount: -32.00, type: 'expense' },
    { id: 19, date: '2026-02-22', description: 'Freelance Project', category: 'Freelance', amount: 950, type: 'income' },
    { id: 20, date: '2026-02-20', description: 'Internet Bill', category: 'Utilities', amount: -79.00, type: 'expense' },
    { id: 21, date: '2026-02-18', description: 'Bus Pass', category: 'Transport', amount: -45.00, type: 'expense' },
    { id: 22, date: '2026-02-15', description: 'Doctor Visit', category: 'Health', amount: -120.00, type: 'expense' },
    { id: 23, date: '2026-02-12', description: 'Bookstore', category: 'Education', amount: -55.00, type: 'expense' },
    { id: 24, date: '2026-02-10', description: 'Amazon Purchase', category: 'Shopping', amount: -210.00, type: 'expense' },
    { id: 25, date: '2026-02-08', description: 'Stock Dividend', category: 'Investment', amount: 280.00, type: 'income' },
    { id: 26, date: '2026-02-05', description: 'Restaurant', category: 'Food', amount: -88.00, type: 'expense' },
    { id: 27, date: '2026-02-03', description: 'Spotify', category: 'Entertainment', amount: -9.99, type: 'expense' },
    // March
    { id: 28, date: '2026-03-31', description: 'Monthly Salary', category: 'Salary', amount: 5800, type: 'income' },
    { id: 29, date: '2026-03-27', description: 'Grocery Store', category: 'Food', amount: -135.00, type: 'expense' },
    { id: 30, date: '2026-03-25', description: 'Freelance Project', category: 'Freelance', amount: 1500, type: 'income' },
    { id: 31, date: '2026-03-22', description: 'Electric Bill', category: 'Utilities', amount: -105.00, type: 'expense' },
    { id: 32, date: '2026-03-20', description: 'Taxi', category: 'Transport', amount: -35.00, type: 'expense' },
    { id: 33, date: '2026-03-18', description: 'Concert Tickets', category: 'Entertainment', amount: -180.00, type: 'expense' },
    { id: 34, date: '2026-03-15', description: 'Online Course', category: 'Education', amount: -89.00, type: 'expense' },
    { id: 35, date: '2026-03-12', description: 'Pharmacy', category: 'Health', amount: -28.00, type: 'expense' },
    { id: 36, date: '2026-03-10', description: 'Clothing Store', category: 'Shopping', amount: -320.00, type: 'expense' },
    { id: 37, date: '2026-03-08', description: 'Stock Dividend', category: 'Investment', amount: 310.00, type: 'income' },
    { id: 38, date: '2026-03-05', description: 'Coffee & Lunch', category: 'Food', amount: -42.00, type: 'expense' },
  
    
  ];
  return txns;
};

export const transactions = generateTransactions();

export const getMonthlyData = (txns) => {
  const months = {};
  txns.forEach(t => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleString('default', { month: 'short', year: '2-digit' });
    if (!months[key]) months[key] = { key, label, income: 0, expenses: 0 };
    if (t.type === 'income') months[key].income += t.amount;
    else months[key].expenses += Math.abs(t.amount);
  });
  return Object.values(months).sort((a, b) => a.key.localeCompare(b.key));
};

export const getCategoryData = (txns) => {
  const cats = {};
  txns.filter(t => t.type === 'expense').forEach(t => {
    if (!cats[t.category]) cats[t.category] = 0;
    cats[t.category] += Math.abs(t.amount);
  });
  return Object.entries(cats)
    .map(([name, amount]) => ({ name, amount, ...CATEGORIES[name] }))
    .sort((a, b) => b.amount - a.amount);
};
