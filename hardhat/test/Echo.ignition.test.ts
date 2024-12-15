import { expect } from "chai";
import hre from "hardhat";
import DeployEchoModule from "../ignition/modules/DeployEchoModule";

describe("Echo Ignition Deployment", function () {
  it("Should have initial 'Hello Web3!' echo at (0,0)", async function () {
    const deployment = await hre.ignition.deploy(DeployEchoModule);
    const echo = deployment.echo;

    const allEchoes = await echo.getAllEchoes();
    
    expect(allEchoes.length).to.equal(1);
    expect(allEchoes[0].content).to.equal("Hello Web3!");
    expect(allEchoes[0].position.x).to.equal(0);
    expect(allEchoes[0].position.y).to.equal(0);
    expect(allEchoes[0].exists).to.be.true;

    const firstEcho = await echo.getEcho(0);
    expect(firstEcho.content).to.equal("Hello Web3!");
    expect(firstEcho.position.x).to.equal(0);
    expect(firstEcho.position.y).to.equal(0);
    expect(firstEcho.exists).to.be.true;
  });
}); 