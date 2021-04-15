import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver((_, __, { loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    ),
  },
};

// 현재 로그인한 유저가 팔로잉한 유저들의 사진을 찾아야함 => 모든 유저들중 팔로워에 현재 로그인한 나의 id가 존재하는 모든 유저들을 모으면 => 내가 팔로잉한 유저들이됨
// 이 팔로잉한 유저들의 모든 photo를 모으면 피드가 되는 것 !
