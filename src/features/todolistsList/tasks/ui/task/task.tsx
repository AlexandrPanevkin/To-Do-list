import React, { ChangeEvent, FC, memo } from "react";
import { EditableSpan } from "common/components/EditableSpan/editableSpan";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/todolistsList/tasks/api/tasks.api.types";
import { useActions } from "common/hooks/useActions";
import { tasksThunks } from "features/todolistsList/tasks/model/tasks.reducer";
import s from "./task.module.css";

type PropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<PropsType> = memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const onClickRemoveTaskHandler = () => removeTask({ taskId: task.id, todolistId });

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateTask({
      taskId: task.id,
      domainModel: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
      todolistId,
    });
  };

  const onChangeTaskTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  };

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={onChangeTaskStatusHandler} />

      <EditableSpan value={task.title} onChange={onChangeTaskTitleHandler} />
      <IconButton onClick={onClickRemoveTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
