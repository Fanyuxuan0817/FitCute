# FitCute API 接口文档

## 概述

FitCute 是一款健身管理应用，提供运动训练、饮食追踪和AI食品分析功能。本文挡详细描述了应用的前后端API接口规范。

**基础信息：**
- 基础URL：`/api/v1`
- 认证方式：Bearer Token (JWT)
- 数据格式：JSON
- 字符编码：UTF-8

---

## 目录

1. [认证接口](#认证接口)
2. [用户接口](#用户接口)
3. [仪表盘接口](#仪表盘接口)
4. [训练接口](#训练接口)
5. [饮食接口](#饮食接口)
6. [分析接口](#分析接口)
7. [设置接口](#设置接口)
8. [公共接口](#公共接口)

---

## 认证接口

### 1. 用户登录

用户使用邮箱/手机号和密码登录。

**接口：** `POST /auth/login`

**请求头：**
```
Content-Type: application/json
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| email | string | 是 | 邮箱或手机号 |
| password | string | 是 | 登录密码 |

**请求示例：**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应参数：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | integer | 状态码 |
| message | string | 响应消息 |
| data | object | 用户数据 |
| data.token | string | JWT访问令牌 |
| data.refreshToken | string | JWT刷新令牌 |
| data.user | object | 用户信息 |

**响应示例：**
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "name": "小明",
      "email": "user@example.com",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      "level": "健身达人",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

---

### 2. 用户注册

新用户注册账号。

**接口：** `POST /auth/register`

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 用户昵称 |
| email | string | 是 | 邮箱地址 |
| password | string | 是 | 登录密码（至少6位） |
| phone | string | 否 | 手机号 |

**请求示例：**
```json
{
  "name": "小明",
  "email": "user@example.com",
  "password": "password123",
  "phone": "13800138000"
}
```

**响应示例：**
```json
{
  "code": 201,
  "message": "注册成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "name": "小明",
      "email": "user@example.com",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      "level": "健身新手"
    }
  }
}
```

---

### 3. 第三方登录

使用GitHub或Google账号登录。

**接口：** `POST /auth/oauth/:provider`

**参数：**
- provider: `github` | `google`

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| code | string | 是 | OAuth授权码 |

**响应示例：**
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "name": "小明",
      "email": "user@example.com",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      "level": "健身新手",
      "oauthProvider": "github"
    }
  }
}
```

---

### 4. 刷新令牌

获取新的访问令牌。

**接口：** `POST /auth/refresh`

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| refreshToken | string | 是 | 刷新令牌 |

**响应示例：**
```json
{
  "code": 200,
  "message": "令牌刷新成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 5. 退出登录

用户退出登录状态。

**接口：** `POST /auth/logout`

**请求头：**
```
Authorization: Bearer <token>
```

**响应示例：**
```json
{
  "code": 200,
  "message": "退出登录成功"
}
```

---

## 用户接口

### 1. 获取当前用户信息

获取已登录用户的详细信息。

**接口：** `GET /user/me`

**请求头：**
```
Authorization: Bearer <token>
```

**响应参数：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| id | string | 用户ID |
| name | string | 用户昵称 |
| email | string | 邮箱地址 |
| phone | string | 手机号 |
| avatar | string | 头像URL |
| level | string | 用户等级 |
| gender | string | 性别 |
| birthday | string | 生日 |
| height | number | 身高(cm) |
| targetWeight | number | 目标体重(kg) |
| createdAt | string | 创建时间 |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "user_123",
    "name": "小明",
    "email": "user@example.com",
    "phone": "13800138000",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "level": "健身达人",
    "gender": "female",
    "birthday": "1995-06-15",
    "height": 165,
    "targetWeight": 52,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

### 2. 更新用户信息

更新用户个人资料。

**接口：** `PUT /user/me`

**请求头：**
```
Authorization: Bearer <token>
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 否 | 用户昵称 |
| avatar | string | 否 | 头像URL |
| gender | string | 否 | 性别 |
| birthday | string | 否 | 生日，格式：YYYY-MM-DD |
| height | number | 否 | 身高(cm) |
| targetWeight | number | 否 | 目标体重(kg) |

**请求示例：**
```json
{
  "name": "新昵称",
  "avatar": "https://example.com/new-avatar.jpg",
  "gender": "female",
  "birthday": "1995-06-15",
  "height": 165,
  "targetWeight": 52
}
```

---

### 3. 修改密码

修改用户登录密码。

**接口：** `PUT /user/me/password`

**请求头：**
```
Authorization: Bearer <token>
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| oldPassword | string | 是 | 原密码 |
| newPassword | string | 是 | 新密码 |

---

### 4. 上传头像

上传用户头像图片。

**接口：** `POST /user/me/avatar`

**请求头：**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| avatar | file | 是 | 头像图片文件 |

**响应示例：**
```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "avatar": "https://cdn.fitcute.com/avatars/user_123_avatar.jpg"
  }
}
```

---

## 仪表盘接口

### 1. 获取仪表盘数据

获取用户仪表盘展示的综合数据。

**接口：** `GET /dashboard`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| date | string | 否 | 查询日期，默认今天，格式：YYYY-MM-DD |

**响应参数：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| stats | array | 健康指标数据 |
| todayPlan | array | 今日计划列表 |
| dietary | object | 饮食建议 |
| progressRate | number | 今日完成进度百分比 |
| energySuggestion | object | 能量建议 |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "stats": [
      {
        "label": "体重",
        "value": 55.5,
        "unit": "kg",
        "trend": "-0.2kg",
        "trendType": "down"
      },
      {
        "label": "体脂率",
        "value": 22,
        "unit": "%",
        "trend": "理想范围",
        "trendType": "normal"
      },
      {
        "label": "肌肉量",
        "value": 38.2,
        "unit": "kg",
        "trend": "状态：优秀",
        "trendType": "up"
      },
      {
        "label": "水分",
        "value": 58,
        "unit": "%",
        "trend": "充足，请保持",
        "trendType": "normal"
      }
    ],
    "todayPlan": [
      {
        "id": "plan_1",
        "title": "早起饮用温开水 500ml",
        "time": "已于 07:30 完成",
        "completed": true,
        "scheduledTime": "07:00"
      },
      {
        "id": "plan_2",
        "title": "午间 15 分钟冥想",
        "time": "待开始 • 预计耗时 15min",
        "completed": false,
        "scheduledTime": "12:00"
      },
      {
        "id": "plan_3",
        "title": "晚间漫步 3000 步",
        "time": "进行中 • 当前 1244 步",
        "completed": false,
        "scheduledTime": "20:00"
      }
    ],
    "dietary": {
      "calorieTarget": 1500,
      "calorieConsumed": 1080,
      "calorieRemaining": 420,
      "suggestions": [
        {
          "mealId": "meal_1",
          "name": "晚餐：藜麦鸡胸肉沙拉",
          "description": "富含优质蛋白，帮助夜间代谢。",
          "image": "https://picsum.photos/seed/salad/100/100"
        },
        {
          "mealId": "meal_2",
          "name": "加餐：混合浆果 150g",
          "description": "天然抗氧化，脆脆的小满足。",
          "image": "https://picsum.photos/seed/fruit/100/100"
        }
      ]
    },
    "progressRate": 75,
    "energySuggestion": {
      "title": "能量满满的一天",
      "description": "目前的代谢水平处于黄金阶段，非常适合进行舒缓的瑜伽运动。",
      "suggestedActivity": "瑜伽"
    }
  }
}
```

---

### 2. 更新健康指标

记录用户身体健康指标数据。

**接口：** `PUT /dashboard/stats`

**请求头：**
```
Authorization: Bearer <token>
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| weight | number | 否 | 体重(kg) |
| bodyFat | number | 否 | 体脂率(%) |
| muscleMass | number | 否 | 肌肉量(kg) |
| water | number | 否 | 水分(%) |
| recordDate | string | 是 | 记录日期，格式：YYYY-MM-DD |

**请求示例：**
```json
{
  "weight": 55.5,
  "bodyFat": 22,
  "muscleMass": 38.2,
  "water": 58,
  "recordDate": "2024-03-25"
}
```

---

### 3. 获取健康历史数据

获取用户健康指标的历史记录。

**接口：** `GET /dashboard/stats/history`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 数据类型：weight/bodyFat/muscle/water |
| startDate | string | 是 | 开始日期，格式：YYYY-MM-DD |
| endDate | string | 是 | 结束日期，格式：YYYY-MM-DD |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "type": "weight",
    "records": [
      {
        "date": "2024-03-25",
        "value": 55.5
      },
      {
        "date": "2024-03-24",
        "value": 55.7
      }
    ]
  }
}
```

---

## 训练接口

### 1. 获取运动列表

获取所有可用的运动项目。

**接口：** `GET /training/exercises`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| category | string | 否 | 运动分类筛选 |
| difficulty | number | 否 | 难度等级筛选(1-5) |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认20 |

**响应参数：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| id | string | 运动ID |
| name | string | 运动名称 |
| category | string | 运动分类 |
| sets | number | 组数 |
| reps | string | 次数 |
| duration | string | 时长 |
| image | string | 配图URL |
| description | string | 运动描述 |
| difficulty | number | 难度(1-5) |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "exercises": [
      {
        "id": "ex_1",
        "name": "深蹲",
        "category": "腿部训练",
        "sets": 4,
        "reps": "12-15",
        "duration": null,
        "image": "https://picsum.photos/seed/squat/400/300",
        "description": "标准深蹲动作",
        "difficulty": 2
      },
      {
        "id": "ex_2",
        "name": "开合跳",
        "category": "有氧运动",
        "sets": 3,
        "reps": null,
        "duration": "30秒",
        "image": "https://picsum.photos/seed/jump/400/300",
        "description": "全身热身运动",
        "difficulty": 1
      }
    ],
    "total": 50,
    "page": 1,
    "pageSize": 20
  }
}
```

---

### 2. 获取运动详情

获取单个运动项目的详细信息。

**接口：** `GET /training/exercises/:id`

**请求头：**
```
Authorization: Bearer <token>
```

---

### 3. 获取运动分类

获取所有运动分类。

**接口：** `GET /training/categories`

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "categories": [
      "腿部训练",
      "胸部训练",
      "背部训练",
      "肩部训练",
      "核心训练",
      "有氧运动",
      "柔韧性训练",
      " HIIT"
    ]
  }
}
```

---

### 4. 记录运动

记录用户的运动数据。

**接口：** `POST /training/records`

**请求头：**
```
Authorization: Bearer <token>
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| exerciseId | string | 是 | 运动项目ID |
| sets | number | 是 | 完成组数 |
| reps | number | 否 | 每组次数 |
| duration | number | 否 | 运动时长(秒) |
| weight | number | 否 | 重量(kg) |
| calories | number | 否 | 消耗卡路里 |
| recordDate | string | 是 | 记录日期 |
| recordTime | string | 是 | 记录时间 |

**请求示例：**
```json
{
  "exerciseId": "ex_1",
  "sets": 4,
  "reps": 12,
  "duration": 1800,
  "weight": 20,
  "calories": 150,
  "recordDate": "2024-03-25",
  "recordTime": "18:30"
}
```

---

### 5. 获取运动记录

获取用户的运动历史记录。

**接口：** `GET /training/records`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| date | string | 否 | 查询日期 |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "records": [
      {
        "id": "record_1",
        "exerciseId": "ex_1",
        "exerciseName": "深蹲",
        "sets": 4,
        "reps": 12,
        "duration": 1800,
        "weight": 20,
        "calories": 150,
        "recordDate": "2024-03-25",
        "recordTime": "18:30"
      }
    ],
    "totalCalories": 450,
    "totalDuration": 5400,
    "totalExercises": 3
  }
}
```

---

### 6. 获取今日运动统计

获取用户今日的运动统计数据。

**接口：** `GET /training/today`

**请求头：**
```
Authorization: Bearer <token>
```

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "totalCalories": 450,
    "totalDuration": 5400,
    "totalExercises": 3,
    "records": [
      {
        "id": "record_1",
        "exerciseName": "深蹲",
        "sets": 4,
        "reps": 12,
        "calories": 150,
        "recordTime": "18:30"
      }
    ]
  }
}
```

---

## 饮食接口

### 1. 获取餐食列表

获取用户的所有餐食记录。

**接口：** `GET /diet/meals`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| date | string | 否 | 查询日期 |
| type | string | 否 | 餐食类型：BREAKFAST/LUNCH/DINNER/SNACK |

**响应参数：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| id | string | 餐食ID |
| type | string | 餐食类型 |
| time | string | 用餐时间 |
| name | string | 餐食名称 |
| calories | number | 卡路里 |
| carbs | number | 碳水化合物(g) |
| protein | number | 蛋白质(g) |
| fat | number | 脂肪(g) |
| image | string | 餐食图片 |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "meals": [
      {
        "id": "meal_1",
        "type": "BREAKFAST",
        "time": "08:00",
        "name": "全麦欧包 & 蓝莓酸奶",
        "calories": 320,
        "carbs": 45,
        "protein": 12,
        "fat": 8,
        "image": "https://picsum.photos/seed/breakfast/200/200"
      },
      {
        "id": "meal_2",
        "type": "LUNCH",
        "time": "12:30",
        "name": "香煎鸡胸肉 & 藜麦沙拉",
        "calories": 450,
        "carbs": 38,
        "protein": 35,
        "fat": 12,
        "image": "https://picsum.photos/seed/lunch/200/200"
      },
      {
        "id": "meal_3",
        "type": "SNACK",
        "time": "15:30",
        "name": "混合坚果 & 奇异果",
        "calories": 180,
        "carbs": 15,
        "protein": 5,
        "fat": 10,
        "image": "https://picsum.photos/seed/snack/200/200"
      }
    ],
    "dailySummary": {
      "totalCalories": 950,
      "totalCarbs": 98,
      "totalProtein": 52,
      "totalFat": 30,
      "calorieTarget": 1500,
      "calorieRemaining": 550
    }
  }
}
```

