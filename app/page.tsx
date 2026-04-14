import { ArrowRight, Cpu, Gauge, ShieldCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button-link';
import { ParticleField } from '@/components/particle-field';
import { VALUE_PROPS } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white-10 px-6 py-16 shadow-glow sm:px-10 lg:px-14">
        <ParticleField />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-sm text-cyan">
              <Gauge className="h-4 w-4" />
              Groq + Llama 4 Scout • Premium realtime UX
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build faster conversations with <span className="text-cyan">Amkyaw AI</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A dark, glassmorphism AI interface engineered for instant feel, live token streaming,
              and high-trust interaction design on top of Groq inference.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/chat">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/docs" className="border-white/20 bg-white-5 text-slate-200 hover:bg-white-10">
                View Docs
              </ButtonLink>
            </div>
          </div>

          <div className="glass-panel relative rounded-[2rem] p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Performance Snapshot</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Why it feels fast</h2>
              </div>
              <div className="rounded-2xl border border-violet/20 bg-violet/10 p-3 text-violet">
                <Cpu className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {[
                { label: 'Live token streaming', value: 'Immediate' },
                { label: 'Context window handling', value: 'Trimmed + stable' },
                { label: 'Response formatting', value: 'Markdown + code' },
              ].map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white-10 bg-black/20 p-4">
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <p className="mt-2 text-lg font-medium text-white">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">
              <div className="flex items-center gap-2 text-cyan">
                <ShieldCheck className="h-4 w-4" />
                Prompt + retrieval guardrails built in
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {VALUE_PROPS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="glass-panel rounded-[2rem] p-6 shadow-glow">
              <div className="inline-flex rounded-2xl border border-white-10 bg-white-10 p-3 text-cyan">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
