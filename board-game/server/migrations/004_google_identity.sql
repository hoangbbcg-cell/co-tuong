-- Google subject is an external identity, never an email or a client user ID.
ALTER TABLE users ADD COLUMN google_sub VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NULL,
 ADD COLUMN session_expires_at DATETIME(3) NULL,
 ADD UNIQUE KEY uq_users_google_sub (google_sub);
