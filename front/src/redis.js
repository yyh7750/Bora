const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Redis = require("redis"); // Redis 모듈 불러오기

//redis서버와 express서버의 호스트가 서로 다르다면 호스트 url, 포트 번호 등의 설정을 추가해주어야 한다.
const redisClient = new Redis.createClient();
const DEFAULT_EXPIRATION = 3600; //seconds

const app = express();
app.use(cors());

app.listen(3001, () => console.log("Listening on port 3001"));

//'/photos'로 요청이 들어오면
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  //redisClient 객체를 통해 redis서버에 해당 데이터가 있는지 확인
  //이때 첫번째 인자로는 key값, 두번째 인자로는 콜백함수를 받음.
  //이 경우 photos로 되어있는 value가 있는지 확인하고, 캐시값이 존재한다면 해당 데이터를 반환
  redisClient.get("photos", async (err, data) => {
    // check data from redis server
    if (err) console.error(error);
    if (data) {
      res.json(JSON.parse(data)); // cache hit
    } else {
      // cache miss
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        { params: { albumId } }
      );
      redisClient.setex("photos", DEFAULT_EXPIRATION, JSON.stringify(data)); // set with an expiration time (or can use other redis expressions
      // redis can only store strings, so we need to convert the data to a string
      res.json(data);
    }
  });
});

//세션스토어와 함께 활용하기
//redis 서버를 사용하여 세션솬기를 하면 서버가 꺼져도 데이터가 유지됨.
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

// use redis for session store
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    store: new RedisStore(redisClient),
  })
);
