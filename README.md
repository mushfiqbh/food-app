## Vite Node Food Delivery Application

This project is a food delivery application built using Vite and Node.js. It allows users to browse restaurants, view menus, place orders, and track their delivery status.

### Features

* User Authentication
* Restaurant Listing and Search
* Menu Browsing
* Order Placement
* Delivery Tracking
* Admin Panel (for managing restaurants, menus, and orders)

### Technologies Used

* Frontend: Vite, React.js
* Backend: Node.js, Express.js
* Database: MongoDB

### Setup Instructions

1. Clone this repository:

   ```bash
   git clone https://github.com/mushfiqbh/food-app.git
   ```

2. Install dependencies:

   ```bash
   cd food-del
   npm install
   ```

3. Configure the database connection:

   * Create a `.env` file in the project root directory.
   * Add your database connection details to the `.env` file (e.g., MONGO_URI for MongoDB connection).

4. Run the development server:

   ```bash
   npm run dev
   ```

   This will start the development server on `https://food-app-backend-ugzt.onrender.com` by default.

5. Build the production application:

   ```bash
   npm run build
   ```

   This will create an optimized production build in the `dist` folder.

### Usage

1. Visit `https://food-app-frontend-g7qw.onrender.com` in your browser.
2. Create an account or login if you have an existing account.
3. Browse restaurants and menus.
4. Add items to your cart and place your order.
5. Track your order status.

### Admin Panel

A basic admin panel is included to manage restaurants, menus, and orders. The access and functionalities of the admin panel will need further implementation based on your requirements.

1. Visit `https://food-app-admin-wzfx.onrender.com` in your browser.
2. Add new product with uploading image
3. view product list
4. View Orders from customers in orders tab

### Contribution

We welcome contributions to this project! Please create a pull request with your changes.

### License

This project is licensed under the MIT License. See the `LICENSE` file for details.
