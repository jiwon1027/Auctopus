# 경매중 (경제적이고 매력적인 중고거래 플랫폼)

판매자를 위한 흥정, 구매자를 위한 거래

## Table of Content

1. [서비스 개요](#1-서비스-개요)
1. [기술 스택](#2-기술-스택)
1. [팀원 소개](#2-팀원-소개)
1. [Jira Convention](#3-jira-convention)
1. [Git Flow Convention](#4-git-flow-convention)
1. [Commit Message Convention](#5-commit-message-convention)
1. [Backend Convention](#6-backend-convention)
1. [Frontend Convention](#7-frontend-convention)
1. [Wire Frames](#8-wire-frames)
1. [기능 정의서](#9-기능-정의서)
1. [References](#10-references)

## 1. 서비스 개요

// TODO:

## 2. 기술 스택

### FrontEnd

| <div align="center"><img src="/assets/readme/html.svg" alt="HTML5" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/css.svg" alt="CSS3" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/readme/js.png" alt="JavaScript" width="50px" height="50px" /></div> |
| :-----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
|                                      &nbsp;&nbsp;HTML5&nbsp;&nbsp;                                      |                         &nbsp;&nbsp;&nbsp;&nbsp;CSS3&nbsp;&nbsp;&nbsp;&nbsp;                         |                                                JavaScript                                                 |

| <div align="center"><img src="/assets/readme/react.svg" alt="React" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/recoil.png" alt="Recoil" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/reactquery.svg" alt="React-Query" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/styledcomponents.png" alt="Styled-components" width="50px" height="50px" /> </div> |
| :------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                     |                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recoil&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                     |                                                     React-Query                                                     |                                                        Styled-components                                                        |

| <div align="center"><img src="/assets/readme/sockjs.png" alt="SockJS" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/axios.png" alt="axios" width="100px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/openvidu.png" alt="OpenVidu" width="100px" height="50px" /> </div> |
| :--------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
|                                 &nbsp;&nbsp;&nbsp;SockJS&nbsp;&nbsp;&nbsp;                                 |                                                   AXIOS                                                   |                                                    OpenVidu                                                     |

### BackEnd

| <div align="center"><img src="/assets/readme/java.svg" alt="java" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/springboot.png" alt="springboot" width="100px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/springsecurity.png" alt="springsecurity" width="100px" height="50px" /></div> | <div align="center"><img src="/assets/readme/gradle.png" alt="gradle" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/readme/hibernate.png" alt="hibernate" width="50px" height="50px" /></div> |
| :----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
|                                                  Java                                                  |                                                     Spring-Boot                                                     |                                                      Spring-Security                                                       |                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gradle&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                     |                                  &nbsp;&nbsp;&nbsp;Hibernate&nbsp;&nbsp;&nbsp;                                  |

| <div align="center"><img src="/assets/readme/mysql.svg" alt="mysql" width="70px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/swagger.png" alt="swagger" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/readme/postman.svg" alt="postman" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/readme/websocket.svg" alt="websocket" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/readme/redis.png" alt="redis" width="70px" height="50px" /></div> |
| :------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
|                                                  MySQL                                                   |                                                   Swagger                                                   |                                                   Postman                                                   |                                                    Websocket                                                    |                                                  Redis                                                  |

### DevOps

| <div align="center"><img src="/assets/readme/docker.png" alt="docker" width="50px" height="50px" /> </div> | <div align="center"><img src="/assets/readme/jenkins.png" alt="jenkins" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/readme/nginx.png" alt="nginx" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/readme/ec2.png" alt="EC2" width="50px" height="50px" /></div> | <div align="center"><img src="/assets/readme/s3.png" alt="S3" width="50px" height="50px" /></div> |
| :--------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
|                                                   Docker                                                   |                                                   Jenkins                                                   |                                                  NginX                                                  |                                               AWS EC2                                               |                                              AWS S3                                               |

## 2. 팀원 소개

정상기 (팀장): Frontend 개발 + 프로젝트 관리
손예지 (팀원): Frontend 개발 + 디자인
김태원 (팀원): Frontend 총괄 + QA
이지원 (팀원): Backend 총괄 + QA
변유정 (팀원): Backend 개발 + 이슈 관리
우상빈 (팀원): Backend 개발 + 이슈 관리 + 발표

## 3. Jira Convention

Jira는 개발 이슈 트랙킹 용도로 사용합니다.

- 계층

  1. ![epic](/assets/jira/epic.svg) (epic)
  2. ![story](/assets/jira/story.svg) (FE), ![task](/assets/jira/task.svg) (BE), ![bug](/assets/jira/bug.svg) (bug)

- 이름 규칙

  - Epic은 대분류입니다. FE, BE, bug 작업의 부모 항목입니다.
  - FE, BE 작업은 각각 프론트엔드 작업과 백엔드 작업 세부 이름입니다. (한글로 상세히 작성해 주세요)
  - 예시) ![story](/assets/jira/story.svg) \[FE\] 유저 로그인 레이아웃 제작

- 이슈

  - 담당자, 우선순위, story point, Epic Link와 함께 이슈를 생성하세요
  - Backlog 탭에서 이슈를 미리 만들어 놓고, 매주 월요일 아침 회의를 통해 이슈를 개인별로 할당합니다. 할당한 이슈를 스프린트에 옮겨놓으세요
  - 해당 이슈를 완료하거나 작업을 시작했다면, Active sprints 탭에서 workflow (Todo, In-progress, Done)을 변경해주세요

- Burndown Chart
  - 번다운 차트는 스프린트별 시간당 잔여 Story-point 를 추적합니다
  - 주차별 스프린트를 시작하기 전에 모든 이슈를 생성하고 할당해야 올바른 번다운 차트를 생성할 수 있습니다

## 4. Git Flow Convention

디렉터리 구조는 **frontend** 와 **backend** 로 구분됩니다. 각 개발자들은 해당 디렉터리로 이동한다음 작업하면 됩니다

```
.
├── frontend
└── backend
```

Branch Types

- main: 제품으로 출시될 수 있는 브랜치
- fe-develop: Frontend 개발 브랜치
- be-develop: Backend 개발 브랜치
- fe-feature: Frontend 기능 개발 브랜치
- be-feature: Backend 기능 개발 브랜치
- fe-hotfix: Frontend 버그 수정 브랜치
- be-hotfix: Backend 버그 수정 브랜치

![link](https://techblog.woowahan.com/wp-content/uploads/img/2017-10-30/git-flow_overall_graph.png)

1. origin/develop 브랜치에서 작업 브랜치를 생성합니다

```
(fe-develop)]$ git fetch
(fe-develop)]$ git checkout -b fe-feature/user-login-layout --track origin/fe-develop
```

2. 작업 브랜치에서 작업합니다

3. 작업 브랜치에서 소스를 커밋합니다

```
(fe-feature/user-login-layout)]$ git commit -m "feat: add user login layout"
```

4. 작업 브랜치를 origin/develop에 rebase 합니다

```
(fe-feature/user-login-layout)]$ git pull --rebase origin fe-develop
```

5. 작업 브랜치를 origin에 push합니다

```
(fe-feature/user-login-layout)]$ git push origin fe-feature/user-login-layout
```

6. Gitlab에서 작업 브랜치를 develop에 합치도록 Merge Request 를 생성합니다
7. 동료에게 승인받고, merge 합니다

<!-- [ref](https://techblog.woowahan.com/2553/) -->

## 5. Commit Message Convention

Commit Message Types

- ⛏ fix: 내 코드베이스에서 발생한 버그를 수정했을 때
- :sparkles: feat: 새로운 기능을 추가했을 때
- 🔊 (ELEMENT)!: API를 바꿨을 때
- 📝: docs: 문서 수정
- 💡 refactor: 코드 리펙토링했을 때
- 🧪 test: 테스트 코드 추가 또는 수정했을 때
- 🎨 style: 코드 형식 바꿨을 때
- 💫 chore: 그 외 기타사항
- [fix 와 feat 외 타입들](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- Examples:

```
~/SSAFY/my-app (be-feature/login) $ git commit -m " feat: allow provided config object to extend other configs"
```

```
~/SSAFY/my-app (be-feature/login) $ git commit -m "feat: check if ID is duplicated"
```

```
~/SSAFY/my-app (be-feature/login) $ git commit -m "feat!: send an email to the customer when a product is shipped"
```

```
~/SSAFY/my-app (be-feature/login) $ git commit -m "docs: correct spelling of CHANGELOG"
```

<!-- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) -->

## 6. Backend Convention

- Style Guide
  - [Google Style Guide for Java](https://google.github.io/styleguide/javaguide.html)
- Project Structure

```
// backend 디렉터리 안에서
.
└── main                            // java src 디렉터리
    ├── java
    │   └── com
    │       └── underAuction
    │           ├── api                 // REST API 디렉터리
    │           │   ├── controller
    │           │   ├── request
    │           │   ├── response
    │           │   └── service
    │           ├── common              // 공용 유틸 디렉터리
    │           │   ├── auth
    │           │   ├── exception
    │           │   │   └── handler
    │           │   ├── model
    │           │   │   └── response
    │           │   └── util
    │           ├── config              // 플러그인 설정 디렉터리
    │           ├── db                  // 디비 디렉터리
    │               ├── entity
    │               └── repository
    └── resources                    // 웹 리소스 디렉터리
        ├── README.md
        └── application.properties

```

## 7. Frontend Convention

- Style Guide
  - [Google Style Guide for Typescript](https://google.github.io/styleguide/tsguide.html)
  - [gts](https://www.npmjs.com/package/gts)
- Project Structure

```
// frontend 디렉터리 안에서
.
├── public          // 소스 코드에서 참조되지 않는 에셋
├── src             // 소스 코드
│   ├── api             // 서버와 통신에 쓰이는 api
│   ├── assets          // 소스 코드에서 참조되는 에셋
│   ├── components      // 컴포넌트 디렉터리
│   │   ├── Layout
│   │   └── User
│   ├── pages           // 페이지 디렉터리
│   └── store           // Recoil 디렉터리
└── types           // 타입 선언 디렉터리

```

## 8. Wire Frames

- 유저 화면 프레임들

  ![login](/assets/wireframes/user/%EB%A1%9C%EA%B7%B8%EC%9D%B8.png)
  ![signup](/assets/wireframes/user/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png)
  ![reset-password](/assets/wireframes/user/%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%20%EC%9E%AC%EC%84%A4%EC%A0%95.png)
  ![set-category](/assets/wireframes/user/%EA%B0%80%EC%9E%85%EC%8B%9C%20%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%20%EC%84%A4%EC%A0%95.png)

- 메인 화면 프레임들

  ![notification-live](/assets/wireframes/main/%EB%A9%94%EC%9D%B8%20%ED%99%88%20%20-%20%EB%9D%BC%EC%9D%B4%EB%B8%8C%20%EC%98%88%EC%A0%95.png)
  ![main-0](</assets/wireframes/main/%EB%A9%94%EC%9D%B8%20%ED%99%88%20-%20%EA%B2%BD%EB%A7%A4%EB%B0%A9%20%EC%83%81%EC%84%B8(%ED%8C%90%EB%A7%A4%EC%9E%90).png>)
  ![main-1](</assets/wireframes/main/%EB%A9%94%EC%9D%B8%20%ED%99%88%20-%20%EA%B2%BD%EB%A7%A4%EB%B0%A9%20%EC%83%81%EC%84%B8(%ED%8C%90%EB%A7%A4%EC%9E%90)-1.png>)
  ![main-2](</assets/wireframes/main/%EB%A9%94%EC%9D%B8%20%ED%99%88%20-%20%EA%B2%BD%EB%A7%A4%EB%B0%A9%20%EC%83%81%EC%84%B8(%ED%8C%90%EB%A7%A4%EC%9E%90)-2.png>)

- 하위 메인 화면 프레임들

  ![관심목록-내찜](/assets/wireframes/submain/%EB%A9%94%EC%9D%B8%20%ED%99%88%20-%20%EB%82%B4%20%EC%B0%9C.png)
  ![관심목록-입장예정](/assets/wireframes/submain/%EB%82%B4%20%EC%B0%9C%20-%20%EC%9E%85%EC%9E%A5%20%EC%98%88%EC%A0%95.png)
  ![자동경매](/assets/wireframes/submain/%EA%B2%BD%EB%A7%A4%EB%B0%A9%20%EC%9E%90%EB%8F%99%20%EA%B2%BD%EB%A7%A4.png)
  ![알람리스트](/assets/wireframes/submain/%EC%95%8C%EB%9E%8C%20%EB%A6%AC%EC%8A%A4%ED%8A%B8.png)

- 경매 화면 프레임들

![경매라이브-판매자](/assets/wireframes/auction/%EA%B2%BD%EB%A7%A4%20%EB%9D%BC%EC%9D%B4%EB%B8%8C%20-%20%ED%8C%90%EB%A7%A4%EC%9E%90.png)
![경매라이브-구매자](</assets/wireframes/auction/%EA%B2%BD%EB%A7%A4%20%EB%9D%BC%EC%9D%B4%EB%B8%8C%20-%20%EA%B5%AC%EB%A7%A4%EC%9E%90%20(%20%EB%B0%A9%EC%86%A1%EC%A4%91%20).png>)
![경매방 생성](/assets/wireframes/auction/%EA%B2%BD%EB%A7%A4%EB%B0%A9%20%EC%83%9D%EC%84%B1.png)
![낙찰시-모달](/assets/wireframes/auction/%EB%82%99%EC%B0%B0%EC%8B%9C%20%EB%AA%A8%EB%8B%AC.png)

## 9. 기능 정의서

- 전체적 흐름도

  ![basic](/assets/flowchart/flowchart-basic.png)

- 자동 경매 흐름도

  ![auction](/assets/flowchart/flowchart-auction.png)

## 10. References

- [우린 Git-flow를 사용하고 있어요](https://techblog.woowahan.com/2553/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Google Style Guide for Java](https://google.github.io/styleguide/javaguide.html)
- [Google Style Guide for Typescript](https://google.github.io/styleguide/tsguide.html)
