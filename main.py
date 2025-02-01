from fastapi import FastAPI
from views import UserView, ItemView

app = FastAPI(title="Class-Based API")

# Initialize views
user_view = UserView()
item_view = ItemView()

# Register routes
app.include_router(user_view.router, prefix="/users", tags=["users"])
app.include_router(item_view.router, prefix="/items", tags=["items"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Class-Based FastAPI"}
