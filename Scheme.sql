CREATE TABLE users( 
    id serial primary key, 
    fio varchar, 
    password varchar, 
    role int
);

CREATE TABLE flyscale (
    id serial primary key, 
    from_date interval, 
    to_date interval, 
    days int
);

CREATE TABLE flies (
    id serial primary key,
    pilot int REFERENCES users(id),
    departure timestamp,
    arrival timestamp,
    flight varchar,
    done boolean DEFAULT false 
);

CREATE TABLE vacation (
    id serial primary key,
    pilot int REFERENCES users(id),
    from_date date,
    to_date date
);

INSERT INTO users(fio, password, role)
    VALUES ('Филинов Алексей Валерьевич', '123', 1),
    ('Филимонов Алексей Валерьевич', '1234', 1),
    ('Филин Алексей Валерьевич', '12345', 1),
    ('Филинов Алексей Викторович', '123456', 1),
    ('Фил Флекс Милос', '1', 2);

INSERT INTO flyscale (from_date, to_date, days)
    VALUES ('25 hours'::interval, '50 hours'::interval, 7)
    ('50 hours 1 minutes'::interval, '100 hours'::interval, 14),
    ('100 hours 1 minutes'::interval, '150 hours'::interval, 21),
    ('150 hours 1 minutes'::interval, '200 hours'::interval, 28),
    ('200 hours 1 minutes'::interval, '250 hours'::interval, 36);


INSERT INTO flies (pilot, departure, arrival, done, flight)
    VALUES (1, current_timestamp - '7 hours'::interval, current_timestamp , true, 'S7-231'),
    (1, current_timestamp - '2 days 7 hours'::interval, current_timestamp - '2 days'::interval , true, 'S7-231'),
    (1, current_timestamp - '3 days 7 hours'::interval, current_timestamp - '3 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '4 days 7 hours'::interval, current_timestamp - '4 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '5 days 7 hours'::interval, current_timestamp - '5 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '6 days 7 hours'::interval, current_timestamp - '6 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '7 days 7 hours'::interval, current_timestamp - '7 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '8 days 7 hours'::interval, current_timestamp - '8 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '9 days 7 hours'::interval, current_timestamp - '9 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '10 days 7 hours'::interval, current_timestamp - '10 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '11 days 7 hours'::interval, current_timestamp - '11 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '12 days 7 hours'::interval, current_timestamp - '12 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '13 days 7 hours'::interval, current_timestamp - '13 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '14 days 7 hours'::interval, current_timestamp - '14 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '15 days 7 hours'::interval, current_timestamp - '15 days'::interval , true, 'Kuk-231'),
    (1, current_timestamp - '16 days 7 hours'::interval, current_timestamp - '16 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '2 days 5 hours'::interval, current_timestamp - '2 days'::interval , true, 'S7-231'),
    (2, current_timestamp - '3 days 5 hours'::interval, current_timestamp - '3 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '4 days 5 hours'::interval, current_timestamp - '4 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '5 days 5 hours'::interval, current_timestamp - '5 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '6 days 5 hours'::interval, current_timestamp - '6 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '7 days 5 hours'::interval, current_timestamp - '7 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '8 days 5 hours'::interval, current_timestamp - '8 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '9 days 5 hours'::interval, current_timestamp - '9 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '10 days 5 hours'::interval, current_timestamp - '10 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '11 days 5 hours'::interval, current_timestamp - '11 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '12 days 5 hours'::interval, current_timestamp - '12 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '13 days 5 hours'::interval, current_timestamp - '13 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '14 days 5 hours'::interval, current_timestamp - '14 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '15 days 5 hours'::interval, current_timestamp - '15 days'::interval , true, 'Kuk-231'),
    (2, current_timestamp - '16 days 5 hours'::interval, current_timestamp - '16 days'::interval , true, 'Kuk-231');

    /*
    SELECT fio, f.flyhours/EXTRACT(DOY FROM current_date) * 365 as "hours"
        FROM users JOIN
        (SELECT pilot, SUM(arrival - departure) as flyhours
        FROM flies
        GROUP BY pilot) ON f.pilot=users.id;
    */