from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str

class Item(BaseModel):
    id: int
    name: str
    description: str
    owner_id: int
