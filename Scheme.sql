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
    flight varchar
);

CREATE TABLE vacation (
    id serial primary key,
    pilot int REFERENCES users(id),
    from_date date,
    to_date date
);

SELECT fio, f.flyhours/EXTRACT(DOY FROM current_date) as 'hours'
    FROM users JOIN
    (SELECT id, SUM(arrival - departure) as flyhours 
    FROM flies
    GROUP BY id) ON f.id=users.id; 
