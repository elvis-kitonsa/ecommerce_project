💡 Project Concept
KITONSA'S TECH STORE

📝 Project Description
A sleek, responsive e-commerce storefront specializing in high-end gadgets. Built with Django and powered by MariaDB, this project demonstrates a full-stack integration from a custom database to a highly interactive, "app-like" frontend experience.

🤖 Development Process
This project was built using an AI-augmented workflow. I utilized Google Gemini as a technical thought partner to:

    1. Architect the Django static file routing and MariaDB integration.

    2. Refactor procedural scripts into modular, Vanilla JavaScript.

    3. Implement LocalStorage state management for the shopping cart.

✨ Features
    1. Dynamic Product Grid: Automatically renders tech items from the MariaDB database.

    2. Smart Live Search: Instant, client-side filtering that searches titles and descriptions as you type.

    3. Persistent Shopping Cart: Items stay in your cart even if you refresh or close the browser, thanks to LocalStorage API.

    4. Advanced Cart Management: Includes quantity toggles, "Clear Cart" functionality, and automated total price calculation.

    5. Order Success Workflow: A professional checkout simulation using a Bootstrap 5 Modal for order confirmation.

    6. Polished UI: Custom hover effects, uniform image scaling, and a floating cart indicator with real-time badges.

🛠️ Tech Stack
    1. Backend: Python / Django 4.2

    2. Database: MariaDB (via XAMPP)

    3. Frontend: JavaScript (ES6+), Bootstrap 5, FontAwesome, HTML5/CSS3

    4. Database Connector: PyMySQL

📂 Project Structure

    Here is the project outline of the entire system:

        ecommerce_project/
    ├── core/                  # Project-wide settings and routing
    ├── shop/                  # Main store application logic
    │   ├── static/shop/       # Frontend assets
    │   │   ├── css/style.css  # Custom styling
    │   │   └── js/search.js   # The 'Engine' (Search & Cart Logic)
    │   ├── templates/shop/    # HTML pages
    │   │   ├── product_list.html # Dashboard/Storefront
    │   │   └── cart.html      # Dynamic Shopping Cart & Checkout
    │   ├── models.py          # Product Database Schema
    │   └── views.py           # Controllers for Store & Cart
    ├── media/                 # Uploaded product images
    └── manage.py              # Django command-line utility


⚙️ Installation & Setup
    1. Clone the Repository:

    git clone https://github.com/elvis-kitonsa/ecommerce_project.git
    cd ecommerce_project

    2. Environment Setup:

    Install dependencies: pip install -r requirements.txt

    3. Database Configuration:

    Ensure XAMPP (MySQL/MariaDB) is running and create a database named tech_store_db.

    Update core/settings.py with your credentials.

    4. Initialize & Run:

    python manage.py migrate

    python manage.py runserver

📸 Preview
![Tech Store Preview](media/preview.png)