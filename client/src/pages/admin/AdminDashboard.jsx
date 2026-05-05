import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign, FiAlertTriangle } from 'react-icons/fi';
import API from '../../utils/axiosInstance';
import './Admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/stats').then(res => setStats(res.data))
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-page"><p>Loading dashboard...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-nav">
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/analytics">Analytics</Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ '--accent': '#a855f7' }}>
          <FiUsers className="stat-icon" />
          <div><p className="stat-value">{stats?.totalUsers || 0}</p><p className="stat-label">Total Users</p></div>
        </div>
        <div className="stat-card" style={{ '--accent': '#3b82f6' }}>
          <FiShoppingBag className="stat-icon" />
          <div><p className="stat-value">{stats?.totalOrders || 0}</p><p className="stat-label">Total Orders</p></div>
        </div>
        <div className="stat-card" style={{ '--accent': '#22c55e' }}>
          <FiDollarSign className="stat-icon" />
          <div><p className="stat-value">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p><p className="stat-label">Revenue</p></div>
        </div>
        <div className="stat-card" style={{ '--accent': '#ec4899' }}>
          <FiPackage className="stat-icon" />
          <div><p className="stat-value">{stats?.totalProducts || 0}</p><p className="stat-label">Products</p></div>
        </div>
      </div>

      {stats?.lowStock?.length > 0 && (
        <div className="low-stock-alert">
          <h3><FiAlertTriangle /> Low Stock Alert</h3>
          <div className="low-stock-list">
            {stats.lowStock.map(p => (
              <div key={p._id} className="low-stock-item">
                <span>{p.name}</span>
                <span className="stock-count">{p.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
