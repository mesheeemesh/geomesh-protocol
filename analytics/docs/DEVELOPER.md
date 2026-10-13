# Analytics Dashboard Developer Documentation

## Overview
This document provides technical information for developers working on the geomesh-protocol Analytics Dashboard.

## Project Structure
analytics/
├── docs/           # Documentation files
├── components/     # React components
├── hooks/          # Custom React hooks
├── services/       # API service calls
└── utils/          # Utility functions
## Setup & Installation

### Prerequisites
- Node.js v18+
- npm or yarn
- geomesh-protocol API access

### Installation
```bash
# Clone the repository
git clone https://github.com/meshmesh001/geomesh-protocol.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Architecture

### Frontend
- Built with React and TypeScript
- State management using React hooks
- Charts powered by Chart.js

### Backend
- REST API built with Node.js/NestJS — lives in the standalone [geomesh-protocol-backend](https://github.com/meshmesh001/geomesh-protocol-backend) repository
- PostgreSQL database
- Redis for caching analytics data

## Adding New Metrics
1. Add the metric to the database schema
2. Create the API endpoint in the backend (geomesh-protocol-backend)
3. Add the service call in analytics/services
4. Create the UI component in analytics/components

## Testing
```bash
# Run all tests
npm run test

# Run analytics specific tests
npm run test analytics
```

## Contributing
Please read the main [README.md](../../README.md) before contributing
