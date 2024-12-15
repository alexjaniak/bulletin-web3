# Echo Contract Project

This project implements a decentralized message system called Echo, where users can create and retrieve location-based messages. The project includes:

- A Solidity smart contract (`Echo.sol`) for storing and managing messages with position data
- Test suite demonstrating core functionality
- TypeScript configuration for development

## Testing On Arbitrum Fork

```shell
npm run test:fork
```

## Deploying

```shell
npx hardhat run scripts/deploy.ts --network arbitrum
```
