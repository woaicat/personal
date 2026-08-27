# AI 情报日期切换视觉 QA（历史记录）

- Source visual truth: `/var/folders/y8/2ksmwl8100q83bcd3sglr9hw0000gn/T/codex-clipboard-aeadafcf-294f-4e17-b5a1-97e17e3e2791.png`
- Desktop implementation screenshot: `/Users/gaojiaxuan/.codex/visualizations/2026/07/10/019f4afa-6785-7930-9b0a-ff23a6bad1c3/ai-news-implementation-desktop-viewport.png`
- Mobile implementation screenshot: `/Users/gaojiaxuan/.codex/visualizations/2026/07/10/019f4afa-6785-7930-9b0a-ff23a6bad1c3/ai-news-implementation-mobile.png`
- Viewports: desktop 1452 × 1310; mobile 390 × 844
- States: latest edition `2026-07-10`; oldest edition `2026-07-03`; desktop and mobile responsive layouts

## Full-view comparison evidence

The reference and desktop implementation were opened in the same comparison pass. The implementation preserves the existing half-width AI intelligence card, dark green and orange visual system, large section title, compact numbered rows, and right-aligned collection date. The new arrows sit immediately around the date without increasing the card footprint or changing the 1:1 relationship with the adjacent column.

## Focused region comparison evidence

The reference is already a focused crop of the AI intelligence panel, so an additional crop was not needed. The desktop capture keeps the complete AI intelligence panel readable inside the lower two-column layout; the mobile capture verifies the controls, date, rows, and adjacent column at the responsive breakpoint.

## Findings

- No actionable P0/P1/P2 findings remain.
- Fonts and typography: the date keeps the existing numeric face and weight; arrow controls do not compete with the title or item hierarchy.
- Spacing and layout rhythm: the date control stays compact on desktop and expands to a balanced three-column row on mobile; the page has no horizontal overflow.
- Colors and visual tokens: controls reuse the existing deep green, orange focus state, white surface, hairline border, and disabled palette.
- Image quality and asset fidelity: this change introduces no raster assets; chevrons come from the project's existing icon library and remain sharp at both viewports.
- Copy and content: the latest and archived editions retain source, publication date, tag, title, summary, and destination URL.
- Accessibility: native buttons expose clear labels, disabled states, focus rings, and controlled-list relationships. The date is announced as a polite status update. Reduced-motion users receive an intentional animation-free transition.

## Interaction checks

- Latest edition is selected by default; the left/newer button is disabled and the right/older button is enabled.
- Moving to `2026-07-03` replaces the list with its two archived items; the right/older button becomes disabled and the left/newer button becomes enabled.
- Returning to `2026-07-10` restores its three current items and the initial disabled state.
- Normal-motion styles load directional 360 ms slide-and-fade keyframes for both the date and list. The verification browser advertises `prefers-reduced-motion: reduce`, so its rendered transition correctly suppresses animation.
- Desktop and mobile layouts have no horizontal overflow.
- Browser console errors/warnings: none.

## Comparison history

1. Initial implementation comparison: no actionable P0/P1/P2 mismatch was found. The control fits the existing visual language and the user-requested interaction works at both breakpoints, so no visual correction loop was required.

## Implementation checklist

- [x] Date navigation arrows on both sides
- [x] Latest-first default selection
- [x] Newer/older direction and boundary disabling
- [x] Date-specific intelligence groups
- [x] Synchronized directional motion
- [x] Reduced-motion fallback
- [x] Desktop and mobile responsive verification
- [x] Data-maintenance validation and documentation

final result: passed

---

# Agent 课程列表页视觉 QA

## Source visual truth

- `/var/folders/y8/2ksmwl8100q83bcd3sglr9hw0000gn/T/codex-clipboard-cb451fbe-50a7-4bbc-834d-394ac4630953.png`
- Source pixels: 1016 × 1551; reference state: 课程列表页，0 / 14 课。

## Implementation evidence

- Top focused viewport: `/tmp/course-list-qa-top.png`
- Bottom focused viewport: `/tmp/course-list-qa-end.png`
- CSS viewport: 1016 × 720; device scale factor: 1; implementation page height: 1549 px; horizontal overflow: none.
- The browser full-page capture reports 1016 × 1551 but duplicates a scrolled tile in the exported raster, so it was not used as visual evidence. Top and bottom viewport captures were used instead.

## State and interactions tested

- 0 / 14 course progress state compared with the reference.
- “开始学习” opens lesson 01; lesson pages mark a lesson as in progress on entry and completed via “标记完成”.
- After completing lesson 01, the list showed “已完成 1 / 14 课” and “继续学习” linked to lesson 02.
- Homepage “其他” hover exposes “媒体推荐” and “ACT”.
- Homepage “从0-1” hover exposes “从0到1设计一个Agent”; the course link targets a new tab.
- Course list and homepage were checked at 390 × 844; neither had page-level horizontal overflow.
- Browser console had no runtime errors; only development-mode Fast Refresh warnings appeared during source edits.

## Findings

- No P0, P1, or P2 visual findings remain.
- Illustration areas are intentionally blank per the user request. The layout reserves the same visual space for future supplied assets; no placeholder illustration or CSS drawing was added.
- The implementation keeps the reference’s light background, blue accent, compact lesson rows, four-stage structure, progress block, output pills, and status chips. Copy is adapted to the confirmed virtual teaching case rather than copied as a real platform integration.

## Comparison history

1. Initial implementation was 1916 px tall at the reference width; stage rows and compact stage blocks were tightened to match the reference reading density.
2. The first dropdown implementation used native `details`; it supported click but could not reveal a closed menu on hover. It was replaced with a keyboard-focusable client menu supporting hover, focus, and click.
3. A concurrent `next dev` and `next build` temporarily corrupted the dev `.next` runtime. The dev server was restarted, the clean `localhost` origin was used for the final 0 / 14 capture, and the course page rendered normally.

