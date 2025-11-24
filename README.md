# Next.js 블로그

블로그는 https://www.yssccc.com/ 에서 직접 확인하실 수 있습니다.

<img width="249" height="245" alt="blog-thumbnail" src="https://github.com/user-attachments/assets/03a9af66-c04c-4938-ab3b-ad7c6397d336" />

## 1. 프로젝트 소개

Next.js 기반으로 개발한 정적 블로그입니다.

학습한 내용을 기록하고 공유하기 위해 개발한 블로그로, 글은 /content 폴더의 MDX 파일 형태로 관리됩니다.

또한 별도의 관리자 페이지에서 글을 추가·수정·삭제할 수 있고, 작성한 글은 GitHub 저장소로 바로 커밋되어 자동으로 배포됩니다. 이를 통해 코드 수정 없이 웹 환경에서 직접 콘텐츠를 관리할 수 있습니다.

## 2. 폴더 구조

```jsx
.
├── app                  # 라우트 & 페이지 구조
│   ├── admin            # 관리자 페이지 (로그인/업로드/프리뷰)
│   ├── api              # API 엔드포인트
│   ├── posts            # [slug] 기반 포스트 상세
│   └── ...              # globals.css, layout.tsx 등
│
├── components           # 재사용 UI 컴포넌트
├── content              # MDX 포스트
├── hooks                # 커스텀 훅
├── lib                  # 서버/데이터 유틸
├── public               # 이미지, 아이콘 등
└── types                # TS 타입

```

## 3. 기술 스택

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX
- **Comments:** Giscus
- **Deployment:** Vercel

## **4. 주요 기능 (Features)**

### **4-1. 블로그 기능**

- MDX 기반 포스트 관리
- 카테고리 자동 생성 / 필터링
- 페이지네이션(한 페이지당 21개)
- 포스트 상세 페이지
- 인용문 커스텀
- 자동 목차 생성 (클릭 시 스크롤 이동 및 현재 위치 하이라이트)

### **4-2. 관리자(Admin) 기능**

- 관리자 로그인 (쿠키 인증)
- 포스트 작성 / 수정 / 삭제
- 미리보기 렌더링

### **4-3. 검색 기능**

- 검색 모달 (제목 + 본문 검색)
- 디바운스 기반 성능 최적화

### **4-4. UI / UX 기능**

- 반응형 UI
- 스크롤 Progress Bar
- 공유 기능(URL 복사)
- 댓글 기능(Giscus 연동)

### **4-5. SEO & 메타**

- OG 태그 자동 생성
- sitemap.xml 자동 생성
- robots.txt 설정
- 정적 페이지 기반 SEO 최적화

## **5. 설치 및 실행**

```bash
git clone https://github.com/yssccc/blog.git
cd blog

# 의존성 설치
npm install

npm run dev
# → http://localhost:3000 에서 앱이 실행됩니다.
```

### **빌드 및 프리뷰**

```bash
npm run build
npm run start
```
