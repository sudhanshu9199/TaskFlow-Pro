import { X } from "lucide-react";
import style from "./CreateTaskModal.module.scss";

const CreateTaskModal = ({ open, onClose, onCreate }) => {
  if (!open) return null;
  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <div className={style.header}>
          <h2>Create Task</h2>
          <X className={style.closeBtn} onClick={onClose} />
        </div>

        <label className={style.label}>Title</label>
        <input type="text" className={style.input} placeholder="Enter title" />

        <label className={style.label}>Description</label>
        <textarea
          className={style.textarea}
          placeholder="Enter description"
        ></textarea>

        <label className={style.label}>Status</label>
        <select className={style.select}>
          <option value="todo" className={style.todo}>
            TODO
          </option>
          <option value="pending" className={style.pending}>
            Pending
          </option>
          <option value="completed" className={style.completed}>
            Completed
          </option>
          <option value="high" className={style.high}>
            High Priority
          </option>
        </select>

        <div className={style.actions}>
          <button className={style.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={style.createBtn} onClick={onCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
