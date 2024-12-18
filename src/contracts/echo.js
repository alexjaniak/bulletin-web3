export const echoAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_content",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_x",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_y",
        "type": "uint256"
      }
    ],
    "name": "createEcho",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllEchoes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "x",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "y",
                "type": "uint256"
              }
            ],
            "internalType": "struct Echo.Position",
            "name": "position",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "internalType": "struct Echo.EchoData[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "echoId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "y",
        "type": "uint256"
      }
    ],
    "name": "EchoCreated",
    "type": "event"
  }
];

// TODO: Replace with your deployed contract address
export const echoContractAddress = "0x7F0F0F52469bAAaFCb7d9b45B1F902B8246B14C6"; 