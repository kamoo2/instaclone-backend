import { gql } from "apollo-server-core";

export default gql`
  type searchUsersResult {
    users: [User]!
    totalPage: Int
    error: String
  }
  type Query {
    searchUsers(keyword: String!, page: Int!): searchUsersResult
  }
`;
