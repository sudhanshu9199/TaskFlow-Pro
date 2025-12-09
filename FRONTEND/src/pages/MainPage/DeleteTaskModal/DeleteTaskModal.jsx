import style from "./DeleteTaskModal.module.scss";
const DeleteTaskModal = ({ open, task, onCancel, onDelete }) => {
  if (!open || !task) return null;
  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h3>Delete Task?</h3>
        <p>
          Are you sure want to delete <span>'{task.title}'</span>?
        </p>

        <div className={style.btnRow}>
          <button className={style.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={style.deleteBtn} onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
