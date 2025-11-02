# 🎓 StudyFit  
### 2025-2학기 숙명여자대학교 졸업프로젝트

![React](https://img.shields.io/badge/React-19.1.0-61dafb?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-54.0.13-000000?logo=expo&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.6-6DB33F?logo=springboot&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Expo-black?logoColor=white)
![Cloudtype](https://img.shields.io/badge/Backend-Cloudtype-blue?logo=cloud&logoColor=white)

<!-- 백엔드 추가하고 싶으면 하세요.
![Spring Security](https://img.shields.io/badge/Spring%20Security-6.1.1-6DB33F?logo=springsecurity&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-3.3.6-6DB33F?logo=springboot&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-0.11.5-orange?logo=jsonwebtokens&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-10.11-blue?logo=mariadb&logoColor=white)
![Spring WebSocket](https://img.shields.io/badge/Spring%20WebSocket-3.3.6-6DB33F?logo=springboot&logoColor=white)
![Firebase Admin](https://img.shields.io/badge/Firebase%20Admin-9.2.0-FFCA28?logo=firebase&logoColor=white)
 -->
 
---

## 📘 소개

**스마트 과외 학습 파트너, StudyFit**
StudyFit은 **학생의 원활한 학습과 선생님의 편리한 관리**를 돕고자 하는 목표에서 출발하였으며,
효율적인 수업 준비와 공부 습관 형성을 하나의 플랫폼에서 통합적으로 제공하는 **과외 관리 서비스**입니다.

> “함께 공부할 시간을 더 쉽게, 더 스마트하게.”

---

## 🖼️ 주요 화면

<img width="1920" height="1080" alt="87" src="https://github.com/user-attachments/assets/71ab6e52-73db-4d5f-8144-2570d531cd7b" />
<img width="1920" height="1080" alt="92" src="https://github.com/user-attachments/assets/a4545a18-f644-475c-ac78-86322c7ebab9" />
<img width="1920" height="1080" alt="88" src="https://github.com/user-attachments/assets/1a83957b-aa05-4f65-882f-bcb554894b48" />
<img width="1920" height="1080" alt="89" src="https://github.com/user-attachments/assets/664c1f51-496a-4de2-89a5-5fa01cbe2b12" />
<img width="1920" height="1080" alt="90" src="https://github.com/user-attachments/assets/96283fbe-2eae-4eca-adbc-e437bbd73d73" />
<img width="1920" height="1080" alt="96" src="https://github.com/user-attachments/assets/211d96f3-e9cd-43b3-bd0e-348971be2110" />

---

## 🧩 주요 기능

### 🕒 1. 공유 캘린더
- 선생님과 학생 간 공유 캘린더를 통해 과외 일정을 한눈에 확인할 수 있습니다.

### 👥 2. 학생별 맞춤 관리
- 전반적인 학습 수행율을 파악하고 숙제에 대한 피드백을 남길 수 있습니다.

### 🔄 3. 숙제 리마인드 알림 (추가 개발 중)
- 학생의 숙제 유무 확인을 통해 리마인드 알림을 보낼 수 있습니다.

### 💬 4. 실시간 채팅
- 선생님은 학습 피드백을, 학생은 부가 질문을 실시간으로 공유할 수 있습니다.

---

## 🏗️ 아키텍처

<img width="1920" height="1080" alt="95" src="https://github.com/user-attachments/assets/6da8c6f7-fffa-4d2d-8156-97e7661f880e" />

> **Frontend:** React (Expo 기반)  
> **Backend:** Spring Boot (REST API)  
> **Database:** MariaDB  
> **Deploy:** Expo (Frontend) / Cloudtype (Backend)

---

## 🎬 데모
시연 영상(추후 첨부 예정)

---

## ⚙️ 설치 및 실행

### 🔹 Frontend

```bash
# 1️⃣ 저장소 복제
git clone https://github.com/StudyFit/frontend.git
cd frontend

# 2️⃣ 의존성 설치
npm install

# 3️⃣ 개발 서버 실행 (Expo)
npx expo start
