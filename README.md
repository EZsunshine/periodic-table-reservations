# Capstone: Restaurant Reservation System

[Restaurant Reservation](https://reservation2022-client.herokuapp.com/dashboard)
---
### Table of Contents
- Summary
- API
- Technology

### Summary
This is a restaurant reservation app for restaurant personnel to make reservations for customers. The dashboard shows the information on customer reservations of the day, and the tables that are currently available. Use the Reservation tab to enter customer information, and it will show in the dashboard on the day of the reservation. Use the Search tab, staff can also search reservation information by entering a phone number. Assign customers to an empty table, then the table will turn occupied. The restaurant opens every day but Tuesday, from 10:30 am ~ 9:30 pm. Welcome to our restaurant!

### API
#### /reservations route
- get - list of reservations from database
- post - add reservation with body, check for all necessary data
- put - update existing reservation, check for all necessary data
#### /reservations/:reservation_id route
- put - update existing reservation, check for all necessary data
- get - list specific reservation
#### /reservations/:reservation_id/status
- get - list the party size of a reservation
- put - update a reservation's status
#### /tables
- get - list of tables from db
- post - add a new table, check for all necessary data
#### /tables/:table_id/seat
- put - update table with occupied status
- delete - open up a table after reservation is over

### Technology
#### Front-End
- React
- HTML
- CSS
- Bootstrap
- JSX
#### Back-End
- PostgreSQL
- Knex JS
- Node JS
- Express JS


