-- Freeze gold eligibility at match start, independently from Elo and stats.
ALTER TABLE matches ADD COLUMN gold_reward_eligible BOOLEAN NOT NULL DEFAULT TRUE;
