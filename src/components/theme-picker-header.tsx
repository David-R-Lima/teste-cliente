"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemePickerHeader() {
    const { setTheme, theme } = useTheme()
    return (
        <div className="flex flex-row justify-around w-full p-1 rounded-lg space-x-1">
            <Sun className={`w-9 h-9 p-2 rounded-lg ${theme === "light" ? "bg-muted text-primary" : ""} hover:bg-muted hover:text-primary hover:cursor-pointer`} onClick={() => {
                setTheme("light")
            }}/>
            <Moon className={`w-9 h-9 p-2 rounded-lg ${theme === "dark" ? "bg-muted text-primary" : ""} hover:bg-muted hover:text-primary hover:cursor-pointer`} onClick={() => {
                setTheme("dark")
            }}/>
        </div>
    )
}