import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import  './index.less';
import { Menu, Icon } from 'antd';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import action from '../../redux/actionCreator'



// const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;
class navLeft extends Component {
  handleClick = (item, key, keyPath) => {
    let text = item.item.props.children.props.children
    // console.log(this.props.dispatch({type:'CHANGE_MENUITEM',text}))
    // console.log(this.props)
    this.props.action.changeMenu(text)
  }
  render() {
    return (
      <div>
        <div className="nav-left">
            <Menu mode="vertical" theme="dark" onClick={this.handleClick}>
              <MenuItem key="首页"><Link to="/admin/home">首页</Link></MenuItem>
              {/* <MenuItem key="第二页"><Link to ="/admin/sencodePage">第二页</Link></MenuItem> */}
              <MenuItem key="订单管理"><Link to ="/admin/order">订单管理</Link></MenuItem>
              <SubMenu title="图表" key="/图表">
                <MenuItem key="条形图"><Link to ="/admin/bar">条形图</Link></MenuItem>
                <MenuItem key="饼图"><Link to ="/admin/pie">饼图</Link></MenuItem>
              </SubMenu>
            </Menu>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  dispath => ({action:bindActionCreators(action,dispath)})
)(navLeft)