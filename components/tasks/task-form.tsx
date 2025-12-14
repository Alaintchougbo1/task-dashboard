'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { TaskStatus, TaskPriority } from '@/lib/store/task-store';

const taskSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(100),
  description: z.string().max(500).optional(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  defaultValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export function TaskForm({ defaultValues, onSubmit, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultValues || {
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          {...register('title')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Entrez le titre de la tâche"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Décrivez la tâche..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            id="status"
            {...register('status')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={TaskStatus.TODO}>À faire</option>
            <option value={TaskStatus.IN_PROGRESS}>En cours</option>
            <option value={TaskStatus.DONE}>Terminé</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priorité
          </label>
          <select
            id="priority"
            {...register('priority')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={TaskPriority.LOW}>Basse</option>
            <option value={TaskPriority.MEDIUM}>Moyenne</option>
            <option value={TaskPriority.HIGH}>Haute</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Date d'échéance
        </label>
        <input
          id="dueDate"
          type="date"
          {...register('dueDate')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {defaultValues ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
}