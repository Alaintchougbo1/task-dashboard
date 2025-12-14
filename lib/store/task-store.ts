import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NavigationProps {
  onNavigate: () => void;
}

export interface FeatureProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
}

export interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  isGreen?: boolean;
}

export interface TaskItemProps {
  title: string;
  project: string;
  status: 'En cours' | 'Terminé' | 'En attente';
  date: string;
  avatar: string; // URL de l'image
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

// Données initiales de démonstration
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Configurer le projet Next.js',
    description: 'Initialiser le projet avec TypeScript et Tailwind CSS',
    status: TaskStatus.DONE,
    priority: TaskPriority.HIGH,
    createdAt: new Date('2024-12-01').toISOString(),
    updatedAt: new Date('2024-12-01').toISOString(),
  },
  {
    id: '2',
    title: 'Créer les composants UI',
    description: 'Développer les composants réutilisables du design system',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    createdAt: new Date('2024-12-05').toISOString(),
    updatedAt: new Date('2024-12-10').toISOString(),
  },
  {
    id: '3',
    title: 'Implémenter le système de filtres',
    description: 'Ajouter des filtres par statut et priorité',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    dueDate: new Date('2024-12-20').toISOString(),
    createdAt: new Date('2024-12-08').toISOString(),
    updatedAt: new Date('2024-12-08').toISOString(),
  },
  {
    id: '4',
    title: 'Écrire les tests unitaires',
    description: 'Couvrir tous les composants avec des tests Jest',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    dueDate: new Date('2024-12-25').toISOString(),
    createdAt: new Date('2024-12-10').toISOString(),
    updatedAt: new Date('2024-12-10').toISOString(),
  },
  {
    id: '5',
    title: 'Optimiser les performances',
    description: 'Lazy loading et optimisation des images',
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    createdAt: new Date('2024-12-12').toISOString(),
    updatedAt: new Date('2024-12-12').toISOString(),
  },
];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, taskData) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id);
      },

      getTasksByStatus: (status) => {
        return get().tasks.filter((task) => task.status === status);
      },
    }),
    {
      name: 'task-storage',
    }
  )
);
