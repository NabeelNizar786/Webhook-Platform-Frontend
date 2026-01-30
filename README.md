# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Webhook Platform UI

A functional, React-based dashboard designed to manage webhook subscriptions and monitor event delivery in real-time. This UI serves as the control center for the Webhook Platform ecosystem.

---

## Table of Contents
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [System Prerequisites](#-system-prerequisites)
* [Getting Started](#-getting-started)
* [Application Flow](#-application-flow)
* [Security & JWT](#-security--jwt)
* [API Integration](#-api-integration)

---

## Features

* **Secure Auth:** Full JWT-based authentication flow with protected client-side routes.
* **Subscription Management:** Create, view, and manage webhook configurations effortlessly.
* **Real-time Event Tracking:** Monitor event delivery history, including status (`PENDING`, `SUCCESS`, `FAILED`) and retry attempts.
* **Minimalist Design:** Lightweight and high-performance interface focused on system transparency.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React.js |
| **Routing** | React Router |
| **API Client** | Axios (with Interceptors) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Styling** | Custom CSS (Modular & Clean) |

---

## Application Architecture

The frontend acts as the interface between the user and the event-driven backend.



---

## Getting Started

### 1. System Prerequisites
Before starting the frontend, ensure the following are running:
* **Backend API:** `http://localhost:3000`
* **RabbitMQ:** Required for real-time event processing and retries.

### 2. Installation
```bash
# Clone the repository
git clone <frontend-repo-url>

# Navigate to project directory
cd webhook-platform

# Install dependencies
npm install

# Start the development server
npm run dev

# Security & JWT Flow
The application implements a secure handshake to protect user data:

Authentication: User logs in; the backend returns a JWT.

Persistence: The token is stored securely in localStorage.

Global Injection: An Axios Interceptor attaches the token to the Authorization header of every request.

Route Protection: React Router guards ensure sensitive pages (Dashboard, History) are inaccessible without a valid token.

#API Integration Map
Feature Method Endpoint Auth Required
User Signup,POST,/auth/signup,No
User Login,POST,/auth/login,No
Fetch Webhooks,GET,/webhooks,Yes
Create Webhook,POST,/webhooks,Yes
Event Logs,GET,/webhooks/:id/events,Yes

#Design Decisions

Intentional Minimalism: Focused on functionality and system behavior rather than heavy visual frameworks.

Component-Based: Built with a modular structure for easy scalability.

Data-First: Designed to mirror real-world webhook platform usage, prioritizing the visibility of delivery statuses and payloads.

