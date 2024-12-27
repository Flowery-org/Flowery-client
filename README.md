# Flowery Client

Flowery Client

## Notice

다음과 같은 라이브러리(프레임워크) 및 패키지를 사용합니다.

- React 19: https://react.dev/blog/2024/12/05/react-19
- Next.js 15: https://nextjs.org/blog/next-15
- pnpm: npm, yarn과 같은 패키지 매니저입니다. 의존성 설치는 add(install), 삭제는 remove 등 비슷한 명령어가 많습니다. 공식 한국 문서가 있습니다: https://pnpm.io/ko/cli/add
- zod: 스키마 검증 라이브러리입니다. 회원가입 시나 로그인 등 유저의 입력값을 클라이언트에서 검증할 때 사용합니다. https://zod.dev/?id=basic-usage
- tailwindcss: 클래스이름으로 스타일을 적용할 수 있습니다. 공식문서를 많이 참고하여 많이 사용되는 클래스이름은 외우는 걸 추천드립니다. 또한 vscode의 확장 프로그램으로 `Tailwind CSS IntelliSense`를 설치하시면 자동완성을 지원하고 있습니다. https://tailwindcss.com/docs/container
- shadcn-ui: 이쁜 컴포넌트들을 cli(명령어)로 만들어주는 컴포넌트 모음집: 필요한 컴포넌트의 95%는 이미 존재하므로 공식문서를 참고하여 가져다 쓰세요. https://ui.shadcn.com/docs

## Getting Started

1. pnpm(패키지 매니저) 설치:
   https://pnpm.io/ko/installation

```bash
npm install -g pnpm
```

- 이미 설치하셨더라도 버전을 맞춰주세요: 다음과 같은 명령어로 확인 가능합니다. `pnpm -v`
- 버전 업데이트 방법: pnpm install -g pnpm
- 노드 버전은 20 이상이어야 합니다: 다음과 같은 명령어로 확인 가능합니다. `node -v` 노드 버전 업데이트 : <a href="https://stackoverflow.com/questions/10075990/upgrading-node-js-to-the-latest-version">Upgrading Node.js to the latest version: stackoverflow</a>
- 사용 버전: 9.15.1

2. 의존성 설치:

```bash
pnpm install
```

3. 개발 서버 실행:

```bash
pnpm dev
```

## Scripts

`pnpm dev`: 개발 서버를 실행합니다.  
`pnpm lint`: 린터(문법을 포함한 코드 스타일 체킹 툴)를 실행합니다. 커밋과 머지 전에 반드시 수행해주세요.  
`pnpm type-check`: 타입 체크를 실행합니다. 커밋과 머지 전에 반드시 수행해주세요.  
`pnpm build`: 프로젝트를 빌드합니다.  
`pnpm web:add`: web에 의존성을 추가합니다.  
`pnpm web:del`: web에 의존성을 제거합니다.  
`pnpm ui:add`: ui에 의존성을 추가합니다.  
`pnpm ui:del`: ui에 의존성을 제거합니다.  
`pnpm ui:shadcn:add`: ui에 shadcn의 컴포넌트를 추가합니다. shadcn-ui 공식 홈페이지에 제시된 installation cli 안의 공식 컴포넌트 명을 인자로 넣어주세요. e.g. `pnpm ui:shadcn:add checkbox` 이때 생성된 컴포넌트 파일에 들어가 util 함수의 경로를 다음과 같이 고쳐주세요. `import { cn } from '@packages/ui/lib/utils';`

## Folder Structure

```
.prettierrc.json        - common prettier rules
apps/
  web/
    public/             - for static media
    src/                - main
      app/              - route
      components/       - components for only web
      hooks/            - hooks for only web: handle states or side effects
      lib/              - utils for only web: there is **no state** in utils
packages/
  eslint-config/        - config package for eslint
  tailwind-config/      - config package for tailwindcss
  ts-config             - config package for typescript
  ui/
    src/
      components/       - common ui components: including shadcn-ui components
      hooks/            - common hooks
      lib/              - common utils
      styles/           - common styles: background, foreground. card, popover, etc.
```

## What is monorepo?

여러 프로젝트를 하나의 저장소(repository)에서 관리하는 방식입니다. 코드의 재사용성을 높이고, 일관된 개발 환경을 유지하며, 의존성 관리를 단순화하기 위하여 사용하였습니다. 모든 프로젝트에서 공통적으로 사용될 수 있는 시스템을 별도의 프로젝트로 분리하는 것입니다. 예를 들어, eslint, typescript, 공통적으로 사용하는 컴포넌트들을 packages workspace로 분리할 수 있습니다. 이후 새로운 프로젝트(e.g. admin page)를 만들때 해당 시스템들을 의존성으로 추가함으로써 쉽게 확장할 수 있습니다.
