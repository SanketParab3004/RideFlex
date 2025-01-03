# RideFlex

RideFlex is an online car rental system that aims to simplify the process of renting vehicles for both customers and administrators. The platform provides a seamless user experience for browsing, booking, and managing car rentals while offering a powerful dashboard for administrators to manage operations efficiently.

---

## Features

### User Features:
1. **User Registration and Authentication**:
   - Secure user registration.
   - Login functionality with encrypted password storage.
2. **Car Listings**:
   - View detailed car listings with model, price, and availability.
   - Filter and search for cars based on user preferences.
3. **Booking System**:
   - Users can book cars for specific dates and durations.
   - Check car availability in real-time.
4. **Payment Integration**:
   - Support for secure online payments for bookings.
   - Payment history and invoice generation.
5. **User Dashboard**:
   - View past and current bookings.
   - Manage personal account details and booking history.

### Admin Features:
1. **Admin Dashboard**:
   - Comprehensive view of all system activities.
   - Manage user accounts, car listings, and bookings.
2. **Car Management**:
   - Add, edit, and remove cars from the inventory.
   - Update car details such as price and availability.
3. **Booking Management**:
   - Approve, decline, or cancel bookings.
   - Monitor payment statuses and booking history.
4. **Analytics and Reporting**:
   - Generate reports on bookings and revenue.
   - Track user activities and system performance.

---

## Technologies Used

### Frontend:
- **HTML5 & CSS3**: For the structure and styling of the user interface.
- **JavaScript**: For interactivity and dynamic content updates.

### Backend:
- **PHP**: For server-side logic and API development.

### Database:
- **MySQL**: For data storage and management of users, cars, and bookings.

---

## Installation and Setup

Follow these steps to set up RideFlex on your local machine:

### 1. Clone the Repository:
```bash
git clone https://github.com/SanketParab3004/RideFlex.git
```

### 2. Navigate to the Project Directory:
```bash
cd RideFlex
```

### 3. Set Up the Database:
1. Open your MySQL client or phpMyAdmin.
2. Create a database named `rideflex`.
3. Import the provided SQL file located in the `db` directory to set up the tables and seed initial data.

### 4. Configure Database Connection:
1. Navigate to the `includes/config.php` file.
2. Update the database credentials:
   ```php
   $dbHost = 'localhost';
   $dbUser = 'your_username';
   $dbPass = 'your_password';
   $dbName = 'rideflex';
   ```

### 5. Start the Server:
1. Ensure you have a local server environment (e.g., XAMPP, WAMP, or MAMP).
2. Place the project files in the `htdocs` directory (or equivalent root directory).
3. Start the server and access the application via:
   ```
   http://localhost/RideFlex
   ```

---

## Usage

### For Users:
1. **Register**:
   - Sign up for an account to access the platform.
2. **Browse Cars**:
   - Explore available cars with detailed information.
3. **Book a Car**:
   - Select a car and specify the rental duration.
   - Confirm the booking and complete payment.
4. **Manage Bookings**:
   - View and manage current and past bookings.

### For Administrators:
1. **Login**:
   - Access the admin dashboard.
2. **Manage Cars**:
   - Add new cars to the inventory.
   - Edit or remove existing cars.
3. **Handle Bookings**:
   - Approve or decline user bookings.
   - Monitor payments and booking statuses.
4. **View Reports**:
   - Generate analytics on platform usage and revenue.

---

## Contribution Guidelines

Contributions to RideFlex are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request and provide a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgements

Special thanks to all contributors and the open-source community for their support and resources used in developing RideFlex.

---

## Contact

For inquiries or feedback, please reach out via:
- **Email**: sanketparab3004@example.com
- **GitHub**: [SanketParab3004](https://github.com/SanketParab3004)

