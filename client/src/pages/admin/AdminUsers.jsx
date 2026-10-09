import React, { useState, useEffect } from 'react';
import { GlassCard } from '../../components/common/GlassCard';
import { Users, Mail, Calendar, Shield, Award } from 'lucide-react';
import { Loader } from '../../components/common/Loader';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // assuming token is stored in localStorage
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
      setUsers(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader fullScreen />;
  
  if (error) {
    return (
      <div className="p-8">
        <GlassCard className="border-error/20 bg-error/5">
          <p className="text-error-text text-center">{error}</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <Users className="w-8 h-8 text-accent" />
            Manage Users
          </h1>
          <p className="text-secondary mt-2">View and manage registered users.</p>
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="p-4 font-semibold text-primary">User</th>
                <th className="p-4 font-semibold text-primary">Role</th>
                <th className="p-4 font-semibold text-primary">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-glass-border/50 hover:bg-glass/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-primary">{user.name}</div>
                    <div className="text-sm text-secondary flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-accent/20 text-accent' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-secondary flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-secondary">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
