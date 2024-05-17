# Next.js TypeScript with Tailwind CSS and Shadcn

This project is a starter template for a Next.js project with TypeScript, Tailwind CSS, Shadcn, NextAuth.js for authentication (with email, Google, and GitHub providers), and MongoDB with Mongoose for data storage.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ready-to-go-templates/next-auth-tailwind-shadcn.git
   ```

2. Install dependencies:

   ```bash
   cd your-repo
   yarn
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:

   ```dotenv
   MONGO_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_next_auth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   BASEURL=http://localhost:3000
   ```

   Replace `your_mongodb_uri`, `your_google_client_id`, `your_google_client_secret`, `your_github_client_id`, and `your_github_client_secret` with your MongoDB connection URI, Google OAuth client ID and secret, and GitHub OAuth client ID and secret respectively.

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- Next.js 14 app route with TypeScript.
- Tailwind CSS and Shadcn with RadixUI Component library.
- NextAuth.js for authentication with email, Google, and GitHub providers.
- React Query for client-side state management.
- MongoDB with Mongoose.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

