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




======= craete category api ============
curl --location 'http://localhost:5000/api/v1/categories' \
--header 'Content-Type: application/json' \
--data '{"name":"Electronics"}'




======= craete product ========

curl --location 'http://localhost:5000/api/v1/products' \
--header 'Content-Type: multipart/form-data; boundary=<calculated when request is sent>' \
--form 'title="Samsung Galaxy S24"' \
--form 'description="Latest flagship phone"' \
--form 'price="85000"' \
--form 'stock="50"' \
--form 'seller_id="1"' \
--form 'category_id="1"' \
--form 'images=@"/C:/Users/kishan kumar/Downloads/WhatsApp Image 2026-07-24 at 3.54.06 PM.jpeg"' \
--form 'images=@"/C:/Users/kishan kumar/Downloads/cropped-PRP-LOGO-BLUE-3-2-768x256.png"'


==== get product =========


curl --location 'http://localhost:5000/api/v1/products'

