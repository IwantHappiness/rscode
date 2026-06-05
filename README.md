# rscode
Lightweight VSCode alternative on Tauri

## Tech Stack
- **Frontend:** React + TypeScript + CodeMirror 6
- **Backend:** Rust (Tauri)

## Launching (dev)
`pnpm tauri dev`

## Building (release)
`pnpm tauri build`

Binary in @/src-tauri/target/release/bundle/appimage/rscode.AppDir/usr/bin/rscode

## Todo
- [x] Editor
- [x] Opening files
- [x] Сохранение
- [x] Менеджер вкладок с индикатором сохранения
- [x] Мультивкладочность (закрытие, добавление вкладок)
- [x] Соответствие форматтера codemirror текущему языку
- [ ] Autocomplete