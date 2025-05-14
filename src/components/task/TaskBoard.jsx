import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const defaultTask = {
  id: crypto.randomUUID(),
  title: "Learn React Native",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  tags: ["react", "javascript"],
  priority: "High",
  isFavorite: true,
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(tasks.map((task) => (task.id === newTask.id ? newTask : task)));
    }
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleDeleteTask = (id) => {
    const tasksAfterDelete = tasks.filter((task) => task.id !== id);
    setTasks(tasksAfterDelete);
  };

  const handleDeleteAllClick = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFavorite = (taskId) => {
    // const taskIndex = tasks.findIndex((task) => task.id === taskId);
    // const newTasks = [...tasks];
    // newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;

    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
    );

    setTasks(newTasks);
  };

  const handleSearch = (searchTerm) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks(filtered);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}

      <div className="container">
        {/* Search Box */}
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>
        {/* Search Box Ends */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