---

### 2. 添加餐食记录

添加新的餐食记录。

**接口：** `POST /diet/meals`

**请求头：**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 餐食类型：BREAKFAST/LUNCH/DINNER/SNACK |
| time | string | 是 | 用餐时间，格式：HH:mm |
| name | string | 是 | 餐食名称 |
| calories | number | 是 | 卡路里 |
| carbs | number | 否 | 碳水化合物(g) |
| protein | number | 否 | 蛋白质(g) |
| fat | number | 否 | 脂肪(g) |
| image | string | 否 | 餐食图片URL |
| recordDate | string | 是 | 记录日期，格式：YYYY-MM-DD |

**请求示例：**
```json
{
  "type": "BREAKFAST",
  "time": "08:00",
  "name": "全麦欧包 & 蓝莓酸奶",
  "calories": 320,
  "carbs": 45,
  "protein": 12,
  "fat": 8,
  "image": "https://example.com/meal.jpg",
  "recordDate": "2024-03-25"
}
```

---

### 3. 更新餐食记录

更新已有的餐食记录。

**接口：** `PUT /diet/meals/:id`

**请求头：**
```
Authorization: Bearer <token>
```

---

### 4. 删除餐食记录

删除餐食记录。

**接口：** `DELETE /diet/meals/:id`

