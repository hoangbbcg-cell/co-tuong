ALTER TABLE payment_orders
  ADD COLUMN fulfillment_status VARCHAR(20)
    NOT NULL DEFAULT 'not_granted',
  ADD COLUMN fulfillment_updated_at DATETIME(3) NULL,
  ADD CONSTRAINT ck_payment_fulfillment
    CHECK (fulfillment_status IN (
      'not_granted',
      'granted',
      'review_required'
    ));

ALTER TABLE payment_orders
  ADD KEY ix_payment_fulfillment
    (fulfillment_status, created_at);