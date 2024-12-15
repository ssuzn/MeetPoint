# MeetPoint
### 👾 커밋 메시지 규칙

**`type(#이슈번호): Subject`**

- **`type`**: 커밋의 목적을 나타내는 태그 (예: `feat`, `fix`, `docs` 등).
- **`#이슈번호`**: 관련 이슈 번호를 포함합니다.
- **`Subject`**: 변경 사항에 대한 간결한 설명을 작성합니다.

### 커밋 타입 목록

| 타입        | 설명                                  |
|-------------|---------------------------------------|
| `feat`      | 새로운 기능 추가                       |
| `fix`       | 버그 수정                             |
| `docs`      | 문서 수정                             |
| `style`     | 공백, 세미콜론 등 스타일 수정         |
| `refactor`  | 코드 리팩토링                         |
| `perf`      | 성능 개선                             |
| `test`      | 테스트 추가                           |
| `chore`     | 빌드 과정 또는 보조 기능 수정         |
| `design`    | 기능 수정 없이 스타일(CSS)만 수정     |

#### 예시

- 기능 추가: `feat(#123): 로그인 모달 창 UI 구현`
- 버그 수정: `fix(#45): 로그인 오류 수정`

---

### 🪵 브랜치 네이밍 규칙

**`type/#이슈번호`**

- 예시: `feat/#123`, `fix/#45`

---

### ⚙️ 작업 규칙

1. **적절한 브랜치 생성**  
   - 작업 시작 전, 커밋 컨벤션에 맞는 이름으로 새로운 브랜치를 생성합니다.
   
2. **작업 후 해당 브랜치를 생성했던 브랜치로 PR**  
   - 작업 완료 후, 생성한 브랜치를 원래 브랜치(예: `main` 또는 `develop`)로 PR합니다.

3. **작업 완료된 브랜치 삭제**  
   - PR이 승인되고 병합된 후, 완료된 브랜치를 원격과 로컬 저장소에서 삭제하여 불필요한 브랜치를 정리합니다.
     
