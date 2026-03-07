import sqlite3
from schemas import TaskRequest
from fastapi import HTTPException

def create(task: TaskRequest):
    try:
        conn = sqlite3.connect('data.sqlite')
        cursor = conn.cursor()
        cursor.execute('''
                       INSERT INTO tasks (matkul, tugas, deadline, description) VALUES (?, ?, ?, ?)
                       ''',(task.matkul, task.tugas, task.deadline, task.description))
        conn.commit()
    except sqlite3.Error as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=400, detail=e)
    finally:
        if conn:
            conn.close()