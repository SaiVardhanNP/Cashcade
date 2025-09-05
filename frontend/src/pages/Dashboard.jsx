import React, { useState, useEffect } from 'react';
import { Search, Send, LogOut, User, Wallet, Users, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // ✅ now null initially
  const [error, setError] = useState('');

  const navigate=useNavigate();

  const token = localStorage.getItem("token");

  // Fetch logged-in user info
  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/info", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data); // ✅ store full user object
      } else {
        console.error("Failed to fetch user info");
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  // Fetch user balance
  const fetchBalance = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/account/balance', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      }
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  };

  // Fetch users with search
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/bulk?filter=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserInfo();
    fetchBalance();
  }, []);

  // Refetch users on search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSendMoney = (user) => {
    console.log('Navigate to send money page for user:', user);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    console.log('Sign out and redirect to landing');
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Cyan Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(6,182,212,0.4), transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="text-2xl font-bold text-white">
                PayFlow
              </div>

              {/* User Info & Actions */}
              <div className="flex items-center gap-6">
                {/* Balance */}
                <div className="hidden sm:flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs text-slate-400">Balance</div>
                    <div className="text-lg font-bold text-emerald-400">
                      ${balance.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <Bell className="w-5 h-5" />
                </button>

                {/* Settings */}
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <Settings className="w-5 h-5" />
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">
                    {userInfo ? `${userInfo.firstName.charAt(0)}${userInfo.lastName.charAt(0)}` : "?"}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-white">
                      {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : "Loading..."}
                    </div>
                    <div className="text-xs text-slate-400">Welcome back</div>
                  </div>
                </div>

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Balance Card (Mobile) */}
          <div className="sm:hidden mb-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-sm mb-1">Total Balance</div>
                  <div className="text-3xl font-bold text-emerald-400">
                    ${balance.toFixed(2)}
                  </div>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Send Money</h1>
            <p className="text-slate-400">Choose a recipient to send money to</p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search users by name..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:bg-white/10 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Users Grid */}
          <div className="space-y-6">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-slate-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Searching users...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={() => { setError(''); fetchUsers(); }}
                  className="mt-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Users List */}
            {!loading && !error && (
              <>
                {users.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {users.map((user, index) => (
                      <div key={`${user.username}-${index}`} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-white">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-slate-400">
                                @{user.username}
                              </div>
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <User className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleSendMoney(user)}
                          className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-slate-500/25"
                        >
                          <Send className="w-4 h-4" />
                          Send Money
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {searchTerm ? 'No users found' : 'No users available'}
                    </h3>
                    <p className="text-slate-400 mb-6">
                      {searchTerm 
                        ? `No users match "${searchTerm}". Try a different search term.`
                        : 'There are no users available to send money to at the moment.'
                      }
                    </p>
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Stats */}
          {!loading && !error && users.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-white mb-1">{users.length}</div>
                  <div className="text-sm text-slate-400">Available Users</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">${balance.toFixed(0)}</div>
                  <div className="text-sm text-slate-400">Your Balance</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
                  <div className="text-sm text-slate-400">Today's Transfers</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-amber-400 mb-1">$0</div>
                  <div className="text-sm text-slate-400">Total Sent</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
