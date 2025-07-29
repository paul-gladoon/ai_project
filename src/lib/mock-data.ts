// Mock data for frontend development

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  userId: string;
  rawContent: string;
  formattedContent: {
    linkedin: string;
    twitter: string;
  };
  imageUrl?: string;
  status: 'draft' | 'pending' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
}

export interface SocialIntegration {
  id: string;
  userId: string;
  platform: 'linkedin' | 'twitter';
  isConnected: boolean;
  accountName?: string;
}

// Mock user data
export const mockUser: User = {
  id: "user-1",
  name: "John Entrepreneur",
  email: "john@startup.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
};

// Mock posts data
export const mockPosts: Post[] = [
  {
    id: "post-1",
    userId: "user-1",
    rawContent: "Just closed our Series A funding! Excited to scale our AI-powered platform to help more entrepreneurs.",
    formattedContent: {
      linkedin: "🎉 Thrilled to announce that we've successfully closed our Series A funding round!\n\nThis milestone represents more than just capital - it's validation of our mission to democratize AI-powered business solutions for entrepreneurs worldwide.\n\nWhat's next?\n✅ Expanding our engineering team\n✅ Enhancing our AI capabilities\n✅ Scaling to serve 10x more customers\n\nA huge thank you to our investors, team, and early customers who believed in our vision. The journey is just beginning! 🚀\n\n#StartupLife #SeriesA #AI #Entrepreneurship",
      twitter: "🎉 We just closed our Series A! \n\nExcited to scale our AI platform and help 10x more entrepreneurs build amazing businesses.\n\nThank you to our incredible investors, team, and customers who made this possible! 🚀\n\n#StartupLife #SeriesA #AI"
    },
    status: "published",
    createdAt: "2025-07-29T10:00:00Z",
    updatedAt: "2025-07-29T10:30:00Z",
    publishedAt: "2025-07-29T10:30:00Z"
  },
  {
    id: "post-2",
    userId: "user-1",
    rawContent: "Working on product-market fit. Learning that customer feedback is gold.",
    formattedContent: {
      linkedin: "💡 Product-Market Fit Insights After 6 Months\n\nHere's what I've learned about finding PMF:\n\n1️⃣ Customer feedback isn't just helpful - it's GOLD\n2️⃣ Build fast, measure faster, pivot when needed\n3️⃣ Talk to users daily, not weekly\n4️⃣ Data tells you what, conversations tell you why\n\nThe biggest mistake? Building in isolation. The market will teach you more in a week than a year of assumptions.\n\nWhat's your #1 PMF lesson? Drop it in the comments 👇\n\n#ProductMarketFit #StartupLessons #CustomerFeedback #BuildInPublic",
      twitter: "💡 6 months into finding product-market fit:\n\nBiggest lesson: Customer feedback = gold 🥇\n\nStop building in isolation. The market teaches you more in 1 week than 1 year of assumptions.\n\nWhat's your #1 PMF lesson? 👇\n\n#PMF #StartupLessons"
    },
    status: "draft",
    createdAt: "2025-07-29T08:00:00Z",
    updatedAt: "2025-07-29T09:00:00Z"
  },
  {
    id: "post-3",
    userId: "user-1",
    rawContent: "AI is changing everything. But humans still matter most in business.",
    formattedContent: {
      linkedin: "🤖 AI is transforming every industry, but here's what hasn't changed:\n\nHuman relationships still drive business success.\n\nYes, AI can:\n✅ Automate processes\n✅ Analyze data faster\n✅ Generate content\n✅ Optimize operations\n\nBut it can't:\n❌ Build genuine trust\n❌ Understand nuanced emotions\n❌ Create authentic connections\n❌ Make ethical decisions in grey areas\n\nThe future belongs to leaders who leverage AI while doubling down on human-centered leadership.\n\nTechnology amplifies capability. Humanity amplifies impact.\n\nThoughts? 💭\n\n#AI #Leadership #HumanConnection #FutureOfWork",
      twitter: "🤖 AI is transforming everything, but...\n\nHuman relationships still drive business success.\n\nAI amplifies capability.\nHumanity amplifies impact.\n\nThe future belongs to leaders who use both. 🚀\n\n#AI #Leadership #FutureOfWork"
    },
    status: "pending",
    createdAt: "2025-07-28T15:00:00Z",
    updatedAt: "2025-07-28T16:00:00Z"
  }
];

