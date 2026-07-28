# Eventiq API Documentation


Base URL:

Production:

https://eventiq-backend-0crk.onrender.com/api



# Authentication Routes


POST

/auth/register

Description:
Register new user


POST

/auth/login

Description:
Login user and generate JWT token


POST

/auth/verify-otp

Description:
Verify email OTP



# Event Routes


GET

/events

Description:
Get all events


POST

/events

Description:
Create new event

Access:
Admin


GET

/events/:id

Description:
Get event details



# Booking Routes


POST

/bookings

Description:
Book an event


GET

/bookings/user

Description:
Get user bookings

