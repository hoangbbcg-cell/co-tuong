ALTER TABLE match_players
ADD COLUMN avatar_code_snapshot VARCHAR(40) CHARACTER SET ascii COLLATE ascii_bin NULL,
ADD COLUMN avatar_frame_code_snapshot VARCHAR(40) CHARACTER SET ascii COLLATE ascii_bin NULL;
