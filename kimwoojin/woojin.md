# 1일차 학습 내용

아이디어 회의 기술스택 공유. 오늘은 아이디어를 종합해서 발표했다.!

---- 내가 낸 아이디어 -------
### 1. 프로젝트 소개

오늘 뭐먹지? 먹은거 자랑해야지….!

크게 

1. 오늘 내가 먹은 음식 피드에 올리기
2. 이상형 월드컵(음식) → 전 날 유저들이 올린 음식사진을  추천 알고리즘을 통해서 이상형 월드컵을 구성.
3. 랭킹 5가지의 기능을 가지고 있습니다.

### 2. 기능 소개

### 2-1-1 메인화면 피드

본인과 본인이 팔로우한 사람들의 최신 피드를 보여줍니다.하단의 작성 버튼을 누르면 피드 작성 화면으로 이동할 수 있습니다.좋아요를 누를 수 있고 댓글을 작성할 수 있습니다.본인이 작성한 게시글을 수정, 삭제할 수 있습니다.피드를 누르면 상세 조회가 가능하고 댓글들을 전부 볼 수 있습니다. 작성자의 프로필 사진을 누르면 해당 회원의 프로필 페이지로 이동합니다.

### 2-1-2 메인화면 검색

상단의 검색 바를 통해 피드를 검색할 수 있습니다.

### 2-2-1 좌측 메뉴

홈, 구인, 챌린지, 랭킹 탭을 이용해 원하는 페이지로 이동이 가능합니다.

### 2-3-1 우측 채팅

채팅 목록 버튼을 눌러 채팅방 목록을 조회할 수 있고 채팅방을 눌러 일대일 채팅이 가능합니다.

### 2-4-1 상단 메뉴

경쟁모드 색 표시를 통해 현재 경쟁모드에 참여하고 있는지 확인할 수 있습니다.사람 버튼을 눌러 내 프로필, 비밀번호 변경, 로그아웃, 회원탈퇴 메뉴 중 선택하여 기능을 이용할 수 있습니다.

### 2-5-1 오늘 뭐먹지 ? mode

GO 버튼을 눌러 전 날 회원들이 먹었던 음식을 추천해서 음식 월드컵이 시작 됩니다. GO 버튼을 누르면 음식 사진들을 2개를 화면에 띄어주며 둘 중 택 1을하여 음식 우승자를 선택할 수 있습니다.. 결승  음식이 정해지면 랭킹 업데이트가 종료됩니다.

### 2-5-2 같이 밥먹기 mode

같이 밥먹기 모드 방에서 나와도 재입장이 가능하고 입장/재입장했을 때 기존 채팅 내역이 표시됩니다. 협력모드 방에 참여하면 상단의 메모장을 사용하며 실시간 단체 채팅을 진행할 수 있습니다.멤버는 언제든지 나갈 수 있고 협력모드 방의 주인이 방을 종료하는 경우 해당 협력모드 방은 삭제됩니다.

### 2-6-1 구인 메인화면

상단에 검색창에서 사람이나 음식사진을 검색할 수 있습니다.  스크랩한 사진과 현재 사용자가 입력한 글을 따로 볼 수 있습니다.

### 2-6-2 구인 새 글 생성

메인 화면 우측 하단의 아이콘을 클릭해 새 글 생성 창으로 이동할 수 있습니다. 글의 종류와 제목 등 정보를 입력하면 글을 생성할 수 있습니다.

### 2-7-1 랭킹 조회

TIE 개수, 경험치, 등록된 음식개수 기준으로 전체와 팔로잉 사람들의 랭킹을 확인할 수 있습니다. 

### 2-8-1 프로필 메인 화면

특정 사용자의 프로필 사진과 정보들을 확인할 수 있습니다.하단에 특정 사용자가 작성한 TIL들의 사진이 뜨며, 그 사진을 클릭하면 해당한 TIL의 상세 정보 모달창을 볼 수 있습니다.

