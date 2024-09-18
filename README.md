# **Currency Exchange React Frontend**

## **Project Overview**

This is the frontend for the Currency Exchange Application, built using **React** and **Vite**. It fetches real-time exchange rates from a backend API and provides a user-friendly interface for converting between different currencies.

### **Technologies Used:**

- **React**: JavaScript library for building user interfaces
- **Vite**: Fast development server and build tool
- **Axios**: HTTP client for API requests
- **Zustand**: State management for React
- **SCSS**: CSS preprocessor for styling
- **Yup & React Hook Form**: Form validation
- **React Toastify**: Notifications
- **Jest & React Testing Library**: Unit testing for React components

---

## **Table of Contents**

- [Project Overview](#project-overview)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps to Install](#steps-to-install)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [API Integration](#api-integration)
- [Styling](#styling)
---

## **Installation**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js**: Version 14+ is required.
- **npm**: Version 6+ is required.

### **Steps to Install**

1. Clone the repository:

   ```bash
   git clone https://github.com/paladinknightmaster/currency-exchange-react-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd currency-exchange-react-frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

---

## **Running the Application**

1. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the application locally at **http://localhost:3000**.

2. The app will automatically open in your browser, or you can visit it manually.

---

## **Testing the Application**

This project uses **Jest** and **React Testing Library** for unit testing.

### **Run Tests**

To execute the tests:

```bash
npm test
```

### **Generate Coverage Report**

To generate a test coverage report:

```bash
npm test -- --coverage
```

The coverage report can be found in the `coverage/` directory.

---

## **Features**

- **Real-Time Exchange Rates**: Fetches real-time currency exchange rates from the backend.
- **Currency Conversion**: Allows users to convert amounts between selected currencies.
- **Responsive Design**: The UI is optimized for both desktop and mobile devices.
- **Form Validation**: Form validation using `Yup` and `React Hook Form`.
- **Global State Management**: Managed by `Zustand` for optimal performance.
- **Notifications**: User feedback provided by `React Toastify` notifications.

---

## **Folder Structure**

```plaintext
currency-exchange-react-frontend/
│
├── public/                # Static files
├── src/                   # Main source code
│   ├── api/               # API services (axios configuration)
│   ├── components/        # React components
│   ├── constants/         # Static constants (currencies, etc.)
│   ├── store/             # Zustand global state managementes
│   ├── App.jsx            # Main application entry
│   ├── App.scss           # Main application style
│   ├── main.jsx           # Main entry point for ReactDOM rendering
│   └── index.html         # HTML template
│
├── jest.config.js         # Jest configuration
├── vite.config.js         # Vite configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## **API Integration**

### **Axios**

API requests are made using **Axios** for communication with the backend.

- **Base URL**: Set in `axiosConfig.js` for all API requests.
- **Endpoints**:
  - `/rates`: Fetches the latest exchange rates.
  - `/convert`: Converts an amount between two currencies.

### **Sample API Request** (from `currencyService.js`):

```js
import axios from './axiosConfig';

export const getExchangeRates = async () => {
  try {
    const response = await axios.get('/rates');
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

---

## **Styling**

### **SCSS**

This project uses **SCSS** for styling, which provides enhanced features such as nesting and variables.

- **Main SCSS File**: `src/App.scss`
- **Component-Level Styling**: SCSS modules are used for individual components.