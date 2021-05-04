import client from "../../client";
import { NEW_MESSAGE } from "../../constatns";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;
        if (userId) {
          // 대화방이 없어서 사용자에게 첫메세지를 보내는 경우
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
        } else if (roomId) {
          // 이미 대화방이 있는 경우
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not Found.",
            };
          }
        }
        const message = await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
        return {
          ok: true,
        };
      }
    ),
  },
};
