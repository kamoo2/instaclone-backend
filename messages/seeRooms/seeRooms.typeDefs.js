import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeRooms: [Room] # null일 경우도 있기때문에 ! 붙여주지 않음
  }
`;