// Mock templates data
export const mockTemplates: Template[] = [
  {
    id: "template-1",
    name: "Announcement Post",
    description: "Perfect for sharing company news, milestones, and achievements",
    prompt: "Transform this into an engaging announcement post that builds excitement and includes relevant emojis, hashtags, and a clear call-to-action.",
    category: "Business"
  },
  {
    id: "template-2",
    name: "Thought Leadership",
    description: "Share insights and establish authority in your industry",
    prompt: "Convert this into a thought-provoking post that demonstrates expertise, includes actionable insights, and encourages engagement through questions.",
    category: "Leadership"
  },
  {
    id: "template-3",
    name: "Behind the Scenes",
    description: "Show the human side of your business journey",
    prompt: "Transform this into an authentic behind-the-scenes post that shows vulnerability, learning moments, and connects with your audience on a personal level.",
    category: "Personal"
  },
  {
    id: "template-4",
    name: "Tips & Advice",
    description: "Share valuable tips and actionable advice",
    prompt: "Convert this into a structured tips post with numbered points, actionable advice, and practical takeaways that your audience can implement immediately.",
    category: "Educational"
  },
  {
    id: "template-5",
    name: "Story/Case Study",
    description: "Tell compelling stories with lessons learned",
    prompt: "Transform this into a compelling story or case study with a clear narrative arc, specific details, and key lessons that resonate with entrepreneurs.",
    category: "Storytelling"
  }
];

// Mock social integrations
export const mockSocialIntegrations: SocialIntegration[] = [
  {
    id: "integration-1",
    userId: "user-1",
    platform: "linkedin",
    isConnected: true,
    accountName: "John Entrepreneur"
  },
  {
    id: "integration-2",
    userId: "user-1",
    platform: "twitter",
    isConnected: false
  }
];

// Mock functions to simulate API calls
export const mockApi = {
  // Posts
  getPosts: async (): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockPosts;
  },

  createPost: async (rawContent: string, imageUrl?: string): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: mockUser.id,
      rawContent,
      formattedContent: {
        linkedin: `LinkedIn formatted version of: ${rawContent}`,
        twitter: `Twitter formatted version of: ${rawContent}`
      },
      imageUrl,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPosts.unshift(newPost);
    return newPost;
  },

  updatePost: async (id: string, updates: Partial<Post>): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) throw new Error('Post not found');

    mockPosts[postIndex] = { ...mockPosts[postIndex], ...updates, updatedAt: new Date().toISOString() };
    return mockPosts[postIndex];
  },

  deletePost: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      mockPosts.splice(postIndex, 1);
    }
  },

  publishPost: async (id: string, platforms: string[]): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate publishing delay
    return mockApi.updatePost(id, {
      status: 'published',
      publishedAt: new Date().toISOString()
    });
  },

  // Templates
  getTemplates: async (): Promise<Template[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTemplates;
  },

  // Social integrations
  getSocialIntegrations: async (): Promise<SocialIntegration[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSocialIntegrations;
  },

  connectSocialAccount: async (platform: 'linkedin' | 'twitter'): Promise<SocialIntegration> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate OAuth flow
    const integration = mockSocialIntegrations.find(i => i.platform === platform);
    if (integration) {
      integration.isConnected = true;
      integration.accountName = `${mockUser.name} (${platform})`;
    }
    return integration!;
  },

  // AI Content Generation (mock)
  generateContent: async (rawContent: string, template: Template): Promise<{ linkedin: string; twitter: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing

    // Simple mock transformation based on template
    const baseContent = `${template.name} style: ${rawContent}`;

    return {
      linkedin: `🔥 ${baseContent}\n\nExpanded for LinkedIn with more details, professional tone, and relevant hashtags.\n\n#${template.category} #Entrepreneurship #BusinessGrowth`,
      twitter: `🔥 ${baseContent}\n\nConcise Twitter version with impact.\n\n#${template.category} #Business`
    };
  }
};
