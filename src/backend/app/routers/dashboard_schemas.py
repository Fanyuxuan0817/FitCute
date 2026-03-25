from pydantic import BaseModel
from typing import Optional, List
from datetime import date, time


class HealthStatUpdate(BaseModel):
    weight: Optional[float] = None
    body_fat: Optional[float] = None
    muscle_mass: Optional[float] = None
    water: Optional[float] = None
    record_date: str


class HealthStatRecord(BaseModel):
    date: str
    value: float


class HealthStatsHistoryResponse(BaseModel):
    type: str
    records: List[HealthStatRecord]


class StatItem(BaseModel):
    label: str
    value: float
    unit: str
    trend: str
    trendType: str


class PlanItem(BaseModel):
    id: str
    title: str
    time: str
    completed: bool
    scheduledTime: str


class MealSuggestion(BaseModel):
    mealId: str
    name: str
    description: str
    image: str


class DietaryInfo(BaseModel):
    calorieTarget: int
    calorieConsumed: int
    calorieRemaining: int
    suggestions: List[MealSuggestion]


class EnergySuggestion(BaseModel):
    title: str
    description: str
    suggestedActivity: str


class DashboardData(BaseModel):
    stats: List[StatItem]
    todayPlan: List[PlanItem]
    dietary: DietaryInfo
    progressRate: int
    energySuggestion: EnergySuggestion
