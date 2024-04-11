"use client"

import Link from "next/link"
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleUser,
  Package2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ApiKeys } from "@/components/api-keys"
import { SideBar } from "@/components/side-bar"
import { MobileSideBar } from "@/components/mobile-side-bar"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ThemePickerHeader } from "@/components/theme-picker-header"

interface Props {
    children: JSX.Element
}
export default function DashboardLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(true)

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSideBarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <div 
        className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] ${sideBarOpen ? "lg:grid-cols-[280px_1fr]" : "lg:grid-cols-[max-content_1fr]" }`}
      >
        {
          sideBarOpen ? 
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2 ">
              <div className="flex h-14 items-center justify-around border-b px-4 lg:h-[60px]">
                <Link href="/" className="flex items-center gap-2 font-semibold hover:text-primary">
                  <Package2 className="h-6 w-6" />
                  <span className="">PagBttis</span>
                </Link>
                <div className="space-x-4">
                  <Button variant="outline" size="icon" className="ml-auto h-8 w-8 hover:border-2 hover:border-primary hover:text-primary">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                  </Button>
                  <Button variant="outline" size="icon" className="ml-auto h-8 w-8 hover:border-2 hover:border-primary hover:text-primary" onClick={() => {
                    handleSideBarOpen()
                  }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="">
                <SideBar open={sideBarOpen}></SideBar>
              </div>
            </div>
          </div> 
          :
          <div className="hidden border-r bg-muted/40 md:block w-[4rem]">
            <div className="flex h-full max-h-screen flex-col gap-2 ">
              <div className="flex h-14 items-center justify-around border-b px-4 lg:h-[60px]">
                <div className="space-x-4">
                  <Button variant="outline" size="icon" className="ml-auto h-8 w-8 hover:border-2 hover:border-primary hover:text-primary" onClick={() => {
                    handleSideBarOpen()
                  }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="">
                <SideBar open={sideBarOpen}></SideBar>
              </div>
            </div>
          </div> 
        }
        <div className="flex flex-col">
          <header className="flex h-14 items-center lg:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <MobileSideBar></MobileSideBar>
            <DropdownMenu onOpenChange={handleToggle}>
              <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                <div className="flex items-center space-x-4 px-4 rounded-lg hover:bg-secondary">
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-6 w-6" />
                  </Button>
                  <Label>Olá</Label>
                  {
                    isOpen ? 
                    <ChevronUp className="h-6 w-6"/> 
                    : 
                    <ChevronDown className="h-6 w-6" />
                  }
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ThemePickerHeader></ThemePickerHeader>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <div className="gap-4 p-4 lg:gap-6 lg:p-6">
            <ApiKeys></ApiKeys>
          </div>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
          </main>
        </div>
      </div>
    </>
  )
}