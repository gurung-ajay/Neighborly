"use client"
import { Map, MessageSquare, Edit, LogOut, User, Heart } from 'lucide-react'

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
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/app/redux/features/user/userSlice"

export function AppSidebar() {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Sidebar collapsible="icon" className="border-r-2 border-green-200 bg-gradient-to-b from-green-50 to-white">
      <SidebarHeader className="flex flex-col items-center justify-center p-4 group-data-[collapsible=icon]:p-2 relative">
        <div className="w-full flex justify-end mb-2">
          <SidebarTrigger className="hover:bg-green-100 text-green-600" />
        </div>

        {/* Decorative element */}
        <div className="absolute top-2 left-2 w-8 h-8 bg-yellow-300 rounded-full opacity-20 group-data-[collapsible=icon]:hidden"></div>

        <div className="relative">
          <Avatar className="h-16 w-16 border-2 border-green-300 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
            <AvatarFallback className="bg-green-100 text-green-600">
              <User className="h-8 w-8 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white group-data-[collapsible=icon]:hidden">
            <Heart className="h-4 w-4 text-white" />
          </div>
        </div>

        <h3 className="mt-3 font-medium text-green-800 group-data-[collapsible=icon]:hidden">
          {(user && user.data?.name) || "Neighbor"}
        </h3>
        <p className="text-xs text-green-600 group-data-[collapsible=icon]:hidden">
          {(user && user.data?.email) || "neighbor@example.com"}
        </p>
      </SidebarHeader>

      <Separator className="mx-2 bg-green-200" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Map"
                  isActive={pathname === "/map"}
                  className={`hover:bg-green-100 transition-colors rounded-lg ${
                    pathname === "/map" ? "bg-green-200 text-green-800 font-medium" : ""
                  }`}
                >
                  <a href="/map" className="flex items-center">
                    <div className={`p-1.5 rounded-full ${pathname === "/map" ? "bg-green-500" : "bg-green-100"} mr-2`}>
                      <Map className={`h-4 w-4 ${pathname === "/map" ? "text-white" : "text-green-600"}`} />
                    </div>
                    <span>Map</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Chat"
                  isActive={pathname === "/chat"}
                  className={`hover:bg-green-100 transition-colors rounded-lg ${
                    pathname === "/chat" ? "bg-green-200 text-green-800 font-medium" : ""
                  }`}
                >
                  <a href="/chat" className="flex items-center">
                    <div
                      className={`p-1.5 rounded-full ${pathname === "/chat" ? "bg-green-500" : "bg-green-100"} mr-2`}
                    >
                      <MessageSquare className={`h-4 w-4 ${pathname === "/chat" ? "text-white" : "text-green-600"}`} />
                    </div>
                    <span>Chat</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700 font-medium">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Edit Profile"
                  isActive={pathname === "/edit_profile"}
                  className={`hover:bg-green-100 transition-colors rounded-lg ${
                    pathname === "/edit_profile" ? "bg-green-200 text-green-800 font-medium" : ""
                  }`}
                >
                  <a href="/edit_profile" className="flex items-center">
                    <div
                      className={`p-1.5 rounded-full ${
                        pathname === "/edit_profile" ? "bg-green-500" : "bg-green-100"
                      } mr-2`}
                    >
                      <Edit
                        className={`h-4 w-4 ${pathname === "/edit_profile" ? "text-white" : "text-green-600"}`}
                      />
                    </div>
                    <span>Edit Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Logout"
                  onClick={() => handleLogout()}
                  className="hover:bg-red-50 text-red-500 transition-colors rounded-lg"
                >
                  <a href="/" className="flex items-center">
                    <div className="p-1.5 rounded-full bg-red-100 mr-2">
                      <LogOut className="h-4 w-4 text-red-500" />
                    </div>
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 text-xs text-center text-green-600">
        <div className="group-data-[collapsible=icon]:hidden">
          <div className="flex justify-center space-x-2 mb-2">
            {/* Tiny houses */}
            <div className="relative scale-50">
              <div className="w-8 h-8 bg-red-400 rounded-t-lg"></div>
              <div className="w-8 h-6 bg-red-500"></div>
              <div className="absolute top-0 left-0 right-0 h-4 bg-red-300 transform -translate-y-2 rotate-45 origin-bottom-left"></div>
              <div className="absolute top-0 right-0 h-4 w-4 bg-red-300 transform -translate-y-2 rotate-45 origin-bottom-right"></div>
            </div>
            <div className="relative scale-50">
              <div className="w-8 h-8 bg-blue-400 rounded-t-lg"></div>
              <div className="w-8 h-6 bg-blue-500"></div>
              <div className="absolute top-0 left-0 right-0 h-4 bg-blue-300 transform -translate-y-2 rotate-45 origin-bottom-left"></div>
              <div className="absolute top-0 right-0 h-4 w-4 bg-blue-300 transform -translate-y-2 rotate-45 origin-bottom-right"></div>
            </div>
          </div>
          Neighborly © {new Date().getFullYear()}
        </div>
      </SidebarFooter>

      <SidebarRail className="bg-green-100 border-r-2 border-green-200" />
    </Sidebar>
  )
}

