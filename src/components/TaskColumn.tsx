import React from 'react';

import { Task } from '../model/Task';
import TaskItem from './TaskItem';

interface TaskColumnProps {
  tasks: Task[];
  clickTask: (task: Task) => void;
}

class TaskColumn extends React.Component<TaskColumnProps> {
  public render() {
    const { tasks, clickTask } = this.props;

    return (
      <React.Fragment>
        {tasks.map((task: Task) => (
          <TaskItem
            key={task.getId()}
            onClickTask={() => clickTask(task)}
            state={task.getState()}
            name={task.getName()}
            id={task.getId()}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default TaskColumn;
