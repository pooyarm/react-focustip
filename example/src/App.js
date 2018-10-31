import React, { Component } from 'react';

import Focustip from 'react-focustip';

import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {run:false};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({run: true});
    },2000)
  }
  render() {
    var steps = [
      {
        target: '.focustip-first',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        target: '.focustip-second',
        content: 'Nullam vel dolor nulla. Aenean sodales nunc sed purus consequat hendrerit.',
        ok: 'I see',
        color: '#44B85D'
      },
      {
        target: '.focustip-third',
        content: 'Etiam tincidunt turpis lectus. Quisque sagittis dapibus enim eget aliquet.',
        ok: 'I see',
        color: '#b7ad3e'
      },
      {
        target: '.focustip-forth',
        content: 'Maecenas eu ipsum sem. Morbi tempus gravida nibh, in molestie libero malesuada vel.',
        ok: 'Ok',
        color: '#000000'
      },
    ]
    return (
      <Layout style={{height:"100vh"}}>
        <Focustip
          steps={steps}
          run={this.state.run}
          onComplete={() => {
            console.log('completed');
          }}
          onNext={(step) => {
            console.log('onNext', step)
          }}
        />
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="focustip-first" style={{
            fontSize: '25px',
            color: '#fff',
            textAlign: 'center',
            padding: '20px 10px'
          }}>Logo</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text focustip-second">nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', textAlign: 'right' }}>
            <Button type="primary focustip-third">Login</Button>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
        <Button type="primary" shape="circle" icon="question" size="large" className='focustip-forth' style={{
          position:'fixed',
          right: '20px',
          bottom: '20px'
        }}></Button>
      </Layout>
    );
  }
}

export default App;
