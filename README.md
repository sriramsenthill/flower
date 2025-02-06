# KalEl Token Wallet Integration

This is the frontend client for interacting with ERC-20 standard tokens. While it is currently configured to work with the Kal-El Token, it can be adapted to interact with any ERC-20 token by updating the environment variables.

## Features

- **Wallet Integration**: Connect your wallet to interact with the blockchain.
- **Token Operations**:
  - View token balance.
  - Transfer tokens.
  - Approve allowances.
  - Check allowances.
- **Owner Operations**:
  - Mint and burn tokens.
  - Pause and unpause token operations.
  - Transfer ownership.

## Technologies Used

- **Frontend Framework**: Next.js
- **UI Library**: Chakra UI
- **Blockchain Interaction**: wagmi, viem
- **Styling**: Tailwind CSS (for additional customization)



### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Azeem-0/kal-el-token-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd kal-el-token-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=<Your Contract Address> - Use the address of your deployed contract or any existing ERC20 contract address
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to:

   ```plaintext
   http://localhost:3000
   ```

## Usage

### Wallet Connection
- Click the "Connect Wallet" button to connect your Ethereum wallet.
- Ensure you are on the correct network (e.g., Sepolia).

### Token Operations
- **View Balance**: Displays your current token balance.
- **Transfer Tokens**: Transfer tokens to another address.
- **Approve Allowance**: Approve a spender to use a specified amount of tokens.
- **Check Allowance**: View the allowance for a specific spender.

### Owner Operations
- **Mint Tokens**: Add new tokens to the total supply.
- **Burn Tokens**: Remove tokens from the total supply.
- **Pause/Unpause**: Toggle the paused state of the token contract.
- **Transfer Ownership**: Assign ownership of the contract to a new address.

## Security Considerations
- **Owner-Only Functions** : The functions that are intended to be restricted to the owner (such as minting, burning, pausing, and transferring ownership) are made public in this contract for testing purposes only. In a production environment, these functions should be restricted to the owner using modifiers like onlyOwner to prevent unauthorized access.


