export type Role = 'citizen' | 'politician' | 'moderator' | 'admin'

export interface User {
  name: string
  role: Role
}

export interface Issue {
  id: string
  title: string
  description: string
  category: 'Infrastructure' | 'Sanitation' | 'Safety' | 'Other'
  priority: 'Low' | 'Medium' | 'High'
  location: string
  status: 'pending' | 'in_progress' | 'resolved'
  submittedBy: string
  submittedAt: Date
  votes?: number
}

export interface Feedback {
  id: string
  title: string
  content: string
  category: string
  submittedBy: string
  submittedAt: Date
  status: 'pending' | 'reviewed' | 'responded'
}

export interface Update {
  id: string
  title: string
  content: string
  category: string
  postedBy: string
  postedAt: Date
  role: Role
}

export interface AuthContextType {
  user: User | null
  login: (name: string, role: Role) => void
  logout: () => void
}

export interface AppContextType {
  issues: Issue[]
  addIssue: (issue: Omit<Issue, 'id' | 'submittedAt'>) => void
  feedback: Feedback[]
  addFeedback: (feedback: Omit<Feedback, 'id' | 'submittedAt'>) => void
  updates: Update[]
  addUpdate: (update: Omit<Update, 'id' | 'postedAt'>) => void
  updateIssueStatus: (issueId: string, status: Issue['status']) => void
}
