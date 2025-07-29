"use client"

import { useState, useEffect } from "react"
import { Calendar, Edit, Trash2, Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockApi, Post } from "@/lib/mock-data"

interface RecentPostsProps {
  className?: string
}

const statusColors = {
  draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  published: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
}

export function RecentPosts({ className }: RecentPostsProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await mockApi.getPosts()
      setPosts(data)
    } catch (error) {
      console.error("Failed to load posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await mockApi.deletePost(postId)
        setPosts(posts.filter(p => p.id !== postId))
      } catch (error) {
        console.error("Failed to delete post:", error)
      }
    }
  }

  const handlePublish = async (postId: string) => {
    try {
      const updatedPost = await mockApi.publishPost(postId, ["linkedin", "twitter"])
      setPosts(posts.map(p => p.id === postId ? updatedPost : p))
    } catch (error) {
      console.error("Failed to publish post:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (loading) {
    return (
      <div className={`max-w-7xl mx-auto p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 ${className}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Recent Posts
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your content across all platforms
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
            <Edit className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            No posts yet
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Create your first post to see it here
          </p>
          <Button>Create New Post</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[post.status]
                  }`}
                >
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPost(post)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Post Content Preview */}
              <div className="mb-4">
                <p className="text-zinc-800 dark:text-zinc-200 text-sm line-clamp-3">
                  {post.rawContent}
                </p>
              </div>

              {/* Post Image */}
              {post.imageUrl && (
                <div className="mb-4">
                  <div className="w-full h-32 bg-zinc-100 dark:bg-zinc-800 rounded-lg bg-cover bg-center"
                       style={{ backgroundImage: `url(${post.imageUrl})` }}>
                  </div>
                </div>
              )}

              {/* Post Footer */}
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                {post.publishedAt && (
                  <div className="flex items-center space-x-1">
                    <ExternalLink className="h-3 w-3" />
                    <span>Published</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {post.status === "draft" && (
                <Button
                  onClick={() => handlePublish(post.id)}
                  size="sm"
                  className="w-full"
                >
                  Publish Now
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Post Details
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedPost(null)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {/* Raw Content */}
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Original Content
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                    {selectedPost.rawContent}
                  </p>
                </div>

                {/* LinkedIn Version */}
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    LinkedIn Version
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
                      {selectedPost.formattedContent.linkedin}
                    </div>
                  </div>
                </div>

                {/* Twitter Version */}
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Twitter Version
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
                      {selectedPost.formattedContent.twitter}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
