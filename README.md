# SunoDL

Suno AI 플레이리스트 전곡을 MP3/WAV로 무료 다운로드할 수 있는 웹앱입니다.

## Live

**https://suno-dl-kr.fly.dev**

## Features

- Suno 플레이리스트 URL 붙여넣기만으로 전곡 다운로드
- MP3 / WAV 포맷 지원
- 개별 다운로드 & ZIP 일괄 다운로드
- 회원가입 불필요
- 한국어 / English / 日本語 지원 (브라우저 언어 자동 감지, 수동 변경 가능)

## Tech Stack

- **Frontend:** React 18 + Vite 5
- **Backend:** Express (Node.js)
- **Deploy:** Fly.io (Tokyo region)

## Development

```bash
# 의존성 설치
npm install

# 개발 서버 (Express 3000 + Vite 5173)
npm run dev
```

## Deploy

`master` 브랜치에 push하면 GitHub Actions로 Fly.io에 자동 배포됩니다.

수동 배포:
```bash
fly deploy
```

## How to Use

1. [suno.com](https://suno.com)에서 플레이리스트 URL 복사
2. SunoDL에 붙여넣기
3. MP3 또는 WAV로 다운로드
