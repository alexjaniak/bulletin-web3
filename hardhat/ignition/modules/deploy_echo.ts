import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EchoModule = buildModule("EchoModule", (m) => {
  // Deploy the Echo contract
  const echo = m.contract("Echo");

  return { echo };
});

export default EchoModule; 