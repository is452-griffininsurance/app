import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import Web3 from "web3";

const { Header } = Layout;

const { SubMenu } = Menu;

function TopNavbar() {
  const [current, setCurrent] = useState({ current: "Home" });
  const [currentAddress, setCurrentAddress] = useState(undefined);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [chainId, setChainId] = useState(0);

  const handleClick = (e) => {
    setCurrent({ current: e.key });
  };

  // Connect to Ethereum network via MetaMask
  const web3 = new Web3(Web3.givenProvider);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable().then((account) => {
        const defaultAccount = account[0];
        web3.eth.defaultAccount = defaultAccount;
        setCurrentAddress(defaultAccount);
        console.log(defaultAccount);
        web3.eth.getBalance(defaultAccount).then(setCurrentAmount);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function MetaMaskWalletConnection() {
    if (!window.ethereum) {
      return (
        <>
          <CloseCircleTwoTone twoToneColor="#eb2f96" /> No MetaMask Detected
        </>
      );
    }
    web3.eth.getChainId().then(setChainId);
    if (chainId === 1) {
      return (
        <>
          <CheckCircleTwoTone twoToneColor="#52c41a" /> Connected to Mainnet
        </>
      );
    }
    if (chainId === 3) {
      return (
        <>
          <CheckCircleTwoTone twoToneColor="#52c41a" /> Connected to Ropsten
        </>
      );
    }
    if (chainId === 4) {
      return (
        <>
          <CheckCircleTwoTone twoToneColor="#52c41a" /> Connected to Rinkeby
        </>
      );
    }
    if (chainId === 42) {
      return (
        <>
          <CheckCircleTwoTone twoToneColor="#52c41a" /> Connected to Kovan
        </>
      );
    }

    return <></>;
  }

  function MetaMaskWalletAmount() {
    const formattedAmount = web3.utils.fromWei(
      currentAmount.toString(),
      "ether"
    );
    const url = `https://rinkeby.etherscan.io/address/${currentAddress}`;
    if (window.ethereum && currentAddress) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {parseFloat(formattedAmount).toFixed(4)} ETH
        </a>
      );
    }
    return <></>;
  }
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <img
            src={require("../Assets/LogoName.png")}
            style={{ height: "50px" }}
          />
          <Menu.Item
            key="Home"
            style={
              localStorage.getItem("userType") === "user"
                ? {}
                : { display: "none" }
            }
          >
            Home
            <Link to="/home" />
          </Menu.Item>
          <Menu.Item
            key="Insurance"
            style={
              localStorage.getItem("userType") === "user"
                ? {}
                : { display: "none" }
            }
          >
            Insurance
            <Link to="/insurance" />
          </Menu.Item>
          <Menu.Item
            key="Regulator"
            style={
              localStorage.getItem("userType") === "admin"
                ? {}
                : { display: "none" }
            }
          >
            Home
            <Link to="/regulators" />
          </Menu.Item>
          <Menu.Item
            key="RegulatorTriggerPayout"
            style={
              localStorage.getItem("userType") === "admin"
                ? {}
                : { display: "none" }
            }
          >
            Trigger Payout
            <Link to="/triggerpayout" />
          </Menu.Item>
          <Menu.Item
            key="WalletConnection"
            style={
              localStorage.getItem("userType") === "user"
                ? {}
                : { display: "none" }
            }
          >
            <MetaMaskWalletConnection />
          </Menu.Item>
          <Menu.Item
            key="WalletAmount"
            style={
              localStorage.getItem("userType") === "user"
                ? {}
                : { display: "none" }
            }
          >
            <MetaMaskWalletAmount />
          </Menu.Item>
          <Menu.Item key="Logout">
            Logout
            <Link to="/" />
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default TopNavbar;
