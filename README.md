# Nursing App

기본적인 기능의 간호용 애플리케이션입니다.

- 프론트 repo: <https://github.com/Syl8n/group4comp308-frontend>

프론트엔드 배포는 하지 않았습니다.
백엔드 배포는 했었지만 비용 문제로 더 이상 하지 않습니다.

username: root / password: 1의 설정을 가지고 27017 포트에서 동작하는 mongodb가 있다면 테스트 가능합니다.

## 구현 기능

- 회원 가입 및 로그인
- 환자 바이탈 추가/수정/조회
- 일일 팁 추가/수정/조회
- 응급 알림 subscribe

## 경험 및 성과

### Graphql api 구현

- Mutations: [링크](https://github.com/Syl8n/group4comp308-backend/blob/main/app/graphql/mutations.js)
- Queries: [링크](https://github.com/Syl8n/group4comp308-backend/blob/main/app/graphql/queries.js)
- 나머지: [링크](https://github.com/Syl8n/group4comp308-backend/tree/main/app/graphql)

책임을 분할해 최대한 모듈화 하였습니다.

### Jwt 파싱

- 미들웨어: [링크](https://github.com/Syl8n/group4comp308-backend/blob/main/app/utils/auth.js)

HttpOnly 쿠키로 전달하였고, 인증/인가를 위해 파싱 후 request 객체 내에 삽입하는 미들웨어를 작성했습니다.

### 응급 알림 subscribe

- Subscribe 모듈: [링크](https://github.com/Syl8n/group4comp308-backend/blob/main/app/utils/subscribe.js)

환자 클라이언트에서의 요청 시 간호사 클라이언트에 알리기 위해 SSE를 활용했습니다.<br>
GraphQL 사용 시 프론트 앱에서는 refetch 메소드를 통해 갱신 된 정보를 새로 받을 수 있기 때문에 갱신이 있다는 것만 알렸습니다.
