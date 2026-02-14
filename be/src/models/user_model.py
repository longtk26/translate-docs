from sqlmodel import SQLModel, Field

class UserModel(SQLModel, table=True):
    __tablename__ = "users"
    
    id: int | None = Field(default=None, primary_key=True)
    username: str
    email: str
    is_active: bool = True

    created_at: str 
    updated_at: str
    deleted_at: str | None = None