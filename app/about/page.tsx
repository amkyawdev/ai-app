'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Brain, Zap, Shield, Globe, Cpu, Sparkles } from 'lucide-react';

const teamMembers = [
  {
    name: 'Advanced AI Model',
    role: 'Powered by Groq',
    description: 'Using llama-4-scout-17b for lightning-fast responses',
    icon: Brain,
  },
  {
    name: 'Real-Time Streaming',
    role: 'Token-by-Token',
    description: 'Experience instant responses as they generate',
    icon: Zap,
  },
  {
    name: 'Secure & Private',
    role: 'Your Data Matters',
    description: 'Conversations stay on your device',
    icon: Shield,
  },
  {
    name: 'Global Scale',
    role: 'Worldwide Access',
    description: 'Available in multiple languages',
    icon: Globe,
  },
];

const visionPoints = [
  {
    title: 'Innovation',
    description: 'Pushing the boundaries of what AI can do',
    icon: Sparkles,
  },
  {
    title: 'Performance',
    description: 'Lightning-fast responses that keep you in flow',
    icon: Zap,
  },
  {
    title: 'Intelligence',
    description: 'Smart context that understands your needs',
    icon: Cpu,
  },
  {
    title: 'Trust',
    description: 'Building AI that respects your privacy',
    icon: Shield,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">Amkyaw AI</span>
          </h1>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            We're building the next generation of AI assistants—fast, intelligent, and designed to enhance your workflow.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-16 text-center"
        >
          <h2 className="font-['Outfit'] text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-[#a1a1aa] text-lg max-w-3xl mx-auto">
            To democratize AI assistance by providing a lightning-fast, context-aware chatbot that anyone can use. 
            We believe AI should be accessible, private, and empowering.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-['Outfit'] text-2xl font-bold text-white mb-8 text-center">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 text-center cursor-default"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00f2ff]/20 to-[#8b5cf6]/20 flex items-center justify-center mx-auto mb-4">
                  <member.icon className="w-7 h-7 text-[#00f2ff]" />
                </div>
                <h3 className="font-['Outfit'] font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-[#00f2ff] mb-2">{member.role}</p>
                <p className="text-sm text-[#a1a1aa]">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-['Outfit'] text-2xl font-bold text-white mb-8 text-center">
            Our Vision
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 cursor-default"
              >
                <point.icon className="w-8 h-8 text-[#8b5cf6] mb-4" />
                <h3 className="font-['Outfit'] font-semibold text-lg text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-[#a1a1aa]">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass-card p-8"
        >
          <h2 className="font-['Outfit'] text-2xl font-bold text-white mb-6 text-center">
            Built With Modern Tech
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Next.js 14',
              'TypeScript',
              'Tailwind CSS',
              'Framer Motion',
              'Groq SDK',
              'Three.js',
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/5 rounded-full text-sm text-[#a1a1aa] border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-[#a1a1aa] mb-4">Ready to experience the future?</p>
          <a
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00f2ff] text-black font-semibold rounded-xl hover:bg-[#00e0e6] transition-all glow-cyan"
          >
            Start Chatting
            <Brain size={20} />
          </a>
        </motion.div>
      </main>
    </div>
  );
}