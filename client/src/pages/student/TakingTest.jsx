import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Button } from '../../components/common/Button';
import { QuestionCard } from '../../components/test/QuestionCard';
import { OptionList } from '../../components/test/OptionList';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/States';
import { ConfirmDialog } from '../../components/common/Modal';
import { useToast } from '../../components/common/Toast';
import { Flag, Clock, ArrowRight, ArrowLeft, LayoutGrid, CheckSquare, Square, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function TakingTest() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [initData, setInitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [answers, setAnswers] = useState({}); // { [questionId]: selectedIndex }
  const [flags, setFlags] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  // Poll backend to ensure we don't take a submitted test
  const { error: resultError, isLoading: resultChecking } = useQuery({
    queryKey: ['testResultCheck', testId],
    queryFn: () => testApi.result(testId),
    retry: false
  });

  useEffect(() => {
    if (!resultChecking) {
      if (!resultError) {
        // If getting result succeeded, the test is already submitted
        navigate(`/results/${testId}`, { replace: true });
        return;
      }
      
      // If it throws 400 (Cannot view while in progress), it's exactly what we want!
      if (resultError.status === 400) {
        // Load initData from localStorage
        const storedInit = localStorage.getItem(`test_init_${testId}`);
        if (storedInit) {
          try {
            const data = JSON.parse(storedInit);
            setInitData(data);
            
            // Load progress
            const storedProgress = localStorage.getItem(`test_prog_${testId}`);
            if (storedProgress) {
              const prog = JSON.parse(storedProgress);
              setAnswers(prog.answers || {});
              setFlags(new Set(prog.flags || []));
            }
            
            setLoading(false);
          } catch(e) {
            setErrorMsg('Local storage corrupted. Please start a new test.');
            setLoading(false);
          }
        } else {
          setErrorMsg('Test data not found on this device. Please start a new test.');
          setLoading(false);
        }
      } else {
        setErrorMsg(resultError.message || 'Failed to verify test status');
        setLoading(false);
      }
    }
  }, [resultChecking, resultError, testId, navigate]);

  // Timer effect
  const lastTick = useRef(Date.now());
  
  useEffect(() => {
    if (!initData || isSubmitting) return;

    // Calculate real expiry based on local offset to server time
    const serverTimeDate = new Date(initData.serverTime).getTime();
    const localNow = Date.now();
    const offset = localNow - serverTimeDate;
    const expiryTime = new Date(initData.expiresAt).getTime() + offset;

    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        handleAutoSubmit();
      }
    };

    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [initData, isSubmitting]);

  // Save progress effect
  useEffect(() => {
    if (initData) {
      localStorage.setItem(`test_prog_${testId}`, JSON.stringify({
        answers,
        flags: Array.from(flags)
      }));
    }
  }, [answers, flags, initData, testId]);

  // Tab close warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isSubmitting) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitting]);

  const submitTest = async (auto = false) => {
    setIsSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([qId, sIdx]) => ({
          questionId: qId,
          selectedIndex: sIdx,
          timeSpentSec: 0 // Simplification since tracking per question requires more complex state
        }))
      };
      
      await testApi.submit(testId, payload);
      
      localStorage.removeItem(`test_init_${testId}`);
      localStorage.removeItem(`test_prog_${testId}`);
      toast({ type: 'success', message: 'Test submitted successfully' });
      navigate(`/results/${testId}`, { replace: true, state: { flags: Array.from(flags) } });
    } catch (err) {
      toast({ type: 'error', message: err.message || 'Failed to submit test' });
      setIsSubmitting(false); // Let them try again
    }
  };

  const handleAutoSubmit = useCallback(() => {
    submitTest(true);
  }, [answers, testId]);

  if (loading || resultChecking) return <div className="flex-1 flex items-center justify-center"><Loader size={48} /></div>;
  if (errorMsg) return <ErrorState message={errorMsg} className="max-w-2xl mx-auto mt-12 p-8" action={<Button onClick={() => navigate('/test/setup')}>Go to Setup</Button>} />;
  if (!initData) return null;
  if (isSubmitting) return <div className="flex-1 flex flex-col items-center justify-center"><Loader size={48} /><p className="mt-4 text-xl font-bold text-primary animate-pulse">Time is up, submitting...</p></div>;

  const questions = initData.questions;
  const currentQ = questions[currentIndex];
  
  // Timer formatting & logic
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  const totalSecs = (new Date(initData.expiresAt).getTime() - new Date(initData.serverTime).getTime()) / 1000;
  const isWarning = timeLeft <= 300 || timeLeft <= (totalSecs * 0.2); // Under 5 mins or 20%
  const isDanger = timeLeft <= 60; // Under 1 min

  let timerClass = 'text-accent border-accent';
  let TimerIcon = Clock;
  let timerStateText = 'Normal';
  
  if (isDanger) {
    timerClass = 'text-error-text border-error bg-error bg-opacity-10';
    timerStateText = 'Critical, under 1 minute';
  } else if (isWarning) {
    timerClass = 'text-warning-text border-warning bg-warning bg-opacity-10';
    timerStateText = 'Warning, running low';
  }

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return; // let them work
    if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) setCurrentIndex(c => c + 1);
    if (e.key === 'ArrowLeft' && currentIndex > 0) setCurrentIndex(c => c - 1);
    if (e.key.toLowerCase() === 'f') toggleFlag();
  };

  const toggleFlag = () => {
    setFlags(prev => {
      const next = new Set(prev);
      if (next.has(currentQ._id)) next.delete(currentQ._id);
      else next.add(currentQ._id);
      return next;
    });
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flags.size;

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-glass-strong relative" onKeyDown={handleKeyDown} tabIndex={0}>
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-glass-border glass sticky top-0 z-10">
        <button onClick={() => setShowPalette(true)} className="flex items-center gap-2 text-primary font-medium p-2 rounded-lg hover:bg-glass">
          <LayoutGrid className="w-5 h-5" />
          <span>Palette</span>
        </button>
        <div className={`tabular-nums font-bold px-3 py-1.5 rounded-lg border flex items-center gap-2 ${timerClass}`}>
          <TimerIcon className="w-4 h-4" />
          {formattedTime}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full md:max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8">
        
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between mb-8 pb-4 border-b border-glass-border">
          <h1 className="text-xl font-bold text-primary">Test in Progress</h1>
          
          <div className="flex items-center gap-6">
            <div className={`tabular-nums font-bold px-4 py-2 rounded-xl border-2 flex items-center gap-2 ${timerClass}`} aria-live="polite">
              <span className="sr-only">Time remaining: {timerStateText}</span>
              <TimerIcon className="w-5 h-5" />
              <span className="text-xl">{formattedTime}</span>
            </div>
            <Button onClick={() => setShowConfirm(true)} variant="primary">Submit Test</Button>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 flex flex-col">
          <QuestionCard 
            number={currentIndex + 1}
            total={questions.length}
            subtopic={currentQ.subtopic}
            difficulty={currentQ.difficulty}
            text={currentQ.text}
          />

          <div className="flex-1 mb-8">
            <OptionList 
              options={currentQ.options}
              selectedIndex={answers[currentQ._id]}
              onSelect={(idx) => setAnswers(prev => ({ ...prev, [currentQ._id]: idx }))}
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-glass-border">
          <Button 
            variant="ghost" 
            disabled={currentIndex === 0} 
            onClick={() => setCurrentIndex(c => c - 1)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <Button 
            variant={flags.has(currentQ._id) ? "secondary" : "ghost"} 
            onClick={toggleFlag}
            className={flags.has(currentQ._id) ? "border-warning text-warning-text hover:bg-warning hover:bg-opacity-10" : ""}
            leftIcon={<Flag className="w-4 h-4" />}
          >
            {flags.has(currentQ._id) ? 'Unflag' : 'Flag for review'}
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button onClick={() => setShowConfirm(true)}>Review & Submit</Button>
          ) : (
            <Button 
              variant="secondary"
              onClick={() => setCurrentIndex(c => c + 1)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Question Palette Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-20 w-80 glass border-l border-glass-border transform transition-transform duration-300 md:relative md:transform-none flex flex-col ${showPalette ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-glass-border flex justify-between items-center">
          <h2 className="font-bold text-primary">Question Palette</h2>
          <button className="md:hidden p-2 hover:bg-glass rounded-lg text-secondary" onClick={() => setShowPalette(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2 mb-8">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAns = answers[q._id] !== undefined;
              const isFlag = flags.has(q._id);

              let btnClass = "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all relative border-2 ";
              let srState = `Question ${idx + 1}, `;
              
              if (isAns) {
                btnClass += "bg-accent border-accent text-on-accent ";
                srState += "answered";
              } else {
                btnClass += "bg-glass border-glass-border text-primary ";
                srState += "unanswered";
              }

              if (isCurrent) {
                btnClass += "ring-2 ring-accent ring-offset-2 ring-offset-black ";
                srState += ", current";
              }

              if (isFlag) {
                btnClass += "border-warning !text-warning-text "; // warning border override
                srState += ", flagged";
              }

              return (
                <button
                  key={q._id}
                  onClick={() => { setCurrentIndex(idx); setShowPalette(false); }}
                  className={btnClass}
                  aria-label={srState}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {idx + 1}
                  {isFlag && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-glass rounded-full border border-warning flex items-center justify-center text-warning-text">
                      <Flag className="w-2.5 h-2.5 fill-current" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-2 text-sm text-secondary">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-accent rounded" /> Answered ({answeredCount})</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-glass border-2 border-glass-border rounded" /> Unanswered ({questions.length - answeredCount})</div>
            <div className="flex items-center gap-2"><Flag className="w-4 h-4 text-warning-text" /> Flagged ({flaggedCount})</div>
          </div>
        </div>

        <div className="p-4 border-t border-glass-border bg-glass-strong md:hidden">
          <Button className="w-full" onClick={() => setShowConfirm(true)}>Submit Test</Button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {showPalette && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden" onClick={() => setShowPalette(false)} />
      )}

      <ConfirmDialog 
        isOpen={showConfirm} 
        onClose={() => setShowConfirm(false)}
        title="Submit Test?"
        message={`You have answered ${answeredCount} out of ${questions.length} questions, and flagged ${flaggedCount} for review. Are you sure you want to submit?`}
        confirmText="Yes, Submit"
        onConfirm={() => submitTest()}
      />
    </div>
  );
}
