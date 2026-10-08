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
  const diffFilter = searchParams.get('difficulty') || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const { data: topics = [] } = useQuery({ queryKey: ['adminTopics'], queryFn: topicApi.list });

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminQuestions', page, topicFilter, diffFilter],
    queryFn: () => adminApi.getQuestions({ 
      page, limit: 10, 
      ...(topicFilter && { topicId: topicFilter }),
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
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Questions</h1>
          <p className="text-secondary">Manage the question database.</p>
        </div>
        <Button onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />}>Add Question</Button>
      </div>

      <div className="p-4 rounded-lg bg-accent bg-opacity-10 border border-accent border-opacity-20 flex items-start gap-3">
        <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div className="text-sm text-primary">
          <strong>Note:</strong> Search text and subtopic filtering are not currently supported by the backend API.
        </div>
      </div>

      {/* Filters */}
      <GlassCard padding="p-4" className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="w-full sm:w-64">
          <Select 
            label="Filter by Topic"
            value={topicFilter}
            onChange={e => handleFilterChange('topicId', e.target.value)}
            options={[{ label: 'All Topics', value: '' }, ...topics.map(t => ({ label: t.name, value: t._id }))]}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select 
            label="Filter by Difficulty"
            value={diffFilter}
            onChange={e => handleFilterChange('difficulty', e.target.value)}
            options={[
              { label: 'All Difficulties', value: '' },
              { label: 'Easy', value: 'easy' },
              { label: 'Medium', value: 'medium' },
              { label: 'Hard', value: 'hard' }
            ]}
          />
        </div>
      </GlassCard>

      {/* Table */}
      {isLoading && !data ? <div className="flex justify-center p-12"><Loader size={48} /></div> : null}
      {error && !isLoading ? <ErrorState message="Failed to load questions" /> : null}
      
      {data && data.questions.length === 0 ? (
        <EmptyState title="No questions found" message="Try adjusting your filters or add a new question." />
      ) : data && (
        <GlassCard className="overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="text-secondary font-semibold bg-glass border-b border-glass-border">
                <tr>
                  <th className="p-4 w-1/2">Question</th>
                  <th className="p-4">Topic</th>
                  <th className="p-4">Diff/Src</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {data.questions.map(q => (
                  <tr key={q._id} className="surface-solid hover:bg-glass transition-colors">
                    <td className="p-4">
                      <div className="text-primary font-medium line-clamp-2">{q.text}</div>
                    </td>
                    <td className="p-4 text-secondary">
                      {q.topicId?.name || 'Unknown'}<br/>
                      <span className="text-xs opacity-75">{q.subtopic}</span>
                    </td>
                    <td className="p-4 space-y-1">
                      <Badge variant={q.difficulty === 'hard' ? 'error' : (q.difficulty === 'medium' ? 'warning' : 'success')} className="block w-max">
                        {q.difficulty}
                      </Badge>
                      {q.source === 'ai' && (
                        <Badge variant="accent" className="flex items-center gap-1 w-max">
                          <Bot className="w-3 h-3" /> AI
                        </Badge>
                      )}
                      {q.status && (
                        <Badge variant="neutral" className="block w-max capitalize">{q.status}</Badge>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(q)} className="px-2">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(q._id)} className="px-2 text-error-text hover:bg-error hover:bg-opacity-10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-glass-border">
            {data.questions.map(q => (
              <div key={q._id} className="surface-solid p-4 space-y-3">
                <div className="font-medium text-primary line-clamp-3">{q.text}</div>
                <div className="flex flex-wrap gap-2 text-sm text-secondary">
                  <Badge variant="neutral">{q.topicId?.name}</Badge>
                  <Badge variant={q.difficulty === 'hard' ? 'error' : (q.difficulty === 'medium' ? 'warning' : 'success')}>
                    {q.difficulty}
                  </Badge>
                  {q.source === 'ai' && <Badge variant="accent"><Bot className="w-3 h-3 mr-1" />AI</Badge>}
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-glass-border">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(q)} className="px-2 border border-glass-border">Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(q._id)} className="px-2 text-error-text bg-error bg-opacity-10">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {data && data.pages > 1 && (
        <Pagination currentPage={page} totalPages={data.pages} onPageChange={p => handleFilterChange('page', p.toString())} />
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-5xl my-8 glass-strong rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-glass-border max-h-full">
            
            {/* Form Section */}
            <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-glass-border max-h-[85vh]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">{editingId ? 'Edit Question' : 'Add Question'}</h2>
                <button onClick={() => !isSubmitting && setIsModalOpen(false)} className="md:hidden p-2 text-secondary hover:text-primary"><X className="w-5 h-5"/></button>
              </div>

              <form id="question-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="topicId"
                    control={control}
                    render={({ field }) => (
                      <Select label="Topic" options={topics.map(t => ({ label: t.name, value: t._id }))} error={errors.topicId?.message} disabled={isSubmitting} {...field} />
                    )}
                  />
                  <Controller
                    name="subtopic"
                    control={control}
                    render={({ field }) => (
                      <Select label="Subtopic" options={subtopicOptions} error={errors.subtopic?.message} disabled={isSubmitting || subtopicOptions.length <= 1} {...field} />
                    )}
                  />
                </div>
                
                <Controller
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <Select label="Difficulty" options={[{ label: 'Easy', value: 'easy' }, { label: 'Medium', value: 'medium' }, { label: 'Hard', value: 'hard' }]} error={errors.difficulty?.message} disabled={isSubmitting} {...field} />
                  )}
                />

                <Textarea label="Question Text" {...register('text')} error={errors.text?.message} disabled={isSubmitting} />

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Options & Correct Answer</label>
                  {errors.options && <div className="text-sm text-error-text mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.options.message}</div>}
                  {errors.correctIndex && <div className="text-sm text-error-text mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.correctIndex.message}</div>}
                  
                  <div className="space-y-3">
                    {[0, 1, 2, 3].map((idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="pt-2">
                          <input 
                            type="radio" 
                            value={idx} 
                            {...register('correctIndex', { valueAsNumber: true })}
                            className="w-4 h-4 accent-accent"
                            disabled={isSubmitting}
                          />
                        </div>
                        <Input 
                          placeholder={`Option ${['A','B','C','D'][idx]}`} 
                          {...register(`options.${idx}`)} 
                          error={errors.options?.[idx]?.message}
                          disabled={isSubmitting}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Textarea label="Explanation" {...register('explanation')} error={errors.explanation?.message} disabled={isSubmitting} />
              </form>
            </div>

            {/* Live Preview Section */}
            <div className="hidden md:flex w-1/2 p-6 bg-glass flex-col overflow-y-auto max-h-[85vh]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /> Live Preview</h3>
                <button onClick={() => !isSubmitting && setIsModalOpen(false)} className="p-2 text-secondary hover:text-primary"><X className="w-5 h-5"/></button>
              </div>
              
              <div className="flex-1 space-y-4">
                <QuestionCard 
                  number={1} 
                  subtopic={watchAllFields.subtopic} 
                  difficulty={watchAllFields.difficulty} 
                  text={watchAllFields.text || 'Question text will appear here...'} 
                />
                
                <OptionList 
                  options={watchAllFields.options}
                  selectedIndex={null}
                  onSelect={() => {}}
                  disabled={true}
                  result={{ isCorrect: true, correctIndex: watchAllFields.correctIndex }}
                />

                {(watchAllFields.explanation) && (
                  <ExplanationPanel explanation={watchAllFields.explanation} />
                )}
              </div>

              <div className="pt-6 mt-auto flex justify-end gap-3 border-t border-glass-border">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" form="question-form" isLoading={isSubmitting}>{editingId ? 'Save Changes' : 'Create Question'}</Button>
              </div>
            </div>

            {/* Mobile Actions (Visible only on small screens) */}
            <div className="md:hidden p-4 border-t border-glass-border bg-glass-strong flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" form="question-form" isLoading={isSubmitting}>{editingId ? 'Save Changes' : 'Create Question'}</Button>
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
