-- Durable checkpoints for active online matches. Snapshot JSON excludes socket IDs and credentials.
CREATE TABLE active_match_snapshots (
 match_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 room_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 revision BIGINT UNSIGNED NOT NULL,
 snapshot_version SMALLINT UNSIGNED NOT NULL,
 captured_at DATETIME(3) NOT NULL,
 clock_anchor_at DATETIME(3) NOT NULL,
 snapshot LONGTEXT NOT NULL,
 checksum CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 PRIMARY KEY (match_id), UNIQUE KEY uq_active_snapshot_room (room_id),
 CONSTRAINT fk_active_snapshot_match FOREIGN KEY (match_id) REFERENCES matches(id),
 CONSTRAINT ck_active_snapshot_revision CHECK (revision > 0 AND snapshot_version > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
