export enum TaskState {
  OPEN,
  LOCKED,
  COMPLETE
}

export type TaskID = number;

export class Task {
  private readonly id: TaskID;
  private group: string;
  private name: string;
  private dependencyIds: TaskID[];

  private dependenciesCompleted: Set<TaskID>;
  private state: TaskState;
  private children: TaskID[];

  constructor(
    id: TaskID,
    dependencyIds: TaskID[],
    group: string,
    name: string
  ) {
    this.id = id;
    this.dependencyIds = dependencyIds;
    this.group = group;
    this.name = name;

    this.state = TaskState.LOCKED;
    this.children = [];
    this.dependenciesCompleted = new Set<TaskID>();
  }

  public getId(): TaskID {
    return this.id;
  }

  public getDependencyIds(): TaskID[] {
    return this.dependencyIds;
  }

  public getGroup(): string {
    return this.group;
  }

  public getName(): string {
    return this.name;
  }

  public getState(): TaskState {
    return this.state;
  }

  public setState(state: TaskState) {
    this.state = state;
  }

  public getChildren(): TaskID[] {
    return this.children;
  }

  public addChild(taskId: TaskID) {
    this.children.push(taskId);
  }

  public getDependenciesCompleted(): Set<TaskID> {
    return this.dependenciesCompleted;
  }

  public addDependencyCompleted(id: TaskID): void {
    if (this.dependencyIds.indexOf(id) !== -1) {
      this.dependenciesCompleted.add(id);

      if (this.dependenciesCompleted.size === this.dependencyIds.length) {
        this.setState(TaskState.OPEN);
      }
    }
  }

  public deleteDependencyCompleted(id: TaskID): void {
    this.dependenciesCompleted.delete(id);
    if (this.dependenciesCompleted.size !== this.dependencyIds.length) {
      this.setState(TaskState.LOCKED);
    }
  }
}
