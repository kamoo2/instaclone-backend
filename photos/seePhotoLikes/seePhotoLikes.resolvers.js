import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });
      return likes.map((like) => like.user);
    },
  },
};

// like는 relation으로 user와 photo와 관계가 있다.
// 따라서 모든 like중에서 photoId가 id인 like를 모두 찾고 필요한 정보는 user에 대한 정보를 요청한다. (where과 select이용)

// select와 include의 차이점
// include : 결과에 relationship을 추가해줌
// select : 받고 싶은 데이터를 선택함
// 쉽게 말하면 include를 했을때는 기본적으로 제공되는 data + 내가 추가한 필드 인 것이고 select는 내가 선택한 필드만을 결과로 보내주는 것
// select로 처음 가져오는 필드가 하나의 모델이고 나는 그모델 안의 데이터만을 가져오고싶다면 select를 중첩해서 사용가능하다.
// select와 include는 같이 사용할 수 없다.
