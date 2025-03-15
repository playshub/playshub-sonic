# Hub NextJS

## Overview

This is a **Game Hub Interface** built using **Next.js**, integrated with **Telegram Mini Apps**, providing a seamless and optimized experience for Telegram users. The hub serves as the central user interface for the Playshub x SONIC ecosystem, allowing users to access games, manage wallets, and participate in the platform's reward system.

## Key Features

### Hub Games

- A centralized hub for various integrated games, including cat-battle and cat-lucky
- Easy navigation between different games with persistent user state
- Game discovery and recommendation system

### Task & Daily Task

- Offers a system of daily tasks and special missions to motivate users to engage regularly
- Integrates **SONIC blockchain wallet connection** and a **daily check-in feature** for users to claim rewards
- Progress tracking and reward history

### Wallet Management

- Supports managing SONIC blockchain wallets directly within the app
- Users can track assets, view transaction history, and perform wallet-related operations effortlessly
- Secure key management and transaction signing

### NFT Marketplace

- Browse, buy, and sell cat NFTs that can be used across games
- View NFT details, ownership history, and rarity information
- Seamless integration with the SONIC blockchain for secure transactions

### Leader Board

- Displays a leaderboard ranking players based on criteria such as reward points, task completions, or game achievements
- Daily, weekly, and all-time rankings
- Special rewards for top-performing players

## Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **UI Components**: Tailwind CSS, Ant Design
- **State Management**: React Context API
- **Blockchain Integration**: SONIC (Solana-based) with Web3.js
- **Authentication**: Telegram Mini App authentication
- **API Communication**: Axios, SWR for data fetching
- **Mini App Platform**: Telegram

## Installation

### Prerequisites

- Node.js (v18+)
- npm or yarn or pnpm
- Telegram account for testing Mini App functionality

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/playshub/playshub-sonic.git
   cd playshub-sonic/hub-nextjs
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your specific configuration values.

4. Start the development server:
   ```bash
   pnpm dev
   ```
   The application will be available at http://localhost:3000

## Project Structure

```
hub-nextjs/
├── public/              # Static assets
│   ├── images/          # Image assets
│   └── fonts/           # Font files
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── (auth)/      # Authentication-related pages
│   │   ├── games/       # Game hub pages
│   │   ├── marketplace/ # NFT marketplace pages
│   │   ├── profile/     # User profile pages
│   │   ├── wallet/      # Wallet management pages
│   │   └── layout.tsx   # Root layout component
│   ├── components/      # Reusable React components
│   │   ├── common/      # Common UI components
│   │   ├── games/       # Game-specific components
│   │   ├── marketplace/ # Marketplace components
│   │   ├── providers/   # Context providers
│   │   └── wallet/      # Wallet-related components
│   ├── hooks/           # Custom React hooks
│   ├── apis/            # API service functions
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   ├── interfaces/      # TypeScript interfaces
│   └── core/            # Core functionality
│       ├── blockchain/  # Blockchain integration
│       └── telegram/    # Telegram Mini App integration
├── .env.example         # Example environment variables
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Development Guidelines

### Code Style

We follow a consistent code style using ESLint and Prettier:

```bash
# Run linter
pnpm lint

# Format code
pnpm format
```

### Component Structure

- Use functional components with hooks
- Follow the atomic design pattern for component organization
- Keep components small and focused on a single responsibility

### State Management

- Use React Context API for global state
- Use SWR for data fetching and caching
- Keep state as local as possible

### Telegram Mini App Integration

For testing the Telegram Mini App functionality:

1. Create a bot using BotFather on Telegram
2. Set up your Mini App with the local development URL
3. Use the Telegram Web App SDK for integration

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Deployment Platforms

The application can be deployed to:

- Vercel (recommended for Next.js applications)
- Netlify
- AWS Amplify
- Custom server with Node.js

## Contributing

We welcome contributions to the hub-nextjs project! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Authors and Acknowledgment

Playshub Team

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Project Status

We are actively developing this project following the roadmap available at: https://playshub.io/
