from pydantic import BaseModel

class TaskRequest(BaseModel):
    matkul: str
    tugas: str
    deadline: str
    deskripsi: str