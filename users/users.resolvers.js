import client from "../client";
export default {
  User: {
    // root || parent : request된 user
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      //   const exist = await client.user
      //     .findUnique({ where: { username: loggedInUser.username } })
      //     .following({
      //       where: {
      //         id,
      //       },
      //     });
      const exist = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exist);
    },
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};

// 로그인한 user_A
// 검색한 user_B
// user_B의 followers에 user_A가 있다면 isFollowing true 없다면 isFollowing false
