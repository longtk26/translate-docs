from fastapi import APIRouter
from src.services import FilesServiceDep
from src.dto.files import (
    UploadFilesRequestDto, 
    UploadFilesResponseDto
)

files_router = APIRouter(prefix="/files", tags=["files"])

@files_router.post("/upload", response_model=UploadFilesResponseDto)
async def upload_files(
    body: UploadFilesRequestDto, 
    files_service: FilesServiceDep
) -> UploadFilesResponseDto:
    return await files_service.upload_files(body)

