import React, { Component } from 'react'
import { Table,  Space ,Form, Input, Button,Modal,Row, Col,
        TreeSelect } from 'antd';
import {PlusOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';
// import {GetRoleInfo} from 'api/system'
import {routersData} from 'assets/data'
import SelectIcon from "components/SelectIcon"

export default class RouterComponent extends Component {
  constructor(props) {
    super(props)
    this.searchRef = React.createRef()
    this.formRef = React.createRef()
    this.state={
      checkStrictly:false,
      data:[
          {
            key:'1',
            value:'1',
            path:'/admin/system',
            title:'系统管理',
            icon:'assets/icons/svg/system.svg',
            children:[
              {
                key:'1-1',
                value:'1-1',
                path:'/admin/system/router1',
                title:'菜单管理',
                component:'pages/System/RouterComponent/index.jsx',
                icon:'assets/icons/svg/component.svg'
              },
              { 
                  key:'1-2',
                  value:'1-2',
                  path:'/admin/system/user1',
                  title:'用户管理',
                  component:'pages/System/User/index.jsx',
                  icon:'assets/icons/svg/client.svg'
              }
            ],
          },
          {
            key:'2',
            value:'2',
            path:'/admin/data',
            icon:'',
            title:'数据中心',
            children:[]
          },
          {
              key:'3',
              value:'3',
              path:'/admin/order',
              icon:'',
              title:'订单中心',
              children:[]
          },
          {
              key:'4',
              value:'4',
              path:'/admin/client',
              icon:'',
              title:'客户中心',
              children:[]
          },
          {
              key:'5',
              value:'5',
              path:'/admin/',
              icon:'',
              title:'客户中心',
              children:[]
          }
        ],
      columns : [
          {
            title: '菜单名称',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            align:'center'
          },
          {
            title: '组件路径',
            dataIndex: 'path',
            key: 'path',
          },
          {
            title: '可见',
            dataIndex: 'isShow',
            key: 'isShow',
          },
          {
            title:'操作',
            align:'center',
            render: (row) => (
                <Space size="middle">
                  <Button type="link" onClick={()=>this.handleEdit(row)}  size="small" icon={<PlusOutlined />}>新增</Button>
                  <Button type="link" onClick={()=>this.handleEdit(row)}  size="small" icon={<EditOutlined />}>修改</Button>
                  <Button type="link"  size="small" icon={<DeleteOutlined />}>删除</Button>
                  
                </Space>
              )
          }
      ],
      isModalVisible:false,
      createData:{},
      treeData:[],
      loading:false
    }
  }
  componentDidMount(){
    this.setState({
      treeData:routersData
    })
  } 
    onFormLayoutChange = (value)=>{
        console.log(value,'change')
    }
    onFinish = (value) => {
        console.log(value)
    }
    // 弹窗确认按钮
    handleOk = (value)=>{
        console.log('验证通过？',value)
        this.setState({'isModalVisible':false})
    }
    // 取消按钮
    handleCancel = () =>{
        this.setState({'isModalVisible':false})
    }
    // 打开窗口
    openModel = ()=>{
        this.setState({isModalVisible:true})
    }
    // 修改
    handleEdit = (row)=>{
        let icon = row.icon.substring(17)
        icon = icon.substring(0,icon.length-4)
        const editData = {path:row.path,routerName:row.routerName,value:row.value,icon}
        console.log(editData)
        this.setState({isModalVisible:true,createData:editData})
    }
    onChangeTree = (value) =>{
        console.log(value)
    }
    changeShow = (manuData)=>{
        const manuList = []
        const showText = (manuData,manuList) =>{
            for(let i = 0 ; i < manuData.length ; i ++) {
                if(manuData[i].children) { // 有下一层菜单
                    let children = []
                    manuList.push({
                        ...manuData[i],
                        isShow:manuData[i].isShow?'是':'否',
                        children:showText(manuData[i].children,children)
                    })
                }else {
                    manuList.push({
                        ...manuData[i],
                        isShow:manuData[i].isShow?'是':'否'
                    })
                }
            } 
            return manuList
        }
        return showText(manuData,manuList)
    }
    // 选中图标
    selectIcon = (value) => {
      if(value) {
        this.formRef.current.setFieldsValue({icon:`assets/icons/svg/${value}.svg`})
      } else {
        this.formRef.current.setFieldsValue({icon:undefined})
      }
    }
    // 重置搜索
    resetQeryParams = ()=> {
        this.searchRef.current.resetFields()
    }
    // 查新列表
    getList = ()=>{
      
    }
    render() {
        const {isModalVisible,createData,treeData,loading} = this.state
        const data = this.changeShow(this.state.data)
        return (
            <>
                <Space align="center" style={{ marginBottom: 16 }}>
                    <Form layout="inline" onFinish={this.onFinish}
                    ref={this.searchRef}>
                        <Form.Item name="depart" >
                        <Input placeholder="部门名称" />
                        </Form.Item>
                        <Form.Item name="routerName">
                        <Input placeholder="路由名称" />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form.Item>
                        <Form.Item >
                            <Button onClick={this.resetQeryParams} >重置</Button>
                        </Form.Item>
                        <Form.Item >
                            <Button onClick={this.openModel} type="primary">新增</Button>
                        </Form.Item>
                    </Form>
                </Space>
                <Table
                    columns={this.state.columns}
                    loading={loading}
                    dataSource={data}
                />
                <Modal
                 title="新增菜单" visible={isModalVisible} onCancel={this.handleCancel}
                onOk={() => {
                    this.formRef.current
                      .validateFields()
                      .then((values) => {
                        this.formRef.current.resetFields();
                        console.log('refForm',this.formRef.current)
                        this.handleOk(values);
                      })
                      .catch((info) => {
                        console.log('Validate Failed:', info);
                      });
                  }}>
                    <Form labelCol={ {span: 6} } initialValues={createData} wrapperCol= { {span: 18} } ref={this.formRef}>
                        <Row gutter={16}>
                            <Col  className="gutter-row" span={12}>
                                <Form.Item label="上级菜单" name="value"
                                >
                                    <TreeSelect style={{width:'100%'}}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        treeData={treeData}
                                        placeholder="Please select"
                                        onChange={this.onChangeTree}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="菜单图标" name="icon">
                                    <SelectIcon selectIcon={this.selectIcon}/>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item name="routerName" label="菜单名称"
                                rules={[
                                  {
                                    required: true,
                                    message: '菜单名称不能为空',
                                  },
                                ]}>
                                    <Input placeholder="菜单名称" />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item name="path" label="路由组件"
                                rules={[
                                  {
                                    required: true,
                                    message: '路由组件必填',
                                  },
                                ]}>
                                    <Input placeholder="路由名称" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </>
        )
    }
}
