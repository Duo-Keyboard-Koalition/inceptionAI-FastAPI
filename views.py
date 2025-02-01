from fastapi import APIRouter, HTTPException
from models import User, Item
from typing import List

class BaseView:
    def __init__(self):
        self.router = APIRouter()
        self.setup_routes()

    def setup_routes(self):
        pass


class UserView(BaseView):
    def __init__(self):
        self.users = {}  # In-memory storage
        super().__init__()
    
    def setup_routes(self):
        self.router.get("/")(self.get_users)
        self.router.get("/{user_id}")(self.get_user)
        self.router.post("/")(self.create_user)
        
    async def get_users(self) -> List[User]:
        return list(self.users.values())
    
    async def get_user(self, user_id: int) -> User:
        if user_id not in self.users:
            raise HTTPException(status_code=404, detail="User not found")
        return self.users[user_id]
    
    async def create_user(self, user: User) -> User:
        if user.id in self.users:
            raise HTTPException(status_code=400, detail="User already exists")
        self.users[user.id] = user
        return user

class ItemView(BaseView):
    def __init__(self):
        self.items = {}  # In-memory storage
        super().__init__()
    
    def setup_routes(self):
        self.router.get("/")(self.get_items)
        self.router.get("/{item_id}")(self.get_item)
        self.router.post("/")(self.create_item)
        
    async def get_items(self) -> List[Item]:
        return list(self.items.values())
    
    async def get_item(self, item_id: int) -> Item:
        if item_id not in self.items:
            raise HTTPException(status_code=404, detail="Item not found")
        return self.items[item_id]
    
    async def create_item(self, item: Item) -> Item:
        if item.id in self.items:
            raise HTTPException(status_code=400, detail="Item already exists")
        self.items[item.id] = item
        return item
