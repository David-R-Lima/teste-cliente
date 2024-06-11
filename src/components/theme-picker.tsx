"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemePicker() {
    const { setTheme, theme } = useTheme()
    return (
    <>
        {theme === "light" ? (
            <Moon 
                className="w-9 h-9 p-1 rounded-lg hover:bg-muted hover:text-primary hover:cursor-pointer" 
                onClick={() => setTheme("dark")}
            />
        ) : (
            <Sun 
                className="w-9 h-9 p-1 rounded-lg hover:bg-muted hover:text-primary hover:cursor-pointer" 
                onClick={() => setTheme("light")}
            />
        )}
    </>
);
}