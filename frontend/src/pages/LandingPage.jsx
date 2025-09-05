import React from 'react';
import { ArrowRight, Shield, Zap, Users, DollarSign, Clock, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        // This would navigate to signup page
        console.log('Navigate to signup');
        navigate("/signup");

    };

    const handleSignIn = () => {
        // This would navigate to signin page
        console.log('Navigate to signin');
        navigate("/signin");
    };

    return (
        <div className="min-h-screen w-full bg-[#020617] relative">
            {/* Purple Radial Glow Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Navigation */}
                <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                    <div className="text-2xl font-bold text-white">
                        PayFlow
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSignIn}
                            className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={handleGetStarted}
                            className="hidden sm:inline px-6 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-all duration-300"
                        >
                            Get Started
                        </button>
                    </div>
                </nav>


                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center space-y-8">
                        <h1 className="text-6xl font-bold leading-tight text-white">
                            Send Money
                            <span className="block text-violet-400 mt-2">
                                Instantly & Securely
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            The fastest way to send money to friends, family, and businesses.
                            No fees, no delays, just instant transfers with bank-level security.
                        </p>
                        <div className="flex gap-6 justify-center pt-8">
                            <button
                                onClick={handleGetStarted}
                                className="px-8 py-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300 flex items-center gap-2 text-lg font-semibold shadow-lg hover:shadow-violet-500/25"
                            >
                                Start Sending <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-300 text-lg font-semibold">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mt-32">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                                <Zap className="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Instant Transfers</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Send money in seconds, not days. Our advanced infrastructure ensures your transfers are processed instantly, 24/7.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                                <Shield className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Bank-Level Security</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Your money and data are protected with enterprise-grade encryption and multi-layer security protocols.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-violet-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-500/30 transition-colors">
                                <Users className="w-8 h-8 text-violet-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Easy to Use</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Simple, intuitive interface that makes sending money as easy as sending a text message to anyone.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-violet-400">10M+</div>
                            <div className="text-gray-300">Active Users</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-green-400">$50B+</div>
                            <div className="text-gray-300">Transferred</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-yellow-400">99.9%</div>
                            <div className="text-gray-300">Uptime</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-blue-400">24/7</div>
                            <div className="text-gray-300">Support</div>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="mt-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">How PayFlow Works</h2>
                            <p className="text-xl text-gray-300">Simple steps to send money anywhere</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold text-white">Create Account</h3>
                                <p className="text-gray-300">Sign up with your basic information and verify your identity</p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold text-white">Choose Recipient</h3>
                                <p className="text-gray-300">Search and select who you want to send money to</p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold text-white">Send Instantly</h3>
                                <p className="text-gray-300">Enter amount and send money instantly with one click</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-32 text-center bg-white/5 backdrop-blur-sm rounded-3xl p-16 border border-white/10">
                        <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join millions of users who trust PayFlow for their money transfer needs
                        </p>
                        <button
                            onClick={handleGetStarted}
                            className="px-10 py-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all duration-300 flex items-center gap-2 text-lg font-semibold shadow-lg hover:shadow-slate-500/25 mx-auto"
                        >
                            Create Free Account <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-white/10 mt-32 bg-white/5 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <div className="text-2xl font-bold text-white">
                                    PayFlow
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Making money transfers simple, fast, and secure for everyone around the world.
                                </p>
                                <div className="flex space-x-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                        <span className="text-white text-sm">f</span>
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                        <span className="text-white text-sm">t</span>
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                        <span className="text-white text-sm">in</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-white text-lg">Product</h4>
                                <div className="space-y-3 text-gray-300">
                                    <div className="hover:text-white cursor-pointer transition-colors">Send Money</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Request Money</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Business Tools</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Mobile App</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-white text-lg">Company</h4>
                                <div className="space-y-3 text-gray-300">
                                    <div className="hover:text-white cursor-pointer transition-colors">About Us</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Careers</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Press</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Contact</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-white text-lg">Support</h4>
                                <div className="space-y-3 text-gray-300">
                                    <div className="hover:text-white cursor-pointer transition-colors">Help Center</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Security</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Privacy Policy</div>
                                    <div className="hover:text-white cursor-pointer transition-colors">Terms of Service</div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 PayFlow. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;