import React, { Component } from 'react'
import { Table, Tag ,Button ,Space ,Form, Input, Modal,Row, Col,Select,
    message} from 'antd';
import { UserOutlined, LockOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import {addUsers,getUsers,delUsers} from '../../../api/system/users'
// getUsersAll
export default class User extends Component {
    constructor(props){
        super(props)
        this.searchRef = React.createRef()
        this.handelSearchRef = React.createRef()
        this.formRef = React.createRef()
        this.state = {
            statesOptions:[
                {
                    value:'00',
                    label:'正常'
                },
                {
                    value:'01',
                    label:'关闭'
                }
            ],
            columns:[
                {
                    title: '用户名',
                    dataIndex: 'username',
                    key: 'username',
                    render: text => <a>{text}</a>,
                  },
                  {
                    title: '状态',
                    key: 'states',
                    dataIndex: 'states',
                    render: text => (
                      <>
                        <Tag color={text==='00'?'green':'magenta'}>
                            {this.showStates(this.state.statesOptions,text)}
                        </Tag>
                      </>
                    ),
                  },
                  {
                    title: '操作',
                    key: '_id',
                    align:'center',
                    render: (text, record) => (
                      <Space size="middle">
                        <Button type="text" size="small" onClick={()=>this.editHandel(record)}>修改</Button>
                        <Button type="text" size="small" onClick={()=>this.delHandel(record)} danger>删除</Button>
                      </Space>
                    ),
                  }
            ],
            data:[],
            page:{
                pageSize:10,
                pageNum:1
            },
            total:0
        }
        this.isModalVisible = false
        this.initData = {}
    }
    componentDidMount(){
        this.getList({pageNum:1,pageSize:10})
    }
    getList = (queryParams) => {
        getUsers(queryParams).then(res=>{
            this.setState({total:res.data.total,data:res.data.records}) 
        })
    }
    showStates = (statesOptions,state) =>{
        let stateLabel = statesOptions.find(item=>item.value === state)
        if(!stateLabel) return ""
        return stateLabel.label
    }
    editHandel = (row) => {
        console.log('修改',row)
    }
    delHandel = (row) => {
        Modal.confirm({
            title: `确认删除用户${row.username}`,
            icon: <ExclamationCircleOutlined />,
            centered:true,
            width:'400',
            okText: '确认',
            wrapClassName:'text-center',
            cancelText: '取消',
            onOk:()=>{
                delUsers({id:row.id}).then(res=>{
                    if(res.code===200) {
                        message.success({content:'删除成功！'})
                        this.getList({pageSize:1,pageNum:10})
                    }
                })
            }
          });
       
    }
    onFinish = (value) => {
        console.log(this.searchRef.current.getFieldValue())
        let {pageNum,pageSize} = this.state.page
        this.getList({...value,pageNum,pageSize})
    }
    resetQeryParams = () => {
        this.searchRef.current.resetFields()
        this.handelSearchRef.current.click()
    }
    openModel = ()=>{
        console.log('新增')
        this.setState({isModalVisible:true,initData:{
            sex:'0',
            states:'00',
        }})
    }
    // 关闭窗口
    handleCancel = () => {
        this.formRef.current.resetFields()
        this.setState({
            isModalVisible:false
        })
    }
    // 确定提交
    handleOk = (data) => {
        console.log(data)
         addUsers(data).then(res=>{
            if(res.code===200) {
                message.success(
                    {
                        content:'新增成功！'
                    }
                )
                this.setState({isModalVisible:false})
                let {pageNum,pageSize} = this.state.page
                this.getList({pageNum,pageSize})
            } else {
                message.error({
                    content:res.msg
                });
            }
        })
    }
    changePage = (pageNum,pageSize) => {
        this.setState({page:{pageSize,pageNum}})
    }
    render() {
        const {columns,data,isModalVisible,statesOptions,initData,page,total} = this.state
        return (
            <>
            {/* 搜索 */}
            <Space align="center" style={{ marginBottom: 16 }}>
                <Form layout="inline" onFinish={this.onFinish}
                    ref={this.searchRef}>
                    <Form.Item name="username" >
                    <Input placeholder="用户" />
                    </Form.Item>
                    <Form.Item name="states">
                    <Input placeholder="状态" />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" ref={this.handelSearchRef}  htmlType="submit">搜索</Button>
                    </Form.Item>
                    <Form.Item >
                        <Button onClick={this.resetQeryParams} >重置</Button>
                    </Form.Item>
                    <Form.Item >
                        <Button onClick={this.openModel} type="primary">新增</Button>
                    </Form.Item>
                </Form>
            </Space>
            {/* 表格 */}
            <Table columns={columns} dataSource={data} 
            pagination={{ showSizeChanger:true ,
            total:total,
            pageSize:page.pageSize,
            current:page.pageNum,
            showTotal:() => `共 ${total} 条`,
            onChange:(page,pageSize)=>{this.changePage(page,pageSize)}}} />
            {/* 模态框 */}
            <Modal
                 title="新增用户" visible={isModalVisible} cancelText="取消" okText="确定" onCancel={this.handleCancel}
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
                    <Form labelCol={ {span: 6} } initialValues={initData} wrapperCol= { {span: 18} } ref={this.formRef}>
                        <Row gutter={16}>
                            <Col  className="gutter-row" span={12}>
                                <Form.Item label="用户名" name="username"
                                rules={[
                                    {
                                      required: true,
                                      message: '用户名必填',
                                    },
                                  ]}>
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                                </Form.Item>
                            </Col>
                            <Col  className="gutter-row" span={12}>
                                <Form.Item label="密码" name="password" hasFeedback
                                rules={[
                                    {
                                      required: true,
                                      message: '密码不能为空',
                                    },
                                    {
                                        required: true,
                                        min:6,
                                        message: '密码不能少于6个字符',
                                    }
                                  ]}>
                                <Input 
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"  placeholder="密码" />
                                </Form.Item>
                            </Col>
                            <Col  className="gutter-row" span={12}>
                                <Form.Item label="状态" name="states">
                                    <Select>
                                        {statesOptions.map(item=>{
                                            return (
                                                <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                                            )
                                        })}
                                        
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col  className="gutter-row" span={12}>
                                <Form.Item label="确认密码" name="password2"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                  {
                                    required: true,
                                    message: '确认密码！',
                                  },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('密码不一致'));
                                    },
                                  }),
                                ]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"  placeholder="确认密码" />
                                </Form.Item>
                            </Col>
                            <Col  className="gutter-row" span={12}>
                                <Form.Item label="性别" name="sex">
                                    <Select>
                                        <Select.Option value="0">男</Select.Option>
                                        <Select.Option value="1">女</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col  className="gutter-row" span={12}>
                                <Form.Item label="手机号" name="phone">
                                    <Input  placeholder="用户名" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </>
        )
    }
}
