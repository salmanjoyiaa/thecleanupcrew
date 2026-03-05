-- Grant admin role to a specific existing auth user.
-- Safe to run multiple times.
DO $$
DECLARE
    target_user_id CONSTANT UUID := '36514204-4865-42fb-985b-055e0458a124';
    target_email TEXT;
    inferred_name TEXT;
BEGIN
    SELECT email
    INTO target_email
    FROM auth.users
    WHERE id = target_user_id;

    IF target_email IS NULL THEN
        RAISE EXCEPTION 'Auth user % was not found in auth.users', target_user_id;
    END IF;

    inferred_name := initcap(replace(split_part(target_email, '@', 1), '.', ' '));

    -- Promote any existing team member records mapped to this auth user.
    UPDATE team_members
    SET role = 'admin',
        is_active = true,
        updated_at = now()
    WHERE auth_user_id = target_user_id;

    -- If no row exists for this auth user, create one.
    IF NOT FOUND THEN
        INSERT INTO team_members (auth_user_id, name, email, role, is_active)
        VALUES (target_user_id, COALESCE(NULLIF(inferred_name, ''), 'Admin User'), target_email, 'admin', true)
        ON CONFLICT (email) DO UPDATE
        SET auth_user_id = EXCLUDED.auth_user_id,
            role = 'admin',
            is_active = true,
            updated_at = now();
    END IF;

    -- Keep profiles role in sync for policies that check profiles.role = 'admin'.
    INSERT INTO profiles (id, email, full_name, role)
    VALUES (target_user_id, target_email, COALESCE(NULLIF(inferred_name, ''), 'Admin User'), 'admin')
    ON CONFLICT (id) DO UPDATE
    SET role = 'admin',
        updated_at = now(),
        email = COALESCE(profiles.email, EXCLUDED.email),
        full_name = COALESCE(profiles.full_name, EXCLUDED.full_name);
END $$;
