## Project Setup

### Getting started

1. Navigate to the repository's directory on your command line. Then, run the following command:

   ```
   npm install
   ```

   This will install the libraries needed to run the this project.

2. Open up the repository in VSCode. Follow the instructions below to complete the setup.

## Instructions

1. Once you have open up the project navigate to the backend folder.

2. Find the data.csv file and right click on it after click on copy path.

   <img src="./assets/intructions1.png"  width="30%" height="10%"> <br/>

3. Navigate to [seed.sql](./backend/db/seed.sql).

4. Paste that path in the empty string right next to

```sql
From
```

<img src="./assets/intructions2.png"  width="80%" height="100%"> <br/>

1. Go back to the the terminal cd into the backend.

   <img src="./assets/intructions3.png"  width="60%" height="80%"> <br/>

2. Once you have cd into the backend run the following commands in this exact order

```
npm run db:init
npm run db:seed
npm start
```

7. Now go back to the terminal and create a new tab and cd into the frontend

<img src="./assets/intructions4.png"  width="100%" height="100%"> <br/>

8. Once you have cd into the frontend run the command

```
npm start

```
