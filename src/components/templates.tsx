"use client"

import { useState, useEffect } from "react"
import { FileCode, Wand2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockApi, Template } from "@/lib/mock-data"

interface TemplatesProps {
  className?: string
}

const categoryColors = {
  Business: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  Leadership: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  Personal: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Educational: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  Storytelling: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400"
}

export function Templates({ className }: TemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const data = await mockApi.getTemplates()
      setTemplates(data)
    } catch (error) {
      console.error("Failed to load templates:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyPrompt = async (template: Template) => {
    try {
      await navigator.clipboard.writeText(template.prompt)
      setCopiedId(template.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error("Failed to copy prompt:", error)
    }
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
          Content Templates
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Pre-built prompts to transform your ideas into engaging content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedTemplate(template)}
          >
            {/* Template Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <FileCode className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    categoryColors[template.category as keyof typeof categoryColors] ||
                    "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  {template.category}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  copyPrompt(template)
                }}
              >
                {copiedId === template.id ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Template Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {template.name}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {template.description}
              </p>
            </div>

            {/* Template Preview */}
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3">
                {template.prompt}
              </p>
            </div>

            {/* Use Template Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={(e) => {
                e.stopPropagation()
                // In a real app, this would navigate to new post with template selected
                console.log("Using template:", template.name)
              }}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          </div>
        ))}
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedTemplate.name}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTemplate(null)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {/* Category and Description */}
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                      categoryColors[selectedTemplate.category as keyof typeof categoryColors] ||
                      "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {selectedTemplate.category}
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {selectedTemplate.description}
                  </p>
                </div>

                {/* Full Prompt */}
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Template Prompt
                  </h3>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                    <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                      {selectedTemplate.prompt}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button
                    onClick={() => copyPrompt(selectedTemplate)}
                    variant="outline"
                    className="flex-1"
                  >
                    {copiedId === selectedTemplate.id ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Prompt
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      // In a real app, this would navigate to new post with template selected
                      console.log("Using template:", selectedTemplate.name)
                      setSelectedTemplate(null)
                    }}
                    className="flex-1"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
