
from enum import Enum

KB = 1024
MB = 1024 * 1024

class DocumentMimeType(str, Enum):
    PDF = "application/pdf"
    WORD = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    TEXT = "text/plain"
    MARKDOWN = "text/markdown"
