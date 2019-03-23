import * as React from 'react';

import { Task, TaskState } from './model/Task';
import TaskGraph from './model/TaskGraph';
import Dashboard from './screens/Dashboard';
import TaskList from './screens/TaskList';

import payload from './payload.json';

const graph: TaskGraph = new TaskGraph();
graph.setUp(payload);

interface AppState {
  groups: Map<string, Task[]>;
  displayGroup: string | null;
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    const map = new Map<string, Task[]>();
    graph.getAllTasks().forEach((task: Task) => {
      const group = task.getGroup();
      if (!map.has(group)) map.set(group, [task]);
      else {
        const taskGroup = map.get(group);
        if (taskGroup !== undefined) taskGroup.push(task);
      }
    });

    this.state = {
      groups: map,
      displayGroup: null
    };
  }

  public render() {
    const { groups, displayGroup } = this.state;

    if (displayGroup === null) {
      return (
        <Dashboard groups={groups} displayTaskGroup={this.displayTaskGroup} />
      );
    }

    const tasks = groups.get(displayGroup);
    if (tasks === undefined) return <div />;

    return (
      <TaskList
        groupName={displayGroup}
        tasks={tasks}
        clickTask={this.clickTask}
        displayThingsToDo={this.displayThingsToDo}
      />
    );
  }

  private clickTask = (task: Task) => {
    if (task.getState() !== TaskState.LOCKED) {
      if (task.getState() === TaskState.OPEN) graph.checkTask(task.getId());
      else graph.uncheckTask(task.getId());

      this.setState({});
    }
  };

  private displayTaskGroup = (group: string) => {
    this.setState({
      displayGroup: group
    });
  };

  private displayThingsToDo = () => {
    this.setState({
      displayGroup: null
    });
  };
}

export default App;
