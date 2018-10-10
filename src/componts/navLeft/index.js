import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import  './index.less'

import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
export default class navLeft extends Component {
  render() {
    return (
      <div>
        <div className="nav-left">
            <Menu mode="vertical" theme="dark">
              <MenuItem key="/首页"><Link to="/admin/home">首页</Link></MenuItem>
              <MenuItem key="/第二页"><Link to ="/admin/sencodePage">第二页</Link> </MenuItem>
              <MenuItem></MenuItem>
            </Menu>
        </div>
      </div>
    )
  }
}
