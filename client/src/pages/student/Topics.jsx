import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { topicApi, meApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Loader, Skeleton } from '../../components/common/Loader';
import { EmptyState, ErrorState } from '../../components/common/States';
import { Input } from '../../components/common/Form';
import { Brain, Search, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgressRing = ({ value }) => {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  let colorClass = 'text-success';
  if (value < 60) colorClass = 'text-warning';
  else if (value < 85) colorClass = 'text-accent';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-10 h-10 transform -rotate-90">
        <circle className="text-glass-border" strokeWidth="2.5" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" />
        <circle 
          className={colorClass} 
          strokeWidth="2.5" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" 
          stroke="currentColor" 
          fill="transparent" 
          r={radius} 
          cx="20" 
          cy="20" 
        />
      </svg>
      <span className="absolute text-[9px] font-bold text-primary">{Math.round(value)}%</span>
    </div>
  );
};

export default function Topics() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [limit, setLimit] = useState('20');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: topics, isLoading: topicsLoading, isError: topicsError, error, refetch } = useQuery({
    queryKey: ['topics'],
    queryFn: topicApi.list
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['myStats'],
    queryFn: meApi.stats
  });

  if (topicsLoading || statsLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-8 w-full">
        <Skeleton variant="card" className="h-40 mb-6" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-64" />)}
        </div>
      </div>
    );
  }

  if (topicsError) {
    return <ErrorState message={error.message} onRetry={refetch} className="m-8" />;
  }

  const accuracyMap = (stats?.accuracyPerTopic || []).reduce((acc, stat) => {
    acc[stat.topicId] = stat.accuracy;
    return acc;
  }, {});

  const filteredTopics = (topics || []).filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryLabels = [
    { id: 'all', label: 'All Categories' },
    { id: 'quant', label: 'Quantitative' },
    { id: 'logical', label: 'Logical Reasoning' },
    { id: 'verbal', label: 'Verbal' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 w-full space-y-6 pb-20">
      
      {/* Banner */}
      <GlassCard className="relative overflow-hidden border-none shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-glass to-transparent opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 p-4">
          <div>
            <div className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-2">Benchmark Catalog / Curated Syllabus</div>
            <h1 className="text-3xl font-extrabold text-primary mb-2">Practice Topics</h1>
            <p className="text-secondary text-sm">Select a topic, configure test settings, and begin practicing or take a timed test.</p>
          </div>
          <div className="flex items-center gap-3 bg-glass px-4 py-2 rounded-xl border border-glass-border">
            <div className="text-right">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">Active Syllabus</div>
              <div className="font-bold text-primary">{topics?.length || 0} Specializations</div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
          </div>
        </div>
      </GlassCard>

      {/* Control Bar */}
      <GlassCard className="flex flex-col lg:flex-row items-center justify-between gap-6 p-4">
        <div className="relative w-full lg:w-1/3">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <Input 
            type="text"
            placeholder="Search topics or subtopics..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 w-full bg-glass-strong border-glass-border shadow-sm text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 w-full lg:w-auto">
          <div>
            <div className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-1 text-center lg:text-left">Target Rigor</div>
            <div className="flex bg-glass-strong p-1 rounded-lg border border-glass-border shadow-sm">
              {['easy', 'medium', 'hard'].map(level => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-1 text-xs font-bold rounded-md capitalize transition-colors ${difficulty === level ? 'bg-primary text-white shadow' : 'text-secondary hover:text-primary hover:bg-glass'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-1 text-center lg:text-left">Assessment Span</div>
            <select 
              value={limit}
              onChange={e => setLimit(e.target.value)}
              className="px-3 py-1.5 text-sm font-semibold text-primary bg-glass-strong border border-glass-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="10">10 Questions</option>
              <option value="20">20 Questions</option>
              <option value="30">30 Questions</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <Button variant="secondary" className="w-full lg:w-auto bg-glass shadow-sm whitespace-nowrap text-xs" leftIcon={<BookOpen className="w-4 h-4" />} onClick={() => navigate(`/practice/mixed?difficulty=${difficulty}&limit=${limit}`)}>
            Practice Mode
          </Button>
          <Button variant="primary" className="w-full lg:w-auto shadow-md whitespace-nowrap text-xs" leftIcon={<Clock className="w-4 h-4" />} onClick={() => navigate('/test/setup')}>
            Take Timed Test
          </Button>
        </div>
      </GlassCard>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categoryLabels.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
              activeCategory === cat.id 
                ? 'bg-primary text-white border-primary shadow-md' 
                : 'bg-glass text-secondary border-glass-border hover:border-accent/30 hover:text-primary hover:bg-accent/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Topic Grid */}
      {filteredTopics.length === 0 ? (
        <EmptyState 
          icon={Brain}
          title="No topics found"
          description="We couldn't find any topics matching your criteria."
          action={<Button variant="secondary" onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}>Clear Filters</Button>}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map(topic => {
            const acc = accuracyMap[topic._id] || 0;
            
            // Map category to a specific badge color scheme
            let catColor = 'text-accent bg-accent/10 border-accent/20';
            if (topic.category === 'quant') catColor = 'text-accent bg-accent/10 border-accent/20';
            else if (topic.category === 'logical') catColor = 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20';
            else if (topic.category === 'verbal') catColor = 'text-success-text bg-success/10 border-success/20';

            return (
              <GlassCard key={topic._id} className="flex flex-col h-full border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${catColor} uppercase tracking-wider`}>
                    {topic.category}
                  </div>
                  {acc > 0 && <ProgressRing value={acc} />}
                </div>
                
                <h3 className="text-lg font-bold text-primary mb-4 group-hover:text-accent transition-colors">{topic.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-8 flex-1">
                  {topic.subtopics?.slice(0, 5).map(sub => (
                    <span key={sub} className="px-2 py-1 bg-glass-strong border border-glass-border rounded text-[10px] text-secondary font-medium whitespace-nowrap">
                      {sub}
                    </span>
                  ))}
                  {topic.subtopics?.length > 5 && (
                    <span className="px-2 py-1 bg-glass-strong border border-glass-border rounded text-[10px] text-secondary font-medium whitespace-nowrap">
                      +{topic.subtopics.length - 5}
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Button 
                    variant="secondary" 
                    className="w-full bg-glass-strong hover:bg-glass border-glass-border text-primary font-bold text-xs py-2 shadow-sm"
                    onClick={() => navigate(`/practice/${topic._id}?difficulty=${difficulty}&limit=${limit}`)}
                  >
                    Practice
                  </Button>
                  <Button 
                    variant="primary" 
                    className="w-full font-bold text-xs py-2 shadow-md"
                    onClick={() => navigate(`/test/setup?topicId=${topic._id}`)}
                  >
                    Take Test
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
