"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare,
  Users,
  Zap,
  Shield,
  Sparkles,
  Mic,
  Video,
  Share2,
  Globe,
  Lock,
  TrendingUp,
  Clock,
  Check,
  ArrowRight,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: "Real-time Messaging",
      description: "Lightning-fast messaging with instant delivery and read receipts"
    },
    {
      icon: Video,
      title: "Voice & Video Calls",
      description: "Crystal-clear HD voice and video calls with your community"
    },
    {
      icon: Users,
      title: "Community Servers",
      description: "Create unlimited servers and channels for your communities"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "End-to-end encryption and advanced security features"
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Built-in AI to help moderate, summarize, and enhance conversations"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share files, images, videos, and screen with ease"
    }
  ];

  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "50K+", label: "Communities" },
    { number: "99.9%", label: "Uptime" },
    { number: "100+", label: "Countries" }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Perfect for getting started",
      features: [
        "Unlimited messages",
        "10 server limit",
        "Voice calls",
        "Basic screen sharing",
        "Community support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "For power users and teams",
      features: [
        "Everything in Free",
        "Unlimited servers",
        "HD video calls",
        "Advanced screen sharing",
        "AI assistant access",
        "Custom emojis",
        "Priority support",
        "Analytics dashboard"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Custom integrations",
        "Advanced security",
        "SSO & SAML",
        "Custom branding",
        "SLA guarantee",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/90 backdrop-blur-lg border-b border-white/10" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <MessageSquare className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Syncord</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-white/60 hover:text-white transition-colors text-sm">
                Features
              </Link>
              <Link href="#pricing" className="text-white/60 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
              <Link href="#about" className="text-white/60 hover:text-white transition-colors text-sm">
                About
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button className="bg-white text-black hover:bg-white/90 rounded-lg px-6 text-sm font-medium">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 bg-black/95 rounded-lg p-4 border border-white/10">
              <Link
                href="#features"
                className="block text-white/60 hover:text-white transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="block text-white/60 hover:text-white transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#about"
                className="block text-white/60 hover:text-white transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white hover:bg-white/10 text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-white text-black hover:bg-white/90 rounded-lg text-sm font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Minimalist Black */}
      <section className="relative pt-32 pb-20 px-6 bg-black overflow-hidden min-h-screen flex items-center">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium mb-8 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 transition-all duration-300 group/badge cursor-pointer animate-float hover:scale-110">
              <Sparkles className="w-4 h-4 group-hover/badge:rotate-12 group-hover/badge:text-white transition-all duration-300" />
              <span className="group-hover/badge:text-white transition-colors duration-300">Now with AI Assistant</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 max-w-5xl animate-fade-in-up">
              Connect With Your{" "}
              <span className="bg-gradient-to-r from-white via-white/60 to-white/40 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Community
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed mb-12 max-w-3xl">
              The ultimate platform for communities. Chat, voice, video, and AI-powered features all in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/auth/login">
                <Button className="h-12 px-8 bg-white text-black hover:bg-white/90 hover:scale-105 text-base font-medium rounded-lg transition-all duration-300 group shadow-lg hover:shadow-xl">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Button variant="outline" className="h-12 px-8 text-base font-medium rounded-lg border-white/20 text-white hover:bg-white/5 hover:border-white/40 hover:scale-105 transition-all duration-300 group">
                <Video className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl pt-12 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer transition-all duration-300 hover:scale-110">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-white/80 transition-colors">{stat.number}</div>
                  <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              Powerful features designed to bring your community together
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-fr">
            {/* Large Hero Card - Real-time Messaging (Spans 2 rows) */}
            <div className="md:col-span-6 lg:col-span-6 md:row-span-2 bg-white border border-white/10 p-8 rounded-lg text-black shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30 cursor-pointer">
              {/* Subtle gradient glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 bg-gradient-to-br from-blue-500 to-cyan-500" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-black rounded-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-white">Live</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold mb-3">
                    Real-time Messaging
                  </h3>
                  <p className="text-black/60 text-lg mb-4">
                    Lightning-fast messaging with instant delivery, read receipts, and typing indicators
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-6 pt-4 border-t border-black/10">
                    <div>
                      <div className="text-2xl font-bold">10M+</div>
                      <div className="text-sm text-black/60">Messages/day</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">&lt;100ms</div>
                      <div className="text-sm text-black/60">Latency</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-sm text-black/60">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tall Card - Voice & Video */}
            <div className="md:col-span-3 lg:col-span-3 md:row-span-2 bg-white border border-white/10 p-6 rounded-lg text-black shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&q=80"
                  alt="Video Call"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Video className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">
                  HD Video Calls
                </h3>
                <p className="text-black/60 text-sm mb-4">
                  Crystal-clear voice and video with screen sharing
                </p>
                
                <div className="flex-1" />
                
                {/* Feature badges */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Check className="w-4 h-4 text-black/60" />
                    <span className="text-black/60">Up to 50 participants</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Check className="w-4 h-4 text-black/60" />
                    <span className="text-black/60">Screen sharing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Check className="w-4 h-4 text-black/60" />
                    <span className="text-black/60">Recording available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - Community Servers */}
            <div className="md:col-span-3 lg:col-span-3 bg-white border border-white/10 p-6 rounded-lg text-black shadow-lg hover:shadow-xl transition-all duration-500 group hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30 cursor-pointer">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Unlimited Servers
              </h3>
              <p className="text-black/60 text-sm">
                Create as many servers and channels as you need
              </p>
            </div>

            {/* Square Card - Analytics */}
            <div className="md:col-span-3 lg:col-span-3 bg-white border border-white/10 p-6 rounded-lg text-black shadow-lg hover:shadow-xl transition-all duration-500 group hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30 cursor-pointer">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-black/60 text-sm">
                Track engagement and growth with detailed insights
              </p>
            </div>

            {/* Wide Card - AI Assistant */}
            <div className="md:col-span-6 lg:col-span-9 bg-white border border-white/10 p-8 rounded-lg text-black shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30">
              {/* Background gradient glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-3xl font-bold">AI Assistant</h3>
                        <span className="px-3 py-1 bg-black text-white rounded-lg text-xs font-medium">
                          BETA
                        </span>
                      </div>
                      <p className="text-black/60">Powered by advanced language models</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-black/60 text-lg mb-6 max-w-2xl">
                  Smart AI that helps moderate conversations, summarize discussions, answer questions, and enhance community engagement
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/5 border border-black/10 rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">24/7</div>
                    <div className="text-sm text-black/60">Available</div>
                  </div>
                  <div className="bg-black/5 border border-black/10 rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">10+</div>
                    <div className="text-sm text-black/60">Languages</div>
                  </div>
                  <div className="bg-black/5 border border-black/10 rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">Smart</div>
                    <div className="text-sm text-black/60">Moderation</div>
                  </div>
                  <div className="bg-black/5 border border-black/10 rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">Instant</div>
                    <div className="text-sm text-black/60">Responses</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Card - Privacy */}
            <div className="md:col-span-3 lg:col-span-3 bg-white border border-white/10 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 group hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30 cursor-pointer">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                End-to-End Encryption
              </h3>
              <p className="text-black/60 text-sm">
                Your conversations stay private and secure
              </p>
            </div>

            {/* Medium Wide Card - File Sharing */}
            <div className="md:col-span-6 lg:col-span-6 bg-white border border-white/10 p-6 rounded-lg text-black shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1618044733300-9472054094ee?w=600&q=80"
                  alt="File Sharing"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Easy File Sharing
                  </h3>
                  <p className="text-black/60 mb-4">
                    Share files, images, videos up to 500MB instantly
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span>Images</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span>Videos</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span>Documents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Square Card - Cross Platform */}
            <div className="md:col-span-3 lg:col-span-3 bg-white border border-white/10 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 group hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30 cursor-pointer">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                Cross-Platform
              </h3>
              <p className="text-black/60 text-sm mb-3">
                Works on all your devices seamlessly
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-black/5 rounded text-black/60">Web</span>
                <span className="text-xs px-2 py-1 bg-black/5 rounded text-black/60">iOS</span>
                <span className="text-xs px-2 py-1 bg-black/5 rounded text-black/60">Android</span>
              </div>
            </div>

            {/* Small Card - Fast Performance */}
            <div className="md:col-span-3 lg:col-span-3 bg-white border border-white/10 p-6 rounded-lg text-black shadow-lg hover:shadow-xl transition-all duration-500 group hover:scale-[1.02] hover:-translate-y-1 hover:border-white/30 cursor-pointer">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Lightning Fast
              </h3>
              <p className="text-black/60 text-sm">
                Built for speed with modern technology
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Section - Enhanced */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose Syncord?
              </h2>
              <p className="text-lg text-white/40 mb-8">
                Built for communities, teams, and friends who want more than just messaging.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white border border-white/10 p-6 rounded-lg hover:border-white/20 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-black mb-2">Lightning Fast</h4>
                  <p className="text-black/60 text-sm">
                    Built with modern technology for instant real-time communication
                  </p>
                </div>

                <div className="bg-white border border-white/10 p-6 rounded-lg hover:border-white/20 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-black mb-2">Secure & Private</h4>
                  <p className="text-black/60 text-sm">
                    End-to-end encryption and advanced security features protect your data
                  </p>
                </div>

                <div className="bg-white border border-white/10 p-6 rounded-lg hover:border-white/20 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-black mb-2">AI-Powered</h4>
                  <p className="text-black/60 text-sm">
                    Smart features that enhance your conversations and community management
                  </p>
                </div>

                <div className="bg-white border border-white/10 p-6 rounded-lg hover:border-white/20 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-black mb-2">Always Growing</h4>
                  <p className="text-black/60 text-sm">
                    Regular updates with new features based on community feedback
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 group/image">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Why Syncord - Team Collaboration"
                  fill
                  className="object-cover transition-transform duration-500 group-hover/image:scale-105"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-white/10">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-black" />
                  <span className="text-sm font-medium text-black">99.9% Uptime</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-white/10">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-black" />
                  <span className="text-sm font-medium text-black">10M+ Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Enhanced */}
      <section id="pricing" className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              Choose the plan that's right for your community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg p-8 transition-all duration-500 group ${
                  plan.popular
                    ? "ring-2 ring-white shadow-2xl relative scale-105 md:scale-110 hover:scale-110 md:hover:scale-[1.15]"
                    : "border border-white/10 hover:border-white/20 hover:shadow-xl hover:scale-105"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-lg text-sm font-medium shadow-lg animate-pulse-glow">
                    Most Popular
                  </div>
                )}

                <div className={`mb-6 ${plan.popular ? 'mt-2' : ''}`}>
                  <h3 className="text-2xl font-bold text-black mb-2 group-hover:scale-105 transition-transform duration-300">
                    {plan.name}
                  </h3>
                  <p className="text-black/60">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-black group-hover:scale-110 transition-transform duration-300 inline-block">
                      {plan.price}
                    </span>
                    <span className="text-black/60 ml-2">{plan.period}</span>
                  </div>
                </div>

                <Link href="/auth/login">
                  <Button
                    className={`w-full h-12 rounded-lg mb-8 transition-all duration-300 group/btn ${
                      plan.popular
                        ? "bg-black hover:bg-black/90 text-white shadow-lg hover:shadow-xl hover:scale-105"
                        : "bg-black hover:bg-black/90 text-white hover:scale-105"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start space-x-3 group/feature hover:translate-x-1 transition-transform duration-200">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                        plan.popular ? 'bg-black group-hover/feature:scale-110' : 'bg-black/5 group-hover/feature:bg-black/10 group-hover/feature:scale-110'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular ? 'text-white' : 'text-black'
                        }`} />
                      </div>
                      <span className="text-black/60 text-sm group-hover/feature:text-black transition-colors duration-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-lg p-12 md:p-16 shadow-2xl overflow-hidden border border-white/10 group/cta hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500">
            {/* Animated shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-1000">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-black/5 border border-black/10 text-black/60 text-sm font-medium mb-6 hover:bg-black/10 hover:scale-105 transition-all duration-300 cursor-pointer group/badge2">
                <Sparkles className="w-4 h-4 group-hover/badge2:rotate-12 transition-transform duration-300" />
                <span>Start your journey today</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 group-hover/cta:scale-105 transition-transform duration-500">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-black/60 mb-8 max-w-2xl mx-auto">
                Join millions of users and communities already using Syncord
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/login">
                  <Button className="h-14 px-8 bg-black hover:bg-black/90 text-white text-lg rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group/btn2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn2:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="h-14 px-8 text-lg rounded-lg border-black/20 text-black hover:bg-black/5 hover:border-black/40 hover:scale-110 transition-all duration-300 group/btn3"
                >
                  <Users className="w-5 h-5 mr-2 group-hover/btn3:scale-110 transition-transform duration-300" />
                  Schedule Demo
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-black/10">
                <div className="flex items-center space-x-2 text-black/60 hover:text-black transition-colors duration-200 cursor-pointer group/trust">
                  <Check className="w-5 h-5 text-black group-hover/trust:scale-125 transition-transform duration-300" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center space-x-2 text-black/60 hover:text-black transition-colors duration-200 cursor-pointer group/trust">
                  <Check className="w-5 h-5 text-black group-hover/trust:scale-125 transition-transform duration-300" />
                  <span className="text-sm">Free forever plan</span>
                </div>
                <div className="flex items-center space-x-2 text-black/60 hover:text-black transition-colors duration-200 cursor-pointer group/trust">
                  <Check className="w-5 h-5 text-black group-hover/trust:scale-125 transition-transform duration-300" />
                  <span className="text-sm">Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold">Syncord</span>
              </div>
              <p className="text-white/40">
                Connect with your community like never before.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-white/40">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Download</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Updates</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-white/40">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-white/40">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm">
              © 2025 Syncord. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-white/40 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
