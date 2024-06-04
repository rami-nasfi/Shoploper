# ShopLoper

ShopLoper is a platform that simplifies online shop creation without any coding knowledge. Users can create and manage multiple stores with ease. Each store supports CRUD operations for categories, products, orders, customers, and themes. The platform includes a drag-and-drop interface for theme customization, and admins can add staff members to their team. Auto-generated emails with passwords are sent to new staff members.

## Features

- **Multiple Stores**: Users can manage multiple stores.
- **CRUD Operations**: Create, read, update, and delete categories, products, orders, customers, and themes.
- **Drag and Drop Customization**: Easily modify themes using a drag-and-drop interface.
- **Admin and Staff Management**: Admins can add staff and send auto-generated emails with passwords.
- **Authentication**: Protected and private routes with JWT authentication.
- **Image Handling**: Upload and manage images with Cloudinary and multer.
- **Responsive Design**: The application is fully responsive and works seamlessly on all devices.
- **Deployment**: Deployed using GitHub and Render.com.

## Tech Stack

- **Frontend**: React, Bootstrap, Framer Motion, SASS, React Router DOM, Toastify, Dropzone
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Utilities**: Axios, bcrypt, jsonwebtoken, cors, dotenv, emailjs, jwt-decode
- **Development Tools**: Git, Postman, StarUML, VSCode
- **Middleware**: Custom authentication and image download middleware
- **Deployment**: GitHub, Render.com

## Project Structure

```plaintext
shoploper/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routers/
│   ├── middlewares/
│   ├── utils/
│   ├── .env
│   ├── connection.js
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/rami-nasfi/shoploper.git
   cd shoploper
   ```

2. **Install dependencies for both client and server:**

   ```sh
   cd client
   npm install
   cd ../backend
   npm install
   ```

3. **Set up environment variables:** Create a `.env` file in the server directory and add the following:

   ```env backend 
   SALT_ROUND=your_salt_round
   SECRET_KEY=your_secret_key
   MONGODB_URI=your_mongodb_url
   FRONTEND_URL=your_frontend_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
   ```
   ```env client 
   REACT_APP_BACKEND_API=your_backend_api
   ```

4. **Run the development servers:**
   - In the `client` directory:
     ```sh
     npm start
     ```
   - In the `backend` directory:
     ```sh
     npm start
     ```

## Usage

1. **Access the application:** Open your browser and navigate to `http://localhost:3000`.

2. **Admin and Staff Management:**

   - Sign up as an admin.
   - Add stores, categories, products, orders, customers, and customize themes.
   - Add staff members who will receive auto-generated passwords via email.

3. **Theme Customization:**

   - Use the drag-and-drop interface to customize store themes.

4. **CRUD Operations:**
   - Perform create, read, update, and delete operations on categories, products, orders, and customers.

## Authentication and Authorization

- **JWT Authentication**: Implemented using `jsonwebtoken`.
- **Protected Routes**: Ensure only authenticated users can access certain routes.
- **Private Routes**: Restrict access based on user roles (admin or staff).

## Middleware

- **Authentication Middleware**: Verifies JWT tokens and protects routes.
- **Image Upload Middleware**: Handles image uploads using multer and Cloudinary.

## Responsive Design

- **Responsive Design**: The application is designed to be fully responsive, ensuring a seamless experience across all devices, including desktops, tablets, and mobile phones.

## Deployment

- **GitHub**: The code is version-controlled using Git and hosted on GitHub.
- **Render.com**: The application is deployed using Render.com.

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes:**
   ```sh
   git commit -m 'Add some feature'
   ```
4. **Push to the branch:**
   ```sh
   git push origin feature/your-feature-name
   ```
5. **Create a pull request.**

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [med.rami.nasfi@gmail.com](mailto:med.rami.nasfi@gmail.com).

---