**请求头：**
```
Authorization: Bearer <token>
```

**响应示例：**
```json
{
  "code": 200,
  "message": "删除成功"
}
```

---

### 5. AI食品分析

使用Google Gemini AI分析食品图像，返回营养成分信息。

**接口：** `POST /diet/analyze`

**请求头：**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| image | string | 是 | 图片Base64编码或URL |
| recordDate | string | 是 | 记录日期，格式：YYYY-MM-DD |
| mealType | string | 是 | 餐食类型 |
| mealTime | string | 是 | 用餐时间，格式：HH:mm |

**请求示例：**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "recordDate": "2024-03-25",
  "mealType": "LUNCH",
  "mealTime": "12:30"
}
```

**响应参数：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| foodName | string | 食品名称 |
| calories | number | 卡路里(kcal) |
| protein | number | 蛋白质(g) |
| carbs | number | 碳水化合物(g) |
| fat | number | 脂肪(g) |
| description | string | 简要描述 |

**响应示例：**
```json
{
  "code": 200,
  "message": "分析成功",
  "data": {
    "foodName": "鸡胸肉沙拉",
    "calories": 350,
    "protein": 32,
    "carbs": 15,
    "fat": 18,
    "description": "一份低脂高蛋白的健康沙拉",
    "suggestedMealType": "LUNCH"
  }
}
```

---

### 6. 获取饮食目标

获取用户每日的营养摄入目标。

**接口：** `GET /diet/target`

**请求头：**
```
Authorization: Bearer <token>
```

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "calorieTarget": 1500,
    "carbsTarget": 180,
    "proteinTarget": 80,
    "fatTarget": 50
  }
}
```

