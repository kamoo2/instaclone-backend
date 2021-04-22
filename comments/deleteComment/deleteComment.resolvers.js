import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!comment) {
        return {
          ok: false,
          error: "댓글을 찾을 수 없습니다.",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "당신의 댓글이 아닙니다.",
        };
      } else {
        await client.comment.delete({
          where: { id },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
