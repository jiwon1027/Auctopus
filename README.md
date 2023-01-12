# 경매중 (경제적이고 매력적인 중고거래 플랫폼)

판매자를 위한 흥정, 구매자를 위한 거래

## Table of Content

1. [서비스 개요](#1-서비스-개요)
1. [팀원 소개](#2-팀원-소개)
1. [Git Flow Convention](#3-git-flow-convention)
1. [Commit Message Convention](#4-commit-message-convention)
1. [Backend Convention](#5-backend-convention)
1. [Frontend Convention](#6-frontend-convention)
1. [Wire Frames](#7-wire-frames)
1. [기능 정의서](#8-기능-정의서)
1. [References](#9-references)

## 1. 서비스 개요

## 2. 팀원 소개

정상기 (팀장): Frontend 개발 + 프로젝트 관리
손예지 (팀원): Frontend 개발 + 디자인
김태원 (팀원): Frontend 총괄 + QA
이지원 (팀원): Backend 총괄 + QA
변유정 (팀원): Backend 개발 + 이슈 관리
우상빈 (팀원): Backend 개발 + 이슈 관리 + 발표

## 3. Git Flow Convention

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
(fe-develop)]$ git checkout -b feature/user-login --track origin/develop
```

2. 작업 브랜치에서 작업합니다

3. 작업 브랜치에서 소스를 커밋합니다

```
(feature/user-login)]$ git commit -m "feat: add user login layout"
```

4. 작업 브랜치를 origin/develop에 rebase 합니다

```
(feature/user-login)]$ git pull --rebase origin fe-develop
```

5. 작업 브랜치를 origin에 push합니다

```
(feature/user-login)]$ git push origin feature/user-login
```

6. Gitlab에서 작업 브랜치를 develop에 합치도록 Merge Request 를 생성합니다
7. 동료에게 승인받고, merge 합니다

<!-- [ref](https://techblog.woowahan.com/2553/) -->

## 4. Commit Message Convention

Commit Message Types

- fix: 내 코드베이스에서 발생한 버그를 수정했을 때
- feat: 새로운 기능을 추가했을 때
- (ELEMENT)!: API를 바꿨을 때
- docs: 문서 수정
- refactor: 코드 리펙토링했을 때
- test: 테스트 코드 추가 또는 수정했을 때
- style: 코드 형식 바꿨을 때
- chore: 그 외 기타사항
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

## 5. Backend Convention

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

## 6. Frontend Convention

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

## 7. Wire Frames

## 8. 기능 정의서

## 9. References

- [우린 Git-flow를 사용하고 있어요](https://techblog.woowahan.com/2553/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Google Style Guide for Java](https://google.github.io/styleguide/javaguide.html)
- [Google Style Guide for Typescript](https://google.github.io/styleguide/tsguide.html)
