import client from "../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        // error를 던져주면 그 아래 코드는 실행되지 않는다. 그냥 그자리에서 boom..
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        // hash password
        // ex) : 1234 -> hashingfn(1234) -> awferlse32345lkfeis DB
        const uglyPassword = await bcrypt.hash(password, 10);

        // save and return the user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
    login: async (_, { username, password }) => {
      // step 1 : find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      // step 2 : check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
      // step 3 : issue a token and send it to the user
    },
  },
};
