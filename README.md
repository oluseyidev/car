
# 🚗 CarNest – Ultimate Auto Trade Hub

CarNest is a full-featured e-commerce web application for buying and selling cars. It supports user authentication, role-based access (admin, seller, buyer), car listings with wishlist functionality, and an AI-powered chat assistant.

![CarNest Banner](public/banner.jpg) <!-- Optional: add your project banner image here -->

## 🔥 Features

- 🔐 **Firebase Authentication** (Sign up / Log in)
- 👑 **Role-based access** (Admin, Seller, Buyer)
- 🚗 **List, Edit, and Delete Cars** (Seller & Admin only)
- 🛒 **Wishlist** – Save favorite cars locally
- 💬 **AI Chat Assistant** – Ask car or site-related questions
- 📃 **Orders** (Coming soon)
- 🌐 **API Cars Display** (External car API integration)
- 🧾 **Admin Panel** – Full access to all listings
- 📸 **Image Fallback** – Handles missing image URLs
- 📄 **Responsive & Styled UI** using Tailwind CSS

## 📂 Project Structure

```
CarNest/
├── public/
│   └── fallback.jpg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CarCard.jsx
│   │   ├── AddCarForm.jsx
│   │   └── ChatAssistant.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Wishlist.jsx
│   │   ├── MyCars.jsx
│   │   ├── AdminCarPage.jsx
│   │   ├── ApiCars.jsx
│   │   └── Orders.jsx
│   ├── firebase/
│   │   ├── config.js
│   │   ├── useAuth.js
│   │   └── firestore.js
│   ├── App.jsx
│   └── main.jsx
└── tailwind.config.js
```

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind CSS + Vite
- **Backend:** Firebase Firestore & Auth
- **AI Assistant:** OpenAI / Custom open-source model
- **State Management:** React Hooks + Local Storage
- **Auth Handling:** Custom `useAuth()` hook
- **Deployment:** Firebase Hosting / Vercel (optional)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/CarNestChat.git
cd CarNestChat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Firebase

- Create a Firebase project
- Enable **Authentication** (Email/Password)
- Enable **Cloud Firestore**
- Create collections: `cars`, `sellers`, `users` (optional)
- Replace config in `src/firebase/config.js`

### 4. Run the app

```bash
npm run dev
```

## 🧪 Testing

Basic manual testing done. Future improvements will include:

- ✅ Unit tests for core components  
- ✅ Integration tests for authentication  
- 🚧 E2E testing (e.g. with Cypress or Playwright)

## 📸 Screenshots

> Include screenshots or screen recordings showing the homepage, car listing, wishlist, seller panel, and chat assistant.

## 🙋‍♂️ Become a Seller

Logged-in users (non-admin) can apply to become a seller with one click. Once approved (instant), they can list and manage their own cars.

## 💬 AI Chat Assistant

Ask questions like:

- "What are the latest SUVs?"
- "Can I get a car below $5000?"
- "How do I apply as a seller?"

Powered by OpenAI (or custom model of your choice).

## 📦 Deployment

Recommended: [Firebase Hosting](https://firebase.google.com/docs/hosting)  
Or: [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/)

## 👨‍💻 Author

**Oluseyi Olalere**  
🌐 [Portfolio](#) | 💼 [LinkedIn](#) | 🐦 [Twitter](#)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
