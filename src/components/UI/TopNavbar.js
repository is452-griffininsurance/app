import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from 'antd';

const { Header } = Layout;

const { SubMenu } = Menu;

class TopNavbar extends React.Component {
  state = {
    current: 'Home',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Layout>
        <Header>
          <Menu theme="dark" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="Home" >
              Home
              <Link to="/"></Link>
            </Menu.Item>
            <Menu.Item key="Insurance">
              Insurance
              <Link to="/insurance"></Link>
            </Menu.Item>
            <Menu.Item key="Stocks" >
              Stocks
              <Link to="/stocks"></Link>
            </Menu.Item>
            <Menu.Item key="Regulator" >
              Regulator Home (temp)
              <Link to="/regulators"></Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default TopNavbar;
