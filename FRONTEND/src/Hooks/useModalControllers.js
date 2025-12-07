import { useState } from "react";

export default function useModalControllers() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const openEditModal = (task) => {
    setEditingTask(task);
    setOpenEdit(true);
  };

  const openDeleteModal = (task) => {
    setDeletingTask(task);
    setOpenDelete(true);
  };

  return {
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
  };
}
