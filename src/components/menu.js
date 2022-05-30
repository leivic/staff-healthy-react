import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';


class App extends React.Component {
  constructor(props){
	super(props)
	this.state= {
		current: 'mail',
    		ishidden: 'none'	
	}
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{width:'100%'}}>
        <Menu.Item key="mail" style={{display:this.props.yuangongjibenxinxi}} icon={<MailOutlined />}>
          基本信息 
        </Menu.Item>
        <Menu.Item key="app" style={{display:this.props.liuchengbiaodan}} icon={<AppstoreOutlined />}>
          流程表单
        </Menu.Item>
        <span style={{position:'fixed',top:'0',right:'10px'}}>欢迎您，{this.props.name}，当前角色是:{this.props.role}</span>
      </Menu>
    );
  }
}

export default App;