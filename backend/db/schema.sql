DROP DATABASE IF EXISTS giant_machines_interview;
CREATE DATABASE giant_machines_interview;

\c giant_machines_interview;

DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id SERIAL primary key,
    date Text NOT NULL,
    client TEXT NOT NULL,
    project TEXT NOT NULL,
    projectCode TEXT NOT NULL,
    hours numeric(8,2),
   billable TEXT NOT NULL,
   firstName TEXT NOT NULL,
   lasttName TEXT NOT NULL,
   billableRate numeric(8)
);
