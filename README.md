# Citizen Engagement Platform - Frontend

A modern, responsive React-based web application for community engagement and civic participation. This platform allows citizens to report issues, participate in community projects, share news, and engage with their community.

## Features

- **Dashboard**: Overview of community engagement metrics and recent issues
- **Issues Management**: Report, view, and track community issues with voting and comments
- **Community Projects**: Browse and join community-driven projects
- **News Feed**: Stay updated with community news and announcements
- **User Profile**: Manage profile, view contributions, and track achievements
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn package manager

## Installation

1. Navigate to the project directory:
```bash
cd "c:\Users\kakar\OneDrive\Desktop\FSAD PROJECT"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will automatically open in your default browser at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   └── Navigation.tsx          # Main navigation component
├── pages/
│   ├── Dashboard.tsx           # Dashboard page
│   ├── Issues.tsx              # Issues listing page
│   ├── Projects.tsx            # Projects listing page
│   ├── Profile.tsx             # User profile page
│   └── News.tsx                # News feed page
├── App.tsx                     # Main app component with routing
├── main.tsx                    # React entry point
└── index.css                   # Global styles
```

## Features Overview

### Dashboard
- Community engagement statistics
- Active issues overview
- Quick access to key metrics

### Issues Management
- Browse all reported issues
- Filter by status (Open, In Progress, Resolved)
- Vote on issues
- View issue details and comments
- Report new issues

### Community Projects
- Discover community-driven initiatives
- Track project progress
- Join projects as a volunteer
- View volunteer count and timeline

### News Feed
- Latest community announcements
- Category-based news filtering
- Like and share functionality
- Article details view

### User Profile
- Personal information management
- Contribution statistics
- Achievement badges
- Activity history

## Styling

The application uses Tailwind CSS for styling with a custom color scheme:
- Primary: Blue (#2563eb)
- Secondary: Slate (#64748b)
- Accent: Amber (#f59e0b)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Red (#ef4444)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication and authorization
- Real-time notifications
- Backend API integration
- Image uploads
- Comment system implementation
- Advanced search and filtering
- Map-based issue reporting
- Mobile app version

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue in the project repository or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: February 24, 2024
