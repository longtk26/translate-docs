
from fastapi import Depends
from typing import Annotated
from src.repository import FilesRepoDep
from src.dto.files import (
    UploadFilesRequestDto,
    UploadFilesResponseDto,
)
from src.providers.storage import IStorageProviderDep
from src.models.files_model import FilesModel
from src.libs.decorators.transactional_decorator import Transactional

class FilesService:
    def __init__(self, storage_provider: IStorageProviderDep, files_repo: FilesRepoDep):
        self.storage_provider = storage_provider
        self.files_repo = files_repo

    @Transactional
    async def upload_files(
        self, 
        payload: UploadFilesRequestDto
    ) -> UploadFilesResponseDto:

        signed_urls = await self.storage_provider.generate_signed_urls(
            payload.destination_path,
            payload.model_dump()["files"]
        )

        files_to_create = [
            FilesModel(
                filename=file.name,
                mimetype=file.mime_type,
                file_url=f"{signed_urls[i]['url']}{payload.destination_path}{file.name}"
            )
            for i, file in enumerate(payload.files)
        ]

        self.files_repo.create_many(files_to_create)

        return UploadFilesResponseDto(
            signed_urls=signed_urls,
            message="Files uploaded successfully"
        )


FilesServiceDep = Annotated[FilesService, Depends(FilesService)]