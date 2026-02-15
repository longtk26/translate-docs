
from src.models.files_model import FilesModel
from src.libs.repository import BaseRepository
from src.libs.database import SessionDep
from typing import Annotated
from fastapi import Depends

class FilesRepository(BaseRepository):
    _model = FilesModel

    def __init__(self, session: SessionDep):
        super().__init__(session)

FilesRepoDep = Annotated[FilesRepository, Depends(FilesRepository)]