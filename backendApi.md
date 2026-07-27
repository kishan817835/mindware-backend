============= register api =================

curl --location 'http://localhost:5000/api/v1/users/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "first_name": "Rahul",
  "last_name": "Sharma",
  "username": "kishan81783537",
  "email": "Kishan@81ws78",
  "phone": "99999922878",
  "password": "Kishan@8178",
  "gender": "Male",
  "dob": "2002-08-15",
  "language_code":"hi",
  "profile image": "https://example.com/profile.jpg"
}'





============ login api ==================

curl --location 'http://localhost:5000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
 
  "username": "kishan81783537",
//   "email": "Kishan@81ws78",
  "password": "Kishan@8178"
}'

