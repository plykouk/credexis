# Credix - UK Companies House Data Retrieval Platform

A modern web application for retrieving and analyzing UK Companies House data, including company profiles, financial accounts, and filing history.

## Features

- **Company Search**: Search for UK limited companies by name or company number
- **Company Profiles**: View detailed company information including registration details, address, and status
- **Filing History**: Browse all company filings including annual accounts and confirmation statements
- **Mobile-First Design**: Fully responsive interface optimized for mobile devices
- **Real-time Data**: Direct integration with Companies House API for live data

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **API**: Companies House Public Data API
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ and npm
- Companies House API key (register at [developer.company-information.service.gov.uk](https://developer.company-information.service.gov.uk))

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd credix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your Companies House API key:
   ```env
   COMPANIES_HOUSE_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
credix/
├── app/                    # Next.js app directory
│   ├── api/               # API routes for Companies House integration
│   ├── company/           # Company detail pages
│   ├── search/            # Search results page
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/               # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and API client
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## API Routes

- `GET /api/companies/search` - Search for companies
- `GET /api/companies/[companyNumber]` - Get company profile
- `GET /api/companies/[companyNumber]/filing-history` - Get filing history

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linting
npm run lint
```

## Future Enhancements

- Advanced search filters
- Company watchlist with alerts
- Financial data visualization
- Document viewer integration
- Export functionality for reports
- Company comparison tools

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
