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
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal/CreateTaskModal";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal/DeleteTaskModal";

const MainPage = () => {
  const [openModal, setopenModal] = useState(false);

  const [tasks, settasks] = useState([
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
      status: "pending",
    },
  ]);

  const [editOpen, seteditOpen] = useState(false);
  const [editingTask, seteditingTask] = useState(null);

  const openEdit = (task) => {
    seteditingTask(task);
    seteditOpen(true);
  };

  const handleUpdate = (updated) => {
    settasks((prev) =>
      prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
    );
    console.log("Updated task:", updated);
  };

  const [deleteOpen, setdeleteOpen] = useState(false);
  const [deleteTask, setdeleteTask] = useState(null);

  const openDelete = (task) => {
    setdeleteTask(task);
    setdeleteOpen(true);
  };
  const handleDelete = (id) => {
    settasks((prev) => prev.filter((t) => t.id !== id));
    setdeleteOpen(false);
  };
  return (
    <div className={style.dashboardContainer}>
      <p
        className={style.mobileCreateTaskBtn}
        onClick={() => setopenModal(true)}
      >
        <Plus />
      </p>
      <div className={style.header}>
        <h2>TaskFlow</h2>
        <div className={style.desktopFeature}>
          <p
            className={style.DeskTopCreateTaskBtn}
            onClick={() => setopenModal(true)}
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

        <div className={style.fullProfile}>
          <div className={style.profile}>
            <img src={profileDP} alt="" />
          </div>
          <div className={style.texts}>
            <p className={style.name}>Sudhanshu</p>
            <p className={style.username}>@sudhanshu9199</p>
          </div>
        </div>
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
            <div key={task.id} className={style.taskNote}>
              <div className={style.leftText}>
                <p>{task.title}</p>
                <p>{task.desc}</p>
                <p className={style.priority}>
                  {task.status === "high" ? "Hight Priority" : task.status}
                </p>
              </div>
              <div className={style.right}>
                <button
                  className={style.iconBtn}
                  aria-label={`Edit ${task.title}`}
                  onClick={() => openEdit(task)}
                >
                  <SquarePen className={style.penIcon} />
                </button>
                <button
                  className={style.iconBtn}
                  aria-label={`Delete ${task.title}`}
                >
                  <Trash2
                    className={style.trash}
                    aria-label={`Delete ${task.title}`}
                    onClick={() => openDelete(task)}
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
        open={openModal}
        onClose={() => setopenModal(false)}
        onCreate={() => {
          console.log("Task created");
          setopenModal(false);
        }}
      />
      <EditTaskModal
        open={editOpen}
        task={editingTask}
        onClose={() => seteditOpen(false)}
        onUpdate={handleUpdate}
      />
      <DeleteTaskModal
        open={deleteOpen}
        task={deleteTask}
        onCancel={() => setdeleteOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MainPage;
