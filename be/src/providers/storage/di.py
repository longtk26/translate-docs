from fastapi import Depends
from typing import Annotated
from .s3 import S3StorageProvider
from .storage_provider import IStorageProvider

 
IStorageProviderDep = Annotated[IStorageProvider, Depends(S3StorageProvider)]