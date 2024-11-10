# Project Name

This project was created with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
  - [JSON Server](#json-server)
- [Optimization Techniques](#optimization-techniques)

## Overview

This project is a React-based application designed to manage user profiles. It includes an API server simulation using `json-server` to handle data operations. The project also employs performance optimization techniques, such as `useMemo` and `useCallback`, to enhance rendering efficiency and application speed.

## Getting Started

To get started with the project, clone the repository to your local machine, install dependencies, and configure the environment variables. Follow the steps below to set up and run the project.

### Prerequisites

Ensure you have Node.js and npm installed on your system. 

## Available Scripts

In the project directory, you can run the following commands:

### `npm install`

Installs all necessary dependencies for the project.

### `npm run start:dev`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The page will reload automatically if you make edits.

### `npm run start:prod`

Runs the app in production mode. The production environment uses a separate API base URL, configured in the `.env.production` file. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Starts the `json-server` on [http://localhost:5000](http://localhost:5000). Make sure this server is running to enable data persistence and API requests.

## Environment Configuration

To enable the app to switch between development and production API URLs, we use environment variables configured in `.env` files.

1. **Create .env Files:**
   - **Development:** Create a `.env.development` file for development mode configuration.
   - **Production:** Create a `.env.production` file for production mode configuration.

2. **Add the following variables to each file:**
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

**Note:** The URL can be modified based on the environment setup, allowing the app to seamlessly switch between different API endpoints in development and production.

## Running the Application

1. **Start the JSON Server:**
   - Run `npm run server` in a separate terminal to launch the JSON server on [http://localhost:5000](http://localhost:5000).

2. **Start the React App:**

   - **Development Mode:** Run `npm run start:dev` to launch the app in development mode.
   - **Production Mode:** Run `npm run start:prod` to launch the app in production mode.

## Optimization Techniques

To improve the performance and efficiency of this application, we have implemented several optimization techniques:

1. **`useCallback` Hook:**
   - `useCallback` is used to memoize callback functions, preventing them from being recreated on every render. This is particularly helpful for functions passed to child components or functions used in event handlers, like `handleDelete` and `handleEdit`. This reduces unnecessary re-renders and improves performance.

2. **`useMemo` Hook:**
   - `useMemo` is applied to memoize computed values, such as filtered lists or expensive calculations, recalculating them only when dependencies change. For instance, when filtering or sorting profiles based on user input, `useMemo` caches the result and only updates it when specific state variables (like `searchTerm`) change. This helps avoid re-computation and speeds up rendering.

3. **Local Storage for Persistent State:**
   - Local storage is used to store profile data, enabling the app to load data more quickly by avoiding redundant API requests on every page reload. This reduces the load on the server and improves data access speed.

4. **Conditional Rendering:**
   - The application conditionally renders components (like loaders and messages) based on the data state, which keeps the UI responsive and clean.

---

This setup and optimizations provide a smooth, efficient experience for users and an organized codebase, allowing for easy maintenance and scalability.
