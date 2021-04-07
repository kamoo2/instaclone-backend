import client from "../../client";

export default {
  Query: {
    // public이기 때문에 protected해주지 않을 것이다.
    seeFollowers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });

      if (!ok) {
        return {
          ok: false,
          error: "존재하지 않는 username 입니다.",
        };
      }
      console.log(ok);
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          skip: (page - 1) * 5,
          take: 5,
        });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });

      return {
        ok: true,
        totalPages: Math.ceil(totalFollowers / 5),
        followers,
      };
    },
  },
};
