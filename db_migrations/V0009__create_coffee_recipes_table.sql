-- Создание таблицы для кофейных рецептов
CREATE TABLE coffee_recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    ingredients TEXT,
    instructions TEXT,
    preparation_time INTEGER,
    difficulty VARCHAR(50),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);