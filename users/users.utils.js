import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver = (ourResolver) => (
  root,
  args,
  context,
  info
) => {
  if (!context.loggedInUser) {
    const query = info.operation.operation === "query";
    if (query) {
      return null;
    } else {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
  }
  return ourResolver(root, args, context, info);
};

// 기존 protectedResolver의 버그
// 대부분의 Mutation은 ok,error를 리턴하는 Result를 가지고 있따.
// 허나 Query중 seeFeed는 사용자를 확인하고 Feed를 가져오는 것이기때문에 protectedResolver를 사용하는데
// seeFeed의 typeDefs는 [Photo]를 리턴하기 때문에 로그인 하지 않고 Query할때 잘못 된 형식의 리턴값이라고 에러가 발생할 것이다.
// 첫번째 해결방법
// 모든 응답에 ok,error를 추가해준다. 그러니깐 말그대로 seeFeed의 typeDefs에 리턴값으로 {ok:Boolean! error:String feed:[Photo]} 이렇게 같이 추가 해주는 것

// 더 좋은 두번째 방법
// protectedResolver에서 query인지 mutation인지 구별 후 다르게 리턴
// 이를 위해 이때 까지 우리가 무시해 왔던 info에서 정보를 가져올 수 있다.
