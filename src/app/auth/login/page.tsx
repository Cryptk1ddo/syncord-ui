"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Lock, 
  User, 
  Eye,
  EyeOff,
  MessageSquare,
  Home
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would authenticate
    // For now, just redirect to chat
    router.push("/chat");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500">
      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Hero Image Section */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <Image
            src="/imgs/1715d590ceff7441d3228e14b77dc1c5.jpeg"
            alt="Syncord"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-900/40" />
          
          {/* Content on image */}
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <MessageSquare className="w-6 h-6 text-slate-800" />
              </div>
              <span className="text-2xl font-bold text-white">Syncord</span>
            </div>

            {/* Bottom content */}
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                Find Your Perfect Community
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Connecting with your community is now just a few clicks away — fast, easy, reliable.
              </p>
              
              {/* Pagination dots */}
              <div className="flex space-x-2 mt-8">
                <div className="w-12 h-1 bg-white rounded-full" />
                <div className="w-2 h-1 bg-white/40 rounded-full" />
                <div className="w-2 h-1 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
          <div className="w-full max-w-md">
            {/* Sign In button in top right (mobile) */}
            <div className="flex justify-end mb-8 lg:hidden">
              <Button
                variant="outline"
                className="rounded-full px-6"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </Button>
            </div>

            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-800 p-2 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-800">Syncord</span>
              </div>
            </div>

            {/* Sign In button in top right (desktop) */}
            <div className="hidden lg:flex justify-end mb-8">
              <Button
                variant="ghost"
                className="rounded-full px-8 bg-slate-900 text-white hover:bg-slate-800"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </Button>
            </div>

            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {isLogin ? "Welcome Back to Syncord!" : "Join Syncord Today!"}
              </h2>
              <p className="text-slate-600">
                {isLogin ? "Sign in your account" : "Create your account"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username (Register only) */}
              {!isLogin && (
                <div className="space-y-2 animate-slide-down">
                  <Label htmlFor="username" className="text-slate-700 font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                      className="h-12 pl-4 border-slate-300 text-slate-900 rounded-xl focus:border-slate-900 focus:ring-slate-900"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Your Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="info.madhu786@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 pl-4 border-slate-300 text-slate-900 rounded-xl focus:border-slate-900 focus:ring-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 pl-4 pr-12 border-slate-300 text-slate-900 rounded-xl focus:border-slate-900 focus:ring-slate-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div className="space-y-2 animate-slide-down">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="h-12 pl-4 border-slate-300 text-slate-900 rounded-xl focus:border-slate-900 focus:ring-slate-900"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <label htmlFor="remember" className="text-sm text-slate-700">
                      Remember Me
                    </label>
                  </div>
                  <Link
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-lg transition-all"
              >
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Instant Login</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-sm text-slate-600 text-center mt-8">
              {isLogin ? "Don't have any account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? "Register" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
