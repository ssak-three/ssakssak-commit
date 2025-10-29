const COMMIT_ANALYSIS_INSTRUCTIONS = `
<전반적인 요구사항>
  • 모든 분석 결과와 설명은 반드시 한국어로 작성한다.
  • 모든 분석 결과 및 설명에는 창작이나 추론이 포함되지 않아야 한다.
  • 분석 결과는 설명하듯이 친절한 말투로 작성하며 불필요하게 길게 작성하지 않는다.
  • 주어진 모든 커밋을 빠짐없이 분석해야 한다.
  • 커밋이 많아도 절대 요약하지 말고, commits 배열에는 입력으로 제공된 커밋 수와 동일한 개수의 결과를 반드시 포함해야 한다.
  • 하나라도 누락되면 요구사항 불충족으로 처리된다.
  • 모든 텍스트 필드(changeSummary, analyses[].description, analyses[].caption, commitConclusion)는 완결된 문장으로 끝나야 한다.
  • 입력에 repositoryOverview이 제공된 경우, 해당 설명은 리포지토리의 맥락을 보조적으로 참고한다.
  • repositoryDescription은 보조 정보일 뿐이며, 커밋 패치 코드 및 커밋 분석 결과보다 우선하지 않는다.
  • repositoryOverview이 제공되지 않은 경우에는 이를 언급하거나 추측하지 않고 무시한다.

<commits>
  • commits 배열에 포함될 데이터는 반드시 존재하는 커밋에 기반해야 하며, 임의로 새로운 커밋을 생성하거나 예측할 수 없다.
  • commits 배열에 포함되는 각 커밋의 분석 결과는 커밋의 실제 데이터에서 추출한 정보를 바탕으로 작성되어야 한다.
  • commits에는 각 커밋별 분석 결과가 commits 스키마에 맞게 작성되어야 한다.
  • commitId에는 각 커밋의 sha 값이 들어가야 한다.
  • commitId에는 각 커밋의 sha 값이 들어가야 한다.
  • commitMessage에는 각 커밋 메시지가 들어가야 한다.
  • author에는 각 커밋의 author가 들어가야 한다.
  • changeSummary에는 커밋 변경사항에 대한 요약이 들어가야 한다.
  • commitConclusion에는 커밋 변경사항에 대한 분석 결과의 결론이 들어가야 한다.
  • commits 배열은 시간 오름차순(과거 → 최신)으로 정렬해야 한다.
  • patch가 null이거나 변경이 없는 커밋(merge, chore, formatting 등)은 무시하지 않고 commits 배열에 포함한다. 이 경우 analyses에는 최소한의 explanation 1개만 포함하고, code-diff는 생략 가능하다.
  • 임의로 커밋을 생성하거나 존재하지 않는 커밋의 데이터를 추가하는 것은 금지됩니다.

<commits-analyses>
  • 커밋에 대한 분석 결과는 analyses 배열에 작성한다.
  • type은 diagram | code-diff | explanation 중 하나다.

  • 필수 최소 구성(각 커밋):
    • code-diff: 1개 이상
    • explanation: 1개 이상
    • diagram: 1개 이상.

  • diagram 생성 판단 체크리스트(고려):
    • 패치에 흐름/분기/검증/에러 처리 로직이 추가/변경됨 → flowchart 고려
    • 요청↔응답, 비동기 호출/콜백, API 호출, 주체 간 상호작용이 명확 → sequenceDiagram 고려
    • patch에 ‘class ’, ‘interface ’, ‘extends ’, ‘implements ’, ‘constructor(’ 토큰 존재 → classDiagram 고려

  <classDiagram-생성-규칙>
    • classDiagram는 patch 본문에 class 관련 토큰이 존재하는 경우에만 생성한다.
    • null/빈 patch에서는 생성 금지.
    • 조건이 거짓이면 classDiagram 대신 flowchart 또는 sequenceDiagram를 사용한다.

  • diagram 생성 금지(기본값):
    • 변수/함수/클래스 이름 변경만 있는 리팩터링
    • import/export 정리, 파일 이동, 포맷팅, lint fix, 주석/타이포 수정
    • 상수값/타입 표기만 변경 등 로직 영향이 없는 패치

  ※ 단, 아래 “diagram 강제 생성 트리거”가 충족되면 본 금지 규칙보다 **강제 규칙이 우선**한다.
  ※ files[].patch가 존재하지 않아 트리거 판정이 불가능한 경우에만 diagram 생성을 생략할 수 있다(아래 보조 트리거 규칙을 사용할 수 있음).

  • analyses 배열의 순서는 “분석 내용”을 따른다:
    • 배경/의도(explanation) → 핵심 변경(code-diff)
    • 흐름/상호작용/구조가 명확할 때 diagram 추가
    • diagram은 기본 0~1개, 필요할 때만 2개.

  • 필수 검증 (Audit):
    • code-diff ≥ 1
    • explanation ≥ 1
    • 트리거 조건 충족 시 diagram ≥ 1
    • class 관련 토큰 존재 시 classDiagram ≥ 1
    • 누락 시 analyses 끝에 보완 항목 추가

<diagram 강제 생성 트리거>
  다음 조건 중 2개 이상이 입력 커밋의 파일 패치 본문(files[].patch 문자열)에서 발견되면, 해당 커밋의 analyses에는 반드시 1개 이상의 diagram을 포함한다.
  • 트리거 판정 시 unified diff 접두기('+', '-', 'diff', '@@')는 무시하고 코드 토큰만 인식한다.
  • files[].patch가 여러 개인 경우, 커밋 내 모든 patch를 합산하여 판정한다.

  • 요청/응답 처리: app.get(, app.post(, router., req., res., NextResponse., Response.json(, export const GET =, export async function POST(, new Request(
  • 외부/내부 API 호출: fetch(, axios., octokit., client.request(
  • 상태코드/에러 처리: .status(, throw, try { / catch, return NextResponse.json(, if , switch
  • 검증/분기 로직: guard, validate(, zod, schema.parse(
  • 클래스 관련: class , interface , extends , implements , constructor(

<보조 트리거(입력 patch 부재 시 전용)>
  • 입력에 files[].patch가 제공되지 않았거나 null인 경우에만 적용한다.
  • 파일 경로/커밋 메시지에 아래 키워드가 1개 이상 포함되면 최소 템플릿 diagram 1개를 생성한다.
    - 경로: /api/, /app/api/, /routes/, /controller/, /service/, /infra/, route.ts, route.js
    - 메시지: API, 요청, 응답, fetch, axios, Octokit, 라우트, 컨트롤러, 서비스

<diagram 선택 규칙>
  • 입력 patch에서 요청↔응답, 외부 호출, 주체 간 상호작용 토큰이 발견되면 → sequenceDiagram 사용
  • 입력 patch에서 분기/검증/에러 처리 토큰이 강조되면 → flowchart TD 사용
  • 입력 patch에 class/interface/extends/implements/constructor 토큰이 1개 이상 → classDiagram 1개를 추가로 생성(빈 블록 금지, 모든 클래스 포함)

<diagram>
  • 노트(note)와 코드 외 불필요한 텍스트를 넣지 않는다.
  • 생성된 diagram은 반드시 Mermaid 파서에서 오류 없이 동작해야 한다.
  • flowchart/sequence 라벨 텍스트에는 불필요한 괄호 사용을 피한다.
  • classDiagram에서는 메서드 표기상 괄호()를 허용하며, 각 클래스는 최소 1개 이상의 속성/메서드를 포함한다.
  • classDiagram는 모든 등장 클래스를 누락 없이 포함한다.

  1. flowchart 기본 문법
    flowchart TD
      A[요청 수신] --> B[검증]
      B -->|성공| C[핵심 로직 실행]
      B -->|실패| D[에러 응답]
      C --> E[응답 반환]

    • 노드 ID는 알파벳·숫자만 사용
    • 화살표는 Mermaid 문법에 맞는 것만 사용 (--> , -->|텍스트| , -.-> , --o , --x)
    • '[' 사용했으면 반드시 ']'로 닫아주어야 함

  2. sequenceDiagram 기본 문법
    sequenceDiagram
      participant Client as 클라이언트
      participant API as 서버
      Client->>API: 요청 전송
      API-->>Client: 응답 반환

  3. classDiagram 기본 문법
    classDiagram
      class Animal {
        +String name
        +void makeSound()
      }

      class Dog {
        +void bark()
      }

      class Cat {
        +void meow()
      }

      Dog --|> Animal
      Cat --|> Animal

    • 모든 클래스는 속성/메서드 1개 이상 포함
    • + (public), - (private) 표기 사용
    • 상속/구현 관계는 Mermaid 문법만 허용 (--|>, ..|>)
    • 일부 클래스만 누락하지 않는다

<code-diff>
  • codeDiffSummary: 핵심 변경사항에 대한 2줄 정도의 구체적인 설명,
  • path : 파일 경로
  • code : 핵심 변경이 포함된 스니펫
  • language : 사용된 언어
  • status : 커밋 데이터의 status
  • highlights : 변경 포인트만 강조 (전체 범위 금지)
    • 여러 구간 가능 (최대 3구간 권장, 필요 시 초과 가능)
    • startLine : 스니펫 내 시작 줄 번호
    • endLine : 포함 종료 줄 번호
  • 변경 맥락(앞뒤 몇 줄)을 포함하도록 한다. 줄 수가 적으면 가능한 범위 내에서만 출력한다.
`;

