# 🚀 ACM SVNIT Student Chapter Website

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

The official website for the **Association for Computing Machinery (ACM) Student Chapter at SVNIT, Surat**. Built with a focus on a premium, cinematic, dark-themed UI and a fully dynamic, secure backend for chapter management.

🌐 **Live Demo:** [https://acm-svnit.vercel.app](https://acm-svnit-three.vercel.app/) 

---

## ✨ Key Features

* **🎬 Cinematic Dark UI:** A premium design system using deep dark backgrounds (`#0a0a0a`), vibrant blue accents (`#0055A2`), and custom Google typography (`next/font/google`).
* **✨ Fluid Animations:** Scroll-reveal animations, staggered grid entrances, and interactive hovers powered by **Framer Motion**.
* **👥 Dynamic Team Page:** Circular profile cards with fallback avatars and conditional social links (LinkedIn, GitHub), fetched live from the database.
* **📅 Immersive Events Showcase:** Horizontal, massive event layouts featuring image carousels for past events and categorized by status (Ongoing, Upcoming, Past).
* **🗺️ Integrated Contact & Maps:** A secure contact form connected to Firebase, alongside a custom dark-mode Google Maps embed pointing to the SVNIT campus.
* **🔐 Secure Admin Portal:** A completely custom CMS (`/admin`) protected by Google OAuth and a strict email whitelist. Admins can:
    * Upload new Events and Team members (using Cloudinary image URLs).
    * Read incoming messages from the Contact form in a secure inbox.

---

## 🛠️ Tech Stack

* **Frontend Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Database & Auth:** Firebase (Firestore, Authentication)
* **Image Hosting:** Cloudinary (via URL linking)
* **Deployment:** Vercel

---

## 🚀 Getting Started (Local Development)

To get a local copy up and running, follow these simple steps.

### Prerequisites
* Node.js (v18 or higher recommended)
* npm or yarn
* A Firebase Project
* A Google account (for Admin access)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Manthan-svnit/acm-svnit.git](https://github.com/Manthan-svnit/acm-svnit.git)
   cd acm-svnit
