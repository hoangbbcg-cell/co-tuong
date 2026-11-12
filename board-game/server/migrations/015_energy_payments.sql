CREATE TABLE payment_orders (
  id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  product_code VARCHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  amount_vnd INT UNSIGNED NOT NULL,
  provider VARCHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  payos_order_code BIGINT UNSIGNED NULL,
  provider_transaction_id VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'pending',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  paid_at DATETIME(3) NULL,
  expires_at DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_payment_payos_order_code (payos_order_code),
  UNIQUE KEY uq_payment_provider_transaction (provider,provider_transaction_id),
  KEY ix_payment_user (user_id,created_at),
  KEY ix_payment_status (status,expires_at),
  CONSTRAINT fk_payment_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT ck_payment_product CHECK (product_code IN ('energy_100','energy_unlimited_30d')),
  CONSTRAINT ck_payment_amount CHECK (amount_vnd > 0),
  CONSTRAINT ck_payment_status CHECK (status IN ('pending','paid','expired','cancelled','refunded'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE energy_subscriptions (
  user_id BIGINT UNSIGNED NOT NULL,
  unlimited_until DATETIME(3) NOT NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (user_id),
  CONSTRAINT fk_energy_subscription_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
