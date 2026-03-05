-- Small demo dataset for dashboard modules.
-- Idempotent inserts using ON CONFLICT or NOT EXISTS filters.

-- 1) TEAM MEMBERS
INSERT INTO team_members (name, email, phone, role, region, pay_type, is_active)
VALUES
    ('Ava Admin', 'ava.admin@thecleanupcrew.demo', '416-555-1101', 'admin', 'Toronto', 'salary', true),
    ('Dylan Dispatch', 'dylan.dispatch@thecleanupcrew.demo', '416-555-1102', 'dispatcher', 'GTA West', 'salary', true),
    ('Riley Agent', 'riley.agent@thecleanupcrew.demo', '416-555-1103', 'field_agent', 'Mississauga', 'hourly', true),
    ('Jordan Agent', 'jordan.agent@thecleanupcrew.demo', '416-555-1104', 'field_agent', 'Toronto', 'contractor', true)
ON CONFLICT (email) DO NOTHING;

-- 2) PLACES
INSERT INTO places (address, city, province, postal_code, access_instructions, recurring_schedule)
SELECT *
FROM (
    VALUES
        ('10 King St W', 'Toronto', 'ON', 'M5H 1A1', 'Front desk access after 8am', 'Weekly Monday'),
        ('225 Lakeshore Rd E', 'Mississauga', 'ON', 'L5G 1G8', 'Use side gate entrance', 'Bi-weekly Thursday'),
        ('88 Bloor St E', 'Toronto', 'ON', 'M4W 1A8', 'Condo concierge has keys', 'Monthly first Friday'),
        ('901 Dundas St W', 'Toronto', 'ON', 'M6J 1V9', 'Parking behind building', NULL)
) AS v(address, city, province, postal_code, access_instructions, recurring_schedule)
WHERE NOT EXISTS (
    SELECT 1
    FROM places p
    WHERE lower(p.address) = lower(v.address)
      AND lower(COALESCE(p.city, '')) = lower(COALESCE(v.city, ''))
      AND lower(COALESCE(p.province, '')) = lower(COALESCE(v.province, ''))
      AND lower(COALESCE(p.postal_code, '')) = lower(COALESCE(v.postal_code, ''))
);

-- 3) LEADS
INSERT INTO leads (name, email, phone, source, status, assigned_to, place_id, notes)
SELECT *
FROM (
    VALUES
        (
            'Harbor Offices',
            'ops@harboroffices.demo',
            '416-555-2101',
            'website',
            'booked',
            (SELECT id FROM team_members WHERE email = 'dylan.dispatch@thecleanupcrew.demo' LIMIT 1),
            (SELECT id FROM places WHERE address = '10 King St W' LIMIT 1),
            'Recurring lobby and windows service'
        ),
        (
            'Lakeshore Dental',
            'care@lakeshoredental.demo',
            '416-555-2102',
            'referral',
            'quoted',
            (SELECT id FROM team_members WHERE email = 'dylan.dispatch@thecleanupcrew.demo' LIMIT 1),
            (SELECT id FROM places WHERE address = '225 Lakeshore Rd E' LIMIT 1),
            'Quarterly interior deep clean proposal'
        ),
        (
            'Bloor Suites Condo',
            'board@bloorsuites.demo',
            '416-555-2103',
            'call',
            'contacted',
            (SELECT id FROM team_members WHERE email = 'ava.admin@thecleanupcrew.demo' LIMIT 1),
            (SELECT id FROM places WHERE address = '88 Bloor St E' LIMIT 1),
            'Need eaves and windows package quote'
        ),
        (
            'Dundas Studio',
            'hello@dundasstudio.demo',
            '416-555-2104',
            'website',
            'new',
            NULL,
            (SELECT id FROM places WHERE address = '901 Dundas St W' LIMIT 1),
            'Requested weekend slot'
        )
) AS v(name, email, phone, source, status, assigned_to, place_id, notes)
WHERE NOT EXISTS (
    SELECT 1 FROM leads l WHERE lower(l.email) = lower(v.email)
);

-- 4) ASSIGNMENTS
INSERT INTO assignments (
    lead_id,
    place_id,
    assigned_to,
    status,
    scheduled_date,
    scheduled_window_start,
    scheduled_window_end,
    priority,
    estimated_duration_minutes,
    notes
)
SELECT *
FROM (
    VALUES
        (
            (SELECT id FROM leads WHERE email = 'ops@harboroffices.demo' LIMIT 1),
            (SELECT id FROM places WHERE address = '10 King St W' LIMIT 1),
            (SELECT id FROM team_members WHERE email = 'riley.agent@thecleanupcrew.demo' LIMIT 1),
            'assigned',
            CURRENT_DATE + INTERVAL '1 day',
            '08:00'::time,
            '10:00'::time,
            'normal',
            120,
            'Bring extension ladder'
        ),
        (
            (SELECT id FROM leads WHERE email = 'board@bloorsuites.demo' LIMIT 1),
            (SELECT id FROM places WHERE address = '88 Bloor St E' LIMIT 1),
            (SELECT id FROM team_members WHERE email = 'jordan.agent@thecleanupcrew.demo' LIMIT 1),
            'created',
            CURRENT_DATE + INTERVAL '3 day',
            '11:00'::time,
            '13:30'::time,
            'high',
            150,
            'Coordinate with concierge'
        )
) AS v(
    lead_id,
    place_id,
    assigned_to,
    status,
    scheduled_date,
    scheduled_window_start,
    scheduled_window_end,
    priority,
    estimated_duration_minutes,
    notes
)
WHERE v.lead_id IS NOT NULL
  AND v.place_id IS NOT NULL
  AND v.assigned_to IS NOT NULL
  AND NOT EXISTS (
      SELECT 1
      FROM assignments a
      WHERE a.lead_id = v.lead_id
        AND a.scheduled_date = v.scheduled_date::date
  );

-- 5) ASSIGNMENT STATUS LOG
INSERT INTO assignment_status_log (assignment_id, old_status, new_status, changed_by, notes)
SELECT
    a.id,
    NULL,
    'created',
    (SELECT id FROM team_members WHERE email = 'ava.admin@thecleanupcrew.demo' LIMIT 1),
    'Seeded assignment created'
FROM assignments a
WHERE a.id NOT IN (
    SELECT assignment_id FROM assignment_status_log WHERE new_status = 'created'
);

-- 6) INVOICES
INSERT INTO invoices (assignment_id, place_id, status, subtotal, tax_amount, total_amount, due_date, notes)
SELECT
    a.id,
    a.place_id,
    'draft',
    260.00,
    33.80,
    293.80,
    CURRENT_DATE + INTERVAL '14 day',
    'Seed draft invoice'
FROM assignments a
WHERE NOT EXISTS (
    SELECT 1 FROM invoices i WHERE i.assignment_id = a.id
)
LIMIT 1;
