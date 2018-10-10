import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../../style/componts.less'
import './index.less'

import {handletime} from '../../utils/util.js'



export default class Header extends Component {
  state={
    time:'',
    weather:''
  }

  gettime(){
    setInterval( () => {
      let newtime = new Date()
      let time = handletime(newtime)
      // console.log(newtime)
      this.setState({
        time
      })
    },1000)
  }
  getweather(){
    axios.get('http://t.weather.sojson.com/api/weather/city/101010100').then(res => {
      let data = res.data.data.forecast[0]
      console.log(data)
      this.setState({
        weather:`${data.low}~${data.high} ${data.fx} ${data.fl}`
      })
    })
  }

  componentWillMount(){
    this.gettime()
    this.getweather()
  }

  render() {
    return (
      <div className="header-warp">
        <div className="user-info clearfix">
          <div className="flr">
            <Link to='/login'>退出</Link>
          </div>
          <div className="flr user-detail">
            欢迎, <span className="username">旺财</span>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row2_right flr">
            {this.state.time}
            <span>{this.state.weather}</span>
          </div>
          <div className="row2_left fll">
            首页
          </div>
        </div>
      </div>
    )
  }


}
