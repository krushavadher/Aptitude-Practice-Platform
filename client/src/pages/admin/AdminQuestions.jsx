import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'react-router-dom';
import { adminApi, topicApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Pagination } from '../../components/common/Pagination';
import { Loader } from '../../components/common/Loader';
import { ErrorState, EmptyState } from '../../components/common/States';
import { Modal, ConfirmDialog } from '../../components/common/Modal';
import { Input, Select, Textarea } from '../../components/common/Form';
import { useToast } from '../../components/common/Toast';
import { QuestionCard } from '../../components/test/QuestionCard';
import { OptionList } from '../../components/test/OptionList';
import { ExplanationPanel } from '../../components/test/ExplanationPanel';
import { Plus, Edit2, Trash2, Filter, Info, Bot, CheckCircle, X, AlertCircle } from 'lucide-react';

const questionSchema = z.object({
  topicId: z.string().min(1, 'Topic is required'),
  subtopic: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  text: z.string().min(1, 'Question text is required'),
  options: z.array(z.string().min(1, 'Option cannot be empty')).length(4, 'Exactly 4 options are required')
    .refine((opts) => new Set(opts.filter(Boolean)).size === 4, { message: 'Options must be unique' }),
  correctIndex: z.number().int().min(0).max(3, 'Select a correct answer'),
  explanation: z.string().min(1, 'Explanation is required')
});

