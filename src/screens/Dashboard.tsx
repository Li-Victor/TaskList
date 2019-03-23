import * as React from 'react';

import { Task, TaskState } from '../model/Task';

interface DashboardProps {
  groups: Map<string, Task[]>;
  displayTaskGroup: (group: string) => void;
}

const Dashboard = ({ groups, displayTaskGroup }: DashboardProps) => {
  const entries = Array.from(groups.entries());
  const content = entries.map(group => {
    const [groupName, tasks] = group;
    return (
      <div key={groupName} onClick={() => displayTaskGroup(groupName)}>
        <h1>{groupName}</h1>
        <h3>
          {
            tasks.filter((task: Task) => {
              return task.getState() === TaskState.COMPLETE;
            }).length
          }{' '}
          OF {tasks.length} TASKS COMPLETE
        </h3>
      </div>
    );
  });

  return <div>{content}</div>;
};

export default Dashboard;
