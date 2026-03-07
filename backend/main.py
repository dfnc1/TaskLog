from fastapi import FastAPI, HTTPException
from schemas import TaskRequest
from database import *
app = FastAPI()

@app.post('/task')
async def create_task(task: TaskRequest):
    try:
        create(task)
    except Exception as e:
        raise HTTPException(status_code=404, detail=e)

@app.get('/tasks')
async def get_tasks():
    return read()

@app.delete('/tasks/{task_id}')
async def delete_task(task_id: int):
    return delete(task_id)