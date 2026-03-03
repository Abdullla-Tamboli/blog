# MERN Blog Platform

A full-featured Blog Platform built using the MERN stack. This application allows users to create and manage blogs, 
interact through likes and comments, and track engagement analytics through a personalized dashboard.

## 📁 Project Structure

```
blog/
│── blog-frontend/   # React Frontend
│── blog-backend/    # Node.js + Express Backend
```

---

## 🚀 Key Features

### 🔐 Authentication

* User Registration & Login
* Email OTP verification for secure login
* JWT-based authentication

### 📝 Blog Management

* Create, Edit, and Delete Blogs
* View all blogs and individual blog details
* Rich content posting

### ❤️ User Interaction

* Like and Unlike blogs
* Comment on blog posts
* Share blogs with others

### 📊 User Dashboard

* Personal dashboard for users
* View their published blogs
* Track engagement metrics
* Graphs showing:

  * Number of Likes
  * Comments count
  * Overall blog engagement

---

## 🛠 Tech Stack

**Frontend**

* React.js
* Axios
* Chart.js / Recharts (for engagement graphs)
* Tailwind CSS / CSS

**Backend**

* Node.js
* Express.js
* JWT Authentication
* Nodemailer (for Email OTP)

**Database**

* MongoDB (Mongoose)

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Abdullla-Tamboli/blog.git
cd blog
```

---

### 2. Backend Setup

```bash
cd blog-backend
npm install
npm run dev
```

Create `.env` file inside `blog-backend`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

### 3. Frontend Setup

Open new terminal:

```bash
cd blog-frontend
npm install
npm start
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

---

## 📸 Screenshots

* Home Page
* Blog Details Page
* User Dashboard
* Engagement Graph
* Login with Email OTP

<img width="1894" height="733" alt="image" src="https://github.com/user-attachments/assets/483be8d5-e346-4c37-a50c-3bb0d6d5182f" />
<img width="1525" height="893" alt="image" src="https://github.com/user-attachments/assets/5569a76f-e80e-47ed-8c3e-15298a1a44c7" />
<img width="1384" height="685" alt="image" src="https://github.com/user-attachments/assets/f5ca371a-d889-4696-8d30-345fa677fc92" />
<img width="962" height="449" alt="image" src="https://github.com/user-attachments/assets/e9cdc9d9-3b45-4905-aa19-84d725ed17e8" />
<img width="1653" height="907" alt="image" src="https://github.com/user-attachments/assets/003fa6dd-9051-4d85-9f9f-a59254bd2b0f" />

<img width="1755" height="543" alt="image" src="https://github.com/user-attachments/assets/910f879a-396a-4deb-9aa9-3712d975f304" />
<img width="1692" height="552" alt="image" src="https://github.com/user-attachments/assets/11a27039-acf0-4ca3-ba72-88e84d201653" />
<img width="1726" height="577" alt="image" src="https://github.com/user-attachments/assets/829c7982-c4de-4d0e-829a-11c619be801a" />
<img width="694" height="287" alt="image" src="https://github.com/user-attachments/assets/0a8e5513-b07c-4883-b774-c7c08480d0d6" />

---

## 🌐 Future Improvements

* Admin Dashboard to manage all users and blogs
* Blog approval & moderation system
* Advanced analytics for admin
* Social media login

---

## 👨‍💻 Author

**Abdulla Tamboli**
GitHub: https://github.com/Abdullla-Tamboli
