from abc import ABC, abstractmethod     


class IStorageProvider(ABC):
    @abstractmethod
    async def generate_signed_urls(
        self,
        destination_path: str,
        files: list[dict],
        expiration: int = 3600,
    ) -> dict[str, str]:
        pass



