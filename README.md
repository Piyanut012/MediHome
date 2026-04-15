System Architecture
<img width="1024" height="768" alt="System Architecture" src="https://github.com/user-attachments/assets/cbf3a6f3-d35f-46ad-8cd2-abaef82f8645" />


คำสั่ง Set up framework ที่ใช้
(อย่าลืมอัพเดต npm กับ node ให้ version ล่าสุด)

Node.js : https://nodejs.org/en

npm
```sh
npm install -g npm@latest
```

Backend
```sh
cd backend
npm i express nodemon mongoose cors dotenv bcrypt jsonwebtoken moment-timezone
```

Frontend
```sh
cd frontend
npm i react-router-dom axios react-icons notistack dotenv flowbite framer-motion moment-timezone react-bootstrap bootstrap
```

วิธีรันทั้งสองฝั่งใช้คำสั่ง
```sh
npm run dev
```
Backend PORT : 3000

Frontend PORT : 5173
