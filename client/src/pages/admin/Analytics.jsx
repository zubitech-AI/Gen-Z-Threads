import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../../utils/axiosInstance';
import './Admin.css';

export default function Analytics() {
  const [sales, setSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);

  useEffect(() => {
    API.get('/admin/analytics/sales').then(res => setSales(res.data)).catch(() => {});
    API.get('/admin/analytics/products').then(res => setTopProducts(res.data)).catch(() => {});
    API.get('/admin/analytics/users').then(res => setUserGrowth(res.data)).catch(() => {});
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Analytics</h1>
        <div className="admin-nav"><Link to="/admin">Dashboard</Link></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ marginBottom: 16, color: 'var(--text-color)' }}>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={sales.map(s => ({ month: s._id, revenue: s.revenue }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--bg-color)', border: '1px solid var(--card-border)', borderRadius: 8, color: 'var(--text-color)' }} />
              <Bar dataKey="revenue" fill="var(--accent-primary)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ marginBottom: 16, color: 'var(--text-color)' }}>User Registrations</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={userGrowth.map(u => ({ month: u._id, users: u.count }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--bg-color)', border: '1px solid var(--card-border)', borderRadius: 8, color: 'var(--text-color)' }} />
              <Line type="monotone" dataKey="users" stroke="var(--accent-secondary)" strokeWidth={3} dot={{ fill: 'var(--accent-secondary)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 16, padding: 24 }}>
        <h3 style={{ marginBottom: 16, color: 'var(--text-color)' }}>Top 5 Selling Products</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={topProducts.map(p => ({ name: p.product?.name || 'N/A', sold: p.totalSold }))} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
            <XAxis type="number" stroke="var(--text-muted)" fontSize={12} />
            <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={12} width={120} />
            <Tooltip contentStyle={{ background: 'var(--bg-color)', border: '1px solid var(--card-border)', borderRadius: 8, color: 'var(--text-color)' }} />
            <Bar dataKey="sold" fill="#22c55e" radius={[0,6,6,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
