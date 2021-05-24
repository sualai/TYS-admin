import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { NavLink} from "react-router-dom"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
  } from '@ant-design/icons';

 import  "../../assets/style/index.css"  
 import Logo from "../../assets/images/tao1.png"
 import {routersData} from "assets/data"
 import SvgIcon from "../SvgIcon"
 import Vaild from 'assets/images/vaild.png'

  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;
 class Frame extends Component {
    state = {
        collapsed: false,
        defaultKey:this.props.location.pathname
      };
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
      createMenu =  ((menuData)=>{  //创建菜单
        //let itemIndex = 0; //累计的每一项索引
        let {collapsed} = this.state
        // let submenuIndex = 0; //累计的每一项展开菜单索引
        let menu = [];
        const create = (menuData,el)=>{
          for(let i=0;i<menuData.length;i++){
            if(menuData[i].children){  //如果有子级菜单
              let children = [];
              create(menuData[i].children,children);
              // submenuIndex++;
              el.push(
                <SubMenu icon={menuData[i].icon?<SvgIcon path={menuData[i].icon} />:<span></span>}
                  key={menuData[i].value}
                  title={!collapsed?menuData[i].title:''}
                >
                  {children}
                </SubMenu>
              )
            }else{   //如果没有子级菜单
              //itemIndex++;
              el.push(
                <Menu.Item key={menuData[i].path} title={menuData[i].title} 
                icon={menuData[i].icon?<SvgIcon path={menuData[i].icon} />:<span></span>}>
                  <NavLink  activeClassName="ant-menu-submenu-selected" to={menuData[i].path}>
                    <span>
                       {menuData[i].title}
                    </span>
                  </NavLink>
                </Menu.Item>
              )
            }
          }
        };
        create(menuData,menu);
        return menu;
      });
      getDefaultOpen = () =>{
        let defaultOpen 
        const pathname =  this.props.location.pathname
        routersData.forEach(item=>{
            if(pathname===item.path) return false
            for(let i = 0 ; i < item.children.length ; i ++) {
              if(pathname===item.children[i].path) {
                defaultOpen = item.value
                console.log(item.value,'submanu')
              }
            }
        })
        return defaultOpen
      }
    render() {
      const {defaultKey} = this.state
      const defaultOpen = this.getDefaultOpen()
        return (
        <Layout>
        <Sider theme="dark" trigger={null} collapsible collapsed={this.state.collapsed}
        >
          <div className="logo" >
              <img src={Logo} style={{width:'50px'}} alt="LOGO" />
              {!this.state.collapsed?<span>苏小来</span>:''}
              
          </div>
          <Menu theme="dark" mode="inline" defaultOpenKeys={[defaultOpen]} defaultSelectedKeys={[defaultKey]}>
            <Menu.Item key="/admin/home" icon={<UserOutlined />}>
                  <NavLink activeClassName="ant-menu-submenu-selected" to='/admin/home'>
                   <span>首页</span>
                 </NavLink>
            </Menu.Item>
            {this.createMenu(routersData)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" >
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick:this.toggle,
            })}
            <img alt="用户头像" src={Vaild}
            style={{width:'50px',float:'right',margin:'7px',borderRadius:'7px'}}/>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280 
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Frame)
