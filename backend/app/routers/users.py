from fastapi import APIRouter, HTTPException
from app.cruds.user_cruds import users_get, user_delete, user_get, user_post, user_put
from pydantic import BaseModel

class User(BaseModel):
    id: str
    name: str
    username: str
    email: str
    phone: str

router = APIRouter()

@router.get("/users")
async def get_users():
    users = users_get()
    return users

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id):
    user = user_get(user_id)
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")

@router.post("/users")
async def post_users(user: User): 
    user_post(user.id, user.name, user.username, user.email, user.phone)
    return {"message": "User created successfully"}

@router.put("/users/{user_id}")
async def put_users(user_id: str, user: User):  # "user_id"と"user"の型注釈を追加
    user_put(user_id, user.name, user.username, user.email, user.phone)
    return {"message": "User updated successfully"}

@router.delete("/users/{user_id}")
async def delete_users(user_id):
    try:
        user_delete(user_id)
        return {"message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"User not found: {e}")