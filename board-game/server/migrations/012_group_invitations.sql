CREATE TABLE conversation_invitations (
 conversation_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 user_id BIGINT UNSIGNED NOT NULL, invited_by BIGINT UNSIGNED NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (conversation_id,user_id), KEY ix_invitation_recipient (user_id,created_at),
 CONSTRAINT fk_invitation_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id),
 CONSTRAINT fk_invitation_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT fk_invitation_inviter FOREIGN KEY (invited_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
