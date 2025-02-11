
# 🌸 Flower Token

A decentralized ERC-20 token implementation built with Solidity and Foundry, featuring a modern Next.js frontend inspired by garden.finance.

## 📝 Contract Details

- **Token Name**: flower Token
- **Symbol**: FLR
- **Total Supply**: 1,000 tokens
- **Network**: Sepolia Testnet
- **Contract Address**: 0x729D3E73fB56E5117F99eDC54353B7Ac6C045a58
- **Block**: 7678939
- **Transaction Hash**: 0x5bd70c7274572159003697ba79475c8ebe2a0eb6d45e551730278c2aa8201dc2

## ✨ Features

### User Operations
- Token transfers between addresses
- Balance checking functionality
- Allowance management (approve/check)
- TransferFrom capability for approved spenders

### Administrative Functions
- Ownership management
- Token minting capabilities
- Token burning functionality

## 🛠 Technology Stack

### Smart Contract
- Solidity
- Foundry (Development Framework)
- OpenZeppelin ERC-20 Implementation

### Frontend
- Next.js
- TypeScript
- TailwindCSS
- Web3 Integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Git
- Foundry
- MetaMask wallet

### Installation

1. Clone the repository
```bash
git clone [your-repository-url]
cd flower
```

2. Install dependencies
```bash
# Install frontend dependencies
npm install

```

3. Run the development server
```bash
npm run dev
```

## 💻 Usage

### Connecting Wallet
1. Ensure MetaMask is installed
2. Connect to Sepolia testnet
3. Click "Connect Wallet" in the application

### Token Operations
- **Check Balance**: View your current FLWR token balance
- **Transfer**: Send tokens to another address
- **Approve**: Grant spending allowance to another address
- **TransferFrom**: Transfer tokens on behalf of another address (requires approval)

### Administrative Actions
- **Change Ownership**: Transfer contract ownership (admin only)
- **Mint Tokens**: Create new tokens (admin only)
- **Burn Tokens**: Remove tokens from circulation (admin only)

## 🔒 Security

- Contract is verified on Sepolia Etherscan
- Implements standard ERC-20 security practices
- Administrative functions are protected with ownership checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- OpenZeppelin for ERC-20 implementation
- garden.finance for frontend inspiration
- Foundry team for the development framework
