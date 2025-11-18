-- Create coffee recipes table
CREATE TABLE IF NOT EXISTS coffee_recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    brewing_method VARCHAR(100),
    coffee_amount_g INTEGER,
    water_amount_ml INTEGER,
    brewing_time_minutes INTEGER,
    temperature_celsius INTEGER,
    difficulty_level VARCHAR(50),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on name for faster searches
CREATE INDEX idx_coffee_recipes_name ON coffee_recipes(name);

-- Create index on difficulty level
CREATE INDEX idx_coffee_recipes_difficulty ON coffee_recipes(difficulty_level);