const REPORT_ANALYSIS_INSTRUCTIONS = `
• 모든 분석 결과와 설명은 반드시 한국어로 작성한다.
• 새로운 사실이나 추론을 창작하지 않고, 오직 입력으로 제공된 커밋 요약 데이터만 근거로 사용한다.
• 문장은 친절하되 불필요하게 길게 작성하지 않으며, 모든 문장을 완결형으로 끝낸다.
• 하나라도 누락되면 요구사항 불충족으로 처리한다.

[출력 스키마 준수]
• 출력은 zod 스키마 analysisReportSchema에 정확히 일치해야 하며, 여분 필드를 포함하지 않는다.
• 필드명은 reportTitle, reportSummary, reportConclusion을 사용한다.

[작성 원칙]
• reportTitle: 제공된 커밋별 요약(changeSummary, commitConclusion 등)만 근거로 전체 리포트의 제목을 간결하게 작성한다.
• reportSummary: 전체 변경 흐름과 핵심 포인트를 요약하되, 제공 데이터에 근거가 없는 내용은 포함하지 않는다.
• reportConclusion: 전체적인 결론과 함의를 정리한다. 제공 데이터에 근거가 없는 내용은 포함하지 않는다.
`;

export { COMMIT_ANALYSIS_INSTRUCTIONS, REPORT_ANALYSIS_INSTRUCTIONS };
