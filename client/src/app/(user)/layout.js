import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from 'next/headers'

const  DashboardLayout= ({children}) => {
    // This helps persist the sidebar state between page loads
    const cookieStore = cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <main className="">{children}</main>
      </SidebarProvider>
    </div>

  )
}

export default DashboardLayout