export default function AdminQuestions() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const topicFilter = searchParams.get('topicId') || '';
  const subtopicFilter = searchParams.get('subtopic') || '';
  const diffFilter = searchParams.get('difficulty') || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const { data: topics = [] } = useQuery({ queryKey: ['adminTopics'], queryFn: topicApi.list });

  // Compute available subtopics for the filter based on selected topic
  const filterSelectedTopicObj = topics.find(t => t._id === topicFilter);
  const filterSubtopics = filterSelectedTopicObj?.subtopics || [];

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminQuestions', page, topicFilter, subtopicFilter, diffFilter],
    queryFn: () => adminApi.getQuestions({ 
      page, limit: 10, 
      ...(topicFilter && { topicId: topicFilter }),
      ...(subtopicFilter && { subtopic: subtopicFilter }),
      ...(diffFilter && { difficulty: diffFilter })
    }),
    keepPreviousData: true
  });

  const { register, handleSubmit, control, reset, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      topicId: '', subtopic: '', difficulty: 'medium', text: '',
      options: ['', '', '', ''], correctIndex: 0, explanation: ''
    }
  });

  const watchTopicId = watch('topicId');
  const watchAllFields = watch();
  
  const selectedTopicObj = topics.find(t => t._id === watchTopicId);
  const subtopicOptions = selectedTopicObj?.subtopics?.map(s => ({ label: s, value: s })) || [];
  subtopicOptions.unshift({ label: 'None', value: '' });

  const openAddModal = () => {
    setEditingId(null);
    reset({
      topicId: topics.length > 0 ? topics[0]._id : '',
      subtopic: '', difficulty: 'medium', text: '',
      options: ['', '', '', ''], correctIndex: 0, explanation: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (q) => {
    setEditingId(q._id);
    reset({
      topicId: q.topicId?._id || q.topicId || '',
      subtopic: q.subtopic || '',
      difficulty: q.difficulty || 'medium',
      text: q.text || '',
      options: q.options || ['', '', '', ''],
      correctIndex: q.correctIndex ?? 0,
      explanation: q.explanation || ''
    });
    setIsModalOpen(true);
  };

  const mutationCreate = useMutation({
    mutationFn: adminApi.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminQuestions']);
      toast({ type: 'success', message: 'Question created' });
      setIsModalOpen(false);
    },
    onError: (err) => toast({ type: 'error', message: err.message || 'Failed to create question' })
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }) => adminApi.updateQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminQuestions']);
      toast({ type: 'success', message: 'Question updated' });
      setIsModalOpen(false);
    },
    onError: (err) => toast({ type: 'error', message: err.message || 'Failed to update question' })
  });

  const mutationDelete = useMutation({
    mutationFn: adminApi.deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminQuestions']);
      toast({ type: 'success', message: 'Question deleted' });
      setDeleteConfirmId(null);
    },
    onError: (err) => {
      toast({ type: 'error', message: err.message || 'Failed to delete question' });
      setDeleteConfirmId(null);
    }
  });

  const onSubmit = (formData) => {
    if (editingId) mutationUpdate.mutate({ id: editingId, data: formData });
    else mutationCreate.mutate(formData);
  };

  const handleFilterChange = (key, val) => {
    const nextParams = new URLSearchParams(searchParams);
    if (val) nextParams.set(key, val);
    else nextParams.delete(key);
    
    // If topic changes, clear the subtopic filter
    if (key === 'topicId') {
      nextParams.delete('subtopic');
    }
    
    // Only reset page to 1 if we are changing a filter other than the page itself
    if (key !== 'page') {
      nextParams.set('page', '1');
    }
    setSearchParams(nextParams);
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 pb-24 text-[#10241E]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#10241E] mb-1">Questions</h1>
          <p className="text-[#5B6F67] text-[15px]">Manage the question database.</p>
        </div>
        <button 
          onClick={openAddModal} 
          className="flex items-center gap-2 bg-[#14724F] hover:bg-[#0F5A3E] text-white px-5 py-2.5 rounded-[12px] font-bold text-[14px] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#14724F] focus:ring-offset-2 focus:ring-offset-[#EAF3EF]"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/40 backdrop-blur-md rounded-[24px] p-6 flex flex-col sm:flex-row gap-6 items-end shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <div className="w-full sm:w-64">
          <label className="block text-[13px] font-bold text-[#10241E] mb-2 pl-2">Filter by Topic</label>
          <select 
            value={topicFilter}
            onChange={e => handleFilterChange('topicId', e.target.value)}
            className="w-full bg-white text-[#10241E] text-[14px] font-medium rounded-full py-3 px-5 outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all appearance-none cursor-pointer"
          >
            <option value="">All Topics</option>
            {topics.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>
        </div>
        <div className="w-full sm:w-64">
          <label className="block text-[13px] font-bold text-[#10241E] mb-2 pl-2">Filter by Subtopic</label>
          <select 
            value={subtopicFilter}
            onChange={e => handleFilterChange('subtopic', e.target.value)}
            disabled={!topicFilter || filterSubtopics.length === 0}
            className="w-full bg-white text-[#10241E] text-[14px] font-medium rounded-full py-3 px-5 outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all appearance-none cursor-pointer disabled:opacity-60"
          >
            <option value="">All Subtopics</option>
            {filterSubtopics.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="w-full sm:w-48">
          <label className="block text-[13px] font-bold text-[#10241E] mb-2 pl-2">Filter by Difficulty</label>
          <select 
            value={diffFilter}
            onChange={e => handleFilterChange('difficulty', e.target.value)}
            className="w-full bg-white text-[#10241E] text-[14px] font-medium rounded-full py-3 px-5 outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all appearance-none cursor-pointer"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {isLoading && !data ? <div className="flex justify-center p-12"><Loader size={48} /></div> : null}
      {error && !isLoading ? <ErrorState message="Failed to load questions" /> : null}
      
      {data && data.questions.length === 0 ? (
        <EmptyState title="No questions found" message="Try adjusting your filters or add a new question." />
      ) : data && (
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="w-full">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr>
                  <th className="px-6 py-5 text-[12px] font-bold text-[#5B6F67] w-[45%]">Question</th>
                  <th className="px-6 py-5 text-[12px] font-bold text-[#5B6F67] w-[25%]">Topic</th>
                  <th className="px-6 py-5 text-[12px] font-bold text-[#5B6F67] w-[20%]">Diff/Src</th>
                  <th className="px-6 py-5 text-[12px] font-bold text-[#5B6F67] w-[10%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.questions.map((q, i) => (
                  <tr key={q._id} className={`${i % 2 === 0 ? 'bg-[#F3F7F5]' : 'bg-white'} transition-colors group`}>
                    <td className="px-6 py-5">
                      <div className="text-[#10241E] text-[13px] font-bold leading-relaxed pr-4 whitespace-normal break-words">
                        {q.text}
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="text-[13px] text-[#5B6F67] font-medium mb-0.5">{q.topicId?.name || 'Unknown'}</div>
                      <div className="text-[11px] text-[#8A9A93]">{q.subtopic || 'No subtopic'}</div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold tracking-wide ${
                          q.difficulty === 'hard' ? 'border-[#E05252] text-[#E05252]' :
                          q.difficulty === 'easy' ? 'border-[#14724F] text-[#14724F]' :
                          'border-[#D5A04C] text-[#D5A04C]'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full border border-[#C5D0CA] text-[#5B6F67] text-[11px] font-bold tracking-wide">
                          Approved
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top text-right space-x-3 whitespace-nowrap">
                      <button onClick={() => openEditModal(q)} className="text-[#5B6F67] hover:text-[#10241E] transition-colors focus:outline-none">
                        <Edit2 className="w-4 h-4 inline" strokeWidth={2} />
                      </button>
                      <button onClick={() => setDeleteConfirmId(q._id)} className="text-[#5B6F67] hover:text-[#E05252] transition-colors focus:outline-none">
                        <Trash2 className="w-4 h-4 inline" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data && data.pages > 1 && (
        <Pagination currentPage={page} totalPages={data.pages} onPageChange={p => handleFilterChange('page', p.toString())} />
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#10241E]/40 backdrop-blur-sm overflow-hidden">
          <div className="relative w-full max-w-[1200px] h-[90vh] bg-white rounded-[32px] p-2 flex flex-col md:flex-row shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden">
            
            {/* Form Section (Left) */}
            <div className="w-full md:w-1/2 h-full bg-[#BCC9C4] rounded-[28px] p-6 md:p-8 overflow-y-auto no-scrollbar relative flex flex-col">
              <form id="question-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#3B4D45] mb-2 pl-2">Topic</label>
                    <select
                      {...register('topicId')}
                      disabled={isSubmitting}
                      className="w-full bg-white text-[#10241E] rounded-full py-3.5 px-5 outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all appearance-none cursor-pointer"
                    >
                      {topics.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                    </select>
                    {errors.topicId && <p className="text-red-600 text-xs mt-1 pl-2">{errors.topicId.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#3B4D45] mb-2 pl-2">Subtopic</label>
                    <select
                      {...register('subtopic')}
                      disabled={isSubmitting || subtopicOptions.length <= 1}
                      className="w-full bg-white text-[#10241E] rounded-full py-3.5 px-5 outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all appearance-none cursor-pointer disabled:opacity-60"
                    >
                      {subtopicOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    {errors.subtopic && <p className="text-red-600 text-xs mt-1 pl-2">{errors.subtopic.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-[#3B4D45] mb-2 pl-2">Difficulty</label>
                  <select
                    {...register('difficulty')}
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#10241E] rounded-full py-3.5 px-5 outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all appearance-none cursor-pointer"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  {errors.difficulty && <p className="text-red-600 text-xs mt-1 pl-2">{errors.difficulty.message}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#3B4D45] mb-2 pl-2">Question Text</label>
                  <textarea 
                    {...register('text')} 
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#10241E] rounded-[24px] p-5 min-h-[140px] outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all resize-y"
                  />
                  {errors.text && <p className="text-red-600 text-xs mt-1 pl-2">{errors.text.message}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#3B4D45] mb-2 pl-2">Options & Correct Answer</label>
                  {errors.options && <p className="text-red-600 text-xs mb-2 pl-2">{errors.options.message}</p>}
                  {errors.correctIndex && <p className="text-red-600 text-xs mb-2 pl-2">{errors.correctIndex.message}</p>}
                  
                  <div className="space-y-3">
                    {[0, 1, 2, 3].map((idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8">
                          <input 
                            type="radio" 
                            value={idx} 
                            {...register('correctIndex', { valueAsNumber: true })}
                            className="w-5 h-5 accent-[#14724F] bg-white cursor-pointer"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="flex-1">
                          <input 
                            type="text"
                            placeholder={`Option ${['A','B','C','D'][idx]}`} 
                            {...register(`options.${idx}`)} 
                            disabled={isSubmitting}
                            className={`w-full bg-white text-[#10241E] rounded-full py-3.5 px-5 outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all ${errors.options?.[idx] ? 'ring-2 ring-red-400' : ''}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#3B4D45] mb-2 pl-2">Explanation</label>
                  <textarea 
                    {...register('explanation')} 
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#10241E] rounded-[24px] p-5 min-h-[120px] outline-none focus:ring-2 focus:ring-[#14724F]/40 shadow-sm transition-all resize-y"
                  />
                  {errors.explanation && <p className="text-red-600 text-xs mt-1 pl-2">{errors.explanation.message}</p>}
                </div>
              </form>
            </div>

            {/* Live Preview Section (Right) */}
            <div className="hidden md:flex w-1/2 h-full bg-[#F3F7F5] rounded-[28px] p-6 md:p-8 flex-col overflow-y-auto no-scrollbar relative">
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-[18px] font-extrabold text-[#10241E]">
                  <CheckCircle className="w-5 h-5 text-[#14724F]" strokeWidth={2.5} /> Live Preview
                </div>
                <button onClick={() => !isSubmitting && setIsModalOpen(false)} className="p-2 text-[#8A9A93] hover:text-[#10241E] transition-colors focus:outline-none bg-white rounded-full shadow-sm">
                  <X className="w-5 h-5" strokeWidth={2.5}/>
                </button>
              </div>
              
              <div className="flex-1 space-y-4 pb-20">
                {/* Question Card */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[11px] font-extrabold text-[#5B6F67] uppercase tracking-wider">
                      QUESTION 1
                    </span>
                    <span className={`px-3 py-1 rounded-full border text-[11px] font-extrabold tracking-wide ${
                      watchAllFields.difficulty === 'hard' ? 'border-[#E05252] text-[#E05252]' :
                      watchAllFields.difficulty === 'easy' ? 'border-[#14724F] text-[#14724F]' :
                      'border-[#D5A04C] text-[#D5A04C]'
                    }`}>
                      {watchAllFields.difficulty ? watchAllFields.difficulty.charAt(0).toUpperCase() + watchAllFields.difficulty.slice(1) : 'Medium'}
                    </span>
                  </div>
                  <div className="text-[16px] text-[#10241E] leading-relaxed font-medium whitespace-pre-wrap">
                    {watchAllFields.text || 'Question text will appear here...'}
                  </div>
                </div>
                
                {/* Options */}
                <div className="space-y-3">
                  {[0, 1, 2, 3].map((idx) => {
                    const isCorrect = watchAllFields.correctIndex === idx;
                    const letter = ['A', 'B', 'C', 'D'][idx];
                    const optionText = watchAllFields.options?.[idx];
                    
                    return (
                      <div 
                        key={idx} 
                        className={`rounded-[16px] p-3 flex items-center gap-4 transition-colors ${
                          isCorrect 
                            ? 'bg-[#E5F5ED] border border-[#14724F] shadow-sm' 
                            : 'bg-[#F8FAF9] border border-transparent shadow-sm'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-[10px] bg-white font-black text-[14px] flex items-center justify-center shrink-0 shadow-sm ${
                          isCorrect ? 'text-[#14724F]' : 'text-[#8A9A93]'
                        }`}>
                          {letter}
                        </div>
                        <div className={`flex-1 text-[15px] font-medium truncate ${isCorrect ? 'text-[#10241E]' : 'text-[#5B6F67]'}`}>
                          {optionText || ''}
                        </div>
                        {isCorrect && (
                          <div className="flex items-center gap-1.5 text-[#14724F] text-[13px] font-bold pr-2">
                            Correct answer <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {watchAllFields.explanation && (
                  <div className="mt-6 bg-[#F8FAF9] rounded-[20px] p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#14724F]"></div>
                    <div className="text-[11px] font-extrabold text-[#5B6F67] uppercase tracking-wider mb-2">Explanation</div>
                    <div className="text-[14px] text-[#10241E] leading-relaxed font-medium whitespace-pre-wrap">
                      {watchAllFields.explanation}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#F3F7F5] via-[#F3F7F5] to-transparent flex justify-end gap-3 items-center pointer-events-none">
                <div className="pointer-events-auto flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    disabled={isSubmitting}
                    className="text-[#5B6F67] font-bold text-[14px] hover:text-[#10241E] transition-colors px-4 py-2 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    form="question-form" 
                    disabled={isSubmitting}
                    className="bg-[#14724F] text-white rounded-full px-6 py-3 font-bold text-[14px] hover:bg-[#0F5A3E] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#14724F] focus:ring-offset-2 focus:ring-offset-[#F3F7F5] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : (editingId ? 'Save Changes' : 'Create Question')}
                  </button>
                </div>
              </div>

            </div>

            {/* Mobile Actions (Visible only on small screens) */}
            <div className="md:hidden p-4 border-t border-gray-200 bg-white flex justify-end gap-3 absolute bottom-0 left-0 right-0 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                disabled={isSubmitting}
                className="text-[#5B6F67] font-bold text-[14px] px-4 py-2"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="question-form" 
                disabled={isSubmitting}
                className="bg-[#14724F] text-white rounded-full px-6 py-2.5 font-bold text-[14px]"
              >
                {isSubmitting ? 'Saving...' : (editingId ? 'Save Changes' : 'Create Question')}
              </button>
            </div>

          </div>
        </div>
      )}

      <ConfirmDialog 
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Question"
        message="Are you sure you want to delete this question? This action cannot be undone."
        confirmText="Yes, delete"
        confirmVariant="danger"
        onConfirm={() => mutationDelete.mutate(deleteConfirmId)}
      />
    </div>
  );
}
