# Flashcard SaaS

A modern, full-stack web application that leverages AI to help users generate, store, and study flashcards from any text. Built with Next.js, Firebase, Clerk authentication, and Google Generative AI.

## 🚀 Features

- **AI-Powered Flashcard Generation:**  
  Users can input any text, and the app uses Google Generative AI to break it down into concise, effective flashcards.

- **User Authentication:**  
  Secure sign-up and sign-in flows powered by Clerk.

- **Personal Flashcard Storage:**  
  Each user's flashcards are stored in Firebase Firestore, ensuring privacy and accessibility from any device.

- **Interactive Study Experience:**  
  Flip through flashcards, track your progress, and focus on key concepts.
  
- **Responsive UI:**  
  Built with React and Material UI for a seamless experience on any device.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, Material UI
- **Backend/API:** Next.js API routes
- **Authentication:** Clerk
- **Database:** Firebase Firestore
- **Payments:** Stripe
- **AI Integration:** Google Generative AI (Gemini)
- **Analytics:** Vercel Analytics

## 📚 What I Learned

- Building and deploying a full-stack SaaS product from scratch
- Integrating third-party APIs (Stripe, Clerk, Google AI)
- Managing authentication and user data securely
- Designing responsive, user-friendly interfaces with Material UI
- Handling asynchronous operations and error states in React
- Structuring a scalable Next.js project

## 🏗️ Project Structure

```
/app
  /api           # API routes (AI, Stripe)
  /flashcards    # Flashcard viewing
  /generate      # Flashcard generation
  /sign-in, /sign-up
/firebase.js     # Firebase config
/utils           # Utility functions (Stripe)
```

## 🧑‍💻 Getting Started

1. **Clone the repo:**  
   `git clone https://github.com/yourusername/flashcard-saas.git`

2. **Install dependencies:**  
   `npm install`

3. **Set up environment variables:**

   - Firebase config
   - Clerk keys
   - Stripe keys
   - Google Generative AI key

4. **Run locally:**  
   `npm run dev`

5. **Open:**  
   [http://localhost:3000](http://localhost:3000)

## 💡 Why This Project?

This project demonstrates my ability to build production-ready, scalable web applications using the latest technologies. It showcases my skills in full-stack development, cloud integration, authentication, payments, and AI—all essential for modern software engineering roles.
