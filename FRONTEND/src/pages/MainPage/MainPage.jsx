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
import { Link } from 'react-router';
import useTasks from "../../Hooks/useTasks";
import useModalControllers from "../../Hooks/useModalControllers";

import CreateTaskModal from "./CreateTaskModal/CreateTaskModal";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal/DeleteTaskModal";

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

  const [tasks, setTasks, updateTask, deleteTask] = useTasks([
    {
      id: "1",
      title: "Website Redesign",
      desc: "Finalize homepage mockup.",
      status: "high",
    },
    {
      id: "2",
      title: "Write docs",
      desc: "Complete API docs v1",
      status: "completed",
    },
    {
      id: "3",
      title: "Day 8",
      desc: "1. Complete the todo project. 2. Drink water. 3. Listen god songs. 4. Help to mother",
      status: "pending",
    },
    {
      id: "4",
      title: "Day 7",
      desc: "1. Project Dashboard UI almost done.",
      status: "todo",
    },
  ]);

  return (
    <div className={style.dashboardContainer}>
      <p
        className={style.mobileCreateTaskBtn}
        onClick={() => setOpenCreate(true)}
      >
        <Plus />
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
              <li>
                <List className={style.icons} />
                <p>All Tasks</p>
              </li>
              <li>
                <Check className={style.icons} />
                <p>Completed</p>
              </li>
              <li>
                <Clock className={style.icons} />
                <p>Pending</p>
              </li>
              <li>
                <Flame className={style.icons} />
                <p>Hight Priority</p>
              </li>
            </ul>
          </div>
        </div>

        <Link to='/profile' className={style.fullProfile}>
          <div className={style.profile}>
            <img src={profileDP} alt="" />
          </div>
          <div className={style.texts}>
            <p className={style.name}>Sudhanshu</p>
            <p className={style.username}>@sudhanshu9199</p>
          </div>
        </Link>
      </div>

      <div className={style.belowAllContainers}>
        <div className={style.taskSummary}>
          <div className={style.allTasks}>
            <List className={`${style.icons} ${style.listIcon}`} />
            <p className={style.name}>Total Tasks</p>
            <p className={style.number}>(24)</p>
          </div>
          <div className={style.allTasks}>
            <Check className={`${style.icons} ${style.checkIcon}`} />
            <p className={style.name}>Completed</p>
            <p className={style.number}>(8)</p>
          </div>
          <div className={style.allTasks}>
            <Clock className={`${style.icons} ${style.clockIcon}`} />
            <p className={style.name}>Pending</p>
            <p className={style.number}>(12)</p>
          </div>
          <div className={style.allTasks}>
            <Flame className={`${style.icons} ${style.flameIcon}`} />
            <p className={style.name}>High Priority</p>
            <p className={style.number}>(4)</p>
          </div>
        </div>

        <div className={style.filters}>
          <ul>
            <li>All</li>
            <li>Completed</li>
            <li>Pending</li>
            <li>High Priority</li>
          </ul>
        </div>

        <div className={style.tasksListDisplay}>
          {tasks.map((task) => (
            <div key={task.id} className={`${style.taskNote} ${style[task.status]}`}>
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
          ))}
          <div className={style.taskNote}>
            <div className={style.leftText}>
              <p>Website Redesign</p>
              <p>Finalize homepage mockup.</p>
              <p className={style.priority}>High Priority</p>
            </div>
            <div className={style.right}>
              <SquarePen className={style.penIcon} />
              <Trash2 className={style.trash} />
            </div>
          </div>
        </div>
      </div>
      <CreateTaskModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={(newTask) => {
          setTasks(prev => [...prev, newTask]);
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
        onDelete={id => {
            deleteTask(id);
            setOpenDelete(false);
        }}
      />
    </div>
  );
};

export default MainPage;
