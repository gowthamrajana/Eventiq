# Eventiq Database Documentation


## Database

MongoDB Atlas


## Database Migration

Migration Completed:

Local MongoDB
        ↓
MongoDB Atlas Cloud Database


## Collections


## Users Collection

Purpose:
Stores user authentication information.

Fields:

- name
- email
- password
- role
- OTP verification status


Features:

- Secure password hashing using bcrypt
- JWT authentication
- OTP based verification


---


## Events Collection

Purpose:
Stores event information.


Fields:

- title
- description
- category
- location
- date
- totalSeats
- availableSeats
- createdBy


Features:

- Event creation
- Event filtering
- Search functionality
- Admin management


---


## Bookings Collection

Purpose:
Stores user event bookings.


Fields:

- user
- event
- bookingStatus
- createdAt


Features:

- Event booking
- Seat availability checking
- Booking approval workflow