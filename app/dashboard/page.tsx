'use client';

import { useTaskStore, TaskStatus } from '@/lib/store/task-store';
import { TaskCard } from '@/components/tasks/task-card';
import { CheckCircle, Clock, ListTodo, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const tasks = useTaskStore((state) => state.tasks);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === TaskStatus.DONE).length,
    inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
    todo: tasks.filter((t) => t.status === TaskStatus.TODO).length,
  };

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d&apos;ensemble de vos tâches</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <ListTodo className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Total
            </span>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">{stats.total}</p>
            <p className="text-purple-100 text-sm">Tâches au total</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Clock className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Actives
            </span>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">{stats.inProgress}</p>
            <p className="text-blue-100 text-sm">En cours</p>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <CheckCircle className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Terminées
            </span>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">{stats.completed}</p>
            <p className="text-green-100 text-sm">Complétées</p>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Taux
            </span>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">{completionRate}%</p>
            <p className="text-orange-100 text-sm">Complétion</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Progression globale</h3>
            <span className="text-sm font-medium text-gray-600">
              {stats.completed} / {stats.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-linear-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>{stats.todo} à faire</span>
            <span>{stats.inProgress} en cours</span>
            <span>{stats.completed} terminées</span>
          </div>
        </div>
      )}

      {/* Recent Tasks */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tâches récentes</h2>
          <button
            onClick={() => router.push('/dashboard/tasks')}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Voir tout →
          </button>
        </div>

        {recentTasks.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <ListTodo className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune tâche pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre première tâche
            </p>
            <button
              onClick={() => router.push('/dashboard/tasks')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer une tâche
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => router.push(`/dashboard/tasks/${task.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
