-- Изменение типа колонок warranty с INTEGER на VARCHAR
ALTER TABLE chandeliers 
ALTER COLUMN official_warranty TYPE VARCHAR(50);

ALTER TABLE chandeliers 
ALTER COLUMN shop_warranty TYPE VARCHAR(50);