import React, { Component } from 'react'
import './orderdetail.less'
import {Card} from 'antd'
import NewpageHeader from '../../componts/newpageHeader';

import {axios} from '../../utils'

export default class orderdetail extends Component {
  state = {
    orderinfo:{}
  }

  componentDidMount(){
    this.getdata()
  }
  getdata(){
    const {id} = this.props.match.params
    axios.get(`/order/detail`,{id}).then(res => {
      if(res.code == 0){
        console.log(res.result)
        this.setState({
          orderinfo: res.result
        })
        this.initMap()
      }
    })
  }

  // 初始化地图
  initMap = () => {
    const BMap = window.BMap
    this.map = new BMap.Map("container");          // 创建地图实例  
    this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    this.drapMapline()
    this.addControl()
    this.drapArea()
  }
  // 添加控件
  addControl = () => {
    const BMap = window.BMap
    this.map.addControl(new BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(20, 20)}));  //比例尺
    this.map.addControl(new BMap.NavigationControl({anchor:window.BMAP_NAVIGATION_CONTROL_SMALL}));  //平移缩放控件
  }
  // 汇总地图上的线和点
  drapMapline = () => {
    const BMap = window.BMap
    const spots = this.state.orderinfo
    let Startinfo = spots.position_list[0] //初始点
    let endsinfo = spots.position_list[spots.position_list.length-1] //末位点
    const StartSpot = new BMap.Point(Startinfo.lon, Startinfo.lat) // 创建起始点坐标 
    const endSpot = new BMap.Point(endsinfo.lon, endsinfo.lat) // 创建末位点坐标 
    this.map.centerAndZoom(StartSpot, 11);                 // 初始化地图，设置中心点坐标和地图级别
    
    let StartIcon = new BMap.Icon("/imgs/start_point.png", new BMap.Size(36, 42),{
      imageSize: new BMap.Size(36,42)
    });
    let EndIcon = new BMap.Icon("/imgs/end_point.png", new BMap.Size(36, 42),{
      imageSize: new BMap.Size(36,42)
    });  

    let markerStart = new BMap.Marker(StartSpot,{icon: StartIcon});        // 创建起始点标注    
    let markerEnd = new BMap.Marker(endSpot,{icon: EndIcon});        // 创建末位点标注    
    this.map.addOverlay(markerStart);                     // 将标注添加到地图中 
    this.map.addOverlay(markerEnd);                     // 将标注添加到地图中 

    // 生成折线图
    let ridingline = new BMap.Polyline(spots.position_list.map(item => {
        return new BMap.Point(item.lon,item.lat)
    }),
      {strokeColor:"#1869AD", strokeWeight:3, strokeOpacity:1}
      );
    this.map.addOverlay(ridingline);
    
  }
  // 绘制服务器
  drapArea = () => {
    const BMap = window.BMap
    const spots = this.state.orderinfo
      let ridingArea = new BMap.Polygon(spots.area.map(item => {
        return new BMap.Point(item.lon,item.lat)
    }),
      {
        strokeColor: '#ff0000',
        fillColor: '#ff6700',
        strokeOpacity:0.6,
        fillOpacity:0.3,
        strokeWeight:6
      }
      );
    this.map.addOverlay(ridingArea);
  }


 
  render() {
    return (
      <div>
        <NewpageHeader></NewpageHeader>
        <Card>
            <div id="container"></div>

        </Card>
      </div>
    )
  }
}
