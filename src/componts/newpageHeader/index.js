import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.less'

export default class newpageHeader extends Component {
    render() {
        return (
            <div className="header-warp new-header-warp">
                <h1 className="h1_ys fll"> 共享单车后台管理系统</h1>
                <div className="user-info clearfix">
                    <div className="flr">
                        <Link to='/login' className="layout" >退出</Link>
                    </div>
                    <div className="flr user-detail">
                        欢迎, <span className="username">旺财</span>
                    </div>
                </div>
            </div>
        )
    }
}
