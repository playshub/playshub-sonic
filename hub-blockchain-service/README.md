# Blockchain Service

`hub-blockchain-service` handles payment processing on SONIC blockchain and provides notification services for payment status to other components.

## Features

- Handle SONIC blockchain payments for Playshub shop
- Process and verify blockchain transactions
- Send payment event notifications via webhooks
- Honeycomb integration: Manage project and user profiles
- Support for NFT ownership verification

## Technology Stack

- **NestJS**: Backend framework for building efficient and scalable server-side applications
- **Socket.io**: Real-time bidirectional event-based communication for pushing transaction updates
- **@solana/web3.js**: JavaScript library that provides tools for interacting with the SONIC blockchain
- **Honeycomb Protocol**: Integration for enhanced blockchain functionality and user management

## How to Run

### Running Locally

1. Install package dependencies:

```shell
pnpm install
```

2. Prepare environment variables:

```shell
cp .env.example .env
```

3. Start the service:

```shell
# Development mode
pnpm run start:dev

# Production mode
pnpm run build && pnpm run start
```

## Project Structure

```
hub-blockchain-service/
├── src/
│   ├── modules/
│   │   ├── transfer/          # Handle token transfers and transactions
│   │   ├── solana-rpc/        # SONIC blockchain client based on Solana RPC
│   │   ├── new-user/          # New user onboarding and registration
│   │   ├── notification/      # Send WebSocket or webhook notifications
│   │   └── jobs/              # Background jobs and scheduled tasks
│   │       ├── account-subscriber/      # Job to polling blockchain to confirm payments
│   │       └── create-new-user/    # Job to create on-chain new user
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions and helpers
│   ├── app.module.ts          # Main application module
│   └── main.ts                # Application entry point
├── .gitignore
├── package.json
└── README.md
```

## Module Descriptions

- **transfer**: Handles token transfers and transaction processing on the SONIC blockchain
- **solana-rpc**: Client for interacting with the SONIC blockchain using Solana RPC protocol
- **new-user**: Manages new user registration, wallet creation, and onboarding processes
- **notification**: Sends real-time notifications via WebSocket or webhooks to service listeners
- **jobs**: Manages background jobs, scheduled tasks, and recurring processes

## API Endpoints

The service exposes the following key endpoints:

- `POST /payments/verify`: Verify a payment transaction on the SONIC blockchain
- `GET /transactions/:address`: Get transaction history for a specific address
- `POST /webhooks/register`: Register a new webhook for payment notifications

## Authors and Acknowledgment

Playshub Team

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Project Status

We are actively developing this project following the roadmap available at: https://playshub.io/
