from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, Any

T = TypeVar('T')


class ResponseModel(BaseModel, Generic[T]):
    code: int = 200
    message: str = "操作成功"
    data: Optional[T] = None


class ErrorDetail(BaseModel):
    field: Optional[str] = None
    reason: Optional[str] = None


class ErrorResponseModel(BaseModel):
    code: int = 400
    message: str = "请求参数错误"
    error: Optional[ErrorDetail] = None
