import { ButtonLink } from '@/components/ui/button-link';
import { ParticleField } from '@/components/particle-field';
import { Zap, MessageSquare, Shield, Code } from 'lucide-react';

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
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 text-sm text-cyan">
            <Zap className="h-4 w-4" />
            <span>Powered by Groq + Llama 4 Scout</span>
          </div>

          {/* Hero Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-white">Build faster with </span>
            <span className="gradient-text">Amkyaw AI</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
            A next-generation AI assistant with ultra-fast token streaming, 
            glassmorphism design, and seamless conversation experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/chat" className="btn-primary glow-cyan">
              Get Started
            </ButtonLink>
            <ButtonLink href="/docs" className="btn-secondary">
              View Documentation
            </ButtonLink>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 group hover:border-cyan/30 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 group-hover:from-cyan/30 group-hover:to-violet/30 transition-colors">
                <feature.icon className="h-6 w-6 text-cyan" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold gradient-text">50ms</div>
            <div className="text-sm text-zinc-400">Avg Response Time</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold gradient-text">15</div>
            <div className="text-sm text-zinc-400">Message Context</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold gradient-text">99.9%</div>
            <div className="text-sm text-zinc-400">Uptime</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 glass-card p-8 sm:p-12 text-center">
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-white">
            Ready to experience the future?
          </h2>
          <p className="mb-8 text-zinc-400">
            Start chatting with Amkyaw AI now and see the difference.
          </p>
          <ButtonLink href="/chat" className="btn-primary glow-cyan">
            Start Chatting
          </ButtonLink>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500">
          <p>© 2024 Amkyaw AI. Built with Next.js + Groq SDK.</p>
        </div>
      </footer>
    </div>
  );
}
