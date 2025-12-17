import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// Icon components
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M3 12h18" />
        <path d="M3 18h18" />
    </svg>
);

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const passwordsMatch = password && confirmPassword && password === confirmPassword;
    const passwordsDontMatch = password && confirmPassword && password !== confirmPassword;

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setLoading(true);
            await signup(email, password);
            toast.success('Account created successfully!');
            navigate("/");
        } catch (error) {
            toast.error("Failed to create account: " + error.message);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen animated-gradient-bg particles-bg flex items-center justify-center p-4">
            <Toaster position="bottom-center" />

            <div className="glass-card w-full max-w-md p-8 fade-in">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-white mb-4 shadow-lg">
                        <MenuIcon />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
                        Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">QR Menu</span>
                    </h1>
                    <p className="text-gray-500">Create your restaurant account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="input-group">
                        <span className="input-icon">
                            <MailIcon />
                        </span>
                        <input
                            type="email"
                            required
                            className="input-premium"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                        />
                        <label htmlFor="email" className="input-label">Email address</label>
                    </div>

                    {/* Password Input */}
                    <div className="input-group">
                        <span className="input-icon">
                            <LockIcon />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="input-premium pr-12"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                        />
                        <label htmlFor="password" className="input-label">Password</label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="input-group">
                        <span className="input-icon">
                            <LockIcon />
                        </span>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            className={`input-premium pr-12 ${passwordsMatch ? 'border-green-400 focus:border-green-500' : ''} ${passwordsDontMatch ? 'border-red-400 focus:border-red-500' : ''}`}
                            placeholder=" "
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirmPassword"
                        />
                        <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>

                        {/* Password match indicator */}
                        {(passwordsMatch || passwordsDontMatch) && (
                            <span className={`absolute right-10 top-1/2 -translate-y-1/2 ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                                {passwordsMatch ? <CheckIcon /> : <XIcon />}
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>

                    {/* Password match message */}
                    {passwordsDontMatch && (
                        <p className="text-red-500 text-sm -mt-2 animate-pulse">
                            Passwords do not match
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-premium"
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                    </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                    >
                        Sign in instead
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Footer branding */}
            <div className="absolute bottom-4 text-center text-white/70 text-sm">
                Powered by <span className="font-semibold text-white">Quintex Digital Solutions</span>
            </div>
        </div>
    );
}
