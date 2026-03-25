from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date, timedelta
from typing import Optional, List
from app.database import get_db
from app.auth import get_current_user
from app.models import User, HealthStats, UserPlan, Meal, DietTarget, DietSuggestion, TrainingRecord, StepRecord
from app.schemas import ResponseModel
from app.routers.dashboard_schemas import (
    DashboardData, StatItem, PlanItem, DietaryInfo, MealSuggestion,
    EnergySuggestion, HealthStatUpdate, HealthStatsHistoryResponse, HealthStatRecord
)

router = APIRouter(prefix="/dashboard", tags=["仪表盘"])


def get_date_from_string(date_str: str) -> date:
    if date_str:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    return date.today()


@router.get("", response_model=ResponseModel[DashboardData])
async def get_dashboard(
    date_str: Optional[str] = Query(None, description="查询日期，格式：YYYY-MM-DD"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query_date = get_date_from_string(date_str) if date_str else date.today()
    
    health_stat = db.query(HealthStats).filter(
        HealthStats.user_id == current_user.id,
        HealthStats.record_date == query_date
    ).first()
    
    if not health_stat:
        health_stat = db.query(HealthStats).filter(
            HealthStats.user_id == current_user.id
        ).order_by(HealthStats.record_date.desc()).first()
    
    stats = []
    if health_stat:
        if health_stat.weight is not None:
            trend = "暂无数据"
            trend_type = "normal"
            if query_date > health_stat.record_date:
                days_diff = (query_date - health_stat.record_date).days
                if days_diff <= 7:
                    trend = f"{days_diff}天前记录"
            stats.append(StatItem(
                label="体重",
                value=float(health_stat.weight),
                unit="kg",
                trend=trend,
                trendType=trend_type
            ))
        
        if health_stat.body_fat is not None:
            body_fat = float(health_stat.body_fat)
            if 18 <= body_fat <= 25:
                trend_text = "理想范围"
                trend_type = "normal"
            elif body_fat < 18:
                trend_text = "偏低"
                trend_type = "up"
            else:
                trend_text = "偏高"
                trend_type = "down"
            stats.append(StatItem(
                label="体脂率",
                value=body_fat,
                unit="%",
                trend=trend_text,
                trendType=trend_type
            ))
        
        if health_stat.muscle_mass is not None:
            muscle = float(health_stat.muscle_mass)
            if muscle >= 35:
                trend_text = "状态：优秀"
                trend_type = "up"
            elif muscle >= 28:
                trend_text = "状态：良好"
                trend_type = "normal"
            else:
                trend_text = "状态：一般"
                trend_type = "down"
            stats.append(StatItem(
                label="肌肉量",
                value=muscle,
                unit="kg",
                trend=trend_text,
                trendType=trend_type
            ))
        
        if health_stat.water is not None:
            water = float(health_stat.water)
            if 50 <= water <= 65:
                trend_text = "充足，请保持"
                trend_type = "normal"
            elif water < 50:
                trend_text = "偏低，需注意"
                trend_type = "down"
            else:
                trend_text = "偏高"
                trend_type = "up"
            stats.append(StatItem(
                label="水分",
                value=water,
                unit="%",
                trend=trend_text,
                trendType=trend_type
            ))
    
    if not stats:
        stats = [
            StatItem(label="体重", value=0, unit="kg", trend="暂无数据", trendType="normal"),
            StatItem(label="体脂率", value=0, unit="%", trend="暂无数据", trendType="normal"),
            StatItem(label="肌肉量", value=0, unit="kg", trend="暂无数据", trendType="normal"),
            StatItem(label="水分", value=0, unit="%", trend="暂无数据", trendType="normal"),
        ]
    
    plans = db.query(UserPlan).filter(
        UserPlan.user_id == current_user.id,
        UserPlan.scheduled_date == query_date
    ).order_by(UserPlan.scheduled_time).all()
    
    today_plan = []
    current_time = datetime.now().strftime("%H:%M")
    for plan in plans:
        if plan.is_completed:
            time_str = f"已于 {plan.scheduled_time.strftime('%H:%M')} 完成"
        elif plan.scheduled_time.strftime("%H:%M") > current_time:
            duration_str = f"{plan.duration}min" if plan.duration else ""
            time_str = f"待开始 • 预计耗时 {duration_str}".strip()
        else:
            if plan.target_value and plan.plan_type == "health":
                step_record = db.query(StepRecord).filter(
                    StepRecord.user_id == current_user.id,
                    StepRecord.record_date == query_date
                ).first()
                current_steps = step_record.step_count if step_record else 0
                time_str = f"进行中 • 当前 {current_steps} 步"
            else:
                time_str = "进行中"
        
        today_plan.append(PlanItem(
            id=f"plan_{plan.id}",
            title=plan.title,
            time=time_str,
            completed=plan.is_completed,
            scheduledTime=plan.scheduled_time.strftime("%H:%M")
        ))
    
    if not today_plan:
        today_plan = [
            PlanItem(id="plan_1", title="早起饮用温开水 500ml", time=f"已于 07:30 完成" if current_time > "07:30" else "待开始 • 预计耗时 5min", completed=current_time > "07:30", scheduledTime="07:00"),
            PlanItem(id="plan_2", title="午间 15 分钟冥想", time="待开始 • 预计耗时 15min", completed=False, scheduledTime="12:00"),
            PlanItem(id="plan_3", title="晚间漫步 3000 步", time=f"进行中 • 当前 1244 步" if current_time > "20:00" else "待开始 • 预计耗时 30min", completed=current_time > "20:00", scheduledTime="20:00"),
        ]
    
    diet_target = db.query(DietTarget).filter(DietTarget.user_id == current_user.id).first()
    calorie_target = diet_target.calorie_target if diet_target else 1500
    
    meals = db.query(Meal).filter(
        Meal.user_id == current_user.id,
        Meal.record_date == query_date
    ).all()
    
    calorie_consumed = sum(meal.calories for meal in meals)
    calorie_remaining = max(0, calorie_target - calorie_consumed)
    
    suggestions_db = db.query(DietSuggestion).filter(
        DietSuggestion.is_featured == 1
    ).limit(2).all()
    
    suggestions = []
    for i, suggestion in enumerate(suggestions_db):
        suggestions.append(MealSuggestion(
            mealId=f"meal_{i+1}",
            name=f"{suggestion.name}",
            description=suggestion.description or "",
            image=suggestion.image or f"https://picsum.photos/seed/suggestion{i}/100/100"
        ))
    
    if not suggestions:
        suggestions = [
            MealSuggestion(
                mealId="meal_1",
                name="晚餐：藜麦鸡胸肉沙拉",
                description="富含优质蛋白，帮助夜间代谢。",
                image="https://picsum.photos/seed/salad/100/100"
            ),
            MealSuggestion(
                mealId="meal_2",
                name="加餐：混合浆果 150g",
                description="天然抗氧化，脆脆的小满足。",
                image="https://picsum.photos/seed/fruit/100/100"
            )
        ]
    
    dietary = DietaryInfo(
        calorieTarget=calorie_target,
        calorieConsumed=calorie_consumed,
        calorieRemaining=calorie_remaining,
        suggestions=suggestions
    )
    
    total_plans = len(today_plan)
    completed_plans = sum(1 for p in today_plan if p.completed)
    progress_rate = int((completed_plans / total_plans * 100)) if total_plans > 0 else 0
    
    current_hour = datetime.now().hour
    if 6 <= current_hour < 12:
        energy_title = "能量满满的一天"
        energy_desc = "目前的代谢水平处于黄金阶段，非常适合进行舒缓的瑜伽运动。"
        suggested_activity = "瑜伽"
    elif 12 <= current_hour < 18:
        energy_title = "下午好"
        energy_desc = "工作之余，记得起来活动一下身体。"
        suggested_activity = "散步"
    else:
        energy_title = "晚间放松时光"
        energy_desc = "适合进行轻度的拉伸运动，帮助睡眠。"
        suggested_activity = "拉伸"
    
    energy_suggestion = EnergySuggestion(
        title=energy_title,
        description=energy_desc,
        suggestedActivity=suggested_activity
    )
    
    dashboard_data = DashboardData(
        stats=stats,
        todayPlan=today_plan,
        dietary=dietary,
        progressRate=progress_rate,
        energySuggestion=energy_suggestion
    )
    
    return ResponseModel(
        code=200,
        message="获取成功",
        data=dashboard_data
    )


@router.put("/stats", response_model=ResponseModel)
async def update_health_stats(
    stats_data: HealthStatUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    record_date = datetime.strptime(stats_data.record_date, "%Y-%m-%d").date()
    
    health_stat = db.query(HealthStats).filter(
        HealthStats.user_id == current_user.id,
        HealthStats.record_date == record_date
    ).first()
    
    if health_stat:
        if stats_data.weight is not None:
            health_stat.weight = stats_data.weight
        if stats_data.body_fat is not None:
            health_stat.body_fat = stats_data.body_fat
        if stats_data.muscle_mass is not None:
            health_stat.muscle_mass = stats_data.muscle_mass
        if stats_data.water is not None:
            health_stat.water = stats_data.water
    else:
        health_stat = HealthStats(
            user_id=current_user.id,
            record_date=record_date,
            weight=stats_data.weight,
            body_fat=stats_data.body_fat,
            muscle_mass=stats_data.muscle_mass,
            water=stats_data.water
        )
        db.add(health_stat)
    
    db.commit()
    
    return ResponseModel(
        code=200,
        message="更新成功",
        data={"record_date": stats_data.record_date}
    )


@router.get("/stats/history", response_model=ResponseModel[HealthStatsHistoryResponse])
async def get_health_stats_history(
    type: str = Query(..., description="数据类型：weight/bodyFat/muscle/water"),
    startDate: str = Query(..., description="开始日期，格式：YYYY-MM-DD"),
    endDate: str = Query(..., description="结束日期，格式：YYYY-MM-DD"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    start_date = datetime.strptime(startDate, "%Y-%m-%d").date()
    end_date = datetime.strptime(endDate, "%Y-%m-%d").date()
    
    type_mapping = {
        "weight": HealthStats.weight,
        "bodyFat": HealthStats.body_fat,
        "muscle": HealthStats.muscle_mass,
        "water": HealthStats.water
    }
    
    column = type_mapping.get(type)
    if not column:
        return ResponseModel(
            code=400,
            message="无效的数据类型",
            data=None
        )
    
    stats_records = db.query(
        HealthStats.record_date,
        column
    ).filter(
        HealthStats.user_id == current_user.id,
        HealthStats.record_date >= start_date,
        HealthStats.record_date <= end_date,
        column.isnot(None)
    ).order_by(HealthStats.record_date.desc()).all()
    
    records = [
        HealthStatRecord(
            date=record.record_date.strftime("%Y-%m-%d"),
            value=float(record[1])
        )
        for record in stats_records
    ]
    
    response_data = HealthStatsHistoryResponse(
        type=type,
        records=records
    )
    
    return ResponseModel(
        code=200,
        message="获取成功",
        data=response_data
    )
