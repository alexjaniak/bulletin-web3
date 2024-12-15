// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Echo {
    struct Position {
        uint256 x;
        uint256 y;
    }

    struct EchoData {
        address creator;
        string content;
        uint256 timestamp;
        Position position;
        bool exists;
    }

    mapping(uint256 => EchoData) public echoes;
    uint256 public totalEchoes;

    event EchoCreated(uint256 indexed echoId, address indexed creator, string content, uint256 x, uint256 y);

    function createEcho(string memory _content, uint256 _x, uint256 _y) external returns (uint256) {
        require(bytes(_content).length > 0, "Echo content cannot be empty");
        require(bytes(_content).length <= 280, "Echo content too long");
        require(_x <= 1000, "X coordinate must be between 0 and 1000");
        require(_y <= 10000, "Y coordinate must be between 0 and 10000");

        uint256 echoId = totalEchoes;
        echoes[echoId] = EchoData({
            creator: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            position: Position({
                x: _x,
                y: _y
            }),
            exists: true
        });

        totalEchoes++;

        emit EchoCreated(echoId, msg.sender, _content, _x, _y);
        return echoId;
    }

    function getEcho(uint256 _echoId) external view returns (EchoData memory) {
        require(echoes[_echoId].exists, "Echo does not exist");
        return echoes[_echoId];
    }

    function getAllEchoes() external view returns (EchoData[] memory) {
        EchoData[] memory allEchoes = new EchoData[](totalEchoes);
        
        for (uint256 i = 0; i < totalEchoes; i++) {
            allEchoes[i] = echoes[i];
        }
        
        return allEchoes;
    }
} 