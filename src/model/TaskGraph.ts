import { Task, TaskID, TaskState } from './Task';

export default class TaskGraph {
  private idToTask: Map<TaskID, Task>;

  constructor() {
    this.idToTask = new Map<TaskID, Task>();
  }

  public addTask(task: Task) {
    const id = task.getId();
    this.idToTask.set(id, task);
  }

  public getTask(id: TaskID): Task | undefined {
    return this.idToTask.get(id);
  }

  public getAllTasks(): Task[] {
    const allTasks = Array.from(this.idToTask.values());
    return allTasks;
  }

  public setUp(
    payload: Array<{
      id: number;
      group: string;
      task: string;
      dependencyIds: number[];
      completedAt: null;
    }>
  ): void {
    // add all tasks to the graph
    payload.forEach(task => {
      const taskNode = new Task(
        task.id,
        task.dependencyIds,
        task.group,
        task.task
      );
      this.addTask(taskNode);
    });

    // set children for each task
    payload.forEach(task => {
      const { dependencyIds, id } = task;
      const taskNode = this.getTask(id);

      if (taskNode === undefined) return;

      dependencyIds.forEach((dependency: TaskID) => {
        // all dependencies has this taskNode as their child
        const parentNode = this.getTask(dependency);
        if (parentNode !== undefined) {
          parentNode.addChild(id);
        }
      });
    });

    // initially set all tasks with 0 dependencies to be open
    this.getAllTasks().forEach((task: Task) => {
      if (task.getDependencyIds().length === 0) task.setState(TaskState.OPEN);
    });
  }

  /*
   * checks a task given its id.
   * sets the task to complete, and makes children task nodes open
   */
  public checkTask(id: TaskID): void {
    const taskNode = this.getTask(id);

    if (taskNode === undefined) return;

    const state = taskNode.getState();

    // sanity check, only complete task when task is open open
    if (state === TaskState.COMPLETE || state === TaskState.LOCKED) return;

    taskNode.setState(TaskState.COMPLETE);

    // go through each children, and see if they can be open
    taskNode.getChildren().forEach((childID: TaskID) => {
      const childNode = this.getTask(childID);

      if (childNode === undefined) return;
      childNode.addDependencyCompleted(id);
    });
  }

  /*
   * unchecks a task given its id
   * sets the complete task to be open, and all descendants to be locked
   */
  public uncheckTask(id: TaskID): void {
    const taskNode = this.getTask(id);

    if (taskNode === undefined) return;

    const state = taskNode.getState();

    // sanity check, only uncheck task when task is completed
    if (state === TaskState.OPEN || state === TaskState.LOCKED) return;

    taskNode.setState(TaskState.OPEN);

    // perform bfs and set descendants of task to be locked
    // queue holds descendants IDs
    // dependencyIdQueue holds the dependencyIDs for the child to delete
    const queue: TaskID[] = [...taskNode.getChildren()];
    const dependencyIdQueue: TaskID[] = Array(
      taskNode.getChildren().length
    ).fill(taskNode.getId());

    while (queue.length !== 0 && dependencyIdQueue.length !== 0) {
      const taskChildId = queue.shift();
      const parentId = dependencyIdQueue.shift();

      if (taskChildId === undefined || parentId === undefined) continue;

      const taskChildNode = this.getTask(taskChildId);
      if (taskChildNode === undefined) continue;

      // delete parent off of parents completed and set task to locked
      taskChildNode.deleteDependencyCompleted(parentId);

      taskChildNode.getChildren().forEach((taskChildNodeChildId: TaskID) => {
        queue.push(taskChildNodeChildId);
        dependencyIdQueue.push(taskChildNode.getId());
      });
    }
  }
}
