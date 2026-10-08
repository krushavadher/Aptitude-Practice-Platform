import React, { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Input, Select, Textarea } from '../components/common/Form';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { Loader, Skeleton } from '../components/common/Loader';
import { EmptyState, ErrorState } from '../components/common/States';
import { Modal, ConfirmDialog } from '../components/common/Modal';
import { useToast } from '../components/common/Toast';
import { Pagination } from '../components/common/Pagination';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Mail, CheckCircle, AlertCircle, AlertTriangle, ArrowRight, Brain } from 'lucide-react';

export default function Styleguide() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [page, setPage] = useState(1);
  const toast = useToast();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-12 pb-24">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">Styleguide</h1>
        <p className="text-secondary">Component library built with design tokens.</p>
      </header>

      {/* Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary border-b border-glass-border pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button leftIcon={<Mail className="w-4 h-4" />}>Left Icon</Button>
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Right Icon</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Forms */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary border-b border-glass-border pb-2">Forms</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Email Address" placeholder="you@example.com" helperText="We'll never share your email." />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input label="Username" defaultValue="invalid_user" error="Username already taken" />
          <Select label="Role" options={[{ label: 'Student', value: 'student' }, { label: 'Admin', value: 'admin' }]} />
          <div className="md:col-span-2">
            <Textarea label="Message" placeholder="Type here..." />
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary border-b border-glass-border pb-2">Badges</h2>
        <div className="flex flex-wrap gap-4 items-center bg-glass p-6 rounded-xl">
          <Badge>Neutral</Badge>
          <Badge variant="success" icon={CheckCircle}>Success</Badge>
          <Badge variant="error" icon={AlertCircle}>Error</Badge>
          <Badge variant="warning" icon={AlertTriangle}>Warning</Badge>
          <Badge variant="accent" icon={Brain}>Accent</Badge>
        </div>
      </section>

      {/* Progress & Loaders */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary border-b border-glass-border pb-2">Progress & Loaders</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center bg-glass-strong p-6 rounded-xl">
          <div className="space-y-4 w-full">
            <ProgressBar value={40} max={100} label="40% completed" />
            <ProgressBar value={75} max={100} tone="warning" label="Time running out" />
            <ProgressBar value={95} max={100} tone="error" label="Almost out of time" />
          </div>
          <div className="flex items-center justify-center gap-8">
            <Loader size={32} />
            <div className="w-full max-w-[200px] space-y-2">
              <Skeleton variant="circle" />
              <Skeleton variant="line" />
              <Skeleton variant="line" className="w-2/3" />
            </div>
          </div>
        </div>
      </section>

      {/* Cards & States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary border-b border-glass-border pb-2">Cards & States</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-lg font-bold mb-2">Normal Glass Card</h3>
            <p className="text-secondary">Standard card for general layouts.</p>
          </GlassCard>
          <GlassCard strong>
            <h3 className="text-lg font-bold mb-2">Strong Glass Card</h3>
            <p className="text-secondary">Used for forms and questions.</p>
          </GlassCard>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <EmptyState title="No items found" description="Try adjusting your filters or creating a new item." icon={AlertCircle} action={<Button size="sm">Create Item</Button>} />
          <ErrorState message="Failed to load the questions. Please check your connection." onRetry={() => {}} />
        </div>
      </section>

      {/* Overlays */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary border-b border-glass-border pb-2">Overlays (Modals & Toasts)</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>Open Confirm</Button>
          
          <Button variant="secondary" onClick={() => toast({ message: 'Saved successfully', type: 'success' })}>Success Toast</Button>
          <Button variant="secondary" onClick={() => toast({ message: 'Connection lost', type: 'error' })}>Error Toast</Button>
          <Button variant="secondary" onClick={() => toast({ message: 'Update available', type: 'info' })}>Info Toast</Button>
          <Button variant="secondary" onClick={() => toast({ message: 'Storage almost full', type: 'warning' })}>Warning Toast</Button>
        </div>
      </section>

      {/* Pagination */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary border-b border-glass-border pb-2">Pagination</h2>
        <GlassCard>
          <Pagination page={page} totalPages={10} onChange={setPage} />
        </GlassCard>
      </section>

      {/* Theme */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary border-b border-glass-border pb-2">Theme</h2>
        <ThemeToggle />
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Sample Modal">
        <p className="text-secondary mb-6">This is a strong glass modal with focus trap and scroll lock.</p>
        <div className="flex justify-end">
          <Button onClick={() => setModalOpen(false)}>Done</Button>
        </div>
      </Modal>

      <ConfirmDialog 
        isOpen={confirmOpen} 
        onClose={() => setConfirmOpen(false)} 
        title="Delete Item" 
        message="Are you sure you want to delete this item? This cannot be undone." 
        danger 
        confirmText="Delete" 
        onConfirm={() => toast({ type: 'success', message: 'Item deleted' })} 
      />
    </div>
  );
}
