# Render + Aiven MySQL Deployment

이 프로젝트는 Spring Boot + Thymeleaf 단일 앱입니다. Render에는 Docker Web Service로 배포하고, DB는 Aiven MySQL Free Tier를 사용합니다.

## 1. Aiven MySQL 생성

1. Aiven에서 MySQL 서비스를 생성합니다.
2. Connection information에서 host, port, database, user, password를 확인합니다.
3. Render 환경변수 `DB_URL`에는 아래 형식으로 입력합니다.

```text
jdbc:mysql://AIVEN_HOST:AIVEN_PORT/defaultdb?sslMode=REQUIRED&serverTimezone=Asia/Seoul
```

`defaultdb` 대신 Aiven에서 만든 DB 이름이 다르면 해당 이름으로 바꿉니다.

## 2. Render Web Service 생성

Render에서 Blueprint로 생성할 경우 저장소 루트의 `render.yaml`을 사용합니다.

수동으로 Web Service를 만들 경우:

- Runtime: Docker
- Root Directory: `tourGo`
- Dockerfile Path: `./Dockerfile`
- Health Check Path: `/main_view`

## 3. Render 환경변수

```text
SPRING_PROFILES_ACTIVE=render
DB_URL=jdbc:mysql://AIVEN_HOST:AIVEN_PORT/defaultdb?sslMode=REQUIRED&serverTimezone=Asia/Seoul
DB_USERNAME=avnadmin
DB_PASSWORD=AIVEN_PASSWORD
TOUR_API_SERVICE_KEY=한국관광공사_일반_인증키
FILE_UPLOAD_PATH=/tmp/tourgo/uploads
```

Render가 제공하는 `PORT`는 자동으로 들어오므로 직접 설정하지 않아도 됩니다.

## 4. 관광지 데이터 적재

배포가 끝난 뒤 아래 URL을 브라우저 또는 터미널에서 한 번 호출합니다.

```bash
curl https://YOUR_RENDER_DOMAIN/dev/destinations/import
```

전체 import는 오래 걸릴 수 있습니다. 먼저 서울만 테스트하려면:

```bash
curl https://YOUR_RENDER_DOMAIN/dev/destinations/import/1
```

## 5. 로컬 Docker 테스트

Mac M2에서 Render와 같은 Linux 컨테이너 빌드를 확인하려면:

```bash
cd tourGo
docker build --platform linux/amd64 -t tourgo-render-test .
```

빠른 로컬 실행만 확인할 때는 플랫폼 옵션 없이 빌드해도 됩니다.

```bash
docker build -t tourgo-render-test .
```
