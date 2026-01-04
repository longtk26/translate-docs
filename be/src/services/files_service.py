
from fastapi import Depends
from typing import Annotated
from src.dto.files import (
    UploadFilesRequestDto,
    UploadFilesResponseDto,
)
from src.providers.storage import IStorageProviderDep

class FilesService:
    def __init__(self, storage_provider: IStorageProviderDep):
        self.storage_provider = storage_provider

    async def upload_files(self, payload: UploadFilesRequestDto) -> UploadFilesResponseDto:
        # Placeholder implementation
        print(f"Uploading files to storage provider... {payload}")
        signed_urls = await self.storage_provider.generate_signed_urls(payload.destination_path, payload.model_dump()["files"])
        return UploadFilesResponseDto(signed_urls=signed_urls, message="Files uploaded successfully")

FilesServiceDep = Annotated[FilesService, Depends(FilesService)]