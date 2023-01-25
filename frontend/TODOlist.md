# TODO list

- 관심 카테고리의 "건너뛰기"는 무슨 역할이냐
- social login
  - prerequisite: 카카오 개발자 앱에 등록된 rest_api_key, redirect_uri 를 백엔드 개발자와 상의할 것
  - https://data-jj.tistory.com/53
- pages 폴더를 항목별 상세 분화할 것 왜냐하면 페이지가 늘어남에 따라 찾기 힘듦
  - e.g. auth (login, register, etc); user (profile, profile-update, etc); auction (products, product-detail, notification etc); chat (real-time broadcasting, 1:1 chat, etc);
- ThemProvider in Main.tsx에 있는 걸 공통 Layout 컴포넌트로 옮길 것
  - prerequisite: Container 통일

# FIXME list

- \<Link to=".."> 설명 자세히 수정해서 알려줄것
  - MUI 컴포넌트에 링크 걸어야하는 경우, useNavigate() 훅 써라
- 공통 Container 컴포넌트 필요
- MUI의 Virtual list 가이드
