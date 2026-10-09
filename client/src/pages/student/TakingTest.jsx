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
    <div className="flex-1 flex flex-col" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="max-w-[760px] mx-auto w-full flex-1 flex flex-col px-6 pt-4 pb-[100px] space-y-4">
        
        {/* Header / Progress */}
        <div className="flex items-center justify-between mt-2">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 h-10 px-3 -ml-3 text-[color:var(--text-muted)] hover:text-[color:var(--text)] transition-colors rounded-lg font-medium">
            <ArrowLeft className="w-5 h-5" /> Exit
          </button>
          
          <div className="flex-1 max-w-[200px] mx-4 flex items-center justify-center">
            <div className="h-2 w-full bg-[color:var(--primary-soft)] rounded-full overflow-hidden">
              <div className="h-full bg-[color:var(--primary)] transition-all duration-300" style={{ width: `${Math.max(4, ((currentIndex + 1) / questions.length) * 100)}%` }} />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`h-[28px] px-3 font-bold rounded-full flex items-center gap-1.5 text-[12px] tabular-nums ${isDanger ? 'bg-[color:var(--danger-soft)] text-[color:var(--danger)]' : 'bg-[color:var(--teal-soft)] text-[color:var(--teal)]'}`}>
              <Clock className="w-3.5 h-3.5" />
              {formattedTime}
            </div>
            <div className="text-[14px] text-[color:var(--text-muted)] tabular-nums font-medium">
              {currentIndex + 1} of {questions.length}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[color:var(--surface-strong)] rounded-[20px] p-6 border border-[color:var(--border-subtle)] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-[12px] uppercase tracking-[0.08em] text-[color:var(--text-muted)] font-semibold">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="flex items-center gap-2">
              {currentQ.subtopic && (
                <span className="h-[28px] px-3 bg-[color:var(--primary-soft)] text-[color:var(--primary)] text-[12px] font-semibold rounded-full flex items-center">
                  {currentQ.subtopic}
                </span>
              )}
              <span className={`h-[28px] px-3 text-[12px] font-semibold rounded-full flex items-center ${
                currentQ.difficulty === 'Easy' ? 'bg-[color:var(--primary-soft)] text-[color:var(--primary)]' :
                currentQ.difficulty === 'Hard' ? 'bg-[color:var(--danger-soft)] text-[color:var(--danger)]' :
                'bg-[color:var(--teal-soft)] text-[color:var(--teal)]'
              }`}>
                {currentQ.difficulty || 'Medium'}
              </span>
              <button 
                onClick={toggleFlag}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ml-1 ${flags.has(currentQ._id) ? 'bg-[color:var(--teal-soft)] text-[color:var(--teal)]' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface)] hover:text-[color:var(--text)]'}`}
              >
                <Flag className={`w-4 h-4 ${flags.has(currentQ._id) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
          <h2 className="text-[17px] leading-snug font-medium text-[color:var(--text)] mt-3">
            {currentQ.text}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = answers[currentQ._id] === idx;
            const letter = String.fromCharCode(65 + idx);
            
            let btnClass = "w-full text-left min-h-[44px] py-2 px-3 rounded-[12px] border backdrop-blur-[14px] flex items-center gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]";
            let letterClass = "w-[28px] h-[28px] text-[14px] rounded-[8px] font-semibold flex items-center justify-center transition-colors shrink-0";

            if (isSelected) {
              btnClass += " bg-[color:var(--primary-soft)] border-[1.5px] border-[color:var(--primary)]";
              letterClass += " bg-[color:var(--primary)] text-white";
            } else {
              btnClass += " bg-[color:var(--surface)] border-[color:var(--border-subtle)] hover:bg-[color:var(--surface-strong)] hover:border-[color:var(--primary)]/35";
              letterClass += " bg-[color:var(--surface-strong)] text-[color:var(--text-muted)]";
            }

            return (
              <button 
                key={idx}
                onClick={() => setAnswers(prev => ({ ...prev, [currentQ._id]: idx }))}
                className={btnClass}
              >
                <div className={letterClass}>{letter}</div>
                <span className="text-[15px] leading-snug text-[color:var(--text)]">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full z-20 bg-[color:var(--surface-strong)] backdrop-blur-[14px] border-t border-[color:var(--border-subtle)]">
        <div className="max-w-[760px] mx-auto w-full px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => currentIndex < questions.length - 1 ? setCurrentIndex(c => c + 1) : setShowConfirm(true)} 
            className="h-[48px] px-4 font-semibold text-[color:var(--text-muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--surface)] rounded-xl transition-colors -ml-4"
          >
            Skip
          </button>

          <button
            onClick={() => currentIndex === questions.length - 1 ? setShowConfirm(true) : setCurrentIndex(c => c + 1)}
            className="h-[48px] min-w-[160px] px-6 rounded-[12px] bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] font-semibold text-white transition-colors flex items-center justify-center gap-2"
          >
            {currentIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
            {currentIndex < questions.length - 1 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

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
