use std::path::PathBuf;

#[tauri::command]
fn get_startup_file() -> Option<String> {
  let arg = std::env::args().nth(1)?;
  let path = PathBuf::from(arg);
  let absolute_path = if path.is_absolute() {
    path
  } else {
    let base_dir = std::env::var("INIT_CWD")
      .map(PathBuf::from)
      .or_else(|_| std::env::current_dir())
      .ok()?;
    
    base_dir.join(path)
  };

  Some(absolute_path.to_string_lossy().to_string())
}

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
  std::fs::read_to_string(PathBuf::from(path))
    .map_err(|err| err.to_string())
}

#[tauri::command]
fn save_file(path: String, content: String) -> Result<(), String> {
  std::fs::write(path, content)
    .map_err(|err| err.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
          get_startup_file,
          read_file,
          save_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
