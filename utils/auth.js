// import GoogleProvider from 'next-auth/providers/google';
// import User from '@models/user';
// import { connectToDB } from '@utils/database';

// const authOptions={
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     })
//   ],
//   callbacks: {
//     async session({ session }) {
//       await connectToDB();
//       const sessionUser = await User.findOne({ email: session.user.email });
//       console.log(sessionUser);
//       session.user.id = sessionUser._id.toString();
//       session.user.payment=sessionUser.payment;
//       session.user.receipt=sessionUser.receipt;
//       session.user.verified=sessionUser.verified;
//       session.user.has_type=sessionUser.has_type;
//       session.user.is_admin=sessionUser.is_admin;
//       return session;
//     },
//     async signIn({ account, profile, user, credentials }) {
//       try {
//         await connectToDB();

//         const userExists = await User.findOne({ email: profile.email });

//         if (!userExists) {
//           await User.create({
//             email: profile.email,
//             username: profile.name,
//             image: profile.picture,
//             payment:false,
//             receipt:"",
//             verified:false,
//             has_type:false,
//             is_admin:false
//           });
//         }

//         return true
//       } catch (error) {
//         console.log("Error checking if user exists: ", error.message);
//         return false
//       }
//     },
//   }
// }

// export default authOptions;
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@models/user';
import { connectToDB } from '@utils/database';
import bcrypt from 'bcryptjs';

const authOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Admin Sign-in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        
        // Find user by email
        const user = await User.findOne({ email: credentials.email }).select("+password");

        // console.log(user);
        // console.log(credentials);
        
        if (!user) {
          throw new Error("User not found");
        }

        // Check if user is an admin
        if (!user.is_admin) {
          throw new Error("Access denied. Admins only.");
        }
        if (user.password !== credentials.password) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.image,
          is_admin: user.is_admin,
        };
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });

      if (!sessionUser) return session;

      session.user.id = sessionUser._id.toString();
      session.user.payment = sessionUser.payment;
      session.user.receipt = sessionUser.receipt;
      session.user.verified = sessionUser.verified;
      session.user.has_type = sessionUser.has_type;
      session.user.is_admin = sessionUser.is_admin;
      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          await connectToDB();
          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name,
              image: profile.picture,
              payment: false,
              receipt: "",
              verified: false,
              has_type: false,
              is_admin: false // Default to non-admin for Google users
            });
          }

          return true;
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);
          return false;
        }
      }
      return true;
    }
  }
};

export default authOptions;
