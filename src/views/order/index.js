import React, { Component } from 'react'
import './index.less'
import {axios} from '../../utils'
import {Form,Select,Card,DatePicker,Button,Table,message,Modal} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} =DatePicker

class order extends Component {


    state = {
        tableData:[],
        total:1,
        pageSize:1,
        pn:1,
        isloading:false,

        selectedkey:'',
        selectedinfo:'',
        isShowModal:false,

        endItem:'',
    }

    // 查询
    handleSearch =() => {
        // 打印所选的信息
        console.log(this.props.form.getFieldsValue())
    }

    // 重置
    handleClick = () => {
        this.props.form.resetFields()
    }

    // 点击订单详情按钮
    handledetil = () =>{
        if(this.state.selectedinfo){
            window.open(`#/orderdetail/${this.state.selectedinfo.id}`)
        }else{
            message.info('请先选择一条订单')
        }
    }
    // 点击结束订单按钮
    handleOrderEnd = () => {
        if(this.state.selectedinfo){
            axios.get(`/order/ebike_info`,{id:this.state.selectedinfo.id}).then(res => {
                this.setState({
                    isShowModal:true,
                    endItem:res.result
                })
            })
        }else{
            message.info('请先选择一条订单')
        }
    }

    // 用户确认结束订单
    handleModalEnd = () => {
        this.setState({
            isShowModal:false,
        })
        axios.get(`/order/finish_order`,{id:this.state.selectedinfo.id}).then(res => {
            if(res.code == 0){
                message.success('成功结束此订单')
                this.setState({
                    selectedinfo:'',
                    selectedkey:''
                })
                this.getTabledata()
            }else{
                message.error('此操作失败')
            }
        })
    }
    
    // 获取数据
    getTabledata(){
        let params = {
            pn:this.state.pn
        }
        this.setState({
            isloading:true
        })
        axios.get(`/order/demo_list`,params).then( res => {
            // console.log(res)
            if(res.code == 0){
                this.setState({
                    tableData:res.result.item_list.map((item,index) => {
                        item.key = index
                        return item
                    }),
                    total:res.result.total_count,
                    pageSize:10
                })
            }
            this.setState({
                isloading:false
            })
        })
    }
    componentWillMount(){
        this.getTabledata()
    }
 

  render() {
        const { getFieldDecorator } = this.props.form;
        const cityeg = [
            {
                name:'北京',
                value:'1'
            },
            {
                name:'上海',
                value:'2'
            },
            {
                name:'广州',
                value:'3'
            },
        ]
        const orderstatus = [
            {
                name:'进行中',
                value:'1'
            },
            {
                name:'已完成',
                value:'2'
            },
            {
                name:'结束行程',
                value:'3'
            },
        ]
        const tableColumns = [
            {
                title:'订单编号',
                dataIndex:'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                },
                key: 'distance'
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            },
            // {
            //     title: '状态',
            //     dataIndex: 'status',
            //     key: 'status'
            // },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
            }
        ]

        const pagination = {
            total : this.state.total,
            pageSize:this.state.pageSize,
            onChange:(x) => {
                // console.log('页码中的',x)
                this.setState({
                    pn : x
                },() => {
                    // console.log('state中的',this.state.pn)
                    this.getTabledata()
                })
            }
        }
        const rowSelection = {
            type : 'radio',
            selectedRowKeys : this.state.selectedkey,
            onChange : (selectedRowKeys, selectedRows) =>{
                console.log(selectedRowKeys, selectedRows)
                this.setState({
                    selectedkey:selectedRowKeys,
                    selectedinfo:selectedRows[0]
                })
            }
        }
    return (
      <div>
        <Card>
            <Form layout="inline">
                <FormItem label="城市">
                    {getFieldDecorator('city',{initialValue:'1'})(
                        <Select style={{width:150}} >
                            {cityeg.map(item => 
                                <Option value={item.value} key={item.value}>{item.name}</Option>
                            )}
                        </Select>
                     )}
                </FormItem>
                <FormItem label="订单时间">
                    {getFieldDecorator('ordertime')(
                       <RangePicker></RangePicker>
                    )}
                   
                </FormItem>
                <FormItem label="订单状态">
                    {getFieldDecorator('orderstatus',{initialValue:'1'})(
                       <Select style={{width:220}}>
                       {orderstatus.map(item => 
                           <Option value={item.value} key={item.value}>{item.name}</Option>
                       )}
                   </Select>
                    )}
                    
                </FormItem>
            </Form>
            <div className="btn-warp">
                <Button type="primary"  className="first-btn" onClick={this.handleSearch}>查询</Button>
                <Button onClick={this.handleClick}>重置</Button>
            </div>
        </Card>
        <Card style={{marginTop:'-1px'}}>
            <Button type="primary" className="mr20" onClick={this.handledetil}>订单详情</Button>
            <Button type="danger" onClick={this.handleOrderEnd}>结束订单</Button>
        </Card>
        <Card style={{marginTop:'-1px'}}>
             <Table
             dataSource={this.state.tableData}
             columns={tableColumns}
             pagination={pagination}
             loading={this.state.isloading}
             rowSelection={rowSelection}
             ></Table>           
        </Card>
        <Modal
          title="订单信息"
          visible={this.state.isShowModal}
          onOk={this.handleModalEnd}
          onCancel={() => {
            this.setState({isShowModal:false})
          }}
          okText="确认"
          cancelText="取消"
        >
        <ul className='ul-data'>
            <li>
                <span className='car-num li-title'>车辆编号：</span>
                {this.state.endItem.bike_sn}
            </li>
            <li>
                <span className='car-num li-title'>剩余电量：</span>
                {this.state.endItem.battery}
            </li>
            <li>
                <span className='car-num li-title'>行程开始时间：</span>
                {this.state.endItem.start_time}
            </li>
            <li>
                <span className='car-num li-title'>当前位置：</span>
                {this.state.endItem.location}
            </li>
        </ul>
        </Modal>
      </div>
    )
  }
}

export default  Form.create()(order)
