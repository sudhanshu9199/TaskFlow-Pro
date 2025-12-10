import style from "./MainPage.module.scss";
import {
  List,
  Check,
  Clock,
  Flame,
  SquarePen,
  Trash2,
  Plus,
} from "lucide-react";
import profileDP from "../../assets/profileDP.jpg";
import { Link } from "react-router";
import useTasks from "../../Hooks/useTasks";
import useModalControllers from "../../Hooks/useModalControllers";
import { toast } from 'react-toastify';

import CreateTaskModal from "./CreateTaskModal/CreateTaskModal";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal/DeleteTaskModal";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const MainPage = () => {
  const {
    openCreate,
    setOpenCreate,
    openEdit,
    setOpenEdit,
    editingTask,
    openEditModal,
    openDelete,
    setOpenDelete,
    deletingTask,
    openDeleteModal,
  } = useModalControllers();

  const { user } = useSelector((s) => s.auth);

  const {tasks, createTask, updateTask, deleteTask} = useTasks([]);

  const [filter, setfilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if(filter === 'all') return true;
    return task.status === filter;
  })

  return (
    <div className={style.dashboardContainer}>
      <p
        className={style.mobileCreateTaskBtn}
        onClick={() => setOpenCreate(true)}
      >
        <Plus className={style.plusIcon} />
      </p>
      <div className={style.header}>
        <h2>TaskFlow</h2>
        <div className={style.desktopFeature}>
          <p
            className={style.DeskTopCreateTaskBtn}
            onClick={() => setOpenCreate(true)}
          >
            Create Task
          </p>
          <div className={style.DeskTopFilters}>
            <ul>
              <li onClick={() => setfilter("all")} style={{ background: filter === "all" ? "#e0f2fe" : "transparent" }}>
                <List className={style.icons} />
                <p>All Tasks</p>
              </li>
              <li onClick={() => setfilter("completed")} style={{ background: filter === "completed" ? "#e0f2fe" : "transparent" }}>
                <Check className={style.icons} />
                <p>Completed</p>
              </li>
              <li onClick={() => setfilter("pending")} style={{ background: filter === "pending" ? "#e0f2fe" : "transparent" }}>
                <Clock className={style.icons} />
                <p>Pending</p>
              </li>
              <li onClick={() => setfilter("high")} style={{ background: filter === "high" ? "#e0f2fe" : "transparent" }}>
                <Flame className={style.icons} />
                <p>Hight Priority</p>
              </li>
            </ul>
          </div>
        </div>

        <Link to="/profile" className={style.fullProfile}>
          <div className={style.profile}>
            <img src={profileDP} alt="" />
          </div>
          <div className={style.texts}>
            <p className={style.name}>{user?.name || "User"}</p>
            <p className={style.username}>@{user?.username || "username"}</p>
          </div>
        </Link>
      </div>

      <div className={style.belowAllContainers}>
        <div className={style.taskSummary}>
          <div className={style.allTasks}>
            <List className={`${style.icons} ${style.listIcon}`} />
            <p className={style.name}>Total Tasks</p>
            <p className={style.number}>({tasks.length})</p>
          </div>
          <div className={style.allTasks}>
            <Check className={`${style.icons} ${style.checkIcon}`} />
            <p className={style.name}>Completed</p>
            <p className={style.number}>
              ({tasks.filter((t) => t.status === "completed").length})
            </p>
          </div>
          <div className={style.allTasks}>
            <Clock className={`${style.icons} ${style.clockIcon}`} />
            <p className={style.name}>Pending</p>
            <p className={style.number}>
              ({tasks.filter((t) => t.status === "pending").length})
            </p>
          </div>
          <div className={style.allTasks}>
            <Flame className={`${style.icons} ${style.flameIcon}`} />
            <p className={style.name}>High Priority</p>
            <p className={style.number}>
              ({tasks.filter((t) => t.status === "high").length})
            </p>
          </div>
        </div>

        <div className={style.filters}>
          <ul>
            <li onClick={() => setfilter("all")} style={{ background: filter === "all" ? "#4b7a92" : "transparent", color: filter === "all" ? "white" : "inherit" }}>All</li>
            <li onClick={() => setfilter("completed")} style={{ background: filter === "completed" ? "#4b7a92" : "transparent", color: filter === "completed" ? "white" : "inherit" }}>Completed</li>
            <li onClick={() => setfilter("pending")} style={{ background: filter === "pending" ? "#4b7a92" : "transparent", color: filter === "pending" ? "white" : "inherit" }}>Pending</li>
            <li onClick={() => setfilter("high")} style={{ background: filter === "high" ? "#4b7a92" : "transparent", color: filter === "high" ? "white" : "inherit" }}>High Priority</li>
          </ul>
        </div>

        <div className={style.tasksListDisplay}>
          { filteredTasks.length === 0 ? (
            <p style={{textAlign: "center", marginTop: "2rem", color: "gray"}}>No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
            <div
              key={task._id}
              className={`${style.taskNote} ${style[task.status]}`}
            >
              <div className={style.leftText}>
                <p>{task.title}</p>
                <p>{task.desc}</p>
                <p className={`${style.priority} ${style[task.status]}`}>
                  {task.status === "high" ? "Hight Priority" : task.status}
                </p>
              </div>
              <div className={style.right}>
                <button
                  className={style.iconBtn}
                  aria-label={`Edit ${task.title}`}
                  onClick={() => openEditModal(task)}
                >
                  <SquarePen className={style.penIcon} />
                </button>
                <button
                  className={style.iconBtn}
                  aria-label={`Delete ${task.title}`}
                >
                  <Trash2
                    className={style.trash}
                    onClick={() => openDeleteModal(task)}
                  />
                </button>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
      <CreateTaskModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={(newTask) => {
          createTask(newTask);
          setOpenCreate(false);
        }}
      />
      <EditTaskModal
        open={openEdit}
        task={editingTask}
        onClose={() => setOpenEdit(false)}
        onUpdate={updateTask}
      />
      <DeleteTaskModal
        open={openDelete}
        task={deletingTask}
        onCancel={() => setOpenDelete(false)}
        onDelete={(id) => {
          deleteTask(id);
          toast.success('Task Deleted! 🗑️');
          setOpenDelete(false);
        }}
      />
    </div>
  );
};

export default MainPage;
