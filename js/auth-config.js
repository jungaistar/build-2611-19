// 로그인 설정 — 이 파일 한 곳만 바꾸면 된다(생성: build-2611-00/tools/kit/apply-kit.mjs, 대문 문구 출처 docs/plan.json).
// 내 Supabase 로 옮길 때: url · anonKey 를 내 프로젝트 값으로, 카카오를 설정하지 않았으면 kakao: false. 안내 = docs/내_깃허브로_옮기기.md
// prefix 는 supabase/auth.sql 의 표 이름 앞부분과 같아야 한다.
window.AUTH_CONFIG = {
  "url": "https://hcmgdztsgjvzcyxyayaj.supabase.co",
  "anonKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjbWdkenRzZ2p2emN5eHlheWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzU4ODcsImV4cCI6MjA4NzAxMTg4N30.gznaPzY1l8qDAPsEyYNR9KS7f7VqS3xaw-_2HTSwSZw",
  "prefix": "build261119",
  "kakao": true,
  "idleMinutes": 30,
  "localBypass": true,
  "board": true,
  "site": {
    "title": "HEX Protocol Analyzer · Bit 단위 필드",
    "summary": "통신 프로토콜 표와 HCESPN 정의를 등록해 두면 16진수 RAW DATA 를 Byte 별로 자동 해석하는 도구(09번)에, 한 Byte 안의 Bit 몇 개로 정의된 필드(「52.1 / 2 bits」)를 등록 · 검증 · 추출 · 해석하는 기능을 더한 판입니다. Byte 필드와 Bit 필드를 한 프로토콜에 함께 둘 수 있습니다.",
    "course": "생성형 AI 업무자동화 전문가과정 · 2차수",
    "features": [
      {
        "name": "Bit 단위 필드",
        "desc": "「52.1 / 2 bits」처럼 한 Byte 안의 Bit 몇 개를 필드로 등록하고 해석합니다."
      },
      {
        "name": "Bit 범위 검증",
        "desc": "같은 Byte 의 필드가 겹치는지 실제 Bit 범위로 확인하고, 비어 있는 Bit 를 알려 줍니다."
      },
      {
        "name": "Bit 번호 기준",
        "desc": "Bit 1 이 LSB 인지 MSB 인지 프로토콜마다 정합니다. 정하지 않으면 해석하지 않습니다."
      },
      {
        "name": "대시보드",
        "desc": "등록 현황, 미등록 HCESPN, 최근 분석 이력 · 다시 해석, 백업."
      },
      {
        "name": "프로토콜 관리",
        "desc": "표 붙여넣기 등록, Byte Mapping 편집, 자동 검증, 버전 보관."
      },
      {
        "name": "HCESPN 관리",
        "desc": "원문 자동 구조화, Type · 하위 필드 · 환산식 · 특수조건, 버전."
      }
    ],
    "steps": [
      "프로토콜 등록",
      "HCESPN 등록",
      "RAW DATA 입력",
      "프로토콜 선택",
      "분리 · 환산",
      "검증"
    ],
    "flow": [
      {
        "step": "프로토콜 등록",
        "desc": "표 붙여넣기 → 검증 → 저장"
      },
      {
        "step": "HCESPN 등록",
        "desc": "원문 → 구조화 → 확인 → 저장"
      },
      {
        "step": "RAW DATA 입력",
        "desc": "직접 · Excel, HEX 정리"
      },
      {
        "step": "프로토콜 선택",
        "desc": "Message Type · 발신자 · 버전"
      },
      {
        "step": "분리 · 환산",
        "desc": "S.P · Length → HCESPN 정의 · Endian · 수식 · 특수조건"
      },
      {
        "step": "검증",
        "desc": "길이 · 범위 · 미등록"
      }
    ],
    "goals": [
      "Byte 단위 필드와 Bit 단위 필드를 한 프로토콜에서 함께 등록합니다.",
      "「52.1」「2 bits」 표기를 Byte · Bit 위치로 정확히 읽고, 겹침은 실제 Bit 범위로 검증합니다.",
      "Bit 번호 기준(Bit 1 = LSB / MSB)을 프로토콜마다 명시하고, 정해지지 않으면 추정하지 않습니다."
    ],
    "screen": "docs/img/screen.png",
    "plan": "plan.html",
    "home": true,
    "guide": {
      "screens": [],
      "data": [
        {
          "name": "protocols",
          "fields": "id · name · sender · receiver · msg_type · version · registered_at · updated_at · note · archived · rows[sp · len · name · hcespn · note]"
        },
        {
          "name": "hcespns",
          "fields": "id · no · name · length · type · endian · resolution · offset · unit · min · max · enums · fields[name · start · len · resolution · offset · unit · min · max] · special[scope · byte · equals · label] · formula · hcepgn · version · archived"
        },
        {
          "name": "analyses",
          "fields": "id · at · recv_date · recv_time · sender · raw · msg_type · protocol_id · protocol_name · protocol_version · status · summary"
        }
      ],
      "rules": [
        "「52.1」은 소수가 아니라 Byte 52 의 Bit 1 입니다. Byte 위치와 Bit 위치를 따로 저장합니다.",
        "Bit 필드는 한 Byte 안(시작 Bit + 길이 − 1 ≤ 8)에서만 정의합니다. Byte 경계를 넘으면 오류입니다.",
        "Bit 1 = LSB: 값 = (Byte >> (시작 Bit − 1)) & (2^길이 − 1). Bit 1 = MSB: 값 = (Byte >> (9 − 시작 Bit − 길이)) & (2^길이 − 1).",
        "Bit 번호 기준이 정해지지 않으면 추출하지 않습니다(추정 금지).",
        "겹침은 Bit 구간으로 봅니다 — Byte 필드는 그 Byte 의 Bit 전부를 차지합니다.",
        "HCESPN 정의가 없으면 추출한 RAW 값만 보여 주고 뜻을 만들지 않습니다.",
        "Byte 기준으로 적힌 HCESPN 특수조건은 Bit 필드에 적용하지 않습니다(알림).",
        "Start Position 은 1 부터 셉니다. Message Type 은 첫 Byte 입니다.",
        "HEX 는 공백 · 줄바꿈 · 쉼표 · 0x 를 걷고 대문자로 만듭니다. 16진수가 아닌 글자나 홀수 자릿수가 있으면 해석하지 않고 위치를 알립니다.",
        "프로토콜은 Message Type(+ 발신자)으로 찾습니다. 버전이 여럿이면 가장 높은 버전으로 풀고 고르라고 알립니다. 보관된 버전은 자동 선택에서 뺍니다.",
        "다중 Byte 수치는 Endianness 대로 읽습니다(Little = 앞 Byte 가 하위). 3C 00 00 00 → 60.",
        "선형 환산 Physical = RAW × Resolution + Offset. 유효범위 밖이면 값은 보여 주되 「확인」으로 표시합니다.",
        "날짜 · 시간(6 bytes): Year = 2000 + RAW, Month 1~12 · Day 1~31 · Hour 0~23 · Minute · Second 0~59. 범위 밖이거나 없는 날짜면 날짜로 환산하지 않습니다. 1A 0B 04 0D 1E 2D → 2026-11-04 13:30:45.",
        "반복 배열은 하위 필드의 Byte 구간마다 따로 환산합니다. 필드에 비운 Resolution · Offset · Unit 은 HCESPN 의 값을 씁니다.",
        "특수조건은 적용 범위(하위 필드마다 / 전체)를 정한 것만 적용합니다. 「확인 필요」는 적용하지 않고 알립니다.",
        "사용자 정의 수식은 RAW · RES · OFFSET 과 사칙연산 · 괄호만 씁니다. 오류면 값을 만들지 않습니다.",
        "프로토콜보다 짧으면 읽을 수 있는 항목까지만 풀고, 길면 초과 Byte 를 미정의로 둡니다. HCESPN 미등록 · 길이 불일치 항목은 RAW HEX 만 보여 줍니다.",
        "S.P 범위와 Length 가 어긋난 표는 고치지 않고 알립니다."
      ],
      "limits": [
        "Byte 경계를 넘는 Bit 필드(예: Bit 7 부터 4 bits)는 지원하지 않습니다. 필요한 경우 두 필드로 나눠 정의해야 합니다.",
        "HCESPN 820 · 822 · 823 · 824 의 뜻은 받지 못해 등록하지 않았습니다 — 예시에서는 추출한 RAW 값만 나옵니다. 「HCESPN 관리」에서 열거값을 등록하면 뜻이 붙습니다.",
        "날짜 · 배열 형식의 HCESPN 은 Bit 필드에 쓸 수 없습니다.",
        "자료는 이 브라우저에만 저장됩니다. 09번에 등록해 둔 자료는 자동으로 넘어오지 않습니다(09번에서 백업 → 19번에서 불러오기)."
      ],
      "users": [
        "전장 통신 데이터를 검증하는 개발 · 시험 담당자"
      ],
      "flow": [
        {
          "step": "프로토콜 등록",
          "desc": "표 붙여넣기 → 검증 → 저장"
        },
        {
          "step": "HCESPN 등록",
          "desc": "원문 → 구조화 → 확인 → 저장"
        },
        {
          "step": "RAW DATA 입력",
          "desc": "직접 · Excel, HEX 정리"
        },
        {
          "step": "프로토콜 선택",
          "desc": "Message Type · 발신자 · 버전"
        },
        {
          "step": "분리 · 환산",
          "desc": "S.P · Length → HCESPN 정의 · Endian · 수식 · 특수조건"
        },
        {
          "step": "검증",
          "desc": "길이 · 범위 · 미등록"
        },
        {
          "step": "Viewer · 결과표 · Excel",
          "desc": "Hover 해석, 이력 저장"
        }
      ]
    },
    "landing": {
      "company": {
        "name": "HD현대사이트솔루션",
        "en": "HD HYUNDAI SITE SOLUTION",
        "logo": "images/logo.png",
        "logoH": 24
      },
      "slides": [
        {
          "image": "images/slide-1.jpg",
          "tone": "dark"
        },
        {
          "image": "images/slide-2.jpg",
          "tone": "dark"
        }
      ],
      "heroMode": "slide",
      "headline": "HEX RAW DATA,\nBit 단위까지 한눈에",
      "lead": "통신 프로토콜과 HCESPN 정의를 등록하면 16진수 RAW DATA의 Message Type을 자동으로 식별하고 각 Byte의 의미와 환산값을 분석합니다. 한 Byte 안의 Bit 몇 개로 정의된 필드(52.1 / 2 bits)도 등록 · 검증 · 해석합니다."
    }
  }
};
