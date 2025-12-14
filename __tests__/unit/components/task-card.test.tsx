import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskCard } from '@/components/tasks/task-card';
import { Task, TaskStatus, TaskPriority } from '@/lib/store/task-store';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test description',
  status: TaskStatus.TODO,
  priority: TaskPriority.HIGH,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('TaskCard', () => {
  it('renders task information correctly', () => {
    render(<TaskCard task={mockTask} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<TaskCard task={mockTask} onClick={handleClick} />);
    
    const card = screen.getByText('Test Task').closest('div')?.parentElement;
    if (card) {
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });
});