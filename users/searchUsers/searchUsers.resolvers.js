import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      if (keyword.length < 4) {
        return {
          users: [],
          error: "keyword를 4글자 이상 입력하세요.",
        };
      }
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        skip: (page - 1) * 5,
        take: 5,
      });
      const totalUsers = await client.user.count({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      return {
        users,
        totalPage: Math.ceil(totalUsers / 5),
      };
    },
  },
};
