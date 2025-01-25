# 🏢 Job Board Platform

A modern and feature-rich job board platform built using **Express.js**, designed to connect job seekers and employers seamlessly. This platform includes features such as authentication, resume uploads, application tracking, job listings, candidate profiles, and more.

---

## 🚀 Features

### ✅ Core Features

- **Authentication**: Secure login and signup for both candidates and employers.
- **Job Listings**: Employers can post job openings, and candidates can explore and apply.
- **Candidate Profiles**: Rich candidate profiles with personal information, skills, and experience.
- **Resume Uploads**: Candidates can upload and manage their resumes.
- **Application Tracking**: Track the status of applications with ease.
- **Unique IDs**: Powered by `shortid` to generate unique identifiers for jobs and users, ensuring a streamlined process for managing data. Unique IDs play a critical role in maintaining database integrity, enabling quick lookups, and ensuring that records are easily identifiable without conflicts.
- **Admin Panel**: Manage users, jobs, and applications (coming soon).

### 💡 Tech Stack

This project leverages a modern and efficient tech stack to ensure scalability, security, and a smooth user experience:

- **Backend**: Node.js and Express.js provide a robust and flexible framework for building RESTful APIs and handling server-side logic efficiently.
- **Database**: SQLite3 with Sequelize ORM ensures an easy-to-set-up, lightweight, and structured database solution, allowing for smooth data management and querying.
- **Authentication**: JSON Web Tokens (JWT) and bcrypt enable secure user authentication and password hashing, ensuring data protection.
- **File Uploads**: Multer is used to handle file uploads, making it simple to manage and store resumes uploaded by users.
- **ID Management**: `shortid` generates unique identifiers for jobs and users, ensuring a streamlined and collision-free process.

- **Backend**: Node.js, Express.js
- **Database**: SQLite3 with Sequelize ORM
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **File Uploads**: Multer for handling resume uploads
- **ID Management**: `shortid` for generating unique identifiers

---

## 📖 API Endpoints

### Authentication

- **POST** `/profile/signup`: User registration
- **POST** `/profile/login`: User login

### Jobs

- **GET** `/`: List all jobs
- **GET** `/jobs`: Create New Job if Logged In
- **GET** `/jobs/:id`: Get job details
- **POST** `/jobs/:id`: Apply For the Job(employers only)

### Profile

- **GET** `/profile`: User Profile which shows his info
- **POST** `/profile` :Update user profile
- **GET** `/profile/notification` : Retrieve all job-related notifications for a user
- **GET** `/profile/listings` : All Jobs You Have Posted
- **GET** `/profile/:id` : Preview users profile    

---

## ✨ Future Implementations

### Planned Features:

#### Job Categories:

- Add job categories (e.g., IT, Healthcare, Education) for better organization.
- Allow users to filter jobs by category.

#### Advanced Filters:

- Enable filters such as:
  - **Location**: Search jobs based on city or region.
  - **Salary Range**: Filter jobs by pay scale.
  - **Job Type**: Full-time, Part-time, Remote, Freelance.

#### Pagination:

- Implement pagination for job listings and applications to enhance performance and usability.

#### Search Functionality:

- Add a keyword-based search bar to find jobs and candidates quickly.

#### User Notifications:

- Real-time email or in-app notifications for:
  - New job applications.
  - Updates on application status.

#### Admin Dashboard:

- A full-featured admin panel to manage users, jobs, and applications.
- Provide statistics on user engagement and platform activity.

#### Company Profiles:

- Allow employers to create detailed company profiles, including logos, descriptions, and job offerings.

#### Favorites:

- Let candidates save jobs and employers bookmark candidate profiles.

