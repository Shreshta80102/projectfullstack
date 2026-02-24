import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { User, Role, AuthContextType, Issue, Feedback, Update, AppContextType } from './types'

// Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (name: string, role: Role) => {
    const newUser: User = { name, role }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// App Context (for issues, feedback, updates)
const AppContext = createContext<AppContextType | undefined>(undefined)

const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Broken street lights on Main Street',
    description: 'Several street lights are not functioning on Main Street, causing safety concerns at night.',
    category: 'Safety',
    priority: 'High',
    location: 'Main Street',
    status: 'in_progress',
    submittedBy: 'John Citizen',
    submittedAt: new Date('2024-02-20'),
    votes: 45,
  },
  {
    id: '2',
    title: 'Pothole on Oak Avenue',
    description: 'Large pothole causing traffic hazard and vehicle damage.',
    category: 'Infrastructure',
    priority: 'Medium',
    location: 'Oak Avenue',
    status: 'pending',
    submittedBy: 'Jane Smith',
    submittedAt: new Date('2024-02-22'),
    votes: 32,
  },
  {
    id: '3',
    title: 'Garbage collection delayed',
    description: 'Garbage has not been collected for 2 weeks in the residential area.',
    category: 'Sanitation',
    priority: 'High',
    location: 'Residential District',
    status: 'pending',
    submittedBy: 'Bob Johnson',
    submittedAt: new Date('2024-02-21'),
    votes: 28,
  },
]

const mockFeedback: Feedback[] = [
  {
    id: '1',
    title: 'Good job on the park renovation',
    content: 'The recent park renovation looks amazing. Great work!',
    category: 'Appreciation',
    submittedBy: 'Alice Brown',
    submittedAt: new Date('2024-02-19'),
    status: 'reviewed',
  },
  {
    id: '2',
    title: 'Suggestion for improved bus routes',
    content: 'I suggest adding a bus route to the east side of the city.',
    category: 'Suggestion',
    submittedBy: 'Charlie Davis',
    submittedAt: new Date('2024-02-20'),
    status: 'pending',
  },
]

const mockUpdates: Update[] = [
  {
    id: '1',
    title: 'New Community Center Opening',
    content: 'We are excited to announce the opening of the new community center next month. It will feature a gym, library, and meeting spaces.',
    category: 'Announcement',
    postedBy: 'Mayor Jane Doe',
    postedAt: new Date('2024-02-22'),
    role: 'politician',
  },
  {
    id: '2',
    title: 'Road Maintenance Update',
    content: 'We have completed road maintenance on 5th Street. Thank you for your patience.',
    category: 'Update',
    postedBy: 'City Council',
    postedAt: new Date('2024-02-21'),
    role: 'admin',
  },
]

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues)
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback)
  const [updates, setUpdates] = useState<Update[]>(mockUpdates)

  const addIssue = (issue: Omit<Issue, 'id' | 'submittedAt'>) => {
    const newIssue: Issue = {
      ...issue,
      id: Date.now().toString(),
      submittedAt: new Date(),
    }
    setIssues([newIssue, ...issues])
  }

  const addFeedback = (fb: Omit<Feedback, 'id' | 'submittedAt'>) => {
    const newFeedback: Feedback = {
      ...fb,
      id: Date.now().toString(),
      submittedAt: new Date(),
    }
    setFeedback([newFeedback, ...feedback])
  }

  const addUpdate = (update: Omit<Update, 'id' | 'postedAt'>) => {
    const newUpdate: Update = {
      ...update,
      id: Date.now().toString(),
      postedAt: new Date(),
    }
    setUpdates([newUpdate, ...updates])
  }

  const updateIssueStatus = (issueId: string, status: Issue['status']) => {
    setIssues(issues.map(issue =>
      issue.id === issueId ? { ...issue, status } : issue
    ))
  }

  return (
    <AppContext.Provider value={{
      issues,
      addIssue,
      feedback,
      addFeedback,
      updates,
      addUpdate,
      updateIssueStatus,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
