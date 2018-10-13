import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import  './index.less'

import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;
export default class navLeft extends Component {
  render() {
    return (
      <div>
        <div className="nav-left">
            <Menu mode="vertical" theme="dark">
              <MenuItem key="/首页"><Link to="/admin/home">首页</Link></MenuItem>
              <MenuItem key="/第二页"><Link to ="/admin/sencodePage">第二页</Link> </MenuItem>
              <MenuItem key="/order"><Link to ="/admin/order">订单管理</Link></MenuItem>
              <SubMenu title="图表" key="/图表">
                <MenuItem key="/bar"><Link to ="/admin/bar">条形图</Link></MenuItem>
                <MenuItem key="/pie"><Link to ="/admin/pie">饼图</Link></MenuItem>
              </SubMenu>
            </Menu>
        </div>
      </div>
    )
  }
}
