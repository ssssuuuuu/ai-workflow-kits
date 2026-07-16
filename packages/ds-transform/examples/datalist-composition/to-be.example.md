# To-Be: DataList / DataListItem 조합 스펙 (예시, 가상 데이터)

`as-is.example.md`를 `ds-transform` 5단계로 변환하되, 이 화면은 "원자를 슬롯으로 조합한 컴포넌트"가 핵심이므로 [방법론 문서 18장(아이템 조합)](../../../../docs/design-system-methodology.md#18-아이템-조합-원자에서-컴포넌트-컴포넌트에서-화면으로)의 조합 계층을 적용합니다.

## Phase 1 — As-Is UI Inventory (발췌)

| element | occurrences | current definition | inconsistency notes |
| --- | --- | --- | --- |
| 항목 제목 | 다수 | 항상 존재 | - |
| 부가정보("3일 전", "홍길동") | 다수 | 회색 텍스트 | 위치(옆/아래) 불일치 |
| 즐겨찾기 하트 | 일부 | 아이콘 | 있는 항목/없는 항목 혼재 |
| 텍스트 링크("자세히"/"수정") | 다수 | 밑줄 링크 | 개수 1~2개 가변 |
| 선택 체크박스 | 일부 | 좌측 | 있는 항목/없는 항목 혼재 |
| 항목 정렬(좌/우) | 2 | 화면마다 다름 | 같은 요소, 배치만 다름 |

## Phase 2 — Atomic Mapping + 분자 승격

**원자(슬롯 단위)**: `Title`, `Description`, `Meta`, `Label`(링크), `Checkbox`, `Icon`(하트)

함께 반복 등장하는 원자 묶음을 **분자 컴포넌트**로 승격하고 각 원자를 명명된 슬롯으로 표기:

| component | atomic level | 슬롯(named slots) | variants | consolidates |
| --- | --- | --- | --- | --- |
| `DataListItem` | molecule | `#title` `#description` `#meta` `#label` `#leading`(checkbox 슬롯) `#trailing`(icon 슬롯) | region(`left`/`right` 정렬) | 화면마다 재구현되던 목록 항목 |
| `DataList` | organism | (repeat of `DataListItem`) | - | 항목 컬렉션 |

## Phase 4 — DS-Based Spec Rewrite: 슬롯 아나토미 + 영역 변형

### DataListItem (슬롯 조합 컴포넌트)

> 목록의 한 항목. 원자(제목/설명/메타/라벨/체크박스/아이콘)를 명명된 슬롯으로 조합한다. `region` 변형으로 슬롯 정렬만 바뀐다(요소 구성은 동일).

**슬롯 아나토미 (region=right)** — 이미지 레퍼런스와 동일 구조:

```text
[#leading(⃞)] #title            #description ♡(#trailing)
                                            #meta
                                            #label
                                          ☑ #label
```

**슬롯 아나토미 (region=left)**:

```text
#title      #description
#label
```

- **슬롯 규칙**: `#leading`은 비어 있을 수 있음(체크박스 없는 항목 = 빈 슬롯). `#label`은 0~2개 반복 가능. `#trailing`에는 아이콘(하트 등)이 들어감.
- **변형 축**: `region`(left/right) 하나뿐 — "슬롯 구성 × 정렬"의 두 축이지만 매트릭스 대신 영역별 아나토미 2개로 문서화(18.3, 17.14 법칙 1).
- **조합 API**: 슬롯마다 자유 콘텐츠·독립 로직이 필요하므로 컴파운드/네임스페이스 방식 채택 (18.5).

```text
<DataList>
  <DataListItem region="right">
    <DataListItem.Leading><Checkbox/></DataListItem.Leading>
    <DataListItem.Title>#title</DataListItem.Title>
    <DataListItem.Description>#description <Icon.Heart/></DataListItem.Description>
    <DataListItem.Meta>#meta</DataListItem.Meta>
    <DataListItem.Label href>#label</DataListItem.Label>
  </DataListItem>
</DataList>
```

### 화면 조립 (컴포넌트 → 화면)

> 최종 화면은 컴포넌트 배치도로 표현해 원자→컴포넌트→화면 추적성을 유지.

```text
할일 목록 화면
└─ DataList (region=right)
   └─ DataListItem × N  (각 항목이 위 슬롯 스펙을 따름)
```

## Phase 5 — Governance Handoff (발췌)

- **신규 컴포넌트**: `DataListItem`(슬롯 조합) + `DataList`(컬렉션) — 화면마다 재구현되던 목록 항목을 1개 컴포넌트 패밀리로 수렴, RFC 대상
- **결정 사항**: 좌/우 버전은 별도 컴포넌트가 아니라 `region` 변형 하나로 통합 (as-is의 "별도냐 변형이냐" 모호성 해소)
- **미해결 리스크**: `#label` 최대 개수(2개?) 확정 필요, `#leading` 슬롯이 체크박스 외 다른 원자(아바타 등)도 받을지 결정 필요
