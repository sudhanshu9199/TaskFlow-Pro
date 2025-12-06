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
// import EditTaskModal from "./EditTaskModal/EditTaskModal";

const MainPage = () => {
  const [openModal, setopenModal] = useState(false);
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
          <div className={style.taskNote}>
            <div className={style.leftText}>
              <p>Client Meeting</p>
              <p>Prepare Presentation slides.</p>
              <p>Pending</p>
            </div>
            <div className={style.right}>
              <SquarePen className={style.penIcon} />
              <Trash2 className={style.trash} />
            </div>
          </div>
          <div className={style.taskNote}>
            <div className={style.leftText}>
              <p>Client Meeting</p>
              <p>Prepare Presentation slides.</p>
              <p>Pending</p>
            </div>
            <div className={style.right}>
              <SquarePen className={style.penIcon} />
              <Trash2 className={style.trash} />
            </div>
          </div>
          <div className={style.taskNote}>
            <div className={style.leftText}>
              <p>Client Meeting</p>
              <p>Prepare Presentation slides.</p>
              <p>Pending</p>
            </div>
            <div className={style.right}>
              <SquarePen className={style.penIcon} />
              <Trash2 className={style.trash} />
            </div>
          </div>
          <div className={style.taskNote}>
            <div className={style.leftText}>
              <p>Client Meeting</p>
              <p>Prepare Presentation slides.</p>
              <p>Pending</p>
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
    </div>
  );
};

export default MainPage;
