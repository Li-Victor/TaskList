import * as React from 'react';

import Group from '../assets/Group.svg';
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
        <div className="row">
          <div className="row__imageContainer">
            <img src={Group} />
          </div>

          <div>
            <h3 className="row__info--groupName">{groupName}</h3>
            <h4 className="row__info--numTaskCompleted">
              {
                tasks.filter((task: Task) => {
                  return task.getState() === TaskState.COMPLETE;
                }).length
              }{' '}
              OF {tasks.length} TASKS COMPLETE
            </h4>
          </div>
        </div>

        <hr />
      </div>
    );
  });

  return (
    <div className="container">
      <h1 className="dashboard__header">Things To Do</h1>
      <hr />
      {content}
    </div>
  );
};

export default Dashboard;
