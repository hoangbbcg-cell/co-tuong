-- Additive account metadata. Keep legacy public IDs and address_label unchanged.
ALTER TABLE users ADD COLUMN country_code CHAR(2) CHARACTER SET ascii COLLATE ascii_bin NULL,
 ADD COLUMN province_name VARCHAR(100) NULL, ADD COLUMN ward_name VARCHAR(100) NULL,
 ADD COLUMN location_set_at DATETIME(3) NULL,
 ADD COLUMN guest_device_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NULL,
 ADD COLUMN guest_session_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NULL,
 ADD UNIQUE KEY uq_guest_device (guest_device_hash), ADD UNIQUE KEY uq_guest_session (guest_session_hash),
 ADD KEY ix_users_location (country_code,province_code,ward_code,id);
ALTER TABLE user_resources DROP CHECK ck_resources_energy;
ALTER TABLE user_resources MODIFY COLUMN energy INT UNSIGNED NOT NULL DEFAULT 5;
ALTER TABLE saved_positions ADD COLUMN red_user_id BIGINT UNSIGNED NULL, ADD COLUMN black_user_id BIGINT UNSIGNED NULL,
 ADD KEY ix_position_red (red_user_id), ADD KEY ix_position_black (black_user_id),
 ADD CONSTRAINT fk_position_red FOREIGN KEY (red_user_id) REFERENCES users(id),
 ADD CONSTRAINT fk_position_black FOREIGN KEY (black_user_id) REFERENCES users(id);
ALTER TABLE users ADD COLUMN activity_days INT UNSIGNED NOT NULL DEFAULT 0, ADD COLUMN last_activity_date DATE NULL;
