
from pydantic_settings import BaseSettings, SettingsConfigDict

class Config(BaseSettings):
    app_name: str = "My FastAPI Application"
    port: int = 8000
    db_url: str 

    # AWS 
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_bucket_name: str
    aws_region: str

    model_config = SettingsConfigDict(env_file=".env")

config = Config()