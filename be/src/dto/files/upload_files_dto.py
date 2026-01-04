from pydantic import BaseModel
from typing import Optional
from src.constants import DocumentMimeType


class FileRequestDto(BaseModel):
    id: Optional[str] = None
    name: str
    mime_type: DocumentMimeType


class UploadFilesRequestDto(BaseModel):
    files: list[FileRequestDto]
    destination_path: str



class UploadFilesResponseDto(BaseModel):
    signed_urls: list[dict]
    message: Optional[str] = None