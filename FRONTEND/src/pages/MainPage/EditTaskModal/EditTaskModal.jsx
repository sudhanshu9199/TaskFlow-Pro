import style from "./EditTaskModal.module.scss";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';

const STATUS_OPTIONS = [
  { value: "todo", label: "TODO", tokenClass: style.todoToken },
  { value: "pending", label: "Pending", tokenClass: style.pendingToken },
  { value: "completed", label: "Completed", tokenClass: style.completedToken },
  { value: "high", label: "High Priority", tokenClass: style.highToken },
];

const EditTaskModal = ({ open, onClose, task = {}, onUpdate }) => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [status, setstatus] = useState("todo");
  const [submitting, setsubmitting] = useState(false);
  const backdropRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (open & task) {
      settitle(task.title || "");
      setdesc(task.desc || "");
      setstatus(task.status || "todo");
      // lock scroll
      document.body.style.overflow = "hidden";
      // focus first input after a tick
      setTimeout(() => firstInputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open, task]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(e);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, title, desc, status, onClose]);
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) {
      firstInputRef.current?.focus();
      return;
    }
    setsubmitting(true);
    try {
      // simulate API call or pass data to parent
      const payload = {
        ...task,
        title: title.trim(),
        desc: desc.trim(),
        status,
      };
      await new Promise((r) => setTimeout(r, 350)); // simulate latency
      onUpdate && onUpdate(payload);
      toast.success('Task updated successfully!🚀')
      onClose();
    } catch (err) {
      console.error("Update failed", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setsubmitting(false);
    }
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className={style.backdrop}
      ref={backdropRef}
      onMouseDown={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-task-title"
    >
      <div className={style.sheet} role="document">
        <header className={style.header}>
          <h3 id="edit-task-title">Edit Task</h3>
        </header>

        <form onSubmit={handleSubmit} className={style.form}>
          <label htmlFor="task-title" className={style.label}>
            Title
          </label>
          <input
            ref={firstInputRef}
            id="task-title"
            value={title}
            className={style.input}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Task title"
            maxLength={120}
            required
            aria-required="true"
          />

          <label className={style.label} htmlFor="task-desc">
            Description
          </label>
          <textarea
            id="task-desc"
            className={style.textarea}
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
            placeholder="Describe the task"
            rows={4}
          />

          <label className={style.label}>Status</label>
          <div
            className={style.statusList}
            role="radiogroup"
            aria-label="Task status"
          >
            {STATUS_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`${style.statusOption} ${
                  status === opt.value ? style.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={opt.value}
                  checked={status === opt.value}
                  onChange={() => setstatus(opt.value)}
                />
                <span
                  className={`${style.token} ${opt.tokenClass}`}
                  aria-hidden="true"
                />
                <span className={style.statusLabel}>{opt.label}</span>
              </label>
            ))}
          </div>

          <div className={style.actions}>
            <button
              type="button"
              className={style.cancelBtn}
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={style.updateBtn}
              disabled={submitting || !title.trim()}
            >
              {submitting ? "Updating…" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

EditTaskModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  task: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default EditTaskModal;
