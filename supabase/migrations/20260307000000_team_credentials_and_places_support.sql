-- Add credential provisioning metadata for admin-managed team logins.
ALTER TABLE IF EXISTS team_members
    ADD COLUMN IF NOT EXISTS credentials_sent BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS invited_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS last_invite_method TEXT
        CHECK (last_invite_method IN ('invite_link', 'temp_password')),
    ADD COLUMN IF NOT EXISTS password_reset_required BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_team_members_credentials_sent
    ON team_members(credentials_sent);

-- Improve duplicate detection for places without forcing full uniqueness on all legacy rows.
CREATE INDEX IF NOT EXISTS idx_places_normalized_address
    ON places (lower(address), lower(COALESCE(city, '')), lower(COALESCE(province, '')), lower(COALESCE(postal_code, '')));
