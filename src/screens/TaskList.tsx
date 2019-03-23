import * as React from 'react';

import { Task, TaskState } from '../model/Task';

interface TaskItemProps {
  groupName: string;
  tasks: Task[];
  clickTask: (task: Task) => void;
  displayThingsToDo: () => void;
}

function getColor(state: TaskState): string {
  switch (state) {
    case TaskState.OPEN:
      return 'black';
    case TaskState.COMPLETE:
      return 'green';
    default:
      return 'red';
  }
}

const TaskList = ({
  groupName,
  tasks,
  clickTask,
  displayThingsToDo
}: TaskItemProps) => (
  <React.Fragment>
    <h1>{groupName}</h1>
    <h3
      onClick={() => {
        displayThingsToDo();
      }}
    >
      ALL GROUPS
    </h3>
    {tasks.map((task: Task) => (
      <div
        key={task.getId()}
        style={{ color: getColor(task.getState()) }}
        onClick={() => {
          clickTask(task);
        }}
      >
        {task.getName()}
      </div>
    ))}
  </React.Fragment>
);

export default TaskList;
