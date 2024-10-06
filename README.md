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
npm i express nodemon mongoose cors dotenv bcrypt
```

(package.json ในส่วนของ Backend)

![image](https://github.com/user-attachments/assets/316efd5e-828e-4b67-a82a-633177b29844)

Frontend
```sh
cd frontend
npm i react-router-dom axios react-icons notistack dotenv flowbite framer-motion
```

(package.json ในส่วนของ Frontend)

![image](https://github.com/user-attachments/assets/30877d19-1633-4cc9-83fb-d157619dfe8f)

วิธีรันทั้งสองฝั่งใช้คำสั่ง
```sh
npm run dev
```
Backend PORT : 3000

Frontend PORT : 5173
