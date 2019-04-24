import * as React from 'react';

import TaskColumn from '../components/TaskColumn';
import TaskHeader from '../components/TaskHeader';
import { Task } from '../model/Task';

interface TaskItemProps {
  groupName: string;
  tasks: Task[];
  clickTask: (task: Task) => void;
  displayThingsToDo: () => void;
}

const TaskList = ({
  groupName,
  tasks,
  clickTask,
  displayThingsToDo
}: TaskItemProps) => {
  return (
    <div className="container">
      <TaskHeader groupName={groupName} displayThingsToDo={displayThingsToDo} />
      <TaskColumn tasks={tasks} clickTask={clickTask} />
    </div>
  );
};

export default TaskList;
