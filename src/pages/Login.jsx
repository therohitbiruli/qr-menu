import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase";


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

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M3 12h18" />
        <path d="M3 18h18" />
    </svg>
);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, setUpRecaptcha } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [loginMethod, setLoginMethod] = useState('email');
    const [countryCode, setCountryCode] = useState('+91');
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState("");

    const getOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (number === "" || number === undefined) return toast.error("Please enter a valid phone number!");
        try {
            setLoading(true);
            const fullNumber = `${countryCode}${number}`;
            const response = await setUpRecaptcha(fullNumber);
            setConfirmObj(response);
            setFlag(true);
            toast.success("OTP sent successfully!");
        } catch (err) {
            toast.error(err.message);
        }
        setLoading(false);
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        if (otp === "" || otp === null) return;
        try {
            setLoading(true);
            await confirmObj.confirm(otp);
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        }
        setLoading(false);
    };


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            await login(email, password);
            toast.success('Logged in successfully!');
            navigate("/");
        } catch (error) {
            toast.error("Failed to log in: " + error.message);
        }
        setLoading(false);
    }

    const sendEmailOtp = async () => {
        if (!email) {
          toast.error("Please enter your email");
          return;
        }
      
        const actionCodeSettings = {
          url: "http://localhost:3000/finishSignIn",
          handleCodeInApp: true,
        };
      
        try {
          setLoading(true);
          await sendSignInLinkToEmail(auth, email, actionCodeSettings);
          localStorage.setItem("emailForSignIn", email);
          toast.success("OTP link sent to your email");
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <div className="min-h-screen animated-gradient-bg particles-bg flex items-center justify-center p-4">
            <Toaster position="bottom-center" />

            <div className="glass-card w-full max-w-md p-8 fade-in">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="mb-4">
                        <img src="/qr-menu-logo-final.png" alt="QR Menu Logo" className="w-32 h-32 mx-auto object-contain" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">QR Menu</span>
                    </h1>
                    <p className="text-gray-500">Sign in to manage your restaurant</p>
                </div>

                {/* Form */}
                {/* Login Method Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                    <button
                        type="button"
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${loginMethod === 'email' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setLoginMethod('email')}
                    >
                        Email
                    </button>
                    <button
                        type="button"
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${loginMethod === 'phone' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setLoginMethod('phone')}
                    >
                        Phone
                    </button>
                </div>

                {loginMethod === 'email' ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <button
  type="button"
  onClick={sendEmailOtp}
  disabled={loading}
  className="btn-premium mt-3 bg-gradient-to-r from-indigo-500 to-purple-500"
>
  {loading ? "Sending OTP…" : "Sign in with Email OTP"}
</button>

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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-premium"
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                            📱
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Phone Login</h3>
                        <p className="text-gray-500 mb-6">
                            Sign in with your mobile number to access your restaurant dashboard.
                        </p>

                        {/* Phone Auth Form */}
                        <form onSubmit={verifyOtp} style={{ display: !flag ? "block" : "none" }}>
                            <div className="input-group mb-4 flex">
                                <div className="relative mr-2">
                                    <select
                                        className="input-premium w-24 appearance-none pl-3 pr-8"
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                    >
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+91">+91</option>
                                        <option value="+61">+61</option>
                                        <option value="+81">+81</option>
                                        <option value="+86">+86</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                                <div className="flex-1 relative">
                                    <span className="input-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </span>
                                    <input
                                        type="tel"
                                        className="input-premium"
                                        placeholder=" "
                                        id="phone"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                    <label htmlFor="phone" className="input-label">Phone Number</label>
                                </div>
                            </div>
                            <div id="recaptcha-container"></div>
                            <button
                                type="button"
                                onClick={getOtp}
                                className="btn-premium mt-4"
                                disabled={loading}
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </form>

                        <form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
                            <div className="input-group mb-4">
                                <span className="input-icon">
                                    <LockIcon />
                                </span>
                                <input
                                    type="text"
                                    className="input-premium"
                                    placeholder=" "
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <label htmlFor="otp" className="input-label">Enter OTP</label>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setFlag(false)}
                                    className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-premium"
                                    disabled={loading}
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">New to QR Menu?</span>
                    </div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                    <Link
                        to="/register"
                        className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                    >
                        Create a new account
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
