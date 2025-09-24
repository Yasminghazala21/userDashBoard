# User Management Dashboard

## Project Overview

The User Management Dashboard is a modern, responsive web application built with React.js. It allows users to manage a list of users with capabilities to:

- View user data in a sortable and paginated table.
- Add new users with validated input.
- Edit existing user details.
- Delete users with ease.
- Search and filter users by name, email, and department.
- Sort data by columns including ID, First Name, Last Name, Email, and Department.
- Paginate results with configurable options for number of users per page.

This project uses modular React components with component-scoped CSS for clean, maintainable code and a polished UI without third-party CSS frameworks.

---

## Technology Stack

- React.js (with Hooks)
- JavaScript (ES6+)
- CSS with Flexbox for layout and responsiveness
- Mock user data for offline-first simulation

---

## Folder Structure

```
src/
├── components/
│ ├── UserTable.js
│ ├── UserTable.css
│ ├── UserForm.js
│ ├── UserForm.css
│ ├── SearchFilter.js
│ └── SearchFilter.css
├── services/
│ └── api.js
├── App.css
├── App.js
├── index.css
└── index.js
```

---

## Setup Instructions

1. **Install Node.js**  
   Download and install the latest LTS version from [https://nodejs.org/en/download](https://nodejs.org/en/download).

2. **Create React App & Project Folder**  
   Open your terminal and run:
   ```
    npx create-react-app user-dashboard
    cd user-dashboard
   ```

4. **Add Component and Service Files**  
    Create the necessary folders inside `src`:
   ``` 
     mkdir src/components src/services
   ```
     Add the provided `.js` and `.css` files into the `components` folder and the mock data into `services`.

6. **Update App.js**  
    Replace the default `App.js` content with the project code connecting components and mock data.

7. **Run the Project**  
    Start your React development server with:
   ```
     npm start
   ```
     This will open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- Click **Add User** to open the form.
- Fill in user details including company's name as department.
- Edit or Delete users from the table.
- Use search and filter boxes to quickly find users.
- Click on table headers to sort by that column.
- Use pagination controls at the bottom to navigate between pages.

---

## Architecture Description

- The **App.js** file manages the overall app state: user data list, filtering, sorting, pagination, and form toggling.
- **UserTable** displays users in a sortable table with action buttons.
- **UserForm** provides a controlled form for adding or editing users, with live validation and department selection.
- **SearchFilter** offers search input and dropdown filtering by department.
- Mock data stored in `api.js` simulates backend data persistence.
- CSS is scoped per component, using Flexbox and custom styles to maintain a clean and responsive layout.

## Reflections

### Challenges Faced

- **Component-Level CSS:** Moving all styles to local component files increased code manageability but added careful planning for layout consistency and prevention of style leaks.
- **State Management:** Coordinating multiple states for sorting, filtering, and pagination alongside CRUD operations required splitting responsibilities between App and child components.
- **Sorting & Table Interaction:** Implementing dynamic sorting logic for several columns and toggling direction was tricky to keep code clean and maintain UX quality.
- **Custom Validation:** Building form validation for required and formatted fields using React state and controlled inputs, while remaining user-friendly, prompted several iterations.

### Improvements & Future Features

If more time or resources were available, I would:

- Add confirmation modals for destructive actions (like user delete) and offer undo functionality.
- Enhance the UI/UX with richer animations, clear error messages, and accessibility improvements.
- Expand filtering to multi-field and support complex queries.
- Support user images, roles/permissions, and multiple user types.


---
