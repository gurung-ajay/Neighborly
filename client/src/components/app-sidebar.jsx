"use client"
import { Map, MessageSquare, Home, Settings, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { useDispatch } from "react-redux"
import { logout } from "@/app/redux/features/user/userSlice"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Edit } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col items-center justify-center p-4 group-data-[collapsible=icon]:p-2">
      <div className="w-full flex justify-end mb-2">
          <SidebarTrigger />
        </div>
        <Avatar className="h-16 w-16 border-2 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 transition-all duration-200">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
          <AvatarFallback>
            <User className="h-8 w-8 group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4" />
          </AvatarFallback>
        </Avatar>
        <h3 className="mt-2 font-medium group-data-[collapsible=icon]:hidden">{user && user.data?.name}</h3>
        <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">{user && user.data?.email}</p>
      </SidebarHeader>
      <Separator className="mx-2" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Map" isActive={pathname === "/map"}>
                  <a href="/map">
                    <Map />
                    <span>Map</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Chat" isActive={pathname === "/chat"}>
                  <a href="/chat">
                    <MessageSquare />
                    <span>Chat</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Edit Profile">
                  <a href="/edit_profile">
                    <Edit />
                    <span>Edit Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout" onClick={() => handleLogout()}>
                  <a href="/">
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-center text-muted-foreground"></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

