\c giant_machines_interview;

COPY entries (date, client, project, projectCode, hours,  billable, firstName, lasttName, billableRate)
FROM '/Users/daddy/personal-project/giant-machines/backend/GM_Coding_Exercise_Sample_Data_-_GM_Coding_Exercise_Sample_Data.csv'
DELIMITER ','
CSV HEADER;

-- INSERT INTO entries (date, client, project, projectCode, hours,  billable, firstName, lasttName, billableRate)
-- VALUES ('4/3/17', 'Anil', 'Ethereum', 'RD00', 3.84, 'No', 'Robert', 'Powell', 0)