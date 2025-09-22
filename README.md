# 📌 Flex Business Solutions – Frontend Tech Test (React)

Welcome to the **Frontend Tech Test** for **Flex Business Solutions**. The goal of this assignment is to evaluate your
skills in React, clean code architecture, component reusability, and general UI/UX implementation practices.

---

## 🧪 Tech Test Overview

This assignment involves building a **task management interface** with the following key features:

-   Display tasks in a table with sortable, draggable rows
-   Filter tasks based on status via header cards
-   Global search across all table columns
-   Create new tasks via a modal form
-   Export task list to PDF
-   Rich text support for task notes

---

## 🎯 Requirements

-   Build a React application based on the
    [Figma design](https://www.figma.com/design/3lj7wYMXnXK6tmdkYjNzy8/React-Task-Test?node-id=0-1&p=f).
-   Fetch task data from an external source (you may mock this or use a static JSON file).
-   Implement the following core features:

### Core Features

| Feature                    | Description                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 🧩 **Status Filter Cards** | Display a card for each status. Clicking a card filters the table by that status. Clicking it again resets the filter. |
| 🔍 **Search**              | Global search across all columns of the table.                                                                         |
| 📤 **Export to PDF**       | Button to export the current table view to a downloadable PDF.                                                         |
| ➕ **Create New Task**     | Button to open a modal form with fields, including a rich text note field (using `react-quill`).                       |
| 🖱️ **Drag & Drop Sorting** | Users can reorder rows using drag-and-drop (use `react-dnd`).                                                          |

> ❌ Ignore the pagination section in the design — it does **not** need to be implemented.

---

## 🔧 Tools & Libraries

You are free to use any libraries or frameworks that help deliver the task efficiently. Suggested libraries:

-   `react-quill` – for rich text input
-   `react-dnd` – for drag-and-drop functionality
-   `jspdf` or `react-pdf` – for export to PDF
-   `react-table` or similar – for flexible table implementation

---

## ✅ What We’re Looking For

-   Functional, readable, and well-structured code
-   Thoughtful component organization and reusability
-   Attention to UI/UX alignment with the Figma design
-   Effective use of React features like hooks, context, etc.
-   Unit testing (optional but appreciated)
-   A clean, professional Git commit history

---

## 📁 Submission Guidelines

1. Create a folder named after your full name inside the root of the repository.
2. Include **screenshots** of the completed app inside your folder.
3. Include a `README.md` with the following:
    - 🔧 Instructions to run your app
    - ✅ Technologies used
    - 🛡️ Answer: How would you make this app more secure?
    - 📈 Answer: How would you scale this app to handle millions of records?

---

## 📤 How to Submit

Once completed:

-   Push your project to your GitHub repository
-   Ensure it is **publicly accessible**
-   Add developers@flex.al as a collaborator

---

## ❓ Questions?

If you encounter any ambiguity or technical limitations, feel free to make reasonable assumptions — just document them
clearly in your README.

---

Looking forward to seeing your code! Good luck 🚀

# Question Response

## How might you make this app more secure?

To make the app more secure I would implement the following:

-   Authentication
-   Role-based access control
-   Rate limiting
-   Data validation server-side
-   Replace dummy data with a real database

## How would you make this solution scale to millions of records?

To make the app scale to milions of records I would implement the following:

-   Server side pagination
-   Cache System
-   Index frequently queried columns
-   Database partitioning
-   Archive old records
