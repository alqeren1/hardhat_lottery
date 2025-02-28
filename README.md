# Lottery Solidity Contract with Chainlink VRF

This repository contains a Solidity lottery contract that leverages Chainlink VRF for secure random number generation. The contract selects a winner among the funders and transfers the collected funds to the winner. This practice project illustrates how to integrate Chainlink services into a decentralized lottery system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Learning Outcomes](#learning-outcomes)
- [Contact](#contact)

## Overview

This project implements a lottery contract where participants can fund the contract, and after a random selection (powered by Chainlink VRF), a winner is chosen to receive the funds. The repository includes deploy scripts with mock deployments, the main lottery deployment, and an automated script to update frontend constants with the deployed contract addresses.

## Features

- **Decentralized Lottery:** Users fund the contract and a winner is chosen at random.
- **Chainlink Integration:** Uses Chainlink VRF for tamper-proof random number generation.
- **Automated Deployment:** Deployment scripts include mock deploys, lottery deployment, and a script to update the frontend configuration.
- **Funding & Withdrawal:** Separate scripts to handle funding and withdrawing from the contract.
- **Comprehensive Testing:** Includes both unit tests and staging tests to ensure contract reliability.

## Technologies Used

- **Solidity:** Smart contract programming.
- **Hardhat:** Development, testing, and deployment framework.
- **Chainlink VRF:** Verifiable Random Function for random number generation.
- **JavaScript:** Scripting for deployment and frontend updates.

## Installation & Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/alqeren1/hardhat_lottery.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd hardhat_lottery
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add the necessary configurations.

## Usage

### Deploying the Contracts

- **Run Mock Deployments:**

   ```bash
   npx hardhat deploy --tags mocks --network your-network
   ```

- **Deploy the Lottery Contract:**

   ```bash
   npx hardhat deploy --tags raffle --network your-network
   ```

  - **Deploy all at once:**

   ```bash
   npx hardhat deploy --tags all --network your-network
   ```

- **Update Frontend Constants:**

   After deployment of all, the frontend automatically updates with the new contract addresses if UPDATE_FRONTEND = true in .env

  

### Interacting with the Contract

- **Fund the Lottery:**

   Use the provided script to fund the contract:

   ```bash
   npx hardhat run scripts/fund.js 
   ```

- **Withdraw Funds:**

   Execute the withdrawal script to transfer funds as per contract logic:

   ```bash
   npx hardhat run scripts/withdraw.js 
   ```

## Project Structure

- **contracts/**  
  Contains the Solidity lottery contract and related contracts.
- **deploy/**
  Deployment scripts:
    - `00-deploy-mocks.js`: Deploys mock contracts.
    - `01-raffle.js`: Deploys the main lottery contract.
    - `99-update-frontend.js`: Updates the frontend with new contract addresses.
- **scripts/**  
  - `fund.js` & `withdraws.js`: Scripts to interact with the lottery contract.
- **test/**  
  Includes both unit tests and staging tests to verify the contract functionality and integration.

## Testing

Run the tests using Hardhat:

   ```bash
   npx hardhat test
   ```

For staging tests, ensure you have the appropriate network configurations set up.
 ```bash
   npx hardhat test:staging
   ```

## Learning Outcomes

This project was developed as a practice exercise to:

- Gain hands-on experience with integrating Chainlink VRF for secure random number generation in smart contracts.
- Understand the process of writing, testing, and deploying a decentralized lottery system on Ethereum.
- Learn how to structure and deploy smart contracts using Hardhat, and automate frontend configuration updates with deployed contract addresses.

## Contact

For questions or further discussion, please reach out via [alqeren1](https://github.com/alqeren1) or email [alqeren1@gmail.com](mailto:alqeren1@gmail.com).
