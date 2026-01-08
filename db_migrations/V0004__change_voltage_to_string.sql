-- Изменение типа колонки voltage с INTEGER на VARCHAR
ALTER TABLE chandeliers 
ALTER COLUMN voltage TYPE VARCHAR(50);