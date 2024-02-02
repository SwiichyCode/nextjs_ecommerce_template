# Next.js E-commerce Template

This project, `nextjs_ecommerce_template`, is a comprehensive e-commerce solution built with the T3 Stack and bootstrapped with `create-t3-app`. It leverages the power of Next.js 14, TypeScript, Zustand, Tailwind, NextAuth, Prisma, and Stripe.

## Project Status

This template is currently a work in progress. It already includes an admin dashboard and various e-commerce components, but I'm continuously working on it to add more features and improve its functionality. Regular updates will be made to enhance the project and add new features.

## Next Features

We are constantly working to improve and add new features to our project. Here are some of the features we plan to implement in the future:

- **Authentication with Credentials**: We plan to implement a secure authentication system that allows users to log in with their credentials. This will provide an additional layer of security and make our system more robust.

- **Internationalization of Admin Dashboard**: To make our project accessible to users around the world, we plan to internationalize the admin dashboard. This will allow users to use the dashboard in their preferred language, improving usability and user experience.

## Latest Features

- **Webhook Implementation for Payment Events**: We plan to implement webhooks to intercept payment events and perform database operations. This will allow us to automate processes such as updating order status and inventory based on payment events, enhancing the efficiency of our e-commerce operations.

- **Price Consistency Verification**: We have added a feature to verify the consistency of prices between the payment request and the products in our database. This ensures that the total amount charged during checkout matches the actual cost of the products, providing an additional layer of security and accuracy in our e-commerce transactions.

- **Stock Availability Verification Before Checkout**:We have implemented a feature to check the availability of products in stock before proceeding to the checkout. This ensures that all products in the customer's cart are available for purchase, providing a smoother and more reliable shopping experience.

## Built With

This project is built with the following technologies:

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Stripe](https://stripe.com/)
- [T3 Stack](https://create.t3.gg/)

## Installation

To install and run this project on your local machine, follow these steps:

1. **Clone the repository**
   Use the following command to clone the repository:

   ```bash
   git clone https://github.com/SwiichyCode/nextjs_ecommerce_template.git
   ```

2. **Install the dependencies**
   Navigate into the project directory and install the necessary dependencies with npm:

   ```bash
   cd nextjs_ecommerce_template
   npm install
   ```

3. **Set up environment variables**

   This project uses environment variables for configuration. You can find an example of the necessary variables in the .env.example file in the root of the project. Create a new file named .env and populate it with your own values

4. **Initialize the database**
   This project uses Prisma for database management. After setting up your database and adding its connection string to the .env file, you can initialize the database with the following command:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**

   Finally, you can start the development server with:

   ```bash
   npm run dev
   ```

6. **Accessing the Admin Dashboard**

   To access the admin dashboard, you first need to authenticate. Once authenticated, you can access Prisma Studio to modify the user role.

   Run the following command to open Prisma Studio:

   ```bash
   npx prisma studio
   ```

Your application should now be running at http://localhost:3000.

Happy coding!

## Folder Structure

The project has the following folder structure:

- **app**: This folder contains the router for the application.
- **app/api**: This folder contains the logic for authentication, payment processing, and webhooks.
- **components/ui**: This folder contains shared components and more.
- **constants**: This folder contains all the constant values used across the application.
- **modules**: This folder contains components related to the different modules of the project such as auth, shop, admin, etc.
- **server**: This folder contains the auth and database configuration.
- **env.js**: This file is used to define and type environment variables. For more information, refer to [this guide](https://create.t3.gg/en/usage/env-variables).

This structure helps in maintaining the project and makes it easier for new contributors to understand the codebase.

## Features

This project includes the following features:

- **Product Administration**: Manage your products effectively with our comprehensive administration features.
- **Product Addition**: Easily add new products to your inventory.
- **Stock Tracking**: Keep track of your stock levels to ensure you never run out of your key products.
- **Latest Sales Tracking**: Stay up-to-date with your latest sales.
- **Traffic Analytics Management**: Monitor and analyze your website traffic to understand your audience better and optimize your strategies.
- **Ecommerce Component**: A ready-to-use e-commerce library that provides a solid starting point for your online store.

We're always working to add more features and improve the existing ones. Stay tuned for updates!

## Accessing the Admin Dashboard

To access the admin dashboard, you need to follow these steps:

1. **Create an account**: First, you need to create an account on the application.

2. **Use the npx prisma studio command**: Next, open your terminal and run the command `npx prisma studio`. This will open Prisma Studio, which is a graphical interface for viewing and editing data in your database.

3. **Modify your role**: In Prisma Studio, find your user account and modify the `role` field to be `"admin"`. This will grant you access to the admin dashboard when you log into your account on the application.

## Image Storage

For storing and managing our images, we use [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob). This service provides us with a secure and scalable solution for our image storage needs.

In addition to Vercel Blob Storage, we also provide an option to use [Cloudinary](https://cloudinary.com/) for image storage. Cloudinary is a cloud-based service that provides an end-to-end image and video management solution. It is easy to use and offers a generous free tier. (This template use cloudinary)

In our `next.config.js` file, we have configured Next.js to recognize images from our Vercel Blob Storage:

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "[id].public.blob.vercel-storage.com",
    },
    {
        protocol: "https",
        hostname: "res.cloudinary.com",
    },
  ],
},
```

## Collaboration

This project is open for collaboration. If you're interested in contributing, whether it's adding new features, improving existing ones, or helping with documentation, your help would be greatly appreciated. The project is in its early stages, and there's a lot of room for growth and improvement.

By collaborating, you'll have the opportunity to work on a real-world project and gain experience with the T3 Stack and other modern web technologies. Plus, you'll be part of a community that's passionate about learning and growing together.

If you're interested, feel free to fork the repository, make your changes, and submit a pull request. If you have any questions or need help getting started, don't hesitate to reach out.

Let's work together to make this project even better!
