# Real-Time Inventory Management System

##  Introduction
In modern inventory management systems, maintaining real-time updates across multiple clients can be a challenge, especially with traditional client-server architectures that rely on periodic polling. This project addresses the need for instant inventory synchronization and efficient data handling by leveraging Svelte for dynamic UI updates, Flask with WebSockets for real-time communication, and DuckDB for lightweight, high-performance data storage.

The Real-Time Inventory Management System provides a seamless solution where users can add, update, and delete products, with changes instantly reflected on all connected clients. This approach ensures data consistency, reduces latency, and enhances user experience, making it ideal for businesses that require real-time inventory tracking and management.

---

##  Features

- **Real-Time Updates**: Changes made in the inventory are instantly reflected across all connected clients.
- **Add, Update, and Delete Products**: Easily manage inventory through a user-friendly interface.
- **Scalable Backend**: Powered by Flask and WebSockets for seamless communication.
- **Efficient Database**: DuckDB ensures fast and lightweight data storage.

---
##  Tech Stack

- **Frontend**: Svelte, TailwindCSS, Flowbite-Svelte
- **Backend**: Flask, Flask-SocketIO
- **Database**: DuckDB
- **WebSocket Communication**: Socket.IO

---

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- Python (v3.9 or later)

## Project Structure
- flask-server: Flask application with Flask-SocketIO for real-time communication and DuckDB for database management.
- svelte-app: Svelte application using Flowbite UI framework for a modern table display and WebSocket communication.


## 🔧 Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/real-time-inventory-management.git
cd real-time-inventory-management-system
 ```

### 2. Backend Setup
```bash
cd backend
 ```

### 3. Create a Python virtual environment and activate it:
```bash
python3 -m venv .venv
source .venv/bin/activate
 ```
### 4. Install the required dependencies:
```bash
pip install -r requirements.txt
 ```
### 5. Run the Flask backend server:
```bash
python app.py
 ```
### 6.Frontend Setup
```bash
cd frontend

 ```
### 7. Install the required Node.js dependencies:
```bash
npm install
 ```
### 8. Start the frontend development server:
```bash
npm run dev
 ```

## Sequence Diagram
Below is the sequence diagram illustrating the workflow of the system:

![Sequence Diagram](https://github.com/user-attachments/assets/336abbb7-5e4d-4abf-80b4-b21b6e71425f)


