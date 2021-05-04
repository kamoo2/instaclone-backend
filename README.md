# Instaclone

Instaclone Backend.

<hr>

### USER

- [ ⭕️ ] Create Account
- [ ⭕️ ] See Profile
- [ ⭕️ ] Login
- [ ⭕️ ] Edit Profile
- [ ⭕️ ] Change Avatar (Image Upload)
- [ ⭕️ ] Follow User
- [ ⭕️ ] Unfollow User
- [ ⭕️ ] See Followers with offset Pagination
- [ ⭕️ ] See Following with Cursor-based Pagination
- [ ⭕️ ] Search Users

### Photos

- [ ⭕️ ] Upload Photo
- [ ⭕️ ] See Photo
- [ ⭕️ ] See Hashtags
- [ ⭕️ ] Search Photos
- [ ⭕️ ] Edit Photo
- [ ⭕️ ] Like / Unlike Photo
- [ ⭕️ ] see Photo Comments
- [ ⭕️ ] See Photo Likes
- [ ⭕️ ] See Feed
- [ ⭕️ ] is Mine (Delete Photo)

### Comments

- [ ⭕️ ] Comment on Photo
- [ ⭕️ ] Edit Comment
- [ ⭕️ ] Delete Comment
- [ ⭕️ ] isMine (Delete Comment)

### Refactor

- [ ⭕️ ] Mutation Responses

### Extras

- [ ⭕️ ] S3 Image Upload

### Direct Messages

- [ ⭕️ ] See Room
- [ ⭕️ ] Send Message (Create Room)
- [ ⭕️ ] See Room
- [ ⭕️ ] Computed Fields
- [ ⭕️ ] See (Read) Message
- [] RealTime Messages

<hr>
## BackEnd SetUp

`npm init -y`

`npm install apollo-server graphql`

`yarn add nodemon --dev`

<!-- ## nodemon 사용법

nodemon은 변경사항을 적용하기위해 서버를 죽이고 재실행하는 번거로움을 해결해 준다.

```
"scripts": {
    "dev": "nodemon --exec node server.js"
},
``` -->

## babel SetUp

node.js는 발전하고 있지만 javascript에 비하면 느리다.

나는 최신의 javascript문법을 이용하고 싶은데 node의 버전이 낮다면 문제가 될 것이다.

babel이란 쉽게 말하면 최신의 JS코드를 browser가 이해할 수 있는 JS 코드로 변환해준다.

![bable](./readmeimg/babel.png)

출처 : [babel 공식 홈페이지](https://babeljs.io/)

`yarn add --dev @babel/core`

`yarn add --dev @babel/preset-env`

`yarn add --dev @babel/node` :

scripts에서 node대신 babel-node 사용

```javascript
// babel.config.json에 다음 추가

{
    "presets":["@babel/preset-env"]
}
```

이로써 node 버전에 상관없이 babel이 코드를 컴파일 해주게 됨

babel/preset-env는 코드가 변환되어야 하는지 아닌지를 판단해줌

### babel을 사용하는 궁극적인 목적

사람마다 node의 버전이 다를 것이고 사용하는 자바스크립트에 따라 노드의 버전에 영향이 미치는 것보다는 babel을 사용함으로써 모든 node버전들에서 이해 가능한 자바스크립트 문법으로 컴파일 해준다.

### Prisma

Prisma + TypeScript의 조합 Good..

Prisma SetUp

`npm install prisma -D`

`npx prisma init`

### Pirsma Studio

`npx prisma studio`

### devide and conqure

현재 파일에서 resolvers와 typedef등 한 파일에 모두 작성해주었다.

이는 좋지 않은 방법이다.

따라서 분리를 해서 코드들을 관리해보자

우리는 한 파일에서 하나의 일을 하도록 만들고 싶다.

schema.js 에서 필요한 것들을 모두 나누고 나서 모든 User,Movie,Photo 등등의 typeDefs,Query,Mutation을

다 가져와서 schema.js에서 합쳐주고 싶다.

이를 위해서 graphql-tools를 설치하자

`npm i graphql-tools@latest`

### dotenv

`npm i dotenv`

import dotenv from "dotenv"
dotenv.config()

### Postgresql DB 생성 제거

`DROP DATABASE instaclone;` : 제거

`CREATE DATABASE instaclone;` : 생성
