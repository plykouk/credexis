# Product Requirements Document (PRD)
# Credix - UK Companies House Data Retrieval Platform

## Executive Summary
Credix is a modern web application designed to provide easy access to UK Companies House data, focusing on company financial accounts and performance metrics. The platform serves investors, credit control departments, and business analysts who need to understand the financial health of UK limited companies.

## Vision Statement
To create the most intuitive and efficient platform for accessing and analyzing UK company financial data, enabling informed business decisions through seamless data retrieval and visualization.

## Target Users

### Primary Users
1. **Investors & Analysts**
   - Need: Quick access to company financials for investment decisions
   - Use Case: Comparing multiple companies' financial performance

2. **Credit Control Departments**
   - Need: Assess creditworthiness of potential clients
   - Use Case: Reviewing filing history and recent accounts

3. **Business Development Teams**
   - Need: Research potential partners or competitors
   - Use Case: Understanding market position through financial data

### Secondary Users
- Accountants and Financial Advisors
- Journalists and Researchers
- General Public seeking company information

## Core Features

### 1. Company Search
- **Smart Search Bar**
  - Search by company name
  - Search by company number
  - Auto-suggest functionality
  - Recent searches history

- **Advanced Search**
  - Filter by status (active, dissolved, liquidation)
  - Filter by location
  - Filter by incorporation date
  - Filter by SIC codes

### 2. Company Profile View
- **Company Overview**
  - Company name and number
  - Registration status
  - Incorporation date
  - Registered office address
  - Company type
  - SIC codes and nature of business

- **Key Personnel**
  - Current directors
  - Persons with significant control (PSC)
  - Secretary information

### 3. Financial Data Display
- **Filing History**
  - Chronological list of all filings
  - Filter by document type
  - Direct document download links

- **Accounts Overview**
  - Latest accounts filing date
  - Accounts due date
  - Accounting reference date
  - Last accounts made up to date

- **Financial Highlights** (when available)
  - Total assets
  - Net worth
  - Turnover (if disclosed)
  - Number of employees
  - Key financial ratios

### 4. Document Viewer
- **Integrated PDF Viewer**
  - View accounts directly in-app
  - Download functionality
  - Print support
  - Zoom controls

### 5. Data Export & Reporting
- **Export Options**
  - Export company data as CSV
  - Export financial summaries as PDF
  - Generate comparison reports

### 6. User Features
- **Watchlist**
  - Save companies for monitoring
  - Alerts for new filings
  - Notes and tags per company

- **Search History**
  - Recent searches
  - Saved searches
  - Search filters preservation

## Technical Requirements

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui or custom components
- **State Management**: Zustand or React Context
- **Data Fetching**: TanStack Query (React Query)

### API Integration
- **Companies House API**
  - REST API integration
  - API key authentication
  - Rate limit handling
  - Error recovery

### Performance Requirements
- Page load time < 2 seconds
- Search results < 1 second
- Mobile-first responsive design
- Offline capability for viewed data

### Security & Compliance
- Secure API key management
- HTTPS only
- Data protection compliance
- Companies House API terms adherence

## UI/UX Requirements

### Design Principles
- **Mobile-First**: Optimized for mobile devices
- **Minimalist**: Clean, uncluttered interface
- **Intuitive**: Self-explanatory navigation
- **Accessible**: WCAG 2.1 AA compliance

### Key Screens

1. **Home/Search Screen**
   - Prominent search bar
   - Quick access to recent searches
   - Featured insights or statistics

2. **Search Results**
   - Card-based layout
   - Key information preview
   - Quick actions (view, save, export)

3. **Company Detail Page**
   - Tab-based navigation
   - Sticky header with key info
   - Floating action buttons

4. **Document Viewer**
   - Full-screen mode option
   - Navigation sidebar
   - Annotation capabilities

### Visual Design
- **Color Scheme**: Professional blue/gray palette
- **Typography**: Clean, readable fonts
- **Icons**: Modern, consistent icon set
- **Animations**: Subtle, purposeful transitions

## MVP Features (Phase 1)

1. Basic company search by name/number
2. Company profile display
3. Filing history view
4. Document download links
5. Mobile-responsive design
6. Basic error handling

## Future Enhancements (Phase 2+)

1. Advanced search filters
2. Watchlist functionality
3. Email alerts for new filings
4. Financial data visualization (charts/graphs)
5. Company comparison tools
6. Bulk data export
7. API rate limit optimization with caching
8. Progressive Web App (PWA) capabilities
9. Dark mode support
10. Multi-language support

## Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Average session duration
- Pages per session
- Search-to-view conversion rate

### Performance
- Page load times
- API response times
- Error rates
- Mobile usage percentage

### Business Impact
- User retention rate
- Feature adoption rates
- User satisfaction score (NPS)

## Risks & Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|-------------------|
| API Rate Limits | High | Implement caching, request queuing |
| API Changes | Medium | Version checking, fallback handlers |
| Data Accuracy | High | Direct API integration, regular sync |
| Performance Issues | Medium | CDN usage, lazy loading, optimization |

## Development Phases

### Phase 1: MVP (Weeks 1-4)
- Project setup and configuration
- Basic search implementation
- Company profile display
- Filing history integration
- Mobile responsiveness

### Phase 2: Enhanced Features (Weeks 5-8)
- Advanced search
- Document viewer
- User accounts
- Watchlist functionality

### Phase 3: Analytics & Optimization (Weeks 9-12)
- Performance optimization
- Analytics dashboard
- Export functionality
- PWA implementation

## Conclusion
Credix aims to democratize access to UK company financial data through an intuitive, fast, and reliable web application. By focusing on user experience and leveraging modern web technologies, the platform will become the go-to resource for anyone needing to understand UK company financials.