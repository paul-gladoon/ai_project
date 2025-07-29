"use client"

import { useState } from "react"
import Image from "next/image"
import { Upload, Wand2, Linkedin, Twitter, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { mockApi, Template, mockTemplates } from "@/lib/mock-data"

interface NewPostProps {
  className?: string
}

export function NewPost({ className }: NewPostProps) {
  const [rawContent, setRawContent] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(mockTemplates[0])
  const [generatedContent, setGeneratedContent] = useState<{
    linkedin: string
    twitter: string
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleGenerate = async () => {
    if (!rawContent.trim()) return

    setIsGenerating(true)
    try {
      const content = await mockApi.generateContent(rawContent, selectedTemplate)
      setGeneratedContent(content)
    } catch (error) {
      console.error("Failed to generate content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePublish = async () => {
    if (!generatedContent) return

    setIsPublishing(true)
    try {
      // Create post with generated content
      await mockApi.createPost(rawContent, imageFile ? URL.createObjectURL(imageFile) : undefined)

      // Reset form
      setRawContent("")
      setGeneratedContent(null)
      setImageFile(null)

      // In a real app, you'd show a success toast here
      console.log("Post created successfully!")
    } catch (error) {
      console.error("Failed to create post:", error)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 ${className}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Create New Post
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Transform your ideas into engaging social media content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Your Ideas
            </h2>

            {/* Content Input */}
            <div className="space-y-4">
              <Textarea
                placeholder="Dump your raw ideas here... What's on your mind?"
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                className="min-h-[200px] resize-none"
              />

              {/* Image Upload */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </span>
                  </Button>
                </label>
                {imageFile && (
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {imageFile.name}
                  </span>
                )}
              </div>
            </div>

            {/* Template Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Content Style
              </label>
              <select
                value={selectedTemplate.id}
                onChange={(e) => {
                  const template = mockTemplates.find(t => t.id === e.target.value)
                  if (template) setSelectedTemplate(template)
                }}
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                {mockTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {selectedTemplate.description}
              </p>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!rawContent.trim() || isGenerating}
              className="w-full mt-6"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          {generatedContent ? (
            <>
              {/* LinkedIn Preview */}
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    LinkedIn Preview
                  </h3>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  {imageFile && (
                    <div className="relative w-full h-48 rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={URL.createObjectURL(imageFile)}
                        alt="Post image"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
                    {generatedContent.linkedin}
                  </div>
                </div>
              </div>

              {/* Twitter Preview */}
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Twitter Preview
                  </h3>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  {imageFile && (
                    <div className="relative w-full h-48 rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={URL.createObjectURL(imageFile)}
                        alt="Post image"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
                    {generatedContent.twitter}
                  </div>
                </div>
              </div>

              {/* Publish Button */}
              <Button
                onClick={handlePublish}
                disabled={isPublishing}
                size="lg"
                className="w-full"
              >
                {isPublishing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Post
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Wand2 className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Ready to Generate
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Enter your content ideas and click &quot;Generate Content&quot; to see platform-specific previews
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
