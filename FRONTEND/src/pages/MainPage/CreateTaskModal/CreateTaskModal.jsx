import { X } from "lucide-react";
import style from "./CreateTaskModal.module.scss";
import { useState } from "react";

const CreateTaskModal = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("todo");
  if (!open) return null;

  const handleCreate = () => {
    if (!title.trim() || !desc.trim()) return alert("Please fill all fields");
    onCreate({ title, desc, status });
    setTitle("");
    setDesc("");
    setStatus("todo");
  };
  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <div className={style.header}>
          <h2>Create Task</h2>
          <X className={style.closeBtn} onClick={onClose} />
        </div>

        <label className={style.label}>Title</label>
        <input
          type="text"
          className={style.input}
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className={style.label}>Description</label>
        <textarea
          className={style.textarea}
          placeholder="Enter description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <label className={style.label}>Status</label>
        <select
          className={style.select}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
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
          <button className={style.createBtn} onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
