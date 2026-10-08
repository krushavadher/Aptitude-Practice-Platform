import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { adminApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Button } from '../../components/common/Button';
import { Modal, ConfirmDialog } from '../../components/common/Modal';
import { Input, Select } from '../../components/common/Form';
import { useToast } from '../../components/common/Toast';
import { Loader } from '../../components/common/Loader';
import { ErrorState, EmptyState } from '../../components/common/States';
import { Edit2, Trash2, Plus, AlertCircle, X } from 'lucide-react';

const topicSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['quant', 'logical', 'verbal'], { errorMap: () => ({ message: 'Category must be selected' }) }),
  subtopics: z.array(z.string()).default([])
});

export default function AdminTopics() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const { data: topics = [], isLoading, error } = useQuery({
    queryKey: ['adminTopics'],
    queryFn: adminApi.getTopics
  });

  const { register, handleSubmit, control, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(topicSchema),
    defaultValues: { name: '', category: 'quant', subtopics: [] }
  });

  const currentSubtopics = watch('subtopics') || [];

  const openAddModal = () => {
    setEditingTopic(null);
    reset({ name: '', category: 'quant', subtopics: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (topic) => {
    setEditingTopic(topic);
    reset({ name: topic.name, category: topic.category, subtopics: topic.subtopics || [] });
    setIsModalOpen(true);
  };

  const mutationCreate = useMutation({
    mutationFn: adminApi.createTopic,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminTopics']);
      toast({ type: 'success', message: 'Topic created successfully' });
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast({ type: 'error', message: err.message || 'Failed to create topic' });
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }) => adminApi.updateTopic(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminTopics']);
      toast({ type: 'success', message: 'Topic updated successfully' });
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast({ type: 'error', message: err.message || 'Failed to update topic' });
    }
  });

  const mutationDelete = useMutation({
    mutationFn: adminApi.deleteTopic,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminTopics']);
      toast({ type: 'success', message: 'Topic deleted successfully' });
      setDeleteConfirmId(null);
    },
    onError: (err) => {
      toast({ type: 'error', message: err.message || 'Failed to delete topic. It may have associated questions.' });
      setDeleteConfirmId(null);
    }
  });

  const onSubmit = (data) => {
    if (editingTopic) {
      mutationUpdate.mutate({ id: editingTopic._id, data });
    } else {
      mutationCreate.mutate(data);
    }
  };

  const addSubtopic = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val && !currentSubtopics.includes(val)) {
        setValue('subtopics', [...currentSubtopics, val], { shouldValidate: true });
        e.target.value = '';
      }
    }
  };

  const removeSubtopic = (valToRemove) => {
    setValue('subtopics', currentSubtopics.filter(s => s !== valToRemove), { shouldValidate: true });
  };

  if (isLoading) return <div className="flex-1 flex justify-center p-12"><Loader size={48} /></div>;
  if (error) return <ErrorState message="Failed to load topics" className="mt-12" />;

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Topics</h1>
          <p className="text-secondary">Manage subject categories and subtopics.</p>
        </div>
        <Button onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />}>Add Topic</Button>
      </div>

      {topics.length === 0 ? (
        <EmptyState title="No topics found" message="Create a new topic to get started." action={<Button onClick={openAddModal}>Add Topic</Button>} />
      ) : (
        <GlassCard className="overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="text-secondary font-semibold bg-glass border-b border-glass-border">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Subtopics</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {topics.map(t => (
                  <tr key={t._id} className="surface-solid hover:bg-glass transition-colors">
                    <td className="p-4 font-bold text-primary">{t.name}</td>
                    <td className="p-4 text-secondary capitalize">{t.category}</td>
                    <td className="p-4 text-secondary">{t.subtopics?.length || 0} subtopics</td>
                    <td className="p-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(t)} className="px-2" aria-label="Edit topic">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(t._id)} className="px-2 text-error-text hover:bg-error hover:bg-opacity-10" aria-label="Delete topic">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-glass-border">
            {topics.map(t => (
              <div key={t._id} className="surface-solid p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-primary text-lg">{t.name}</h3>
                    <div className="text-sm text-secondary capitalize mt-1">{t.category} • {t.subtopics?.length || 0} subtopics</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(t)} className="px-2 bg-glass border border-glass-border">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(t._id)} className="px-2 text-error-text bg-error bg-opacity-10 border border-error border-opacity-20">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => !isSubmitting && setIsModalOpen(false)} title={editingTopic ? "Edit Topic" : "Add Topic"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-1">
          <Input 
            label="Topic Name" 
            {...register('name')} 
            error={errors.name?.message}
            placeholder="e.g. Algebra"
            disabled={isSubmitting}
          />
          
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select 
                label="Category"
                options={[
                  { label: 'Quantitative', value: 'quant' },
                  { label: 'Logical Reasoning', value: 'logical' },
                  { label: 'Verbal', value: 'verbal' }
                ]}
                error={errors.category?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Subtopics</label>
            <div className="glass-strong border border-glass-border rounded-xl p-2 min-h-[42px] flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-shadow">
              {currentSubtopics.map(st => (
                <span key={st} className="flex items-center gap-1 bg-accent bg-opacity-10 text-accent font-medium px-2 py-1 rounded text-sm">
                  {st}
                  <button type="button" onClick={() => removeSubtopic(st)} className="hover:bg-accent hover:bg-opacity-20 rounded p-0.5" aria-label={`Remove ${st}`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input 
                type="text" 
                placeholder="Type and press Enter to add..." 
                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-primary placeholder-secondary p-1"
                onKeyDown={addSubtopic}
                disabled={isSubmitting}
              />
            </div>
            {errors.subtopics && (
              <div className="flex items-center gap-1 mt-1 text-sm text-error-text">
                <AlertCircle className="w-4 h-4" /> <span>{errors.subtopics.message}</span>
              </div>
            )}
            <p className="text-xs text-secondary mt-1">Press Enter to add a subtopic.</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-glass-border">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" isLoading={isSubmitting}>{editingTopic ? "Save Changes" : "Create Topic"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog 
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Topic"
        message="Are you sure you want to delete this topic? This action cannot be undone, and will be blocked if questions exist."
        confirmText="Yes, delete"
        confirmVariant="danger"
        onConfirm={() => mutationDelete.mutate(deleteConfirmId)}
      />
    </div>
  );
}
