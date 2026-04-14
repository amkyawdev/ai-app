import { Bot, Zap, Shield, Heart } from 'lucide-react';

const pillars = [
  {
    icon: Bot,
    title: 'Smart AI',
    description: 'Powered by Groq and Llama 4 Scout for intelligent conversations.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time token streaming for instant responses.',
  },
  {
    icon: Shield,
    title: 'Secure',
    description: 'Enterprise-grade security to protect your data.',
  },
  {
    icon: Heart,
    title: 'Built with Love',
    description: 'Crafted with modern design and best practices.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-4xl font-bold text-white">
            About <span className="gradient-text">Amkyaw AI</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            A next-generation AI assistant designed for speed, security, and seamless user experience.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card p-8 sm:p-12 mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Our Mission</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto">
            We believe AI should be fast, accessible, and beautiful. Amkyaw AI combines cutting-edge 
            technology with modern design to create an assistant that feels like the future. 
            Every interaction is optimized for speed, every detail-crafted for delight.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid gap-6 sm:grid-cols-2 mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="glass-card p-6 group hover:border-cyan/30 transition-colors"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 group-hover:from-cyan/30 group-hover:to-violet/30 transition-colors">
                <pillar.icon className="h-6 w-6 text-cyan" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm text-zinc-400">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="glass-card p-8">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Tech Stack</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Groq SDK', 'Vercel'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-white/5 text-zinc-300 text-sm"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-zinc-500 mb-4">Made with ❤️ by Amkyaw</p>
          <a
            href="https://github.com/amkyawdev/ai-app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan hover:underline"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
