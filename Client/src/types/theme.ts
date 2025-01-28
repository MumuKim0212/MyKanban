export type Theme = "light" | "dark" | "default"

export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

