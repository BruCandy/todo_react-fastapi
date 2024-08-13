from fastapi import APIRouter, HTTPException
from app.cruds.todo_cruds import todos_get, todo_delete, todo_get, todo_post, todo_put
from pydantic import BaseModel

router = APIRouter()

class Todo(BaseModel):
    id: str
    todo: str
    priority: str
    date: str
    detail: str

@router.get("/todos")
async def get_todos():
    todos = todos_get()
    return todos

@router.get("/todos/{todo_id}", response_model=Todo)
async def get_todos(todo_id):
    todo = todo_get(todo_id)
    if todo:
        return todo
    raise HTTPException(status_code=404, detail="Todo not found")    

@router.post("/todos")
async def post_todos(todo:Todo):
    todo_post(todo.id,todo.todo,todo.priority,todo.date,todo.detail)
    return {"message":"Todo created successfully"}

@router.put("/todos/{todo_id}")
async def put_todos(todo_id,todo:Todo):
    try:
        todo_put(todo_id, todo.todo,todo.priority,todo.date,todo.detail)
        return {"message": "Todo updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Todo not found: {e}")

@router.delete("/todos/{todo_id}")
async def delete_todos(todo_id):
    try:
        todo_delete(todo_id)
        return {"message": "Todo deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Todo not found: {e}")