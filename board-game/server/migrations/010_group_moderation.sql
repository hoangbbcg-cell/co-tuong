ALTER TABLE conversation_members DROP CHECK ck_member_role, ADD CONSTRAINT ck_member_role_v2 CHECK (role IN ('owner','deputy','member'));

CREATE TABLE conversation_member_blocks (
 conversation_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 user_id BIGINT UNSIGNED NOT NULL, blocked_by BIGINT UNSIGNED NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (conversation_id,user_id),
 CONSTRAINT fk_member_block_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id),
 CONSTRAINT fk_member_block_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT fk_member_block_actor FOREIGN KEY (blocked_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
