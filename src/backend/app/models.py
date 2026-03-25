from sqlalchemy import Column, Integer, String, Float, DateTime, Enum, Text, DECIMAL, Date, Time, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class GenderEnum(str, enum.Enum):
    male = "male"
    female = "female"
    other = "other"


class MealTypeEnum(str, enum.Enum):
    BREAKFAST = "BREAKFAST"
    LUNCH = "LUNCH"
    DINNER = "DINNER"
    SNACK = "SNACK"


class PlanTypeEnum(str, enum.Enum):
    workout = "workout"
    diet = "diet"
    health = "health"
    custom = "custom"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    phone = Column(String(20), unique=True, nullable=True, index=True)
    password_hash = Column(String(255), nullable=False)
    avatar = Column(String(500), nullable=True)
    level = Column(String(20), nullable=True, default="健身新手")
    gender = Column(Enum(GenderEnum), nullable=True)
    birthday = Column(Date, nullable=True)
    height = Column(DECIMAL(5, 1), nullable=True)
    target_weight = Column(DECIMAL(5, 1), nullable=True)
    oauth_provider = Column(String(20), nullable=True)
    oauth_id = Column(String(100), nullable=True)
    status = Column(Integer, default=1)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    health_stats = relationship("HealthStats", back_populates="user")
    user_plans = relationship("UserPlan", back_populates="user")
    training_records = relationship("TrainingRecord", back_populates="user")
    meals = relationship("Meal", back_populates="user")
    diet_target = relationship("DietTarget", back_populates="user", uselist=False)


class HealthStats(Base):
    __tablename__ = "health_stats"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    record_date = Column(Date, nullable=False, index=True)
    weight = Column(DECIMAL(5, 1), nullable=True)
    body_fat = Column(DECIMAL(4, 1), nullable=True)
    muscle_mass = Column(DECIMAL(5, 1), nullable=True)
    water = Column(DECIMAL(4, 1), nullable=True)
    bone_mass = Column(DECIMAL(4, 1), nullable=True)
    bmi = Column(DECIMAL(4, 1), nullable=True)
    visceral_fat = Column(DECIMAL(4, 1), nullable=True)
    basal_metabolism = Column(Integer, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="health_stats")


class UserPlan(Base):
    __tablename__ = "user_plans"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    plan_type = Column(Enum(PlanTypeEnum), nullable=False)
    scheduled_date = Column(Date, nullable=False, index=True)
    scheduled_time = Column(Time, nullable=False)
    duration = Column(Integer, nullable=True)
    target_value = Column(Integer, nullable=True)
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)
    completed_value = Column(Integer, nullable=True)
    reminder_enabled = Column(Boolean, default=True)
    reminder_time = Column(Time, nullable=True)
    repeat_type = Column(String(20), default="none")
    repeat_days = Column(String(20), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="user_plans")


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False, index=True)
    description = Column(Text, nullable=True)
    image = Column(String(500), nullable=True)
    difficulty = Column(Integer, default=1, index=True)
    default_sets = Column(Integer, default=3)
    default_reps = Column(String(20), nullable=True)
    default_duration = Column(String(20), nullable=True)
    calories_per_minute = Column(DECIMAL(5, 1), nullable=True)
    is_system = Column(Integer, default=1)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class TrainingRecord(Base):
    __tablename__ = "training_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    exercise_id = Column(Integer, ForeignKey("exercises.id"), nullable=False)
    sets = Column(Integer, nullable=False)
    reps = Column(Integer, nullable=True)
    duration = Column(Integer, nullable=True)
    weight = Column(DECIMAL(6, 2), nullable=True)
    calories = Column(Integer, nullable=True)
    record_date = Column(Date, nullable=False, index=True)
    record_time = Column(Time, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="training_records")
    exercise = relationship("Exercise")


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    type = Column(Enum(MealTypeEnum), nullable=False, index=True)
    time = Column(Time, nullable=False)
    name = Column(String(100), nullable=False)
    calories = Column(Integer, nullable=False)
    carbs = Column(DECIMAL(6, 2), nullable=True)
    protein = Column(DECIMAL(6, 2), nullable=True)
    fat = Column(DECIMAL(6, 2), nullable=True)
    fiber = Column(DECIMAL(6, 2), nullable=True)
    image = Column(String(500), nullable=True)
    source = Column(String(20), default="manual")
    record_date = Column(Date, nullable=False, index=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="meals")


class DietTarget(Base):
    __tablename__ = "diet_targets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    calorie_target = Column(Integer, nullable=False)
    carbs_target = Column(Integer, nullable=True)
    protein_target = Column(Integer, nullable=True)
    fat_target = Column(Integer, nullable=True)
    water_target = Column(Integer, nullable=True)
    meal_count = Column(Integer, default=3)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="diet_target")


class DietSuggestion(Base):
    __tablename__ = "diet_suggestions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    type = Column(Enum(MealTypeEnum), nullable=False)
    calories = Column(Integer, nullable=False)
    carbs = Column(DECIMAL(6, 2), nullable=True)
    protein = Column(DECIMAL(6, 2), nullable=True)
    fat = Column(DECIMAL(6, 2), nullable=True)
    description = Column(Text, nullable=True)
    image = Column(String(500), nullable=True)
    tags = Column(String(255), nullable=True)
    is_featured = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())


class StepRecord(Base):
    __tablename__ = "step_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    record_date = Column(Date, nullable=False, index=True)
    step_count = Column(Integer, nullable=False)
    distance = Column(DECIMAL(8, 2), nullable=True)
    calories = Column(Integer, nullable=True)
    source = Column(String(20), default="manual")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
