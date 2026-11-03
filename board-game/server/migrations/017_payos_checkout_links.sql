ALTER TABLE payment_orders
  ADD COLUMN payos_checkout_url VARCHAR(2048) NULL,
  ADD COLUMN payos_payment_link_id VARCHAR(128)
    CHARACTER SET ascii COLLATE ascii_bin NULL;