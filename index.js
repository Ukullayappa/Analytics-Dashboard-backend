import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to get stats (Mocked if DB fails or is empty)
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // Try to get from DB if table exists, otherwise return mock
    // For now, let's just return high-quality mock data for the dashboard
    const stats = [
      { id: 1, label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up', color: '#4f46e5' },
      { id: 2, label: 'Active Users', value: '2,350', change: '+180.1%', trend: 'up', color: '#10b981' },
      { id: 3, label: 'Sales', value: '+12,234', change: '+19%', trend: 'up', color: '#f59e0b' },
      { id: 4, label: 'Active Now', value: '573', change: '+201', trend: 'up', color: '#ef4444' },
    ];
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chart data
app.get('/api/dashboard/chart-data', (req, res) => {
  const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
    { name: 'Aug', value: 4000 },
    { name: 'Sep', value: 3000 },
    { name: 'Oct', value: 2000 },
    { name: 'Nov', value: 2780 },
    { name: 'Dec', value: 3890 },
  ];
  res.json(data);
});

// Recent activity
app.get('/api/dashboard/recent-activity', (req, res) => {
  const activity = [
    { id: 1, user: 'John Doe', action: 'Purchased Pro Plan', time: '2 minutes ago', amount: '$99.00' },
    { id: 2, user: 'Sarah Smith', action: 'Signed up', time: '1 hour ago', amount: null },
    { id: 3, user: 'Robert Johnson', action: 'Refunded Order #1234', time: '3 hours ago', amount: '-$45.00' },
    { id: 4, user: 'Emily Davis', action: 'Purchased Enterprise', time: '5 hours ago', amount: '$599.00' },
    { id: 5, user: 'Michael Brown', action: 'Updated profile', time: '1 day ago', amount: null },
  ];
  res.json(activity);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
