import { useContext } from "react"
import { ThemeContext } from "../contexts/theme.context"

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('Not under provider');
  return ctx;
}