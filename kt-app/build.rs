fn main() {
    let webui_var = std::env::var("KT_WEBUI_DIR");
    if webui_var.is_err() {
        panic!("KT_WEBUI_DIR environment variable not set, Try running make");
    }

    // Rebuild if the webui directory changes
    println!("cargo:rerun-if-changed={}", webui_var.unwrap());
    println!("cargo:rerun-if-env-changed=KT_WEBUI_DIR");

    tauri_build::build();
}
