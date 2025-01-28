# 칸반보드 웹 애플리케이션 설계 및 구현 문서

## 1. 프로젝트 개요
실시간 협업과 카드 관리가 가능한 칸반보드 웹 애플리케이션을 개발합니다. 이 문서는 프로젝트의 전반적인 기술 스택, 디렉토리 구조, 기능 명세를 포함하여 다른 개발자가 전체 앱을 구축할 수 있도록 정리되었습니다.

---

## 2. 기술 스택

### 프론트엔드
- **React**: UI 구현
- **TypeScript**: 타입 안정성과 유지보수성을 위한 언어
- **React Query**: 서버 상태 관리
- **CSS-in-JS (예: styled-components)**: 스타일 관리

### 백엔드
- **Node.js**: 서버 환경
- **Express**: API 서버 프레임워크
- **TypeScript**: 타입 안정성과 유지보수성을 위한 언어
- **Socket.io**: 실시간 통신 및 협업 기능 구현

### 데이터베이스
- **MySQL**: 데이터 저장소
- **Prisma**: ORM (Object Relational Mapping)

### 개발 및 배포
- **Docker**: 컨테이너 기반 배포
- **Docker Compose**: 여러 서비스 관리

---

## 3. 주요 기능

### 3.1 기본 기능
1. **드래그 앤 드롭**: 칸반보드 내에서 카드를 다른 컬럼으로 이동.
2. **카드 관리**:
   - 생성
   - 수정
   - 삭제
3. **보드 내 검색**: 특정 카드 제목, 내용, 태그 등으로 검색.
4. **카드 필터링**:
   - 우선순위
   - 담당자
   - 라벨
5. **컬럼 접기/펼치기**: 필요에 따라 보드 레이아웃 조정.
6. **레이아웃 저장/복원**: 사용자 설정 유지.

### 3.2 협업 및 확장 기능
1. **다중 사용자 협업**: 실시간으로 보드 변경 사항 공유.
2. **히스토리 관리**: 작업 기록 저장 및 UI에서 조회.
3. **모바일 반응형 디자인**: 다양한 화면 크기에 적응하는 레이아웃.

---

## 4. 디렉토리 구조

### 4.1 프론트엔드
```
frontend/
├── src/
│   ├── components/
│   │   ├── Board/
│   │   │   ├── KanbanBoard.tsx        # 메인 보드 컴포넌트
│   │   │   ├── KanbanColumn.tsx       # 칼럼 컴포넌트
│   │   │   ├── KanbanCard.tsx         # 카드 컴포넌트
│   │   │   └── PriorityBadge.tsx      # 우선순위 뱃지
│   │   ├── Card/
│   │   │   ├── CardModal.tsx          # 카드 생성/수정 모달
│   │   │   ├── CardForm.tsx           # 카드 입력 폼
│   │   │   └── CardDetail.tsx         # 카드 상세 정보
│   │   ├── Search/
│   │   │   ├── SearchBar.tsx          # 검색 입력 UI
│   │   │   └── SearchResults.tsx      # 검색 결과 표시
│   │   ├── Filter/
│   │   │   ├── FilterPanel.tsx        # 필터 패널
│   │   │   └── FilterChip.tsx         # 활성 필터 표시
│   │   └── common/
│   │       ├── Button/
│   │       ├── Modal/
│   │       └── Icons/
│   ├── hooks/
│   │   ├── useDragAndDrop.ts          # 드래그 앤 드롭 로직
│   │   ├── useCards.ts                # 카드 CRUD 로직
│   │   ├── useSearch.ts               # 검색 로직
│   │   ├── useFilter.ts               # 필터링 로직
│   │   ├── useColumnCollapse.ts       # 컬럼 접기/펼치기
│   │   └── useBoardLayout.ts          # 레이아웃 관리
│   ├── contexts/
│   │   ├── BoardContext.tsx           # 보드 상태 관리
│   │   ├── FilterContext.tsx          # 필터 상태 관리
│   │   └── LayoutContext.tsx          # 레이아웃 상태 관리
│   ├── services/
│   │   ├── api/
│   │   │   ├── board.ts               # 보드 API 통신
│   │   │   ├── card.ts                # 카드 API 통신
│   │   │   └── user.ts                # 사용자 API 통신
│   │   └── socket.ts                  # 웹소켓 연결 관리
│   ├── utils/
│   │   ├── search.ts                  # 검색 유틸리티
│   │   ├── filter.ts                  # 필터 유틸리티
│   │   ├── localStorage.ts            # 로컬 스토리지 관리
│   │   └── layoutStorage.ts           # 레이아웃 저장/복원
│   ├── types/
│   │   └── kanban.ts                  # 타입 정의
│   └── constants/
│       └── kanban.ts                  # 상수 정의
└── package.json
```

### 4.2 백엔드
```
backend/
├── src/
│   ├── controllers/
│   │   ├── board.controller.ts       # 보드 관련 요청 처리
│   │   ├── card.controller.ts        # 카드 관련 요청 처리
│   │   └── user.controller.ts        # 사용자 관련 요청 처리
│   ├── models/
│   │   ├── Board.ts                  # 보드 스키마
│   │   ├── Card.ts                   # 카드 스키마
│   │   └── User.ts                   # 사용자 스키마
│   ├── services/
│   │   ├── board.service.ts          # 보드 비즈니스 로직
│   │   ├── card.service.ts           # 카드 비즈니스 로직
│   │   └── socket.service.ts         # 실시간 업데이트 처리
│   ├── routes/
│   │   ├── board.routes.ts           # 보드 라우트
│   │   ├── card.routes.ts            # 카드 라우트
│   │   └── user.routes.ts            # 사용자 라우트
│   ├── middleware/
│   │   ├── auth.middleware.ts        # 인증 미들웨어
│   │   └── error.middleware.ts       # 에러 처리
│   ├── config/
│   │   ├── database.ts               # DB 설정
│   │   └── socket.ts                 # 웹소켓 설정
│   └── app.ts                        # 앱 진입점
└── package.json
```

---

## 5. Docker 구성

### 디렉토리 구조
```
docker/
├── frontend.dockerfile
├── backend.dockerfile
├── mysql.dockerfile
└── docker-compose.yml
```

### Docker Compose 예제
```yaml
version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: frontend.dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:4000

  backend:
    build:
      context: ./backend
      dockerfile: backend.dockerfile
    ports:
      - "4000:4000"
    environment:
      - DB_HOST=mysql
      - DB_USER=root
      - DB_PASSWORD=example

  mysql:
    image: mysql:8.0
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: example
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:
```

---

이 문서만으로도 다른 개발자가 프로젝트를 이해하고 개발을 시작할 수 있도록 구성하였습니다.

