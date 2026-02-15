
from sqlmodel import Session, SQLModel

class BaseRepository:
    _model: SQLModel

    def __init__(self, session: Session):
        self.session = session

    def create(self, obj: SQLModel) -> SQLModel:
        self.session.add(obj)
        return obj

    def create_many(self, objs: list[SQLModel]) -> list[SQLModel]:
        self.session.add_all(objs)
        return objs

    def find(self, id: int) -> SQLModel | None:
        return self.session.get(self._model, id)
   
    