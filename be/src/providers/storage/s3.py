from .storage_provider import IStorageProvider
import boto3
from typing import Dict, List
from src.configs import config
from src.constants import MB


class S3StorageProvider(IStorageProvider):
    def __init__(self):
        self.bucket_name = config.aws_bucket_name
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=config.aws_access_key_id,
            aws_secret_access_key=config.aws_secret_access_key,
        )

    async def generate_signed_urls(
        self,
        destination_path: str,
        files: List[dict],
        expiration: int = 3600,
    ) -> Dict[str, dict]:
        """
        Generate presigned POST URLs for client-side upload with:
        - max file size
        - allowed mime types
        """

        signed_urls = []

        for file in files:
            file_name = file["name"]
            mime_type = file["mime_type"]

            object_key = f"{destination_path.rstrip('/')}/{file_name}"

            conditions = [
                {"bucket": self.bucket_name},
                ["starts-with", "$key", object_key],
                ["content-length-range", 1, 10 * MB],
                {"Content-Type": mime_type},
            ]

            fields = {
                "Content-Type": mime_type,
                "key": object_key,
            }

            presigned_post = self.s3_client.generate_presigned_post(
                Bucket=self.bucket_name,
                Key=object_key,
                Fields=fields,
                Conditions=conditions,
                ExpiresIn=expiration,
            )
          
            signed_urls.append(presigned_post)

        return signed_urls
