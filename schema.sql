DROP DATABASE IF EXISTS inventory_management;

CREATE DATABASE inventory_management;
USE inventory_management;

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(80) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_name VARCHAR(120) NOT NULL,
    category_id INT NOT NULL,
    quantity_on_hand DECIMAL(10,2) NOT NULL DEFAULT 0,
    unit VARCHAR(30) NOT NULL,                 -- e.g. kg, bottles, cartons, jar
    reorder_point DECIMAL(10,2) NOT NULL DEFAULT 0,
    target_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    storage_location VARCHAR(80),              -- e.g. Refrigerated, Pantry
    notes VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ingredients_category
        FOREIGN KEY (category_id) REFERENCES categories(category_id),
    CONSTRAINT chk_quantity_on_hand CHECK (quantity_on_hand >= 0),
    CONSTRAINT chk_reorder_point CHECK (reorder_point >= 0),
    CONSTRAINT chk_target_stock CHECK (target_stock >= 0)
);

CREATE TABLE expiration_records (
    expiration_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_id INT NOT NULL,
    expiry_date DATE NOT NULL,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
    unit VARCHAR(30) NOT NULL,
    storage_location VARCHAR(80),
    notes VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_expiration_ingredient
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
        ON DELETE CASCADE,
    CONSTRAINT chk_expiration_quantity CHECK (quantity >= 0),
    INDEX idx_expiration_date (expiry_date)
);