import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
const SubMenu = Menu.SubMenu;

const routeData = [
    { path:"/1",title:"meun1",icon:"book" },
    { path:"/2",title:"meun2",icon:"issues-close",
        children:[
          { title:"meun3",path:"/3",icon:"info-circle",children:[
              { title:"meun4",path:"/4",icon:"bars"},
              { title:"meun5",path:"/5",icon:"bars"},
              { title:"meun6",path:"/6",icon:"bars"},
              { title:"meun7",path:"/7",icon:"bars" }
            ] },
          { title:"meun8",path:"/8",icon:"branches",children:[
              { title:"meun9",path:"/9",icon:"bars" },
              { title:"meun10",path:"/10",icon:"bars" },
            ] },
          { title:"meun11",path:"/11",icon:"bars" },
          { title:"meun12",path:"/12",icon:"bars"},
        ]
     }
]
class Index extends PureComponent{

  static defaultProps = {
    menulist:[]
  }

  createMenu =  ((menuData)=>{  //创建菜单
    //let itemIndex = 0; //累计的每一项索引
    let submenuIndex = 0; //累计的每一项展开菜单索引
    let menu = [];
    const create = (menuData,el)=>{
      for(let i=0;i<menuData.length;i++){
        if(menuData[i].children){  //如果有子级菜单
          let children = [];
          create(menuData[i].children,children);
          submenuIndex++;
          el.push(
            <SubMenu
              key={`sub${submenuIndex}`}
              title={(
                <span style={{ height:'100%',display: 'block' }}>
                  <Icon type={menuData[i].icon} />{menuData[i].title}
                </span>
              )}
            >
              {children}
            </SubMenu>
          )
        }else{   //如果没有子级菜单
          //itemIndex++;
          el.push(
            <Menu.Item key={menuData[i].path} title={menuData[i].title}>
              <Link to={menuData[i].path}>
                {menuData[i].icon ? <Icon type={menuData[i].icon} /> : null}
                <span>{menuData[i].title}</span>
              </Link>
            </Menu.Item>
          )
        }
      }

    };

    create(menuData,menu);
    return menu;
  })(this.props.menulist);

  render(){
    return(
        <>
        <Menu {...this.props}>
            {this.createMenu}
        </Menu>
        {/* <Router history={hashHistory}>
            <Route name="home" breadcrumbName="首页" path="/" component={MainLayout}>
                <IndexRoute name="undefined" breadcrumbName="未定义" component={() => <div>未定义</div>}/>
                <Route name="Development" breadcrumbName="施工中" path="Development" component={DevelopmentPage}/>
                <Route breadcrumbName="个人助理" path="CustomerWorkTodo" component={({children}) => <div className="box">{children}</div>}>
                    <Route name="Agency" breadcrumbName="待办事项" path="Agency" component={asyncComponent(() => load('GlobalNotification/CustomerWorkAssistantTodo/CustomerAgencyMatter'))}/>
                    <Route name="Already" breadcrumbName="已办事项" path="Already" component={asyncComponent(() => load('GlobalNotification/CustomerWorkAssistantTodo/CustomerAlreadyMatter'))}/>
                    <Route name="SystemMessage" breadcrumbName="系统消息" path="SystemMessage/:data" component={asyncComponent(() => load('GlobalNotification/SystemMessage/SystemMessage'))}/>
                    <Route name="SystemMessagePer" breadcrumbName="系统消息详情" path="SystemMessagePer/:data" component={asyncComponent(() => load('GlobalNotification/SystemMessage/SystemMessagePer'))}/>
                </Route>
            </Route>
        </Router>     */}
    </>   
    )
  }
  
}

export default Index;