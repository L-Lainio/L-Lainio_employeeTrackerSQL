# 📊 Employee Tracker SQL

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Inquirer](https://img.shields.io/badge/Inquirer.js-FF6600?style=flat&logo=npm&logoColor=white)

A command-line application for managing a company's employee database, built with Node.js, Inquirer, and PostgreSQL.

## 🔗 Links

- **Source Code**: [GitHub Repository](https://github.com/L-Lainio/L-Lainio_employeeTrackerSQL)

## 📖 Project Overview

This project is a command-line Content Management System (CMS) designed to help business owners view and manage their company's departments, roles, and employees. Built from scratch using modern JavaScript practices, it provides a user-friendly interface for database operations without requiring direct SQL knowledge.

## 🎞️ Interactive Demo

### Application Interface
![Employee Tracker Screenshot](./assets/screenshot.png)

### Walkthrough Video/GIF
![Employee Tracker Demo](./assets/demo.gif)

*(Command-line interface showing menu options and table displays)*

## 🌟 Key Features

- **Direct SQL Integration**: Uses raw PostgreSQL queries with the `pg` library for optimal performance.
- **Interactive CLI**: Built with Inquirer.js for a smooth experience with dynamic prompts.
- **Data Validation**: Ensures data integrity through proper SQL constraints and input validation.
- **Modular Architecture**: Clean separation of concerns with dedicated modules for database connectivity and logic.

## 🛠️ Technical Stack

- **Logic**: JavaScript (ES6+), Node.js
- **CLI Framework**: Inquirer.js
- **Database**: PostgreSQL
- **Environment**: dotenv for configuration

## 🔧 Installation & Local Setup

### Requirements

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/L-Lainio/L-Lainio_employeeTrackerSQL.git
   cd L-Lainio_employeeTrackerSQL
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Database Setup:** Run the following in your terminal to create the database and tables:
   ```bash
   psql -U postgres -f db/schema.sql
   ```
4. **Seed Data (Optional):**
   ```bash
   psql -U postgres -d employee_db -f db/seeds.sql
   ```
5. **Environment Configuration:** Create a `.env` file in the root directory:
   ```
   DB_NAME=employee_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=127.0.0.1
   DB_PORT=5432
   ```
6. **Launch the Application:**
   ```bash
   node index.js
   ```

## 📋 User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## ✅ Acceptance Criteria

- [x] View all departments, roles, and employees in formatted tables
- [x] Add new departments, roles, and employees
- [x] Update employee roles
- [x] Securely handle credentials via .env

## 📧 Contact

I'm happy to connect! You can find me on GitHub or reach out via the links below:

- **Email**: lora.lainio.it@gmail.com
- **LinkedIn**: [Lora Lainio](https://linkedin.com/in/lora-lainio)
- **GitHub**: [L-Lainio](https://github.com/L-Lainio)

© 2024-2026 Lora Lainio