## Implementation checklist

- [x] Course header and progress block
- [x] Four stages and 14 lessons
- [x] Blank illustration space reserved
- [x] Responsive layout without page overflow
- [x] Hover, focus, and click dropdown behavior
- [x] Local progress and lesson navigation
- [x] Typecheck, lint, content check, and production build

## Follow-up Polish

- P3: Replace the reserved blank illustration spaces with the user-provided illustrations when available.

final result: passed

## Agent course navigation follow-up

- Added a desktop hover bridge and 180 ms close delay so the pointer can travel from a top-level menu to its submenu without collapsing it.
- The full homepage header is now 63 px including the bottom border; mobile navigation remains content-driven.
- Rechecked the diagonal mouse path into “其他 → 媒体推荐”; the submenu stayed visible. Rechecked 390 px mobile layout and mobile submenu expansion; both had no horizontal overflow.

# Agent 第一课详情页视觉 QA（当前迭代）

## Source visual truth

- `/Users/gaojiaxuan/Downloads/ChatGPT Image 2026年8月27日 21_28_13.png`
- Source pixels: 1448 × 1086; reference state: 第一课详情页。

## Implementation evidence

- Desktop top viewport: `/tmp/jiaxuan-agent-qa/agent-lesson-implementation-top-1448x1086.png`
- Desktop middle viewport: `/tmp/jiaxuan-agent-qa/agent-lesson-implementation-middle-1448x1086.png`
- Desktop bottom viewport: `/tmp/jiaxuan-agent-qa/agent-lesson-implementation-bottom-1448x1086.png`
- Mobile viewport: `/tmp/jiaxuan-agent-qa/agent-lesson-implementation-mobile-390x844.png`
- Side-by-side comparison input: `/tmp/jiaxuan-agent-qa/agent-lesson-comparison.png`
- Desktop CSS viewport and implementation capture: 1448 × 1086; device scale factor: 1; page height: 1915 px.
- Mobile CSS viewport and implementation capture: 390 × 844; device scale factor: 1; body and document scroll width: 390 px.

## State and interactions tested

- First lesson route `/zero-to-one/agent/01`, title “第 1 课 认识智能体”。
- Right-side outline anchors move to the corresponding section; the next-lesson CTA opens `/zero-to-one/agent/02`.
- Non-first lesson routes remain intentionally blank until their detail designs are confirmed.
- Desktop and mobile browser-rendered states were checked; browser console errors: none.

## Full-view comparison evidence

The source screenshot and the implementation top capture were opened together in the side-by-side comparison input. The implementation keeps the reference’s long-form reading structure, left content/right outline split, section order, bottom course-output area, and reserved whitespace. The user-requested changes are intentional: the detail page uses the first lesson title “认识智能体”, the content rhythm is looser to increase page height, and the blue accent is mapped to the course list’s green family.

## Focused region comparison evidence

- Top region: back link, title, metadata, key-point list, and first concept split match the reference hierarchy; the model/harness/Agent nodes use consistent public linear icons.
- Middle region: the core-capability flow, flexibility spectrum, comparison table, and checklist are separated with larger vertical gaps so text does not crowd adjacent blocks.
- Bottom region: attention roles, trend cards, course output, next-lesson CTA, and sticky outline preserve the reference’s closing rhythm while using the green token.
- Mobile region: the two-column content collapses to one column, the outline moves below the content, and the table/spectrum remain contained without page-level horizontal overflow.

## Findings

- No actionable P0/P1/P2 findings remain.
- Fonts and typography: the existing Space Grotesk plus Chinese fallbacks keep the compact editorial feel; headings, metadata, body copy, and outline use distinct weights and line heights.
- Spacing and layout rhythm: section padding is intentionally more generous than the source to address the user’s concern about cramped blocks; the desktop page is 1915 px tall at the reference width.
- Colors and visual tokens: blue source accents are replaced with `#318355`, `#256743`, `#edf8f0`, and `#f6fbf7`, matching the green status language already present in the course list.
- Image quality and asset fidelity: the source contains icons rather than required raster illustrations. The implementation uses the existing `lucide-react` public icon library for standard visual marks and does not add fake CSS or SVG artwork.
- Copy and content: the first lesson title is corrected to “认识智能体”; the page copy follows the supplied screenshot’s lesson outline.
- Accessibility and interaction: semantic headings, table headers, anchor navigation, keyboard-focusable links, aria labels, and visible focus states are present; mobile has no page-level horizontal overflow.

## Comparison history

1. Initial detail-page implementation was intentionally blank because the detail design had not yet been confirmed.
2. After the user supplied the first-lesson screenshot, the blank route was replaced only for lesson 01 with the screenshot-led long-form layout. Other lesson routes remain blank.
3. The first pass used reserved empty visual slots; after the user clarified that the visual marks are icons, those slots were replaced with consistent Lucide icons. The final desktop and mobile captures show no P0/P1/P2 mismatch requiring another correction loop.

## Implementation checklist

- [x] First lesson detail page at `/zero-to-one/agent/01`
- [x] Correct title: “认识智能体”
- [x] Reference-led long-form sections and right-side outline
- [x] Increased spacing between content blocks
- [x] Green accent tokens aligned with the course list
- [x] Public linear icons for model, harness, Agent, flow, and trend cards
- [x] Outline anchors and next-lesson navigation
- [x] Desktop and mobile responsive verification
- [x] Browser console and horizontal-overflow checks

final result: passed
