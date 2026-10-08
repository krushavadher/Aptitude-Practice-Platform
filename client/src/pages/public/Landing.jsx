import React from 'react';
import { Brain, Clock, BarChart3, ChevronRight } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Button } from '../../components/common/Button';

export default function Landing() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-24 sm:pt-32 sm:pb-32 lg:pb-40 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-primary tracking-tight">
            Master your <span className="text-accent">Aptitude</span> Skills
          </h1>
          <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Prepare for assessments with AI-generated questions, timed tests, and detailed analytics. Practice smartly and track your progress.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button to="/register" size="lg" rightIcon={<ChevronRight className="w-5 h-5" />}>
              Get Started
            </Button>
            <Button to="/login" variant="secondary" size="lg">
              Log In
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-4 py-20 bg-glass-strong border-y border-glass-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard>
              <div className="w-12 h-12 bg-accent bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Practice by Topic</h3>
              <p className="text-secondary">
                Focus your preparation on specific areas like quantitative, logical reasoning, and verbal aptitude.
              </p>
            </GlassCard>
            
            <GlassCard>
              <div className="w-12 h-12 bg-warning bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Timed Tests</h3>
              <p className="text-secondary">
                Simulate real exam conditions with strict time limits to improve your speed and accuracy.
              </p>
            </GlassCard>
            
            <GlassCard>
              <div className="w-12 h-12 bg-success bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Detailed Analytics</h3>
              <p className="text-secondary">
                Review your answers with clear explanations and climb the leaderboard with your best scores.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-glass-border -z-10" />
            {[
              { step: '1', title: 'Choose a Topic', desc: 'Select from our extensive library of aptitude questions.' },
              { step: '2', title: 'Start Practicing', desc: 'Answer questions and read detailed explanations.' },
              { step: '3', title: 'Track Progress', desc: 'Review your history and see where you stand on the leaderboard.' }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent text-on-accent flex items-center justify-center font-bold text-xl mb-4 shadow-lg shadow-accent/20">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-secondary text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
