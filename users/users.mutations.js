import client from "../client";
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
  },
};
