import sqlite3
from schemas import TaskRequest
from fastapi import HTTPException

def connection() -> sqlite3.Connection:
    try:
        conn = sqlite3.connect(
            "data.sqlite",
            isolation_level=None,
            check_same_thread=False
        )
    except sqlite3.Error as e:
        raise HTTPException(status_code=400, detail=e)

    return conn

def create(task: TaskRequest) -> TaskRequest:
    try:
        cursor = connection().cursor()
        cursor.execute('INSERT INTO tasks (matkul, tugas, deadline, description) VALUES (?, ?, ?, ?)',
                       (task.matkul, task.tugas, task.deadline, task.descripsi))
    except sqlite3.Error as e:
        raise HTTPException(status_code=404, detail=e)

    return task

def read() -> list[TaskRequest]:
    cursor = connection().cursor()
    cursor.execute('SELECT * FROM tasks')
    data = cursor.fetchall()

    return [row for row in data]

def delete(id: int):
    try:
        cursor = connection().cursor()
        cursor.execute(' DELETE FROM tasks WHERE id = ? ',
                       (id,))
        # cursor.execute('UPDATE tasks SET id = id - 1 WHERE id > 5 ;')
    except sqlite3.Error as e:
        raise HTTPException(status_code=404, detail=e)
