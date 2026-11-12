CREATE TABLE user_activity_events (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 user_id BIGINT UNSIGNED NOT NULL,
 kind VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 code VARCHAR(40) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (id),
 KEY ix_activity_time (created_at,id),
 KEY ix_activity_user_time (user_id,created_at,id),
 KEY ix_activity_code_time (kind,code,created_at),
 CONSTRAINT fk_activity_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT ck_activity_kind CHECK (kind IN ('page','feature','login'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_activity_state (
 user_id BIGINT UNSIGNED NOT NULL,
 first_seen_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 last_seen_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (user_id),
 CONSTRAINT fk_activity_state_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
