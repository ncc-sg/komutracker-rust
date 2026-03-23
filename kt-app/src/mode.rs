#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum AppMode {
    Dev,
    Release,
}

impl AppMode {
    pub fn is_dev(self) -> bool {
        matches!(self, AppMode::Dev)
    }
}

pub fn current() -> AppMode {
    if let Ok(mode) = std::env::var("KT_APP_MODE") {
        let mode = mode.to_ascii_lowercase();
        if mode == "dev" || mode == "development" {
            return AppMode::Dev;
        }
        if mode == "release" || mode == "prod" || mode == "production" {
            return AppMode::Release;
        }
    }

    if cfg!(debug_assertions) {
        AppMode::Dev
    } else {
        AppMode::Release
    }
}
