-- Private title and note belong to the bookmark, not the shared match.
ALTER TABLE saved_matches
 ADD COLUMN title VARCHAR(100) NOT NULL DEFAULT '',
 ADD COLUMN note TEXT NULL;
