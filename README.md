# Sea2Serve - Premium Fish E-Commerce (Mangalore)

This project is a React-based e-commerce platform for "Sea2Serve", delivering fresh fish exclusively in Mangalore.
It consists of a React Frontend and a Node.js/Express Backend with MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or a cloud URI)

## Project Structure

- **client/**: React Frontend (Vite)
- **server/**: Node.js Backend (Express)

## Setup & Installation

### 1. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run start
   ```
   (Ensure MongoDB is running locally on port 27017, or update `.env` with your Mongo URI)

   *To seed the database with initial fish data, send a POST request to `http://localhost:5000/api/seed` or use a tool like Postman.*

### 2. Frontend Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the link provided (usually `http://localhost:5173`) in your browser.

## Features

- **Strict Delivery Policy**: Only accepts orders with "Mangalore" as the city.
- **Payment**: Cash on Delivery Only.
- **Product Listing**: Fresh fish with images, prices, and status.

## Note on Environment

If you do not have Node.js installed, please download and install it from [nodejs.org](https://nodejs.org/).
