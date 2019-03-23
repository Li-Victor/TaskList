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
  private dependencyIds: Set<TaskID>;

  private parentsCompleted: Set<TaskID>;
  private state: TaskState;
  private children: TaskID[];

  constructor(
    id: TaskID,
    dependencyIds: TaskID[],
    group: string,
    name: string
  ) {
    this.id = id;
    this.dependencyIds = new Set(dependencyIds);
    this.group = group;
    this.name = name;

    this.state = TaskState.LOCKED;
    this.children = [];
    this.parentsCompleted = new Set<TaskID>();
  }

  public getId(): TaskID {
    return this.id;
  }

  public getDependencies(): Set<TaskID> {
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

  public getParentsCompleted(): Set<TaskID> {
    return this.parentsCompleted;
  }
}
