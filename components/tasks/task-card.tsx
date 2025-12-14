'use client';

import { Task, TaskStatus, TaskPriority } from '@/lib/store/task-store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const statusConfig = {
  [TaskStatus.TODO]: { 
    label: 'À faire', 
    color: 'bg-gray-100 text-gray-700 border border-gray-300',
    icon: Clock,
  },
  [TaskStatus.IN_PROGRESS]: { 
    label: 'En cours', 
    color: 'bg-blue-100 text-blue-700 border border-blue-300',
    icon: Clock,
  },
  [TaskStatus.DONE]: { 
    label: 'Terminé', 
    color: 'bg-green-100 text-green-700 border border-green-300',
    icon: CheckCircle2,
  },
};

const priorityConfig = {
  [TaskPriority.LOW]: { 
    label: 'Basse', 
    color: 'text-gray-500',
    bg: 'bg-gray-50',
  },
  [TaskPriority.MEDIUM]: { 
    label: 'Moyenne', 
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  [TaskPriority.HIGH]: { 
    label: 'Haute', 
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE;
  const StatusIcon = statusConfig[task.status].icon;
  
  return (
    <Card 
      hover 
      onClick={onClick}
      className="group"
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className={cn(
          'p-2 rounded-lg shrink-0 transition-colors',
          task.status === TaskStatus.TODO && 'bg-gray-100 group-hover:bg-gray-200',
          task.status === TaskStatus.IN_PROGRESS && 'bg-blue-100 group-hover:bg-blue-200',
          task.status === TaskStatus.DONE && 'bg-green-100 group-hover:bg-green-200'
        )}>
          <StatusIcon className={cn(
            'h-5 w-5',
            task.status === TaskStatus.TODO && 'text-gray-600',
            task.status === TaskStatus.IN_PROGRESS && 'text-blue-600',
            task.status === TaskStatus.DONE && 'text-green-600'
          )} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {task.title}
            </h3>
            {isOverdue && (
              <div className="shrink-0 flex items-center gap-1 text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                <AlertCircle className="h-3 w-3" />
                En retard
              </div>
            )}
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={statusConfig[task.status].color}>
              {statusConfig[task.status].label}
            </Badge>
            
            <span className={cn(
              'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded',
              priorityConfig[task.priority].bg,
              priorityConfig[task.priority].color
            )}>
              <AlertCircle className="h-3 w-3" />
              {priorityConfig[task.priority].label}
            </span>
            
            {task.dueDate && (
              <span className={cn(
                'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded',
                isOverdue 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-600 bg-gray-50'
              )}>
                <Clock className="h-3 w-3" />
                {format(new Date(task.dueDate), 'dd MMM yyyy', { locale: fr })}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}