"use client"

import { useState, useEffect } from "react"
import { Linkedin, Twitter, Link, Unlink, Settings as SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockApi, SocialIntegration, mockUser } from "@/lib/mock-data"

interface SettingsProps {
  className?: string
}

export function Settings({ className }: SettingsProps) {
  const [integrations, setIntegrations] = useState<SocialIntegration[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<string | null>(null)

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    try {
      const data = await mockApi.getSocialIntegrations()
      setIntegrations(data)
    } catch (error) {
      console.error("Failed to load integrations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (platform: 'linkedin' | 'twitter') => {
    setConnecting(platform)
    try {
      const updatedIntegration = await mockApi.connectSocialAccount(platform)
      setIntegrations(integrations.map(i =>
        i.platform === platform ? updatedIntegration : i
      ))
    } catch (error) {
      console.error(`Failed to connect ${platform}:`, error)
    } finally {
      setConnecting(null)
    }
  }

  const handleDisconnect = async (platform: 'linkedin' | 'twitter') => {
    // Mock disconnect functionality
    setIntegrations(integrations.map(i =>
      i.platform === platform
        ? { ...i, isConnected: false, accountName: undefined }
        : i
    ))
  }

  const platformIcons = {
    linkedin: Linkedin,
    twitter: Twitter
  }

  const platformColors = {
    linkedin: "text-blue-600",
    twitter: "text-blue-400"
  }

  if (loading) {
    return (
      <div className={`max-w-4xl mx-auto p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Settings
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your account and social media connections
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <SettingsIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Profile
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className="text-lg">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                {mockUser.name}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {mockUser.email}
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Integrations */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Social Media Accounts
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Connect your social media accounts to enable one-click publishing
          </p>

          <div className="space-y-4">
            {integrations.map((integration) => {
              const Icon = platformIcons[integration.platform]
              const isConnecting = connecting === integration.platform

              return (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-6 w-6 ${platformColors[integration.platform]}`} />
                    <div>
                      <h3 className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                        {integration.platform}
                      </h3>
                      {integration.isConnected && integration.accountName ? (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          Connected as {integration.accountName}
                        </p>
                      ) : (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Not connected
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    {integration.isConnected ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(integration.platform)}
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        <Unlink className="h-4 w-4 mr-2" />
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleConnect(integration.platform)}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Link className="h-4 w-4 mr-2" />
                            Connect
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Publishing Preferences */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Publishing Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                  Auto-publish to all connected platforms
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Automatically publish to all connected social media accounts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-yellow-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                  Save drafts automatically
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Automatically save your work as you type
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-red-200 dark:border-red-800 p-6">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
            Danger Zone
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                  Delete Account
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
