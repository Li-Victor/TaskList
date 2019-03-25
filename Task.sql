-- It is a many to many relationship, so the relationship table is DependencyTask.
-- schema written in PostgreSQL

CREATE TABLE Task (
    id SERIAL NOT NULL PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    completed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE DependencyTask (
    task_id SERIAL NOT NULL,
    dependency_task_id SERIAL NOT NULL,
    FOREIGN KEY (task_id) REFERENCES Task(id) ON DELETE CASCADE,
    FOREIGN KEY (dependency_task_id) REFERENCES Task(id) ON DELETE CASCADE
);