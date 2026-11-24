# Daily Task Reminders

A simple task-management website built with **HTML, CSS and JavaScript**. It helps users organize daily tasks, set priorities and due dates, track progress, and receive alerts for tasks that are due or overdue.

## Features

- **Demo login:** Enter a name to open the task dashboard.
- **Task management:** Add, edit and delete tasks.
- **Task details:** Set a title, due date, category and priority.
- **Task status:** Track tasks as Pending, In Progress or Completed.
- **Dashboard:** View total, pending, in-progress and completed task counts, along with an overall completion percentage.
- **Search and filters:** Search by task title and filter tasks by status.
- **Sorting:** Sort tasks by due date, priority or name.
- **Reminders:** Display an alert when a task is due today or overdue.
- **Browser storage:** Save tasks in the browser using `localStorage`, so they remain available after the page is refreshed in the same browser.
- **Responsive layout:** Includes basic styling for smaller screens.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser `localStorage` and `sessionStorage`

## Getting Started

This project does not require installation of packages or a backend server.

1. Download or clone this repository.
2. Make sure the main file is named `index.html`.
3. Open `index.html` in a web browser.
4. Enter a name on the login screen to access the dashboard.

## How to Use

1. Log in by entering your name.
2. Add a task title and due date.
3. Select a category, priority and status.
4. Click **Add Task** to save the task.
5. Use **Edit** to update a task or **Delete** to remove it.
6. Use the search box, status filter and sorting menu to find tasks.
7. Mark tasks as Completed by editing their status. The dashboard updates the progress summary.

## Data and Login Notes

- The login is a simple classroom demonstration. It is **not secure authentication** and does not use user accounts or a server.
- Tasks are stored in the browser that is being used. They are not synchronised between different devices or browsers.
- Anyone using the same browser profile may be able to access the stored task data.
- Reminder alerts are checked when the task list is displayed. They are not background or scheduled notifications.

## Deployment

The website can be published using **GitHub Pages**:

1. Push the project files to a GitHub repository.
2. Open the repository's **Settings**.
3. Select **Pages** from the sidebar.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.

GitHub Pages will provide a public URL after deployment is complete.

## Project Team

**Team:** SLAYERS

---

This project was created as a first-semester student project to practise building a functional website with HTML, CSS and JavaScript.
