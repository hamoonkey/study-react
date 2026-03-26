# Reactを学ぶ

## 計画

- [ ] React
  - [ ] Hook
- [x] Routing
  - [x] なにがある？
    - React Router一択
  - [x] どれを使っている？
    - "react-router-dom": "^7.2.0"
  - [x] 使い方
    - [x] Declarative mode
    - [x] Data mode
- [ ] Store
  - [x] なにがある？
    - Redux
    - Zustand
    - Jotai
  - [x] どれを使っている？
    - "@reduxjs/toolkit": "^2.6.0"
  - [ ] 使い方
    - [ ] Redux Core
    - [ ] Redux Toolkit
    - [ ] Redux-React
- [ ] Style
  - [ ] どれを使っている？
    - Tailwind
    - Styled-Components
- [ ] i18n

## その他

- PWA2と合わせるため、`nvm use 22`
- Framework modeは使っていないので、後回し

## 7. 真に理解するための実践的アプローチ（おすすめ）
### ✅ ステップ1：UIを書かずに設計する

画面の状態遷移を enum / 状態図で書く
UIコードは後回し

### ✅ ステップ2：「状態→UI」を紙に書く

状態AならこのUI
状態BならこのUI

if / switch で書けるレベルまで落とす。
### ✅ ステップ3：「この state 本当に要る？」を自問する

UIの都合だけの state はほぼ不要
派生可能なものは持たない

### ✅ ステップ4：useEffect を疑う

「これは state で表現できないか？」
「副作用は本当に必要か？」

### UIを状態機械（State Machine）として考える
