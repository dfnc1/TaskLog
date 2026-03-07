from fastapi import FastAPI, HTTPException

from schemas import TaskRequest
from database import create
app = FastAPI()

@app.post('/task')
async def create_task(task: TaskRequest):
    try:
        create(task)
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))


# @app.get('/tasks')
# async def get_tasks():
#     return temp