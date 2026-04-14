import { ABOUT_PILLARS } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-white-10 bg-white-5 px-6 py-10 shadow-glow backdrop-blur-xl sm:px-10">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan">About Amkyaw AI</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          A cinematic AI product experience built around speed, trust, and elegant interaction.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Amkyaw AI is designed as a polished interface layer for fast inference. The goal is not only to answer quickly, but to make every response feel intentional, readable, and premium.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {ABOUT_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.title} className="rounded-[2rem] border border-white-10 bg-white-5 p-6 shadow-glow backdrop-blur-xl">
              <div className="inline-flex rounded-2xl border border-cyan-20 bg-cyan-10 p-3 text-cyan">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.description}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white-10 bg-white-5 p-6 shadow-glow backdrop-blur-xl">
          <p className="text-sm text-slate-400">Mission</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Deliver fast AI without sacrificing clarity.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The product direction centers on realtime streaming, confident visual hierarchy, and system design patterns that scale from quick chats to structured, document-backed AI workflows.
          </p>
        </div>
        <div className="rounded-[2rem] border border-white-10 bg-gradient-to-br from-cyan/10 via-transparent to-violet/10 p-6 shadow-glow backdrop-blur-xl">
          <p className="text-sm text-slate-400">Vision Grid</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-200">
            {['Realtime UX', 'Flexible RAG', 'Prompt Discipline', 'Scalable Design'].map((item) => (
              <div key={item} className="rounded-2xl border border-white-10 bg-black-20 px-4 py-6 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
