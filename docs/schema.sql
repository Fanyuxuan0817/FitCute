-- FitCute 数据库建表脚本
-- 数据库: PostgreSQL 15
-- 创建时间: 2026-03-25

-- 创建数据库
-- 如果数据库已存在则忽略
SELECT 'CREATE DATABASE fitcute'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'fitcute')\gexec

-- 连接到 fitcute 数据库后执行以下脚本
-- 建议使用: psql -U postgres -d fitcute -f schema.sql

BEGIN;

-- ============================================
-- 用户模块
-- ============================================

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    level VARCHAR(20) DEFAULT '健身新手',
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    birthday DATE,
    height DECIMAL(5,1),
    target_weight DECIMAL(5,1),
    oauth_provider VARCHAR(20),
    oauth_id VARCHAR(100),
    status SMALLINT DEFAULT 1 CHECK (status IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_oauth ON users(oauth_provider, oauth_id);

-- 认证令牌表
CREATE TABLE IF NOT EXISTS auth_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL,
    refresh_token VARCHAR(500),
    token_type VARCHAR(20) DEFAULT 'Bearer',
    expires_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_auth_tokens_user_id ON auth_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_token ON auth_tokens(token);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_expires_at ON auth_tokens(expires_at);

-- ============================================
-- 运动模块
-- ============================================

-- 运动分类表
CREATE TABLE IF NOT EXISTS exercise_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 运动项目表
CREATE TABLE IF NOT EXISTS exercises (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    difficulty SMALLINT DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
    default_sets INT DEFAULT 3,
    default_reps VARCHAR(20),
    default_duration VARCHAR(20),
    calories_per_minute DECIMAL(5,1),
    is_system SMALLINT DEFAULT 1 CHECK (is_system IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_exercises_category ON exercises(category);
CREATE INDEX IF NOT EXISTS idx_exercises_difficulty ON exercises(difficulty);

-- 运动记录表
CREATE TABLE IF NOT EXISTS training_records (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id BIGINT NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
    sets INT NOT NULL,
    reps INT,
    duration INT,
    weight DECIMAL(6,2),
    calories INT,
    record_date DATE NOT NULL,
    record_time TIME NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_training_records_user_id ON training_records(user_id);
CREATE INDEX IF NOT EXISTS idx_training_records_exercise_id ON training_records(exercise_id);
CREATE INDEX IF NOT EXISTS idx_training_records_record_date ON training_records(record_date);
CREATE INDEX IF NOT EXISTS idx_training_records_user_date ON training_records(user_id, record_date);

-- ============================================
-- 饮食模块
-- ============================================

-- 餐食记录表
CREATE TABLE IF NOT EXISTS meals (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK')),
    time TIME NOT NULL,
    name VARCHAR(100) NOT NULL,
    calories INT NOT NULL,
    carbs DECIMAL(6,2),
    protein DECIMAL(6,2),
    fat DECIMAL(6,2),
    fiber DECIMAL(6,2),
    image VARCHAR(500),
    source VARCHAR(20) DEFAULT 'manual' CHECK (source IN ('manual', 'ai_analysis')),
    record_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_meals_user_id ON meals(user_id);
CREATE INDEX IF NOT EXISTS idx_meals_type ON meals(type);
CREATE INDEX IF NOT EXISTS idx_meals_record_date ON meals(record_date);
CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meals(user_id, record_date);

-- 食品图像分析表
CREATE TABLE IF NOT EXISTS food_analyses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    meal_id BIGINT REFERENCES meals(id) ON DELETE SET NULL,
    image_url VARCHAR(500),
    image_base64 TEXT,
    result_json JSONB NOT NULL,
    confidence DECIMAL(4,2),
    status SMALLINT DEFAULT 1 CHECK (status IN (0, 1)),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_food_analyses_user_id ON food_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_food_analyses_meal_id ON food_analyses(meal_id);

-- 饮食目标表
CREATE TABLE IF NOT EXISTS diet_targets (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    calorie_target INT NOT NULL,
    carbs_target INT,
    protein_target INT,
    fat_target INT,
    water_target INT,
    meal_count SMALLINT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_diet_targets_user_id ON diet_targets(user_id);

-- 饮食建议表
CREATE TABLE IF NOT EXISTS diet_suggestions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK')),
    calories INT NOT NULL,
    carbs DECIMAL(6,2),
    protein DECIMAL(6,2),
    fat DECIMAL(6,2),
    description TEXT,
    image VARCHAR(500),
    tags VARCHAR(255),
    is_featured SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 健康指标模块
-- ============================================

-- 健康指标记录表
CREATE TABLE IF NOT EXISTS health_stats (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    weight DECIMAL(5,1),
    body_fat DECIMAL(4,1),
    muscle_mass DECIMAL(5,1),
    water DECIMAL(4,1),
    bone_mass DECIMAL(4,1),
    bmi DECIMAL(4,1),
    visceral_fat DECIMAL(4,1),
    basal_metabolism INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, record_date)
);

CREATE INDEX IF NOT EXISTS idx_health_stats_user_id ON health_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_health_stats_record_date ON health_stats(record_date);
CREATE INDEX IF NOT EXISTS idx_health_stats_user_date ON health_stats(user_id, record_date);

-- 步数记录表
CREATE TABLE IF NOT EXISTS step_records (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    step_count INT NOT NULL,
    distance DECIMAL(8,2),
    calories INT,
    source VARCHAR(20) DEFAULT 'manual' CHECK (source IN ('manual', 'device', 'sync')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, record_date)
);

CREATE INDEX IF NOT EXISTS idx_step_records_user_id ON step_records(user_id);
CREATE INDEX IF NOT EXISTS idx_step_records_record_date ON step_records(record_date);
CREATE INDEX IF NOT EXISTS idx_step_records_user_date ON step_records(user_id, record_date);

-- ============================================
-- 计划任务模块
-- ============================================

-- 用户计划表
CREATE TABLE IF NOT EXISTS user_plans (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    plan_type VARCHAR(20) NOT NULL CHECK (plan_type IN ('workout', 'diet', 'health', 'custom')),
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    duration INT,
    target_value INT,
    is_completed SMALLINT DEFAULT 0 CHECK (is_completed IN (0, 1)),
    completed_at TIMESTAMP,
    completed_value INT,
    reminder_enabled SMALLINT DEFAULT 1 CHECK (reminder_enabled IN (0, 1)),
    reminder_time TIME,
    repeat_type VARCHAR(20) DEFAULT 'none' CHECK (repeat_type IN ('none', 'daily', 'weekly', 'monthly')),
    repeat_days VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_plans_user_id ON user_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_scheduled_date ON user_plans(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_user_plans_user_date ON user_plans(user_id, scheduled_date);

-- 计划完成记录表
CREATE TABLE IF NOT EXISTS plan_completions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id BIGINT NOT NULL REFERENCES user_plans(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_value INT,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_plan_completions_user_id ON plan_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_plan_completions_plan_id ON plan_completions(plan_id);

-- ============================================
-- 成就系统模块
-- ============================================

-- 成就定义表
CREATE TABLE IF NOT EXISTS achievements (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50) NOT NULL,
    category VARCHAR(30) NOT NULL,
    target_type VARCHAR(30) NOT NULL,
    target_value INT NOT NULL,
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 用户成就表
CREATE TABLE IF NOT EXISTS user_achievements (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id BIGINT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INT DEFAULT 0,
    is_notified SMALLINT DEFAULT 0,
    UNIQUE(user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- 用户进度表
CREATE TABLE IF NOT EXISTS user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    progress_type VARCHAR(30) NOT NULL,
    current_value INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    streak_count INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, progress_type)
);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_progress_type ON user_progress(progress_type);

-- ============================================
-- 设置模块
-- ============================================

-- 用户设置表
CREATE TABLE IF NOT EXISTS user_settings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    language VARCHAR(10) DEFAULT 'zh-CN',
    theme VARCHAR(10) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
    unit_weight VARCHAR(5) DEFAULT 'kg' CHECK (unit_weight IN ('kg', 'lbs')),
    unit_height VARCHAR(5) DEFAULT 'cm' CHECK (unit_height IN ('cm', 'in')),
    unit_distance VARCHAR(5) DEFAULT 'km' CHECK (unit_distance IN ('km', 'mi')),
    workout_reminder SMALLINT DEFAULT 1,
    diet_reminder SMALLINT DEFAULT 1,
    achievement_notification SMALLINT DEFAULT 1,
    show_profile SMALLINT DEFAULT 1,
    share_progress SMALLINT DEFAULT 0,
    week_start_day SMALLINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- 系统配置表
CREATE TABLE IF NOT EXISTS system_config (
    id BIGSERIAL PRIMARY KEY,
    config_key VARCHAR(50) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    config_type VARCHAR(20) DEFAULT 'string',
    description VARCHAR(255),
    is_public SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 帮助文档表
CREATE TABLE IF NOT EXISTS help_articles (
    id BIGSERIAL PRIMARY KEY,
    category VARCHAR(30) NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_published SMALLINT DEFAULT 1,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 初始化数据
-- ============================================

-- 插入默认运动分类
INSERT INTO exercise_categories (name, icon, sort_order) VALUES
    ('腿部训练', 'leg', 1),
    ('胸部训练', 'chest', 2),
    ('背部训练', 'back', 3),
    ('肩部训练', 'shoulder', 4),
    ('核心训练', 'core', 5),
    ('有氧运动', 'cardio', 6),
    ('柔韧性训练', 'flexibility', 7),
    ('HIIT', 'hiit', 8)
ON CONFLICT (name) DO NOTHING;

-- 插入示例运动项目
INSERT INTO exercises (name, category, description, difficulty, default_sets, default_reps, calories_per_minute) VALUES
    ('深蹲', '腿部训练', '标准深蹲动作，锻炼腿部肌肉', 2, 4, '12-15', 8.5),
    ('硬拉', '腿部训练', '复合动作，锻炼腿部和背部', 4, 4, '8-10', 10.0),
    ('卧推', '胸部训练', '胸肌经典动作', 3, 4, '8-12', 6.5),
    ('哑铃飞鸟', '胸部训练', '孤立动作，雕刻胸肌', 2, 3, '12-15', 5.0),
    ('引体向上', '背部训练', '自重训练，锻炼背阔肌', 4, 3, '8-12', 7.0),
    ('划船', '背部训练', '划船机训练', 2, 4, '12-15', 6.0),
    ('肩上推举', '肩部训练', '哑铃推举', 2, 3, '10-12', 5.5),
    ('侧平举', '肩部训练', '孤立动作，锻炼三角肌', 1, 3, '15-20', 4.0),
    ('平板支撑', '核心训练', '核心稳定性训练', 1, 3, '30-60秒', 4.5),
    ('卷腹', '核心训练', '腹部训练', 1, 3, '15-20', 4.0),
    ('开合跳', '有氧运动', '全身热身运动', 1, 3, '30秒', 9.0),
    ('跑步', '有氧运动', '户外或跑步机跑步', 2, 1, '20-30分钟', 10.0),
    ('波比跳', 'HIIT', '高强度间歇训练', 4, 3, '15-20', 12.0),
    ('登山者', 'HIIT', '核心和心肺训练', 3, 3, '30秒', 11.0),
    ('瑜伽', '柔韧性训练', '全身柔韧性和放松', 1, 1, '30-60分钟', 3.5)
ON CONFLICT DO NOTHING;

-- 插入示例饮食建议
INSERT INTO diet_suggestions (name, type, calories, carbs, protein, fat, description, is_featured) VALUES
    ('全麦欧包 & 蓝莓酸奶', 'BREAKFAST', 320, 45, 12, 8, '营养均衡的早餐选择', 1),
    ('香蕉燕麦粥', 'BREAKFAST', 280, 52, 8, 4, '快速补充能量的早餐', 0),
    ('鸡胸肉沙拉', 'LUNCH', 350, 15, 35, 18, '低脂高蛋白的健康午餐', 1),
    ('三文鱼藜麦碗', 'LUNCH', 450, 38, 32, 20, '富含Omega-3的营养午餐', 1),
    ('香煎鸡胸肉 & 藜麦沙拉', 'LUNCH', 420, 35, 38, 15, '健身人士首选午餐', 0),
    ('牛油果吐司', 'DINNER', 320, 28, 10, 20, '简单快捷的晚餐', 0),
    ('藜麦鸡胸肉沙拉', 'DINNER', 350, 30, 32, 14, '晚餐优质蛋白选择', 1),
    ('清蒸鱼蔬菜', 'DINNER', 280, 12, 28, 12, '清淡健康的晚餐', 0),
    ('混合坚果', 'SNACK', 180, 8, 5, 16, '健康脂肪来源', 1),
    ('奇异果酸奶', 'SNACK', 120, 22, 4, 2, '富含维生素C', 0),
    ('混合浆果 150g', 'SNACK', 80, 18, 1, 0, '天然抗氧化', 1)
ON CONFLICT DO NOTHING;

-- 插入成就定义
INSERT INTO achievements (code, title, description, icon, category, target_type, target_value, points) VALUES
    ('first_workout', '初次锻炼', '完成第一次运动记录', 'star', 'training', 'workout_count', 1, 10),
    ('workout_10', '运动新人', '累计完成10次运动', 'trending-up', 'training', 'workout_count', 10, 50),
    ('workout_50', '运动达人', '累计完成50次运动', 'award', 'training', 'workout_count', 50, 100),
    ('workout_100', '运动健将', '累计完成100次运动', 'trophy', 'training', 'workout_count', 100, 200),
    ('streak_7', '一周坚持', '连续运动7天', 'flame', 'streak', 'workout_streak', 7, 100),
    ('streak_30', '月度坚持', '连续运动30天', 'calendar', 'streak', 'workout_streak', 30, 300),
    ('streak_100', '百日坚持', '连续运动100天', 'zap', 'streak', 'workout_streak', 100, 1000),
    ('calories_1000', '燃脂初体验', '累计消耗1000卡路里', 'fire', 'training', 'calories_burned', 1000, 50),
    ('calories_10000', '燃脂达人', '累计消耗10000卡路里', 'activity', 'training', 'calories_burned', 10000, 200),
    ('calories_50000', '燃脂冠军', '累计消耗50000卡路里', 'zap', 'training', 'calories_burned', 50000, 500),
    ('meal_log_10', '饮食记录', '记录10次餐食', 'utensils', 'diet', 'meal_logged', 10, 30),
    ('meal_log_100', '饮食管家', '记录100次餐食', 'book-open', 'diet', 'meal_logged', 100, 100),
    ('first_weight_goal', '目标达成', '首次达到目标体重', 'target', 'general', 'weight_goal', 1, 200),
    ('steps_10000', '万步行者', '单日步数超过10000', 'footprints', 'general', 'step_count', 10000, 50),
    ('ai_analysis_first', 'AI尝鲜', '首次使用AI分析食物', 'sparkles', 'general', 'ai_analysis_count', 1, 20)
ON CONFLICT (code) DO NOTHING;

-- 插入系统配置
INSERT INTO system_config (config_key, config_value, config_type, description, is_public) VALUES
    ('app_version', '1.0.0', 'string', '应用版本', 1),
    ('min_app_version', '1.0.0', 'string', '最低支持版本', 1),
    ('maintenance_mode', 'false', 'boolean', '维护模式', 1),
    ('feature_ai_analysis', 'true', 'boolean', 'AI分析功能开关', 1),
    ('feature_social', 'false', 'boolean', '社交功能开关', 1),
    ('feature_wearable_sync', 'false', 'boolean', '可穿戴设备同步', 1),
    ('jwt_secret', 'change_this_in_production', 'string', 'JWT密钥-生产环境需修改', 0),
    ('jwt_expiry', '720', 'int', 'JWT令牌过期时间(分钟)', 0),
    ('refresh_token_expiry', '43200', 'int', '刷新令牌过期时间(分钟)', 0)
ON CONFLICT (config_key) DO NOTHING;

-- 插入帮助文档
INSERT INTO help_articles (category, question, answer, sort_order) VALUES
    ('getting_started', '如何开始使用FitCute？', '首先注册账号，完善个人资料（身高、体重、目标体重等）后即可开始记录运动和饮食。系统会根据您的目标为您推荐合适的训练计划和饮食建议。', 1),
    ('getting_started', '如何设置每日卡路里目标？', '在"饮食"页面点击右上角设置按钮，即可自定义每日营养摄入目标。系统也会根据您的身体数据和运动量智能推荐适合的目标。', 2),
    ('getting_started', '如何记录运动？', '在"训练"页面选择您要做的运动项目，点击"开始训练"即可记录您的运动数据。您也可以手动添加运动记录。', 3),
    ('training', '运动数据如何计算卡路里？', '系统会根据运动类型、时长和您的体重估算消耗的卡路里。您也可以手动输入实际的卡路里消耗。', 4),
    ('training', '如何查看运动历史？', '在"训练"页面点击"历史记录"即可查看您所有的运动记录，支持按日期筛选。', 5),
    ('diet', '如何使用AI食物分析？', '在"饮食"页面点击"拍照识别"或"AI分析"，上传食物照片，AI会自动识别食物并估算营养成分。', 6),
    ('diet', '饮食目标如何调整？', '随着您的体重变化和运动习惯的改变，建议定期调整饮食目标以适应新的身体状态。', 7),
    ('account', '如何修改个人资料？', '点击右下角"我的"->"设置"->"个人资料"即可修改您的昵称、头像等信息。', 8),
    ('account', '如何修改密码？', '点击右下角"我的"->"设置"->"账号安全"->"修改密码"进行密码修改。', 9),
    ('account', '忘记密码怎么办？', '在登录页面点击"忘记密码"，通过注册邮箱或手机号验证后即可重置密码。', 10)
ON CONFLICT DO NOTHING;

COMMIT;

-- ============================================
-- 创建更新触发器函数
-- ============================================

-- 自动更新 updated_at 字段的函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要自动更新时间的表创建触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_training_records_updated_at BEFORE UPDATE ON training_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meals_updated_at BEFORE UPDATE ON meals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_stats_updated_at BEFORE UPDATE ON health_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_step_records_updated_at BEFORE UPDATE ON step_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_plans_updated_at BEFORE UPDATE ON user_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_config_updated_at BEFORE UPDATE ON system_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_help_articles_updated_at BEFORE UPDATE ON help_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 创建用户默认设置触发器（新建用户时自动创建设置）
CREATE OR REPLACE FUNCTION create_user_settings_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_settings (user_id) VALUES (NEW.id);
    INSERT INTO diet_targets (user_id, calorie_target) VALUES (NEW.id, 1500);
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER create_user_settings AFTER INSERT ON users FOR EACH ROW EXECUTE FUNCTION create_user_settings_trigger();

\echo '=========================================='
\echo 'FitCute 数据库初始化完成！'
\echo '=========================================='
