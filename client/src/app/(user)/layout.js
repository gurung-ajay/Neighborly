import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const  DashboardLayout= ({children}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout