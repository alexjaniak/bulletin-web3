import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeployEchoModule = buildModule("DeployEchoModule", (m) => {
  // Deploy the Echo contract
  const echo = m.contract("Echo");

  // Create initial echo after deployment
  m.call(echo, "createEcho", ["Hello Web3!", 0, 0]);

  return { echo };
});

export default DeployEchoModule; 