import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    //Invoked on successful signin
    async signIn({ profile }) {
      console.log(profile);
      //connect to database
      await connectDB();
      //check if user exists
      const userExists = await User.findOne({ email: profile.email });
      console.log(userExists);

      // If not add user to database

      const username = profile.name.slice(0, 20);

      if (!userExists) {
        User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      return true;
    },
    //Modifies session object
    async session({ session }) {
      //Get user from database
      const user = await User.findOne({ email: session.user.email });

      //Assign user id to the session
      session.user.id = user._id;

      //return session
      return session;
    },
  },
};
