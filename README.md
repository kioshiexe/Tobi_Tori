Tobi Tori | Inventory Management System

Features

    1. Login
        - Layout
    2. Password Reset
        - Layout
    3. Dashboard
        a. Inventory Overview
            - Layout
        b. Ingredient Tracking
            - Layout
        c. Expiration Tracking
            - Layout
        d. Reports and Records
            - Layout
    4. Database
        - Established Dashboard Database

To DO:
- Backend for dashboard
- Account management and database
- SQL Injection
- Testing and Debugging

How To Use:

Login is checked against the `user` table. Existing plain-text password values are accepted once and automatically replaced with PHP password hashes after a successful login. New or manually changed passwords should be stored as hashes, generated with `php -r "echo password_hash('your-password', PASSWORD_DEFAULT), PHP_EOL;"`. Configure `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` for the MySQL connection. The dashboard is served through `php/dashboard.php` and requires an authenticated session; it uses PHP rather than a directly accessible static HTML page so the session check runs before the dashboard is sent. Use `php/logout.php` to sign out.