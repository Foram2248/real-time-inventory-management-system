# Real-Time Inventory Management System

##  Introduction
In modern inventory management systems, maintaining real-time updates across multiple clients can be a challenge, especially with traditional client-server architectures that rely on periodic polling. This project addresses the need for instant inventory synchronization and efficient data handling by leveraging Svelte for dynamic UI updates, Flask with WebSockets for real-time communication, and DuckDB for lightweight, high-performance data storage.

The Real-Time Inventory Management System provides a seamless solution where users can add, update, and delete products, with changes instantly reflected on all connected clients. This approach ensures data consistency, reduces latency, and enhances user experience, making it ideal for businesses that require real-time inventory tracking and management.

---

## **Features**

- **Real-Time Updates**: Instantly reflect inventory changes across all connected clients.  
- **Product Management**: Add, update, and easily delete products.  
- **Low Stock Monitoring**: Identify products with low stock levels.  
- **Category-Based Insights**: Analyze sales and stock levels at the category and product levels.  
- **Sales Data Table**: View detailed sales data, including total sales value and sale duration.  
- **Lightweight Backend**: Built using Flask with efficient WebSocket communication.  
- **Powerful Database**: Used DuckDB which provides fast, analytical query capabilities.  
- **Modern UI**: A responsive and clean tab-based interface for seamless navigation.  

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

### **Backend**
- Flask with WebSocket support for real-time communication.  
- DuckDB is used as the database for efficient storage and advanced queries.  
- APIs provide endpoints for fetching and managing inventory, sales, and insights.  

### **Frontend**
- Built with Svelte, offering a user-friendly and modern interface.  
- Tab-based navigation allows seamless switching between inventory, sales, and monitoring features.  
- Real-time updates are handled via WebSocket communication with the backend.  

### **Database**
- DuckDB serves as the database for managing inventory, sales, and category data.  
- Advanced query features like grouping sets, multi-level joins, and unions are utilized.  

---

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


