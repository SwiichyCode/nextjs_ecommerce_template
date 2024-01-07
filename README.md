# Next.js E-commerce Template

This project, `nextjs_ecommerce_template`, is a comprehensive e-commerce solution built with the T3 Stack and bootstrapped with `create-t3-app`. It leverages the power of Next.js 14, TypeScript, Zustand, Tailwind, NextAuth, Prisma, and Stripe.

## Project Status

This template is currently a work in progress. It already includes an admin dashboard and various e-commerce components, but I'm continuously working on it to add more features and improve its functionality. Regular updates will be made to enhance the project and add new features.

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

Your application should now be running at http://localhost:3000.

Happy coding!

## Collaboration

This project is open for collaboration. If you're interested in contributing, whether it's adding new features, improving existing ones, or helping with documentation, your help would be greatly appreciated. The project is in its early stages, and there's a lot of room for growth and improvement.

By collaborating, you'll have the opportunity to work on a real-world project and gain experience with the T3 Stack and other modern web technologies. Plus, you'll be part of a community that's passionate about learning and growing together.

If you're interested, feel free to fork the repository, make your changes, and submit a pull request. If you have any questions or need help getting started, don't hesitate to reach out.

Let's work together to make this project even better!
