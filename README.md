# TEAM 13🙋🏻‍♀️🙋🏻의 📝 TODO 홈페이지

<img src="https://img.shields.io/badge/version-1.0.0-brightgreen" alt="version" data-canonical-src="https://img.shields.io/badge/version-1.0.0-brightgreen" style="max-width:100%;">

<img src="https://img.shields.io/badge/license-woowa-blue" alt="version" data-canonical-src="https://img.shields.io/badge/license-woowa-blue" style="max-width:100%;">

[TEAM 13🙋🏻‍♀️🙋🏻의 TODO 홈페이지 👆🏻](http://52.79.252.197:3000/)

---

# 목차

- <a href='#application'>📝TODO Application - Team 13</a>
  - <a href='#add-card'>카드 생성</a>
  - <a href='#update-card'>카드 수정</a>
  - <a href='#remove-card'>카드 삭제</a>
  - <a href='#move-card'>카드 이동</a>
  - <a href='#update-column'>컬럼 수정</a>
  - <a href='#sidebar'>사이드바</a>
- <a href='#setting-guide'>🗒 설치 가이드</a>
- <a href='#getting-start'>🚀 실행 방법</a>

# <p id="application">📝TODO Application - Team 13</p>

## 😎 이런 기능이 있어요 

### <p id='add-card'>카드를 만들 수 있어요</p>

  ![add-card](https://user-images.githubusercontent.com/36844660/88357228-84d3ea80-cda5-11ea-92b4-ea8c4b9d5cc2.gif)

### <p id='update-card'>카드 내용을 수정할 수 있어요</p>

  ![update-card](https://user-images.githubusercontent.com/36844660/88357568-bbf6cb80-cda6-11ea-98ab-84f8fe157a7f.gif)

### <p id='remove-card'>카드 삭제도 가능해요!</p>

  ![remove-card](https://user-images.githubusercontent.com/36844660/88357575-bf8a5280-cda6-11ea-8213-7f283fc91d9c.gif)

### <p id='move-card'>드래그 앤 드랍으로 카드를 이동할 수 있어요</p>

  ![move-card](https://user-images.githubusercontent.com/36844660/88357590-d0d35f00-cda6-11ea-9f90-c77d34a504a5.gif)

### <p id='update-column'>컬럼 제목도 바꿀 수 있어요</p>

  ![update-column](https://user-images.githubusercontent.com/36844660/88357610-e0eb3e80-cda6-11ea-83e4-9c0d5c46327f.gif)

### <p id='sidebar'>메뉴를 열면 히스토리를 확인할 수 있어요</p>

  ![sidebar](https://user-images.githubusercontent.com/36844660/88357719-39224080-cda7-11ea-96eb-10118c919897.gif)

# <p id="setting-guide">🗒 설치 가이드</p>

1. git clone

   ```
   $ git clone https://github.com/woowa-techcamp-2020/todo-13.git
   ```

2. client npm install

   ```
   $ cd todo-13/client
   $ npm install
   ```

3. server npm install

   ```
   $ cd todo-13/server
   $ npm install
   ```

## ⚠️ 주의하세요


개발용 db는 docker를 사용했어요. 이미 docker가 설치되어 있다면, 아래를 실행하세요.
```
$ cd server
$ docker-compose up
```

docker가 없다면 다음 링크를 참고해주세요 👉🏻 [docker 설치하기](https://docs.docker.com/get-docker/)

환경변수는 `server/.env` 파일에 별도로 정의해주세요.

# <p id="getting-start">🚀 실행하기</p>

1. server에서 client build 쉘 스크립트 파일 실행

   ```
   $ cd todo-13
   $ ./build.sh
   ```

2. server start!! 🚀

   ```
   $ cd server
   $ npm run start
   ```

3. 브라우저에서 localhost:3000 접속

    <img width="1792" alt="스크린샷 2020-07-24 오후 12 20 11" src="https://user-images.githubusercontent.com/36844660/88357948-0e84b780-cda8-11ea-9ed0-13be1588eee3.png">

