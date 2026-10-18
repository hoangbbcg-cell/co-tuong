-- MySQL 8.0.45. Each statement is independently journaled. No DROP or automatic repair.
CREATE TABLE users (
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
 public_id BIGINT UNSIGNED NOT NULL,
 guest_code CHAR(6) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 display_name VARCHAR(32) NOT NULL, search_name VARCHAR(64) NOT NULL,
 linked_at DATETIME(3) NULL, name_changed_at DATETIME(3) NULL,
 avatar_code VARCHAR(40) CHARACTER SET ascii COLLATE ascii_bin NOT NULL DEFAULT 'avatar-0',
 avatar_frame_code VARCHAR(40) CHARACTER SET ascii COLLATE ascii_bin NOT NULL DEFAULT 'frame-0',
 province_code VARCHAR(16) NULL, ward_code VARCHAR(16) NULL, address_label VARCHAR(255) NULL,
 status VARCHAR(16) NOT NULL DEFAULT 'active',
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
 PRIMARY KEY (id), UNIQUE KEY uq_users_public (public_id), UNIQUE KEY uq_users_guest (guest_code),
 KEY ix_users_search (search_name),
 CONSTRAINT ck_users_guest CHECK (REGEXP_LIKE(guest_code, '^[0-9]{6}$')),
 CONSTRAINT ck_users_status CHECK (status IN ('active','disabled','deleted')),
 CONSTRAINT ck_users_rename CHECK (name_changed_at IS NULL OR linked_at IS NOT NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_game_stats (
 user_id BIGINT UNSIGNED NOT NULL, variant VARCHAR(16) NOT NULL,
 elo INT NOT NULL DEFAULT 1000,
 played_count INT UNSIGNED NOT NULL DEFAULT 0, win_count INT UNSIGNED NOT NULL DEFAULT 0,
 draw_count INT UNSIGNED NOT NULL DEFAULT 0, loss_count INT UNSIGNED NOT NULL DEFAULT 0,
 current_win_streak INT UNSIGNED NOT NULL DEFAULT 0, best_win_streak INT UNSIGNED NOT NULL DEFAULT 0,
 updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
 PRIMARY KEY (user_id,variant), KEY ix_stats_ranking (variant,elo DESC,user_id),
 CONSTRAINT fk_stats_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT ck_stats_variant CHECK (variant IN ('xiangqi','jieqi')),
 CONSTRAINT ck_stats_counts CHECK (played_count = win_count + draw_count + loss_count AND best_win_streak >= current_win_streak)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_resources (
 user_id BIGINT UNSIGNED NOT NULL, gold BIGINT UNSIGNED NOT NULL,
 energy TINYINT UNSIGNED NOT NULL DEFAULT 5, energy_recovery_at DATETIME(3) NULL,
 version INT UNSIGNED NOT NULL DEFAULT 0,
 updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
 PRIMARY KEY (user_id), CONSTRAINT fk_resources_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT ck_resources_energy CHECK (energy <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE matches (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 source VARCHAR(24) NOT NULL, recorded_by_user_id BIGINT UNSIGNED NULL,
 variant VARCHAR(16) NOT NULL, status VARCHAR(16) NOT NULL, rated BOOLEAN NOT NULL DEFAULT FALSE,
 room_ref CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NULL,
 room_name_snapshot VARCHAR(40) NULL, province_snapshot VARCHAR(100) NULL,
 initial_time_ms BIGINT UNSIGNED NOT NULL, turn_limit_ms INT UNSIGNED NOT NULL,
 initial_state JSON NOT NULL, final_state JSON NULL,
 winner_side VARCHAR(5) NULL, finish_reason VARCHAR(24) NULL,
 rules_version VARCHAR(32) NOT NULL, rating_rules_version VARCHAR(32) NULL,
 started_at DATETIME(3) NOT NULL, created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 ended_at DATETIME(3) NULL, history_expires_at DATETIME(3) NULL,
 PRIMARY KEY (id), KEY ix_matches_status (status,started_at), KEY ix_matches_variant (variant,ended_at DESC),
 KEY ix_matches_expiry (history_expires_at), KEY ix_matches_recorder (recorded_by_user_id),
 CONSTRAINT fk_matches_recorder FOREIGN KEY (recorded_by_user_id) REFERENCES users(id),
 CONSTRAINT ck_matches_source CHECK (source IN ('server_online','local_saved','legacy_import')),
 CONSTRAINT ck_matches_variant CHECK (variant IN ('xiangqi','jieqi')),
 CONSTRAINT ck_matches_status CHECK (status IN ('playing','finished','aborted')),
 CONSTRAINT ck_matches_rated CHECK (rated IN (0,1) AND (rated = 0 OR (source = 'server_online' AND rating_rules_version IS NOT NULL))),
 CONSTRAINT ck_matches_side CHECK (winner_side IS NULL OR winner_side IN ('red','black')),
 CONSTRAINT ck_matches_time CHECK (initial_time_ms > 0 AND turn_limit_ms > 0 AND (ended_at IS NULL OR ended_at >= started_at)),
 CONSTRAINT ck_matches_reason CHECK (finish_reason IS NULL OR finish_reason IN ('capture','checkmate','stalemate','timeout','resign','draw','leave','server_abort')),
 CONSTRAINT ck_matches_result CHECK ((status = 'playing' AND ended_at IS NULL AND final_state IS NULL AND finish_reason IS NULL AND winner_side IS NULL) OR
 (status = 'finished' AND ended_at IS NOT NULL AND final_state IS NOT NULL AND finish_reason IS NOT NULL AND finish_reason <> 'server_abort' AND ((finish_reason = 'draw' AND winner_side IS NULL) OR (finish_reason <> 'draw' AND winner_side IS NOT NULL))) OR
 (status = 'aborted' AND ended_at IS NOT NULL AND finish_reason = 'server_abort' AND winner_side IS NULL))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE match_players (
 match_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 side VARCHAR(5) NOT NULL, user_id BIGINT UNSIGNED NULL, name_snapshot VARCHAR(32) NOT NULL,
 elo_before INT NULL, elo_delta SMALLINT NULL, elo_after INT NULL,
 PRIMARY KEY (match_id,side), UNIQUE KEY uq_match_player (match_id,user_id), KEY ix_player_history (user_id,match_id),
 CONSTRAINT fk_player_match FOREIGN KEY (match_id) REFERENCES matches(id),
 CONSTRAINT fk_player_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT ck_player_side CHECK (side IN ('red','black')),
 CONSTRAINT ck_player_elo CHECK ((elo_before IS NULL AND elo_delta IS NULL AND elo_after IS NULL) OR
 (elo_before IS NOT NULL AND elo_delta IS NOT NULL AND elo_after IS NOT NULL AND elo_after = elo_before + elo_delta))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE match_moves (
 match_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, ply INT UNSIGNED NOT NULL,
 side VARCHAR(5) NOT NULL, from_row TINYINT UNSIGNED NOT NULL, from_col TINYINT UNSIGNED NOT NULL,
 to_row TINYINT UNSIGNED NOT NULL, to_col TINYINT UNSIGNED NOT NULL,
 uci VARCHAR(5) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 state_after JSON NOT NULL, accepted_at DATETIME(3) NOT NULL,
 PRIMARY KEY (match_id,ply), KEY ix_move_player (match_id,side),
 CONSTRAINT fk_move_match FOREIGN KEY (match_id) REFERENCES matches(id),
 CONSTRAINT fk_move_player FOREIGN KEY (match_id,side) REFERENCES match_players(match_id,side),
 CONSTRAINT ck_move_board CHECK (ply >= 1 AND from_row <= 9 AND to_row <= 9 AND from_col <= 8 AND to_col <= 8),
 CONSTRAINT ck_move_side CHECK (side IN ('red','black'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE resource_events (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, user_id BIGINT UNSIGNED NOT NULL,
 resource_type VARCHAR(16) NOT NULL, delta BIGINT NOT NULL, reason VARCHAR(40) NOT NULL,
 match_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NULL,
 idempotency_key VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (id), UNIQUE KEY uq_resource_idempotency (idempotency_key),
 KEY ix_resource_user (user_id,created_at DESC,id), KEY ix_resource_match (match_id),
 CONSTRAINT fk_event_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT fk_event_match FOREIGN KEY (match_id) REFERENCES matches(id),
 CONSTRAINT ck_event_resource CHECK (resource_type IN ('gold','energy'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE saved_matches (
 user_id BIGINT UNSIGNED NOT NULL, match_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 saved_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), PRIMARY KEY (user_id,match_id),
 KEY ix_saved_user (user_id,saved_at DESC,match_id), KEY ix_saved_match (match_id),
 CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT fk_saved_match FOREIGN KEY (match_id) REFERENCES matches(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE saved_positions (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, owner_id BIGINT UNSIGNED NOT NULL,
 title VARCHAR(120) NOT NULL, note TEXT NOT NULL, variant VARCHAR(16) NOT NULL,
 state JSON NOT NULL, format_version SMALLINT UNSIGNED NOT NULL,
 source_match_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NULL, source_ply INT UNSIGNED NULL,
 move_number INT UNSIGNED NOT NULL, red_name_snapshot VARCHAR(32) NOT NULL, black_name_snapshot VARCHAR(32) NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
 PRIMARY KEY (id), KEY ix_position_owner (owner_id,created_at DESC,id), KEY ix_position_source (source_match_id),
 CONSTRAINT fk_position_owner FOREIGN KEY (owner_id) REFERENCES users(id),
 CONSTRAINT fk_position_source FOREIGN KEY (source_match_id) REFERENCES matches(id),
 CONSTRAINT ck_position_variant CHECK (variant IN ('xiangqi','jieqi')),
 CONSTRAINT ck_position_version CHECK (format_version >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE friendships (
 user_low_id BIGINT UNSIGNED NOT NULL, user_high_id BIGINT UNSIGNED NOT NULL, requested_by BIGINT UNSIGNED NOT NULL,
 status VARCHAR(16) NOT NULL, created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
 PRIMARY KEY (user_low_id,user_high_id), KEY ix_friend_low (user_low_id,status),
 KEY ix_friend_high (user_high_id,status), KEY ix_friend_requester (requested_by),
 CONSTRAINT fk_friend_low FOREIGN KEY (user_low_id) REFERENCES users(id),
 CONSTRAINT fk_friend_high FOREIGN KEY (user_high_id) REFERENCES users(id),
 CONSTRAINT fk_friend_requester FOREIGN KEY (requested_by) REFERENCES users(id),
 CONSTRAINT ck_friend_pair CHECK (user_low_id < user_high_id AND requested_by IN (user_low_id,user_high_id)),
 CONSTRAINT ck_friend_status CHECK (status IN ('pending','accepted'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_follows (
 follower_id BIGINT UNSIGNED NOT NULL, followed_id BIGINT UNSIGNED NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), PRIMARY KEY (follower_id,followed_id),
 KEY ix_follow_target (followed_id,created_at),
 CONSTRAINT fk_follow_actor FOREIGN KEY (follower_id) REFERENCES users(id),
 CONSTRAINT fk_follow_target FOREIGN KEY (followed_id) REFERENCES users(id),
 CONSTRAINT ck_follow_self CHECK (follower_id <> followed_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_blocks (
 blocker_id BIGINT UNSIGNED NOT NULL, blocked_id BIGINT UNSIGNED NOT NULL,
 created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), PRIMARY KEY (blocker_id,blocked_id), KEY ix_block_target (blocked_id),
 CONSTRAINT fk_block_actor FOREIGN KEY (blocker_id) REFERENCES users(id),
 CONSTRAINT fk_block_target FOREIGN KEY (blocked_id) REFERENCES users(id),
 CONSTRAINT ck_block_self CHECK (blocker_id <> blocked_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE conversations (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, type VARCHAR(8) NOT NULL,
 direct_user_low_id BIGINT UNSIGNED NULL, direct_user_high_id BIGINT UNSIGNED NULL,
 title VARCHAR(80) NULL, avatar_object_key VARCHAR(512) NULL, created_by BIGINT UNSIGNED NOT NULL,
 last_message_at DATETIME(3) NULL, created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (id), UNIQUE KEY uq_conversation_pair (direct_user_low_id,direct_user_high_id),
 KEY ix_conversation_high (direct_user_high_id), KEY ix_conversation_creator (created_by),
 CONSTRAINT fk_conversation_low FOREIGN KEY (direct_user_low_id) REFERENCES users(id),
 CONSTRAINT fk_conversation_high FOREIGN KEY (direct_user_high_id) REFERENCES users(id),
 CONSTRAINT fk_conversation_creator FOREIGN KEY (created_by) REFERENCES users(id),
 CONSTRAINT ck_conversation_type CHECK ((type = 'direct' AND direct_user_low_id IS NOT NULL AND direct_user_high_id IS NOT NULL AND direct_user_low_id < direct_user_high_id) OR
 (type = 'group' AND direct_user_low_id IS NULL AND direct_user_high_id IS NULL))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE conversation_members (
 conversation_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, user_id BIGINT UNSIGNED NOT NULL,
 role VARCHAR(16) NOT NULL, joined_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), left_at DATETIME(3) NULL,
 last_read_message_id BIGINT UNSIGNED NULL, cleared_through_message_id BIGINT UNSIGNED NULL,
 title_override VARCHAR(80) NULL, muted_until DATETIME(3) NULL, muted_indefinitely BOOLEAN NOT NULL DEFAULT FALSE,
 PRIMARY KEY (conversation_id,user_id), KEY ix_member_user (user_id,left_at,conversation_id),
 KEY ix_member_read (conversation_id,last_read_message_id), KEY ix_member_clear (conversation_id,cleared_through_message_id),
 CONSTRAINT fk_member_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id),
 CONSTRAINT fk_member_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT ck_member_role CHECK (role IN ('owner','member')),
 CONSTRAINT ck_member_mute CHECK (muted_indefinitely IN (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE messages (
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, conversation_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 sender_id BIGINT UNSIGNED NOT NULL, client_message_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 body TEXT NOT NULL, sent_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (id), UNIQUE KEY uq_message_client (sender_id,client_message_id), UNIQUE KEY uq_message_conversation (conversation_id,id),
 KEY ix_message_sender (conversation_id,sender_id),
 CONSTRAINT fk_message_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id),
 CONSTRAINT fk_message_member FOREIGN KEY (conversation_id,sender_id) REFERENCES conversation_members(conversation_id,user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE conversation_members ADD CONSTRAINT fk_member_read FOREIGN KEY (conversation_id,last_read_message_id) REFERENCES messages(conversation_id,id);
ALTER TABLE conversation_members ADD CONSTRAINT fk_member_clear FOREIGN KEY (conversation_id,cleared_through_message_id) REFERENCES messages(conversation_id,id);

CREATE TABLE honors (
 code VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, category VARCHAR(16) NOT NULL,
 level SMALLINT UNSIGNED NOT NULL, title VARCHAR(120) NOT NULL, description TEXT NOT NULL, criteria JSON NOT NULL,
 catalog_order SMALLINT UNSIGNED NOT NULL, active BOOLEAN NOT NULL DEFAULT TRUE,
 PRIMARY KEY (code), KEY ix_honor_catalog (category,level,catalog_order),
 CONSTRAINT ck_honor_category CHECK (category IN ('arena','awarded','streak','games','attendance')),
 CONSTRAINT ck_honor_level CHECK (level BETWEEN 1 AND 5), CONSTRAINT ck_honor_active CHECK (active IN (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_honors (
 user_id BIGINT UNSIGNED NOT NULL, honor_code VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 earned_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), revoked_at DATETIME(3) NULL,
 selected BOOLEAN NOT NULL DEFAULT FALSE, source_match_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NULL,
 PRIMARY KEY (user_id,honor_code), KEY ix_user_honor_selected (user_id,selected), KEY ix_user_honor_code (honor_code), KEY ix_user_honor_match (source_match_id),
 CONSTRAINT fk_user_honor_user FOREIGN KEY (user_id) REFERENCES users(id),
 CONSTRAINT fk_user_honor_code FOREIGN KEY (honor_code) REFERENCES honors(code),
 CONSTRAINT fk_user_honor_match FOREIGN KEY (source_match_id) REFERENCES matches(id),
 CONSTRAINT ck_user_honor_selected CHECK (selected IN (0,1) AND (revoked_at IS NULL OR selected = 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE honor_endorsements (
 giver_id BIGINT UNSIGNED NOT NULL, recipient_id BIGINT UNSIGNED NOT NULL,
 honor_code VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (giver_id,recipient_id,honor_code), KEY ix_endorsement_target (recipient_id,honor_code), KEY ix_endorsement_code (honor_code),
 CONSTRAINT fk_endorsement_giver FOREIGN KEY (giver_id) REFERENCES users(id),
 CONSTRAINT fk_endorsement_recipient FOREIGN KEY (recipient_id) REFERENCES users(id),
 CONSTRAINT fk_endorsement_code FOREIGN KEY (honor_code) REFERENCES honors(code),
 CONSTRAINT ck_endorsement_self CHECK (giver_id <> recipient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE match_likes (
 match_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, actor_id BIGINT UNSIGNED NOT NULL,
 target_side VARCHAR(5) NOT NULL, created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 PRIMARY KEY (match_id,actor_id), KEY ix_like_actor (actor_id), KEY ix_like_player (match_id,target_side),
 CONSTRAINT fk_like_actor FOREIGN KEY (actor_id) REFERENCES users(id),
 CONSTRAINT fk_like_player FOREIGN KEY (match_id,target_side) REFERENCES match_players(match_id,side),
 CONSTRAINT ck_like_side CHECK (target_side IN ('red','black'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
