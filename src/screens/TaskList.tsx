import * as React from 'react';

import Completed from '../assets/Completed.svg';
import Incomplete from '../assets/Incomplete.svg';
import Locked from '../assets/Locked.svg';
import { Task, TaskState } from '../model/Task';

interface TaskItemProps {
  groupName: string;
  tasks: Task[];
  clickTask: (task: Task) => void;
  displayThingsToDo: () => void;
}

function getStyle(state: TaskState): string {
  switch (state) {
    case TaskState.LOCKED:
      return 'row__task row__task--locked';
    case TaskState.COMPLETE:
      return 'row__task row__task--completed';
    default:
      return 'row__task';
  }
}

function getImage(state: TaskState): string {
  switch (state) {
    case TaskState.OPEN:
      return Incomplete;
    case TaskState.COMPLETE:
      return Completed;
    default:
      return Locked;
  }
}

const TaskList = ({
  groupName,
  tasks,
  clickTask,
  displayThingsToDo
}: TaskItemProps) => (
  <div className="container">
    <div className="list__header">
      <h1 className="list__header--groupName">{groupName}</h1>

      <h3
        className="list__header--back"
        onClick={() => {
          displayThingsToDo();
        }}
      >
        ALL GROUPS
      </h3>
    </div>

    <hr />

    {tasks.map((task: Task) => (
      <div
        key={task.getId()}
        onClick={() => {
          clickTask(task);
        }}
      >
        <div className="row">
          <div className="row__logoContainer">
            <img
              src={getImage(task.getState())}
              className="row__logoContainer--image"
            />
          </div>
          <div className={getStyle(task.getState())}>{task.getName()}</div>
        </div>
        <hr />
      </div>
    ))}
  </div>
);

export default TaskList;