### 2-8-2 프로필 다른 이용자

다른 이용자의 프로필에서 다른 사용자를 팔로우/언팔로우하거나 메세지를 보낼 수 있습니다.

### 2-8-3 프로필 자신의 프로필

자신의 프로필에서는 수정 버튼이 있어 수정 페이지로 이동할 수 있습니다.

### 2-8-4 프로필 수정

프로필 수정에서 자신의 프로필 정보를 수정할 수 있습니다.

### 2-8-5 팔로우 창

팔로우/팔로잉 리스트 버튼을 누르면 팔로우 창이 뜹니다. 팔로우 창에서 사용자의 팔로워/팔로잉 목록을 확인할 수 있습니다. 또한 닉네임이나 이메일을 통해 다른 유저를 검색하여 그 유저의 프로필에 접근할 수 있습니다.

---------------------------------------------------------------------
2일차 (1/11 수요일)

jpa 공부

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;

    public List<Users> getUsersService(String name){
        if(name.isBlank()) // name 파라미터가 Null이면 전체 user를 리턴
            return userRepository.findAll();
        else  // name 이 존재를 하면, Like 쿼리로 2개만 리턴
            return userRepository.findFirst2ByUsernameLikeOrderByIDDesc(name);
    }

    public String createUserService(Users user){
         userRepository.save(user); // User Insert 쿼리 수행
         return "등록 완료";
    }
}
 

Controller 작성 - UserController.java
마지막으로 위에서 작성한 Repository, Service를 수행하고 API 응답을 리턴하기 위한 컨트롤러도 아래와 같이 간단하게 작성을 해줍니다. Get 매소드에 name 파라미터를 추가하여 응답을 받아 존재 유무에 따라 다른 Select 문을 날려 uesr의 리스트를 리턴하는 API와 user를 저장하기 위한 Post 매소드까지 컨트롤러에 작성을 합니다.

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    
    @GetMapping(value = "/users")
    public List<Users> getUsers( @RequestParam(required = false, defaultValue = "") String name ){
        return userService.getUsersService( name );
    }

    @PostMapping(value = "/user")
    public String createUser(@RequestBody Users user){
        return userService.createUserService(user);
    }

}

--------------------------------
##3일차 공부 <기본 설정 완료, jpa 공부>
```
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public Optional<User> findUserByUserId(String userId) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }
}
```
----------------------------------
##4일차 공부 <Docker 공부>
--> 에러가 나서 많이 진행은 못했습니다.
PS C:\WINDOWS\system32> docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

PS C:\WINDOWS\system32> docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
b8dfde127a29: Pull complete
Digest: sha256:7d91b69e04a9029b99f3585aaaccae2baa80bcf318f4a5d2165a9898cd2dc0a1
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
 설치 확인 메세지 올리겠습니다.
 -----------------------
 #5일차 공부 
 # ERD, 데이터 설계

- 사용자
    - code
    - id
    - pw
    - 개인 정보(이름, 나이, 이메일, 전화번호, 성별)
    - 관리자 id는 따로 관리
- 방송국 정보
    - 사용자 code
    - 방송 시작 시간
    - 방송 종료 시간
    - 카테고리
    - 방송 on/off 정보 (T/F) —보류
    - 방송 설명 (Contents)
- 방송 로그
    - 사용자 id
    - 제목
    - 시간 지켰다/안지켰다 (t/f)
    - 날짜
- 시청 로그(3분의 1이상 본 사람만 보내주세요)
    - 시청자 id
    - Dj id
    - 날짜(일정 시간이 지나면 폐기)
- 블랙리스트
    - 한 id
    - 당한 id
- 팔로우
    - 팔로우 id
    - 팔로잉 id
- 사진 (파일 관리)
    - 사용자 id
    - 프로필 사진
        - 크기, type, 이름, date
    - 방송 배너 사진
        - 크기, type, 이름, date
