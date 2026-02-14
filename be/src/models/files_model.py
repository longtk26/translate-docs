from sqlmodel import SQLModel, Field

class FilesModel(SQLModel, table=True):
    __tablename__ = "files"
    
    id: int | None = Field(default=None, primary_key=True)
    filename: str
    file_url: str
    mimetype: str

    uploaded_by_id: int = Field(default=None, foreign_key="users.id")

    created_at: str
    updated_at: str
    deleted_at: str | None = None
    