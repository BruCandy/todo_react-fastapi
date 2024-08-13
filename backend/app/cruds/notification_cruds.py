from pymongo import MongoClient
from datetime import datetime, timezone, timedelta
from bson import ObjectId

client = MongoClient('mongodb://localhost:27017/')

db = client['fastapi_react_database']

collection = db['notifications']


def notification_post(id,message):
    utc_now = datetime.now(timezone.utc)
    jst = timezone(timedelta(hours=9))
    jst_now = utc_now.astimezone(jst)
    doc = {
        "id":id,
        "message": message,
        "time": jst_now.strftime('%Y/%m/%d %H:%M:%S')
    }
    collection.insert_one(doc)

def notification_delete(id):
    collection.delete_one({"id": id})

def notifications_get():
    notifications = list(collection.find())
    for notification in notifications:
        notification["_id"] = str(notification["_id"])
    return notifications

def notification_get(id):
    notification = collection.find_one({"id":id})
    notification["_id"] = str(notification["_id"])
    return notification