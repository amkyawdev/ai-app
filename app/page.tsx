import Link from 'next/link';
import { ButtonLink } from '@/components/ui/button-link';
import { ParticleField } from '@/components/particle-field';
import { Zap, MessageSquare, Shield, Code, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Live token streaming powered by Groq for instant responses.',
  },
  {
    icon: MessageSquare,
    title: 'Smart Chat',
    description: 'Context-aware conversations with memory management.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data stays protected with enterprise-grade security.',
  },
  {
    icon: Code,
    title: 'Developer Ready',
    description: 'Full Markdown and syntax highlighting support.',
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <ParticleField />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,242,255,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="badge mb-8">
            <Zap className="h-4 w-4" />
            <span>Powered by Groq + Llama 4 Scout</span>
          </div>

          {/* Hero Title */}
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white" style={{ lineHeight: 1.2 }}>
            Build faster with <span className="gradient-text">Amkyaw AI</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 text-lg text-[#a1a1aa] max-w-2xl leading-relaxed">
            A next-generation AI assistant with ultra-fast token streaming, 
            glassmorphism design, and seamless conversation experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/chat" className="btn-primary glow-accent hover:glow-accent-hover">
              Get Started
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/docs" className="btn-secondary">
              View Documentation
            </Link>
          </div>

          {/* Hero Card with Glassmorphism */}
          <div className="glass-strong p-8 sm:p-12 mb-16 text-left">
            <h2 className="text-2xl font-semibold text-white mb-6">Why it feels fast</h2>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-5 w-5 text-[#00f2ff]" />
                  <h3 className="font-medium text-white">Live token streaming</h3>
                </div>
                <p className="text-sm text-[#a1a1aa]">Immediate</p>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="h-5 w-5 text-[#00f2ff]" />
                  <h3 className="font-medium text-white">Context window</h3>
                </div>
                <p className="text-sm text-[#a1a1aa]">Trimmed + stable</p>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="h-5 w-5 text-[#00f2ff]" />
                  <h3 className="font-medium text-white">Response formatting</h3>
                </div>
                <p className="text-sm text-[#a1a1aa]">Markdown + code</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 group hover:border-[#00f2ff]/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00f2ff]/20 to-[#8b5cf6]/20 group-hover:from-[#00f2ff]/30 group-hover:to-[#8b5cf6]/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-[#00f2ff]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-[#a1a1aa]">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3 mt-12">
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text">50ms</div>
              <div className="text-sm text-[#a1a1aa] mt-1">Avg Response Time</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text">15</div>
              <div className="text-sm text-[#a1a1aa] mt-1">Message Context</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text">99.9%</div>
              <div className="text-sm text-[#a1a1aa] mt-1">Uptime</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass-strong p-8 sm:p-12 text-center mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to experience the future?
            </h2>
            <p className="text-[#a1a1aa] mb-8">
              Start chatting with Amkyaw AI now and see the difference.
            </p>
            <Link href="/chat" className="btn-primary glow-accent">
              Start Chatting
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 mt-20">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-[#a1a1aa]">
            <p>© 2024 Amkyaw AI. Built with Next.js + Groq SDK.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
