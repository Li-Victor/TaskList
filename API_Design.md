# API Design

## Checking a Task

```
/api/task/check
```

## Unchecking a Task

```
/api/task/uncheck
```

## Parameters

| Parameter | Required | Description | Example |
| --------- |:--------:|:-----------:|:-------:|
| id        | Required | Task id to be checked or unchecked | 5 |

## Example Request
```
/api/task/check?id=7
```

## Example Response

- Success Response
```
{
    status: 200,
    message: "Successfully checked task id 7"
    group: "Build Airplane",
    dependencyId: [5, 6],
    completedAt: "2019-03-25 12:00:10.309401"
}
```

- Bad Request Response
```
{
    status: 400,
    message: "Bad Request. Task id not given"
}
```

- Not Found Response
```
{
    status: 404,
    message: "Task id 7 does not exist"
}
```

- Server Error Response
```
{
    status: 500,
    message: "Internal Server Error"
}

```