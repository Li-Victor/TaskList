import React from 'react';

import Completed from '../assets/Completed.svg';
import Incomplete from '../assets/Incomplete.svg';
import Locked from '../assets/Locked.svg';

import { TaskState } from '../model/Task';

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

interface TaskItemProps {
  onClickTask: () => void;
  state: TaskState;
  name: string;
  id: number;
}

class TaskItem extends React.Component<TaskItemProps> {
  public shouldComponentUpdate(nextProps: TaskItemProps) {
    if (this.props.id !== nextProps.id) return true;
    // same id, but different states for task
    if (this.props.state !== nextProps.state) return true;

    return false;
  }

  public render() {
    const { onClickTask, state, id, name } = this.props;

    return (
      <div onClick={onClickTask}>
        <div className="row">
          <div className="row__logoContainer">
            <img src={getImage(state)} className="row__logoContainer--image" />
          </div>
          <div className={getStyle(state)}>{name}</div>
        </div>
        <hr />
      </div>
    );
  }
}

export default TaskItem;
