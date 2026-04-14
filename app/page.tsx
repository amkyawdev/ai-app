'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/ParticlesBackground';
import { Sparkles, ArrowRight, Zap, Brain, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Navbar placeholder - we render it in layout but position needs adjustment */}
      <div className="relative z-10">
        <nav className="flex md:hidden fixed top-4 left-4 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f2ff] to-[#8b5cf6] flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="font-['Outfit'] font-bold text-xl text-white">Amkyaw AI</span>
          </div>
        </nav>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#00f2ff]" />
            <span className="text-sm text-[#a1a1aa]">Powered by Groq & llama-4-scout-17b</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Experience the Future of{' '}
            <span className="gradient-text">AI Assistance</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10"
          >
            Amkyaw AI delivers lightning-fast responses with real-time token streaming. 
            Powered by cutting-edge LLM technology for an unparalleled chat experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/chat">
              <button className="group relative px-8 py-4 bg-[#00f2ff] text-black font-semibold rounded-xl transition-all hover:bg-[#00e0e6] animate-pulse-glow">
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <Link href="/docs">
              <button className="px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                View Documentation
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Zap,
              title: 'Real-Time Streaming',
              description: 'Experience instant responses with token-by-token streaming',
            },
            {
              icon: Brain,
              title: 'Smart Context',
              description: 'AI remembers your conversation for better assistance',
            },
            {
              icon: Shield,
              title: 'Secure & Private',
              description: 'Your conversations are encrypted and protected',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center hover:scale-105 transition-transform cursor-default"
            >
              <feature.icon className="w-10 h-10 mx-auto mb-4 text-[#00f2ff]" />
              <h3 className="font-['Outfit'] font-semibold text-lg text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#a1a1aa]">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}