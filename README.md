# VideoBelajar API

Backend API untuk platform learning management system (LMS) VideoBelajar - Tugas dari [HariSenin.com](https://harisenin.com)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT

## Features

### User Management

- Registration dan login dengan role-based access (Admin, Student, Instructor)
- JWT authentication dengan refresh token
- Profile management dengan upload image

### Course Management

- CRUD courses dengan kategori
- Course status (Open, Close, Maintenance, Full)
- Instructor assignment per course
- Course features (Include, Language)
- Discount management dengan periode waktu

### Learning Content

- Module management dengan tipe (Lesson, Pretest, Quiz, Test)
- Lesson content dengan durasi
- Assessment dengan berbagai tipe (Pretest, Quiz, Test)
- Question bank dengan tipe Essay dan Multiple Choice

### Student Progress

- Classroom enrollment dengan status tracking
- Lesson progress tracking
- Assessment attempts dengan scoring system
- Course reviews dan ratings

### Payment & Orders

- Multiple payment methods (E-Wallet, Transfer, Debit)
- Payment procedures
- Order management dengan invoice generation
- Status tracking (Pending, Completed, Cancelled)

## Database Schema

### Core Tables

- `user` - User accounts dengan role
- `category` - Course categories
- `course` - Course information
- `instructor` - Instructor assignment
- `feature` - Course features
- `discount` - Course discounts

### Learning Tables

- `modul` - Course modules
- `lesson` - Learning content
- `assessment` - Tests dan quizzes
- `question` - Assessment questions
- `option` - Multiple choice options

### Progress Tables

- `class_room` - Student enrollments
- `class_progress` - Lesson completion tracking
- `assessment_attempt` - Test attempts
- `assessment_answer` - Student answers

### Transaction Tables

- `payment` - Payment methods
- `procedures` - Payment procedures
- `order` - Purchase orders
- `review` - Course reviews

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Supabase account)