---

### 7. 设置饮食目标

设置用户每日的营养摄入目标。

**接口：** `PUT /diet/target`

**请求头：**
```
Authorization: Bearer <token>
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| calorieTarget | number | 是 | 每日卡路里目标 |
| carbsTarget | number | 否 | 碳水化合物目标(g) |
| proteinTarget | number | 否 | 蛋白质目标(g) |
| fatTarget | number | 否 | 脂肪目标(g) |

---

### 8. 获取饮食建议

获取基于用户目标和历史的饮食建议。

**接口：** `GET /diet/suggestions`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 否 | 餐食类型筛选 |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "suggestions": [
      {
        "name": "藜麦鸡胸肉沙拉",
        "type": "DINNER",
        "calories": 350,
        "description": "富含优质蛋白，帮助夜间代谢。",
        "image": "https://picsum.photos/seed/salad/100/100"
      },
      {
        "name": "混合浆果 150g",
        "type": "SNACK",
        "calories": 80,
        "description": "天然抗氧化，脆脆的小满足。",
        "image": "https://picsum.photos/seed/fruit/100/100"
      }
    ]
  }
}
```

---

## 分析接口

### 1. 获取健康报告

获取用户的健康分析报告。

**接口：** `GET /analysis/report`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| period | string | 否 | 报告周期：week/month/quarter/year，默认month |
| date | string | 否 | 报告日期，格式：YYYY-MM-DD |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "period": "month",
    "reportDate": "2024-03-25",
    "summary": {
      "totalWorkouts": 24,
      "totalCaloriesBurned": 8500,
      "totalWorkoutDuration": 3600,
      "averageCalorieIntake": 1450,
      "weightChange": -1.2,
      "bodyFatChange": -2.1
    },
    "trends": {
      "weight": "下降趋势",
      "bodyFat": "下降趋势",
      "muscleMass": "稳定",
      "workoutFrequency": "上升趋势"
    },
    "achievements": [
      {
        "title": "连续运动7天",
        "description": "你已连续运动7天，继续保持！",
        "icon": "flame"
      },
      {
        "title": "本月运动达标",
        "description": "本月已完成20次运动训练",
        "icon": "trophy"
      }
    ],
    "recommendations": [
      "建议增加蛋白质摄入以帮助肌肉恢复",
      "您的有氧运动量适中，建议保持",
      "注意补充水分，建议每天饮水2000ml"
    ]
  }
}
```

---

### 2. 获取数据统计

获取详细的运动和饮食统计数据。

**接口：** `GET /analysis/statistics`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 统计类型：training/diet/weight |
| startDate | string | 是 | 开始日期 |
| endDate | string | 是 | 结束日期 |
| groupBy | string | 否 | 分组方式：day/week/month |

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "type": "training",
    "startDate": "2024-03-01",
    "endDate": "2024-03-25",
    "statistics": [
      {
        "date": "2024-03-25",
        "totalCalories": 450,
        "totalDuration": 5400,
        "exerciseCount": 3
      },
      {
        "date": "2024-03-24",
        "totalCalories": 380,
        "totalDuration": 4800,
        "exerciseCount": 2
      }
    ],
    "summary": {
      "total": 8500,
      "average": 354,
      "max": 520,
      "min": 180
    }
  }
}
```

