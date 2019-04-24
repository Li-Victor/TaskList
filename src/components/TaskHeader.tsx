import React from 'react';

interface TaskHeaderProps {
  groupName: string;
  displayThingsToDo: () => void;
}

class TaskHeader extends React.PureComponent<TaskHeaderProps> {
  public render() {
    const { groupName, displayThingsToDo } = this.props;

    return (
      <React.Fragment>
        <div className="list__header">
          <h1 className="list__header--groupName">{groupName}</h1>

          <h3
            className="list__header--back"
            onClick={() => {
              displayThingsToDo();
            }}
          >
            ALL GROUPS
          </h3>
        </div>

        <hr />
      </React.Fragment>
    );
  }
}

export default TaskHeader;
