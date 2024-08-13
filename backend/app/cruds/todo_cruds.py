from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

client = MongoClient('mongodb://localhost:27017/')

db = client['fastapi_react_database']

collection = db['todos']


def todo_post(id,todo,priority,date:datetime,detail):
    doc = {
        "id":id,
        "todo":todo,
        "priority":priority,
        "date":date,
        "detail":detail
    }
    collection.insert_one(doc)

def todo_delete(id):
    collection.delete_one({"id": id})

def todos_get():
    todos = list(collection.find())
    for todo in todos:
        todo["_id"] = str(todo["_id"])
    return todos

def todo_get(id):
    todo = collection.find_one({"id":id})
    todo["_id"] = str(todo["_id"])
    return todo

def todo_put(id,todo,priority,date:datetime,detail):
    new = {
        "todo":todo,
        "priority":priority,
        "date":date,
        "detail":detail
    }
    collection.update_one({"id":id}, {"$set":new})