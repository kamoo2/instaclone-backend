import client from "../client";

export default {
  Room: {
    users: ({ id }) =>
      client.room
        .findUnique({
          where: {
            id,
          },
        })
        .users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    // 위에서 users와 messages에서 구현한 코드는 서로 같은 기능을하는 다른 작성 방법이다.
    // users같은 경우는 한 방에 많아야 4~5명 밖에 되지 않을 것이라고 예상해 다음과 같이 작성해도 문제없다.
    // 그러나 messages는 수천개가 될 수 있기때문에 첫번째 방법으로 작성할시 DB에 무리를 줄 것이 분명하다.
    // 따라서 두번째 방법으로 작성해 줘서 최근 20개 messages를 가져온다던가 할 수 있게 한다. 또는 page argument를 더해줄 수 있다.
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }

      return client.message.count({
        where: {
          //나는 메세지모델들의 개수를 샐껀데 조건이 3개야
          //1. 읽지 않은 메세지 2. 일치하는 대화방 3. 내가 작성하지 않은 메세지
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
