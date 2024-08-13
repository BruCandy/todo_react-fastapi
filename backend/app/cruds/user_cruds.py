from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client['fastapi_react_database']

collection = db['users']


def user_post(id,name,username,email,phone):
    doc = {
        "id":id,
        "name":name,
        "username":username,
        "email":email,
        "phone":phone
    }
    collection.insert_one(doc)

def user_delete(id):
    collection.delete_one({"id": id})

def users_get():
    users = list(collection.find())
    for user in users:
        user["_id"] = str(user["_id"])
    return users

def user_get(id):
    user = collection.find_one({"id":id})
    user["_id"] = str(user["_id"])
    return user

def user_put(id, name,username,email,phone):
    new = {
        "name":name,
        "username":username,
        "email":email,
        "phone":phone
    }
    collection.update_one({"id":id}, {"$set":new})