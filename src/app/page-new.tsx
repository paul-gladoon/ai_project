"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { NewPost } from "@/components/new-post"
import { RecentPosts } from "@/components/recent-posts"
import { Templates } from "@/components/templates"
import { Settings } from "@/components/settings"

export default function Home() {
  const [activeNavItem, setActiveNavItem] = useState("new-post")

  const renderContent = () => {
    switch (activeNavItem) {
      case "new-post":
        return <NewPost />
      case "recent-posts":
        return <RecentPosts />
      case "templates":
        return <Templates />
      case "settings":
        return <Settings />
      default:
        return <NewPost />
    }
  }

  return (
    <AppLayout
      activeNavItem={activeNavItem}
      onNavItemChange={setActiveNavItem}
    >
      {renderContent()}
    </AppLayout>
  )
}