---

### 3. 获取成就列表

获取用户已解锁和未解锁的成就。

**接口：** `GET /analysis/achievements`

**请求头：**
```
Authorization: Bearer <token>
```

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "achievements": [
      {
        "id": "ach_1",
        "title": "连续运动7天",
        "description": "你已连续运动7天，继续保持！",
        "icon": "flame",
        "unlocked": true,
        "unlockedAt": "2024-03-20"
      },
      {
        "id": "ach_2",
        "title": "运动达人",
        "description": "累计运动100次",
        "icon": "trophy",
        "unlocked": false,
        "progress": 75,
        "target": 100
      }
    ]
  }
}
```

---

## 设置接口

### 1. 获取用户设置

获取用户的偏好设置。

**接口：** `GET /settings`

**请求头：**
```
Authorization: Bearer <token>
```

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "notifications": {
      "workoutReminder": true,
      "dietReminder": true,
      "achievementNotification": true
    },
    "units": {
      "weight": "kg",
      "height": "cm",
      "distance": "km"
    },
    "language": "zh-CN",
    "theme": "light",
    "privacy": {
      "showProfile": true,
      "shareProgress": false
    }
  }
}
```

---

### 2. 更新用户设置

更新用户的偏好设置。

**接口：** `PUT /settings`

**请求头：**
```
Authorization: Bearer <token>
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| notifications | object | 否 | 通知设置 |
| notifications.workoutReminder | boolean | 否 | 运动提醒 |
| notifications.dietReminder | boolean | 否 | 饮食提醒 |
| notifications.achievementNotification | boolean | 否 | 成就通知 |
| units | object | 否 | 单位设置 |
| units.weight | string | 否 | 体重单位：kg/lbs |
| units.height | string | 否 | 身高单位：cm/in |
| language | string | 否 | 语言：zh-CN/en |
| theme | string | 否 | 主题：light/dark/system |
| privacy | object | 否 | 隐私设置 |
| privacy.showProfile | boolean | 否 | 展示个人资料 |
| privacy.shareProgress | boolean | 否 | 分享进度 |

---

### 3. 获取帮助信息

获取应用的帮助文档或常见问题。

**接口：** `GET /settings/help`

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "faq": [
      {
        "question": "如何开始使用FitCute？",
        "answer": "首先注册账号，完善个人资料后即可开始记录运动和饮食。"
      },
      {
        "question": "如何设置每日卡路里目标？",
        "answer": "在饮食页面点击设置按钮，即可自定义每日营养摄入目标。"
      }
    ],
    "contact": {
      "email": "support@fitcute.com",
      "website": "https://fitcute.com"
    }
  }
}
```

---

## 公共接口

### 1. 获取应用配置

获取应用的公共配置信息。

**接口：** `GET /config`

**响应示例：**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "version": "1.0.0",
    "maintenance": false,
    "minAppVersion": "1.0.0",
    "features": {
      "aiAnalysis": true,
      "social": false,
      "wearableSync": false
    }
  }
}
```

---

## 通用响应格式

### 成功响应

```json
{
  "code": 200,
  "message": "操作成功",
  "data": { ... }
}
```

### 错误响应

```json
{
  "code": 400,
  "message": "请求参数错误",
  "error": {
    "field": "email",
    "reason": "邮箱格式不正确"
  }
}
```

### HTTP状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/令牌过期 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 版本信息

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0.0 | 2026-03-25 | 初始版本 |

---

## 注意事项

1. 所有需要认证的接口都需要在请求头中携带 `Authorization: Bearer <token>`
2. 日期格式统一使用 `YYYY-MM-DD`
3. 时间格式统一使用 `HH:mm`（24小时制）
4. 图片上传支持 `jpg`、`jpeg`、`png` 格式，最大5MB
5. API请求频率限制：每个用户每分钟100次请求
