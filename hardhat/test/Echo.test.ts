import { expect } from "chai";
import { ethers } from "hardhat";
import { Echo } from "../typechain-types/Echo";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Echo Contract", function () {
  let echo: Echo;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [user1, user2] = await ethers.getSigners();
    
    const EchoFactory = await ethers.getContractFactory("Echo");
    echo = await EchoFactory.deploy();
    await echo.waitForDeployment();
  });

  describe("Echo Creation", function () {
    it("Should create a new echo with correct position", async function () {
      const content = "Hello Web3!";
      const x = 100;
      const y = 200;
      const tx = await echo.connect(user1).createEcho(content, x, y);
      await tx.wait();

      const echoData = await echo.getEcho(0);
      expect(echoData.creator).to.equal(user1.address);
      expect(echoData.content).to.equal(content);
      expect(echoData.position.x).to.equal(x);
      expect(echoData.position.y).to.equal(y);
      expect(echoData.exists).to.be.true;
    });

    it("Should not allow empty content", async function () {
      await expect(echo.connect(user1).createEcho("", 0, 0))
        .to.be.revertedWith("Echo content cannot be empty");
    });

    it("Should not allow content longer than 280 characters", async function () {
      const longContent = "a".repeat(281);
      await expect(echo.connect(user1).createEcho(longContent, 0, 0))
        .to.be.revertedWith("Echo content too long");
    });
  });

  describe("Echo Retrieval", function () {
    beforeEach(async function () {
      await echo.connect(user1).createEcho("Test Echo", 100, 200);
    });

    it("Should get a single echo by id", async function () {
      const echoData = await echo.getEcho(0);
      expect(echoData.content).to.equal("Test Echo");
      expect(echoData.position.x).to.equal(100);
      expect(echoData.position.y).to.equal(200);
      expect(echoData.creator).to.equal(user1.address);
    });

    it("Should fail when getting non-existent echo", async function () {
      await expect(echo.getEcho(999))
        .to.be.revertedWith("Echo does not exist");
    });

    it("Should return all echoes with correct positions", async function () {
      const echoes = [
        { content: "Second Echo", x: 200, y: 200 },
        { content: "Third Echo", x: 300, y: 300 }
      ];
      
      for (const echoData of echoes) {
        await echo.connect(user1).createEcho(echoData.content, echoData.x, echoData.y);
      }

      const allEchoes = await echo.getAllEchoes();
      expect(allEchoes.length).to.equal(3); // Including the one from beforeEach

      // Check the added echoes
      for (let i = 0; i < echoes.length; i++) {
        const index = i + 1; // +1 because of the echo created in beforeEach
        expect(allEchoes[index].content).to.equal(echoes[i].content);
        expect(allEchoes[index].position.x).to.equal(echoes[i].x);
        expect(allEchoes[index].position.y).to.equal(echoes[i].y);
        expect(allEchoes[index].creator).to.equal(user1.address);
        expect(allEchoes[index].exists).to.be.true;
      }
    });
  });
}); 