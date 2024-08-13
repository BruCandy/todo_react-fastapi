from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import notifications, todos, users

app = FastAPI()

# CORS設定
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notifications.router)
app.include_router(todos.router)
app.include_router(users.router)

