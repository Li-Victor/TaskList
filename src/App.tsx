import * as React from 'react';

import { Task, TaskState } from './model/Task';
import TaskGraph from './model/TaskGraph';

import payload from './payload.json';

const graph: TaskGraph = new TaskGraph();
graph.setUp(payload);

interface AppState {
  tasks: Task[];
}

class App extends React.Component<{}, AppState> {
  public state = {
    tasks: graph.getAllTasks()
  };

  public render() {
    return (
      <div>
        {this.state.tasks.map((task: Task) => (
          <div
            key={task.getId()}
            style={{ color: this.getColor(task.getState()) }}
            onClick={() => this.clickTask(task)}
          >
            {task.getGroup()}: {task.getName()}
          </div>
        ))}
      </div>
    );
  }

  private clickTask = (task: Task) => {
    if (task.getState() !== TaskState.LOCKED) {
      if (task.getState() === TaskState.OPEN) graph.checkTask(task.getId());
      else graph.uncheckTask(task.getId());

      this.setState({});
    }
  };

  private getColor = (state: TaskState): string => {
    switch (state) {
      case TaskState.OPEN:
        return 'black';
      case TaskState.COMPLETE:
        return 'green';
      default:
        return 'red';
    }
  };
}

export default App;
