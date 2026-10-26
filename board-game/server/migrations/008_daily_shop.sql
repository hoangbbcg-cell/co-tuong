-- Shared market selection and lifetime appearance history survive restarts.
CREATE TABLE daily_shop_state (
 id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
 seen_product_ids JSON NOT NULL,
 CONSTRAINT ck_daily_shop_singleton CHECK(id=1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE daily_shop_days (
 sale_date DATE NOT NULL PRIMARY KEY,
 product_ids JSON NOT NULL,
 repeated_count TINYINT UNSIGNED NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 CONSTRAINT ck_daily_shop_repeat_count CHECK(repeated_count<=6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
