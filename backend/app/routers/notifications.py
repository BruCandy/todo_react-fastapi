from fastapi import APIRouter, HTTPException
from app.cruds.notification_cruds import notifications_get, notification_get, notification_delete, notification_post
from pydantic import BaseModel

router = APIRouter()

class Notification(BaseModel):
    id: str
    message: str

@router.get("/notifications")
async def get_notifications():
    notifications = notifications_get()
    return notifications

@router.get("/notifications/{notification_id}", response_model=Notification)
async def get_notification(notification_id):
    notification = notification_get(notification_id)
    if notification:
        return notification
    raise HTTPException(status_code=404, detail="Notification not found")  

@router.post("/notifications")
async def post_notifications(notification:Notification):
    notification_post(notification.id, notification.message)
    return {"message":"Notification created successfully"}

@router.delete("/notifications/{notification_id}")
async def delete_notifications(notification_id):
    try:
        notification_delete(notification_id)
        return {"message": "Notification deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Notification not found: {e}")