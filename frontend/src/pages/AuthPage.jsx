import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, User, Lock, Mail, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // ✅ for redirection

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (authMode === 'signup') {
      if (!formData.firstName || !formData.lastName) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint = authMode === 'signin' ? '/api/v1/user/signin' : '/api/v1/user/signup';
      const payload = authMode === 'signin' 
        ? { username: formData.username, password: formData.password }
        : {
            username: formData.username,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName
          };

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        if (authMode === 'signin') {
          // ✅ Store token and redirect
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        } else {
          console.log('Account created successfully');
          setAuthMode('signin');
          setFormData({ username: '', password: '', firstName: '', lastName: '', confirmPassword: '' });
        }
      } else {
        setError(data.msg || data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  const handleBackToHome = () => {
    navigate('/'); // ✅ go back to landing page
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Cyan Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 200px, rgba(6,182,212,0.4), transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Auth Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {authMode === 'signin' ? (
                  <User className="w-8 h-8 text-white" />
                ) : (
                  <UserPlus className="w-8 h-8 text-white" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-slate-400">
                {authMode === 'signin' 
                  ? 'Sign in to your PayFlow account' 
                  : 'Join thousands of users sending money instantly'}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* First Name & Last Name (Signup only) */}
              {authMode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:bg-white/10 transition-all"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:bg-white/10 transition-all"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:bg-white/10 transition-all"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full pl-12 pr-12 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:bg-white/10 transition-all"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {authMode === 'signup' && (
                  <p className="text-xs text-slate-500 mt-1">
                    Must contain uppercase, lowercase, number, and special character
                  </p>
                )}
              </div>

              {/* Confirm Password (Signup only) */}
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:bg-white/10 transition-all"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-slate-500/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  authMode === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </button>

              {/* Forgot Password (Sign In only) */}
              {authMode === 'signin' && (
                <div className="text-center">
                  <button className="text-slate-400 hover:text-white text-sm transition-colors">
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>

            {/* Toggle Auth Mode */}
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-slate-400 mb-4">
                {authMode === 'signin' 
                  ? "Don't have an account?" 
                  : "Already have an account?"}
              </p>
              <button
                onClick={() => {
                  setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                  setError('');
                  setFormData({ username: '', password: '', firstName: '', lastName: '', confirmPassword: '' });
                }}
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                {authMode === 'signin' ? 'Create Account' : 'Sign In'}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              By continuing, you agree to our{' '}
              <span className="text-slate-300 hover:text-white cursor-pointer">Terms of Service</span>
              {' '}and{' '}
              <span className="text-slate-300 hover:text-white cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
