# Personal Full Stack Blog Platform

This is a simple basic personal blog platform. In this you can write simple blog posts. In this technologies included: React.js, Node.js and PostgreSQL.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Deployment Process](#deployment-process)
3. [Architecture Overview](#architecture-overview)
4. [License](#license)

---

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/HimansuWebCoder/Full_Stack_Blog_Website.git
   cd your-repository
   ```

2. **Install Dependencies**  
   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Run:  
   **Frontend Dependencies**
   ```bash
    cd client
    npm install
    ```
   **Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3. **Run the Application**  
   Start the Backend Server:  
   ```bash
   npm start
   ```
   Open your browser and navigate to `http://localhost:3000`.

   Start the Frontend Server:
   ```bash
   npm start
   ``` 
   Open your browser and navigate to `http://localhost:8080`.

4. **Set Environment Variables**  
   Create a `.env` file in the root directory or in /server and add the following keys:  
   ```env
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   PORT=8080
   ```
---

## Deployment Process

To deploy this project, follow these steps:

### Deploy Locally
1. Complete the setup instructions above.  
2. Use `npm run build` if applicable (for React apps).  
3. Start the production server:  
   ```bash
   npm run start
   ```

### Deploy on Cloud (Example: Azure)
1. Push your repository to GitHub if it isn't already:  
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to your [Azure Dashboard](https://azure.microsoft.com/en-us/), create a new web service, and connect your GitHub repository.

3. Set the required environment variables in the Azure dashboard.

4. Click **Deploy**. Your application will be live at ``.

---

## Architecture Overview

Here is the full stack blog project's architecture.

1. **Frontend**  
   * Built with [React.js/HTML/CSS] for UI.  
   * Communicates with backend APIs via RESTful endpoints.

2. **Backend**  
   * Built with [Node.js and Express.js].  
   * Handles API routes, authentication, and database operations.

3. **Database**  
   * PostgreSQL as the primary database.  
   * Stores user data.

**Workflow Diagram:**
```plaintext
User → Frontend → Backend → Database/Storage
```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Demo on GitHub Readme

1. Save the file as `README.md` in your project directory.
2. Push it to GitHub:
   ```bash
   git add README.md
   git commit -m "Add README file"
   git push origin main
   ```
3. Visit your repository on GitHub. The `README.md` content will render as the main description of your project.

--- 
