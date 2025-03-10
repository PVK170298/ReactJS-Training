import React, { useState } from 'react';
import {create} from 'zustand';
import './TodoList.css';
interface Task {
  id: number;
  text: string;
  completed: boolean;
}
interface TodoStore {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  toggleComplete: (id: number) => void;
  getCompletedTaskCount: () => number;
  getTotalTaskCount: () => number ;
  getCompletedPercentage: () => number;
}
const useTodoStore = create<TodoStore>((set, get) => ({
  tasks: [],
  addTask: (text) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), text, completed: false }],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  editTask: (id, newText) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      ),
    })),
  toggleComplete: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  getCompletedTaskCount: () =>
    get().tasks.filter((task) => task.completed).length,
  getTotalTaskCount:() =>{
    const totalTasks = get().tasks.length;
    return(totalTasks) ;
  },
  getCompletedPercentage: () => {
    const totalTasks = get().tasks.length;
    const completedTasks = get().getCompletedTaskCount();
    if (totalTasks === 0) return 0;
    return (completedTasks / totalTasks) * 100;
  },
}));
const TodoList: React.FC = () => {
  const {
    tasks,
    addTask,
    deleteTask,
    editTask,
    toggleComplete,
    getCompletedTaskCount,
    getTotalTaskCount,
    getCompletedPercentage,
  } = useTodoStore();
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState<string>('');
  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };
  const handleEdit = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };
  const handleSaveEdit = (id: number) => {
    if (editingTaskText.trim()) {
      editTask(id, editingTaskText);
      setEditingTaskId(null);
      setEditingTaskText('');
    }
  };
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };
  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="task-display">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <span
                  className={`task-text ${task.completed ? 'completed' : ''}`}
                >
                  {task.text}
                </span>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task.id, task.text)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="task-stats">
        <p>Completed Tasks: {getCompletedTaskCount()}</p>
        <p>Total Tasks : {getTotalTaskCount()}</p>
        <p>Completed Percentage: {getCompletedPercentage().toFixed(2)}%</p>
      </div>
    </div>
  );
};
export default TodoList;
 
