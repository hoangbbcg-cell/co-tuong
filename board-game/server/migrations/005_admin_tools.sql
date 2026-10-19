CREATE TABLE user_cosmetics (
 user_id BIGINT UNSIGNED NOT NULL, kind VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 code VARCHAR(40) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 granted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (user_id,kind,code),
 CONSTRAINT fk_cosmetic_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT ck_cosmetic_kind CHECK (kind IN ('avatar','frame'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE admin_audit (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 user_id BIGINT UNSIGNED NOT NULL, action VARCHAR(24) NOT NULL, reason VARCHAR(300) NOT NULL,
 request_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 before_value JSON NOT NULL, after_value JSON NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (id), KEY ix_admin_audit_user (user_id,created_at DESC,id),
 CONSTRAINT fk_admin_audit_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
