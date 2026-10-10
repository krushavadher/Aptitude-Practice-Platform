import React, { useState, useEffect, useMemo } from 'react';
import { Users, Search, MoreHorizontal } from 'lucide-react';
import api from '../../api/axios';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/States';

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Students', 'Admins'

  useEffect(() => {
    fetchUsers();
    
    // Close dropdown on click outside
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data.data || []);
      setIsSuperAdmin(response.data.isSuperAdmin || false);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setIsUpdating(true);
      await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to update role');
    } finally {
      setIsUpdating(false);
      setActiveDropdown(null);
    }
  };

  const studentsCount = users.filter(u => u.role === 'student').length;
  const adminsCount = users.filter(u => u.role === 'admin').length;

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === 'All' || 
                            (filter === 'Students' && user.role === 'student') || 
                            (filter === 'Admins' && user.role === 'admin');
      return matchesSearch && matchesFilter;
    });
  }, [users, searchQuery, filter]);

  if (isLoading) return <div className="flex-1 flex justify-center p-12"><Loader size={48} /></div>;
  if (error) return <ErrorState message={error} className="mt-12" />;

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-5 lg:p-6 space-y-6 pb-20">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-[52px] h-[52px] rounded-[14px] bg-[#14724F] text-white flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-[28px] font-extrabold text-[#10241E] mb-1 tracking-tight">Manage Users</h1>
            <p className="text-[#5B6F67] text-[14px]">View and manage registered users. {isSuperAdmin && <span className="font-bold text-[#14724F]">(Super Admin)</span>}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md border border-white/50 rounded-[16px] px-6 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.04)] min-w-[90px]">
            <span className="text-[10px] font-bold text-[#5B6F67] uppercase tracking-wider mb-1">Total</span>
            <span className="text-[22px] leading-none font-black text-[#10241E]">{users.length}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md border border-white/50 rounded-[16px] px-6 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.04)] min-w-[90px]">
            <span className="text-[10px] font-bold text-[#5B6F67] uppercase tracking-wider mb-1">Students</span>
            <span className="text-[22px] leading-none font-black text-[#10241E]">{studentsCount}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#10241E]/90 to-[#10241E]/70 backdrop-blur-md border border-white/10 rounded-[16px] px-6 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_rgba(16,36,30,0.15)] min-w-[90px]">
            <span className="text-[10px] font-bold text-[#8A9A93] uppercase tracking-wider mb-1">Admins</span>
            <span className="text-[22px] leading-none font-black text-white">{adminsCount}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md border border-white/50 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* Search & Filters */}
        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9A93]" strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Search by name or email" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/30 backdrop-blur-sm border border-white/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-[#10241E] placeholder:text-[#8A9A93] text-[14px] font-medium rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#14724F]/40 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Students', 'Admins'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14724F] ${
                  filter === f 
                    ? 'bg-[#10241E] text-white border border-[#10241E]' 
                    : 'bg-transparent text-[#5B6F67] border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse relative">
            <thead>
              <tr className="bg-white/40 backdrop-blur-sm border-y border-white/40 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#5B6F67] uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#5B6F67] uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#5B6F67] uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#5B6F67] uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isAdmin = user.role === 'admin';
                return (
                  <tr key={user._id} className="border-b border-white/30 hover:bg-white/40 transition-colors last:border-b-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black shrink-0 ${isAdmin ? 'bg-[#10241E] text-white' : 'bg-[#E5F5ED] text-[#14724F]'}`}>
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div className="text-[14px] font-extrabold text-[#10241E] mb-0.5">{user.name}</div>
                          <div className="text-[12px] text-[#5B6F67]">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide capitalize ${isAdmin ? 'bg-[#10241E] text-white' : 'bg-[#E5F5ED] text-[#14724F]'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-white' : 'bg-[#14724F]'}`}></span>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[13px] font-medium text-[#5B6F67]">
                        {new Date(user.createdAt).toLocaleDateString('en-US')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      {isSuperAdmin && (
                        <>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(activeDropdown === user._id ? null : user._id);
                            }}
                            className="text-[#8A9A93] hover:text-[#10241E] transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          
                          {activeDropdown === user._id && (
                            <div 
                              className="absolute right-8 top-12 z-10 w-48 bg-white/80 backdrop-blur-xl rounded-[16px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="p-1">
                                {isAdmin ? (
                                  <button
                                    disabled={isUpdating}
                                    onClick={() => handleRoleChange(user._id, 'student')}
                                    className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 rounded-[8px] transition-colors"
                                  >
                                    Demote to Student
                                  </button>
                                ) : (
                                  <button
                                    disabled={isUpdating}
                                    onClick={() => handleRoleChange(user._id, 'admin')}
                                    className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-[#14724F] hover:bg-[#E5F5ED] rounded-[8px] transition-colors"
                                  >
                                    Promote to Admin
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-[#5B6F67] text-[14px]">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
