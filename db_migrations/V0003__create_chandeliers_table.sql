-- Создание таблицы для люстр с полным набором характеристик
CREATE TABLE chandeliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    brand VARCHAR(100),
    type VARCHAR(100),
    image_url TEXT,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating DECIMAL(3, 2),
    reviews INTEGER DEFAULT 0,
    has_remote BOOLEAN DEFAULT false,
    is_dimmable BOOLEAN DEFAULT false,
    has_color_change BOOLEAN DEFAULT false,
    article VARCHAR(100),
    brand_country VARCHAR(100),
    manufacturer_country VARCHAR(100),
    collection VARCHAR(100),
    style VARCHAR(100),
    lamp_type VARCHAR(100),
    socket_type VARCHAR(50),
    bulb_type VARCHAR(100),
    lamp_count INTEGER,
    lamp_power INTEGER,
    total_power INTEGER,
    lighting_area DECIMAL(10, 2),
    voltage INTEGER,
    color VARCHAR(50),
    height DECIMAL(10, 2),
    diameter DECIMAL(10, 2),
    length DECIMAL(10, 2),
    width DECIMAL(10, 2),
    depth DECIMAL(10, 2),
    chain_length DECIMAL(10, 2),
    images TEXT[],
    assembly_instruction_url TEXT,
    materials TEXT[],
    frame_material VARCHAR(100),
    shade_material VARCHAR(100),
    frame_color VARCHAR(50),
    shade_color VARCHAR(50),
    shade_direction VARCHAR(50),
    diffuser_type VARCHAR(100),
    diffuser_shape VARCHAR(100),
    ip_rating VARCHAR(20),
    interior VARCHAR(100),
    place VARCHAR(100),
    suspended_ceiling BOOLEAN DEFAULT false,
    mount_type VARCHAR(100),
    official_warranty INTEGER,
    shop_warranty INTEGER,
    section VARCHAR(100),
    catalog VARCHAR(100),
    subcategory VARCHAR(100),
    category VARCHAR(100)
);

-- Создание индексов для ускорения поиска
CREATE INDEX idx_chandeliers_brand ON chandeliers(brand);
CREATE INDEX idx_chandeliers_price ON chandeliers(price);
CREATE INDEX idx_chandeliers_in_stock ON chandeliers(in_stock);
CREATE INDEX idx_chandeliers_category ON chandeliers(category);
CREATE INDEX idx_chandeliers_style ON chandeliers(style);

-- Добавление комментариев к таблице
COMMENT ON TABLE chandeliers IS 'Таблица с информацией о люстрах и их характеристиках';
COMMENT ON COLUMN chandeliers.rating IS 'Рейтинг от 0.00 до 5.00';
COMMENT ON COLUMN chandeliers.images IS 'Массив URL изображений';
COMMENT ON COLUMN chandeliers.materials IS 'Массив материалов изделия';