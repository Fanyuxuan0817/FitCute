# FitCute 数据库表结构文档

## 概述

本文档描述 FitCute 健身应用的后端数据库表结构设计。数据库采用关系型数据库（如 MySQL/PostgreSQL），包含用户管理、运动训练、饮食记录、健康指标等核心业务数据表。

**数据库命名规范：**
- 表名使用蛇形命名法（snake_case）
- 字段名使用蛇形命名法
- 主键字段统一命名为 `id`
- 外键字段命名为 `{表名}_id`

---

## 目录

1. [用户模块](#用户模块)
2. [运动模块](#运动模块)
3. [饮食模块](#饮食模块)
4. [健康指标模块](#健康指标模块)
5. [计划任务模块](#计划任务模块)
6. [成就系统模块](#成就系统模块)
7. [设置模块](#设置模块)
8. [ER图关系说明](#er图关系说明)

---

## 用户模块

### 1. 用户表 (users)

存储用户基本信息。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 用户ID |
| name | VARCHAR(50) | 是 | 否 | - | 用户昵称 |
| email | VARCHAR(100) | 是 | 否 | - | 邮箱地址（唯一） |
| phone | VARCHAR(20) | 否 | 否 | - | 手机号（唯一） |
| password_hash | VARCHAR(255) | 是 | 否 | - | 密码哈希值 |
| avatar | VARCHAR(500) | 否 | 否 | - | 头像URL |
| level | VARCHAR(20) | 否 | 否 | '健身新手' | 用户等级 |
| gender | ENUM('male','female','other') | 否 | 否 | null | 性别 |
| birthday | DATE | 否 | 否 | null | 生日 |
| height | DECIMAL(5,1) | 否 | 否 | null | 身高(cm) |
| target_weight | DECIMAL(5,1) | 否 | 否 | null | 目标体重(kg) |
| oauth_provider | VARCHAR(20) | 否 |否 | null | 第三方登录提供商 |
| oauth_id | VARCHAR(100) | 否 | 否 | - | 第三方登录ID |
| status | TINYINT | 否 | 否 | 1 | 账号状态：1正常 0禁用 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_email` (email)
- `idx_phone` (phone)
- `idx_oauth_provider` (oauth_provider, oauth_id)

---

### 2. 认证令牌表 (auth_tokens)

存储用户的JWT令牌信息。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 记录ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| token | VARCHAR(500) | 是 | 否 | - | JWT令牌 |
| refresh_token | VARCHAR(500) | 否 | 否 | - | 刷新令牌 |
| token_type | VARCHAR(20) | 否 | 否 | 'Bearer' | 令牌类型 |
| expires_at | DATETIME | 是 | 否 | - | 过期时间 |
| ip_address | VARCHAR(45) | 否 | 否 | - | 登录IP |
| user_agent | VARCHAR(255) | 否 | 否 | - | 用户代理 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |

**索引：**
- `idx_user_id` (user_id)
- `idx_token` (token)
- `idx_expires_at` (expires_at)

---

## 运动模块

### 3. 运动项目表 (exercises)

存储系统中的运动项目。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 运动ID |
| name | VARCHAR(100) | 是 | 否 | - | 运动名称 |
| category | VARCHAR(50) | 是 | 否 | - | 运动分类 |
| description | TEXT | 否 | 否 | - | 运动描述 |
| image | VARCHAR(500) | 否 | 否 | - | 配图URL |
| difficulty | TINYINT | 否 | 否 | 1 | 难度等级(1-5) |
| default_sets | INT | 否 | 否 | 3 | 默认组数 |
| default_reps | VARCHAR(20) | 否 | 否 | - | 默认次数 |
| default_duration | VARCHAR(20) | 否 | 否 | - | 默认时长 |
| calories_per_minute | DECIMAL(5,1) | 否 | 否 | - | 每分钟消耗卡路里 |
| is_system | TINYINT | 否 | 否 | 1 | 是否系统内置：1是 0否 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_category` (category)
- `idx_difficulty` (difficulty)

---

### 4. 运动分类表 (exercise_categories)

存储运动分类信息。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 分类ID |
| name | VARCHAR(50) | 是 | 否 | - | 分类名称 |
| icon | VARCHAR(50) | 否 | 否 | - | 分类图标 |
| sort_order | INT | 否 | 否 | 0 | 排序 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |

---

### 5. 运动记录表 (training_records)

存储用户的运动记录。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 记录ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| exercise_id | BIGINT | 是 | 否 | - | 运动项目ID |
| sets | INT | 是 | 否 | - | 完成组数 |
| reps | INT | 否 | 否 | null | 每组次数 |
| duration | INT | 否 | 否 | null | 运动时长(秒) |
| weight | DECIMAL(6,2) | 否 | 否 | null | 重量(kg) |
| calories | INT | 否 | 否 | null | 消耗卡路里 |
| record_date | DATE | 是 | 否 | - | 记录日期 |
| record_time | TIME | 是 | 否 | - | 记录时间 |
| notes | TEXT | 否 | 否 | null | 备注 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_user_id` (user_id)
- `idx_exercise_id` (exercise_id)
- `idx_record_date` (record_date)
- `idx_user_date` (user_id, record_date)

**外键：**
- `fk_training_user` → `users(id)`
- `fk_training_exercise` → `exercises(id)`

---

## 饮食模块

### 6. 餐食记录表 (meals)

存储用户的餐食记录。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 餐食ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| type | ENUM('BREAKFAST','LUNCH','DINNER','SNACK') | 是 | 否 | - | 餐食类型 |
| time | TIME | 是 | 否 | - | 用餐时间 |
| name | VARCHAR(100) | 是 | 否 | - | 餐食名称 |
| calories | INT | 是 | 否 | - | 卡路里 |
| carbs | DECIMAL(6,2) | 否 | 否 | null | 碳水化合物(g) |
| protein | DECIMAL(6,2) | 否 | 否 | null | 蛋白质(g) |
| fat | DECIMAL(6,2) | 否 | 否 | null | 脂肪(g) |
| fiber | DECIMAL(6,2) | 否 | 否 | null | 膳食纤维(g) |
| image | VARCHAR(500) | 否 | 否 | null | 餐食图片URL |
| source | ENUM('manual','ai_analysis') | 否 | 否 | 'manual' | 数据来源 |
| record_date | DATE | 是 | 否 | - | 记录日期 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_user_id` (user_id)
- `idx_type` (type)
- `idx_record_date` (record_date)
- `idx_user_date` (user_id, record_date)

**外键：**
- `fk_meal_user` → `users(id)`

---

### 7. 食品图像分析表 (food_analyses)

存储AI食品分析的记录。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 分析ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| meal_id | BIGINT | 否 | 否 | null | 关联的餐食ID |
| image_url | VARCHAR(500) | 否 | 否 | - | 上传的图片URL |
| image_base64 | TEXT | 否 | 否 | null | 图片Base64（临时存储） |
| result_json | JSON | 是 | 否 | - | 分析结果JSON |
| confidence | DECIMAL(4,2) | 否 | 否 | null | 分析置信度 |
| status | TINYINT | 否 | 否 | 1 | 状态：1成功 0失败 |
| error_message | TEXT | 否 | 否 | null | 错误信息 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |

**索引：**
- `idx_user_id` (user_id)
- `idx_meal_id` (meal_id)

---

### 8. 饮食目标表 (diet_targets)

存储用户的饮食目标设置。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 目标ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID（唯一） |
| calorie_target | INT | 是 | 否 | - | 每日卡路里目标 |
| carbs_target | INT | 否 | 否 | null | 碳水化合物目标(g) |
| protein_target | INT | 否 | 否 | null | 蛋白质目标(g) |
| fat_target | INT | 否 | 否 | null | 脂肪目标(g) |
| water_target | INT | 否 | 否 | null | 饮水目标(ml) |
| meal_count | TINYINT | 否 | 否 | 3 | 每日餐数 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_user_id` (user_id) - 唯一

---

### 9. 饮食建议表 (diet_suggestions)

存储系统推荐的饮食建议。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 建议ID |
| name | VARCHAR(100) | 是 | 否 | - | 餐食名称 |
| type | ENUM('BREAKFAST','LUNCH','DINNER','SNACK') | 是 | 否 | - | 适用餐食类型 |
| calories | INT | 是 | 否 | - | 卡路里 |
| carbs | DECIMAL(6,2) | 否 | 否 | null | 碳水化合物(g) |
| protein | DECIMAL(6,2) | 否 | 否 | null | 蛋白质(g) |
| fat | DECIMAL(6,2) | 否 | 否 | null | 脂肪(g) |
| description | TEXT | 否 | 否 | null | 描述 |
| image | VARCHAR(500) | 否 | 否 | null | 图片URL |
| tags | VARCHAR(255) | 否 | 否 | null | 标签，逗号分隔 |
| is_featured | TINYINT | 否 | 否 | 0 | 是否推荐 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |

---

## 健康指标模块

### 10. 健康指标记录表 (health_stats)

存储用户的身体健康指标数据。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 记录ID |
| user_id | BIGINT | 是 |否 | - | 用户ID |
| record_date | DATE | 是 | 否 | - | 记录日期 |
| weight | DECIMAL(5,1) | 否 | 否 | null | 体重(kg) |
| body_fat | DECIMAL(4,1) | 否 | 否 | null | 体脂率(%) |
| muscle_mass | DECIMAL(5,1) | 否 | 否 | null | 肌肉量(kg) |
| water | DECIMAL(4,1) | 否 | 否 | null | 水分(%) |
| bone_mass | DECIMAL(4,1) | 否 | 否 | null | 骨量(kg) |
| bmi | DECIMAL(4,1) | 否 | 否 | null | BMI指数 |
| visceral_fat | DECIMAL(4,1) | 否 | 否 | null | 内脏脂肪 |
| basal_metabolism | INT | 否 | 否 | null | 基础代谢(kcal) |
| notes | TEXT | 否 | 否 | null | 备注 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_user_id` (user_id)
- `idx_record_date` (record_date)
- `idx_user_date` (user_id, record_date)

---

### 11. 步数记录表 (step_records)

存储用户每日的步数数据。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 记录ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| record_date | DATE | 是 | 否 | - | 记录日期 |
| step_count | INT | 是 | 否 | - | 步数 |
| distance | DECIMAL(8,2) | 否 | 否 | null | 距离(米) |
| calories | INT | 否 | 否 | null | 消耗卡路里 |
| source | ENUM('manual','device','sync') | 否 | 否 | 'manual' | 数据来源 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_user_id` (user_id)
- `idx_record_date` (record_date)
- `idx_user_date` (user_id, record_date)

---

## 计划任务模块

### 12. 用户计划表 (user_plans)

存储用户的每日计划任务。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 计划ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| title | VARCHAR(200) | 是 | 否 | - | 计划标题 |
| description | TEXT | 否 | 否 | null | 计划描述 |
| plan_type | ENUM('workout','diet','health','custom') | 是 | 否 | - | 计划类型 |
| scheduled_date | DATE | 是 | 否 | - | 计划日期 |
| scheduled_time | TIME | 是 | 否 | - | 计划时间 |
| duration | INT | 否 | 否 | null | 预计时长(分钟) |
| target_value | INT | 否 | 否 | null | 目标值（如步数） |
| is_completed | TINYINT | 否 | 否 | 0 | 是否完成：1是 0否 |
| completed_at | DATETIME | 否 | 否 | null | 完成时间 |
| completed_value | INT | 否 | 否 | null | 完成值 |
| reminder_enabled | TINYINT | 否 | 否 | 1 | 是否开启提醒 |
| reminder_time | TIME | 否 | 否 | null | 提醒时间 |
| repeat_type | ENUM('none','daily','weekly','monthly') | 否 | 否 | 'none' | 重复类型 |
| repeat_days | VARCHAR(20) | 否 | 否 | null | 重复日期（周几） |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 |更新时间 |

**索引：**
- `idx_user_id` (user_id)
- `idx_scheduled_date` (scheduled_date)
- `idx_user_date` (user_id, scheduled_date)

---

### 13. 计划完成记录表 (plan_completions)

存储用户完成计划的记录。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 记录ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| plan_id | BIGINT | 是 | 否 | - | 计划ID |
| record_date | DATE | 是 | 否 | - | 完成日期 |
| completed_at | DATETIME | 是 | 否 | 当前时间 | 完成时间 |
| completed_value | INT | 否 | 否 | null | 实际完成值 |
| notes | TEXT | 否 | 否 | null | 备注 |

---

## 成就系统模块

### 14. 成就定义表 (achievements)

存储所有成就的定义。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 成就ID |
| code | VARCHAR(50) | 是 | 否 | - | 成就代码（唯一） |
| title | VARCHAR(100) | 是 | 否 | - | 成就标题 |
| description | TEXT | 否 | 否 | null | 成就描述 |
| icon | VARCHAR(50) | 否 | 否 | - | 成就图标 |
| category | VARCHAR(30) | 否 | 否 | - | 分类：training/diet/streak/general |
| target_type | VARCHAR(30) | 是 | 否 | - | 目标类型 |
| target_value | INT | 是 | 否 | - | 目标值 |
| points | INT | 否 | 否 | 0 | 奖励积分 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |

**target_type 说明：**
- `workout_count`: 运动次数
- `workout_streak`: 连续运动天数
- `calories_burned`: 总消耗卡路里
- `meal_logged`: 记录餐食次数
- `weight_goal`: 达成目标体重
- `step_count`: 累计步数

---

### 15. 用户成就表 (user_achievements)

存储用户已解锁的成就。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 记录ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| achievement_id | BIGINT | 是 | 否 | - | 成就ID |
| unlocked_at | DATETIME | 是 | 否 | 当前时间 | 解锁时间 |
| progress | INT | 否 | 否 | 0 | 当前进度 |
| is_notified | TINYINT | 否 | 否 | 0 | 是否已通知 |

**索引：**
- `idx_user_id` (user_id)
- `idx_achievement_id` (achievement_id)
- `idx_user_achievement` (user_id, achievement_id) - 唯一

---

### 16. 用户进度表 (user_progress)

存储用户各类成就的进度数据。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 记录ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID |
| progress_type | VARCHAR(30) | 是 | 否 | - | 进度类型 |
| current_value | INT | 是 | 否 | 0 | 当前值 |
| start_date | DATE | 否 | 否 | null | 统计开始日期 |
| end_date | DATE | 否 | 否 | null | 统计结束日期 |
| streak_count | INT | 否 | 否 | 0 | 连续天数 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_user_id` (user_id)
- `idx_progress_type` (progress_type)
- `idx_user_type` (user_id, progress_type) - 唯一

---

## 设置模块

### 17. 用户设置表 (user_settings)

存储用户的偏好设置。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 设置ID |
| user_id | BIGINT | 是 | 否 | - | 用户ID（唯一） |
| language | VARCHAR(10) | 否 | 否 | 'zh-CN' | 语言 |
| theme | ENUM('light','dark','system') | 否 | 否 | 'light' | 主题 |
| unit_weight | ENUM('kg','lbs') | 否 | 否 | 'kg' | 体重单位 |
| unit_height | ENUM('cm','in') | 否 | 否 | 'cm' | 身高单位 |
| unit_distance | ENUM('km','mi') | 否 | 否 | 'km' | 距离单位 |
| workout_reminder | TINYINT | 否 | 否 | 1 | 运动提醒 |
| diet_reminder | TINYINT | 否 | 否 | 1 | 饮食提醒 |
| achievement_notification | TINYINT | 否 | 否 | 1 | 成就通知 |
| show_profile | TINYINT | 否 | 否 | 1 | 展示个人资料 |
| share_progress | TINYINT | 否 | 否 | 0 | 分享进度 |
| week_start_day | TINYINT | 否 | 否 | 1 | 周起始日：1周一7周日 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

**索引：**
- `idx_user_id` (user_id) - 唯一

---

### 18. 系统配置表 (system_config)

存储系统配置信息。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 配置ID |
| config_key | VARCHAR(50) | 是 | 否 | - | 配置键（唯一） |
| config_value | TEXT | 是 | 否 | - | 配置值 |
| config_type | VARCHAR(20) | 否 | 否 | 'string' | 配置类型 |
| description | VARCHAR(255) | 否 | 否 | null | 说明 |
| is_public | TINYINT | 否 | 否 | 0 | 是否公开 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

---

### 19. 帮助文档表 (help_articles)

存储应用的帮助文档和FAQ。

| 字段名 | 类型 | 必填 | 主键 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | 是 | 是 | 自增 | 文章ID |
| category | VARCHAR(30) | 是 | 否 | - | 分类 |
| question | VARCHAR(255) | 是 | 否 | - | 问题 |
| answer | TEXT | 是 | 否 | - | 答案 |
| sort_order | INT | 否 | 否 | 0 | 排序 |
| is_published | TINYINT | 否 | 否 | 1 | 是否发布 |
| view_count | INT | 否 | 否 | 0 | 查看次数 |
| created_at | DATETIME | 是 | 否 | 当前时间 | 创建时间 |
| updated_at | DATETIME | 是 | 否 | 当前时间 | 更新时间 |

---

## ER图关系说明

```
┌─────────────────┐       ┌─────────────────┐
│     users       │       │   auth_tokens    │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄──────│ user_id (FK)     │
│ email           │       │ id (PK)          │
│ name            │       └─────────────────┘
│ avatar          │
│ level           │       ┌─────────────────┐
└────────┬────────┘       │  user_settings   │
         │                ├─────────────────┤
         │                │ user_id (FK/PK)  │
         │                └─────────────────┘
         │
         ├────────────────┬────────────────┬────────────────┐
         │                │                │                │
         ▼                ▼                ▼                ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│training_records │ │     meals       │ │  health_stats   │ │   user_plans    │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ id (PK)         │ │ id (PK)         │ │ id (PK)         │ │ id (PK)         │
│ user_id (FK)    │ │ user_id (FK)    │ │ user_id (FK)    │ │ user_id (FK)    │
│ exercise_id(FK) │ │ type            │ │ record_date     │ │ scheduled_date  │
│ record_date     │ │ calories        │ │ weight          │ │ is_completed    │
│ calories        │ │ protein         │ │ body_fat        │ └─────────────────┘
└─────────────────┘ │ fat             │ └─────────────────┘
                    │ record_date     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ food_analyses   │
                    ├─────────────────┤
                    │ id (PK)         │
                    │ user_id (FK)    │
                    │ meal_id (FK)    │
                    │ result_json     │
                    └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│   achievements  │       │user_achievements│
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄──────│ achievement_id  │
│ code            │       │ user_id (FK)    │
│ title           │       │ unlocked_at     │
│ target_value    │       └─────────────────┘
└─────────────────┘

┌─────────────────┐
│ user_progress   │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ progress_type   │
│ current_value   │
│ streak_count    │
└─────────────────┘
```

---

## 数据库设计原则

1. **范式化设计**：采用第三范式（3NF），减少数据冗余
2. **索引优化**：高频查询字段建立适当索引
3. **外键约束**：保持表间关联完整性
4. **软删除**：敏感数据采用逻辑删除而非物理删除
5. **时间戳**：所有表包含 `created_at` 和 `updated_at` 字段
6. **状态字段**：重要数据包含状态标识便于管理

---

## 版本信息

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0.0 | 2026-03-25 | 初始版本 |

---

## 注意事项

1. 所有业务表的用户ID字段都需要建立索引以提高查询性能
2. 日期类字段建议建立分区表以优化历史数据查询
3. 图片/文件URL字段建议使用CDN存储
4. JSON类型字段仅用于存储结构不固定的配置数据
5. 建议定期清理过期的认证令牌记录
