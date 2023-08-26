# 제 1장 보일러 플레이트

### concurrently 라이브러리를 사용하면 동시에 스크립트를 실행 할 수 있다. 오.

```jsx
"scripts": {
  "server": "cd mern_server && npm run dev",
  "client": "cd mern_client && npm start",
  "start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""
},
```

# 제 2장 컴포넌트

### styled-component 는 아래와 같이 props 제공 가능

```tsx
const StyledBlock = styled.div<BlockProps>`
  width: 100%;
  height: ${(props) => props.height};
  cursor: ${(props) => props.onClick && 'pointer'};
`;
```

### memo 는 프롭스가 바뀌지 않는 한 리랜더링하지 않는다.

```tsx
import React, { memo } from 'react';
...

export default memo(Block);
```

- 반복숙달 수준… 초보자들이 싫어하는 이유를 알겠으나 참스승.

### styled-reset 쓰면 쓸데없는 기본 스타일 편하게 지울 수 있음(기본 마진패딩 등)

```
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
`;

export default GlobalStyles;
```

```tsx
import React from 'react';
...
import GlobalStyles from './styles/GlobalStyles';

...
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
```

# 제 3장 네이버 지도 셋팅

### 서비스 환경에서 web 서비스는 로컬호스트 넣어도 가능. 오.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/29c57ed1-a48a-4181-ac93-a26d5e76b17e/Untitled.png)

# 제 4장 상태관리 Jotai

### 죠타이 선언 쉽다. 죠타.

이름 타입 (초기값) 끝.

```tsx
import { atom } from 'jotai';

export const mapAtom = atom<naver.maps.Map | null>(null);
```

### useState처럼 쓰려면 useAtom!

```jsx
const [selectedInfo, setSelectedInfo] = useAtom(selectedInfoAtom);
```

### value 만 필요하면 useAtomValue!

```jsx
const map = useAtomValue(mapAtom);
```

### set 만 필요하면 useSetAtom!

```jsx
const setInfoList = useSetAtom(infoListAtom);
```

단 강의처럼 이딴식으로 짜면 토글형 마우스 이벤트는 안된다. 어쩔려는거지..

```jsx
return (
  <>
    {infoList.map((info) => (
      <Marker
        key={info.id}
        map={map}
        position={info.position}
        content={'<div class="marker"/>'}
        onClick={() => {
          setSelectedInfo(info);
        }}
      />
    ))}
    {selectedInfo && (
      <Marker
        map={map}
        position={selectedInfo.position}
        content={'<div class="marker marker--selected" />'}
        onClick={() => {
          setSelectedInfo(null);
        }}
      />
    )}
  </>
);
```

# 제 5장 도커 셋팅

### docker-compose 셋팅 기준으로 실행하되 백그라운드에서(-d)

```jsx
docker-compose up -d
```

### 안되면 wsl 문제인지 확인

```jsx
wsl --update
```

### 도커 구동 확인을 위한 명령어

```jsx
docker ps
```

# 제 6장 테스팅툴 셋팅

### insomnia ~~

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/64c69ae6-9440-4811-9e9e-9ed3bb408e8e/Untitled.png)

# 제 7장 서버

### 알아서 잘 만드세요

# 제 8장 환경변수 셋팅

### dotenv 라이브러리 사용하여 편하게 사용 (.env 파일 생성 후)

```
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=

KAKAO_REST_API_KEY=
```

```tsx
import 'dotenv/config';
...

export default app;
```

아래와 같이 어디서든 바로 접근 가능

```jsx
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
```

# 제 9장 리엑트 쿼리(다시 프론트)

### index.tsx 선언하기

```tsx
...
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

...
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### 기본형

- 첫번째 인자로 유일값 제공(query key로서 데이터 캐싱을 위해)
  - 해당 값이 같으면 동일한 행동을 하며 서버에 중복 요청하지 않음.
- 두번째 인자로 함수 제공
- select를 이용해 넘어오는 데이터 중 원하는 값을 사전 선택 가능
- onSuccess / onError 이용해 성공시 / 실패시 행동 정의 가능
- status 값은 "idle" | "error" | "loading" | "success” 으로 쉽게 상태 핸들링 가능

```tsx
const { status } = useQuery('info', getInfoList, {
  select: (result) => result.data.data,
  onSuccess: (infoList) => {
    setInfoList(infoList);
  },
});
```

### 특정 값이 변할 때 마다 요청하기

- 첫번째 인자를 배열로 하여 watch 할 값 제공
- enabled를 이용하여 요창하지 않을 상황 정의하기.

```tsx
const { status } = useQuery(
  ['search', keyword],
  () => getInfoListBySearchKeyword(keyword),
  {
    enabled: !!keyword,
    select: (result) => result.data.data,
    onSuccess: (infoList) => {
      setInfoList(infoList);
      resetSelectedInfo();
    },
  }
);
```
