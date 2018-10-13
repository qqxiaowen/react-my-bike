import React, { Component } from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼状图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

import ceshiyangshi from '../ceshiyangshi'
import ceshiys2 from '../ceshiys2'
import themeLight from '../themeLight'


export default class pie extends Component {
    componentWillMount(){
        echarts.registerTheme('my_theme', 
        // ceshiys2
        // ceshiyangshi
        themeLight
        );
    }
    Option1 = {
        title : {
            text: '用户骑行订单',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            top:20,
            right:20,
            data: ['周一','周二','周三','周四','周五', '周六', '周日']
        },
        series : [
            { 
                name: '骑行订单',
                type: 'pie',
                radius : '60%',
                center: ['50%', '60%'],
                data:[
                    {value:1000, name:'周一'},
                    {value:2000, name:'周二'},
                    {value:2000, name:'周三'},
                    {value:1800, name:'周四'},
                    {value:2700, name:'周五'},
                    {value:5000, name:'周六'},
                    {value:10000, name:'周日'},
                ]
            }
        ]
    }
    Option2 = {
        title : {
            text: '用户骑行订单',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            top:20,
            right:20,
            data: ['周一','周二','周三','周四','周五', '周六', '周日']
        },
        series : [
            { 
                name: '骑行订单',
                type: 'pie',
                radius : ['50%','70%'],
                center: ['50%', '60%'],
                data:[
                    {value:1000, name:'周一'},
                    {value:2000, name:'周二'},
                    {value:2000, name:'周三'},
                    {value:1800, name:'周四'},
                    {value:2700, name:'周五'},
                    {value:5000, name:'周六'},
                    {value:10000, name:'周日'},
                ]
            }
        ]
    }
    render() {
        return (
            <div>
                <Card
                    title="饼图一"
                >
                    <ReactEcharts option={this.Option1} theme='my_theme'></ReactEcharts>
                </Card>

                 <Card
                    style={{marginTop:'-1px'}}
                    title="饼图二"
                >
                    <ReactEcharts option={this.Option2} theme='my_theme'></ReactEcharts>
                </Card>
               
            </div>
        )
    }
}
