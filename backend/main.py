from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import TaskRequest
from database import *
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/task')
async def create_task(task: TaskRequest):
    try:
        create(task)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get('/tasks')
async def get_tasks():
    return [
        {'id': row[0], 'matkul': row[1], 'tugas': row[2], 'deadline': row[3], 'description': row[4],}
        for row in read()
    ]

@app.delete('/tasks/{task_id}')
async def delete_task(task_id: int):
    return delete(task_id)