import React, { Component } from 'react'
import './index.less'
import Header from '../../componts/header'
import NavLeft from '../../componts/navLeft'
import Footer from '../../componts/footer'
import { Row, Col } from 'antd';
export default class admin extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={4}><NavLeft /></Col>
          <Col span={20}>
            <Header />
            <div className="content-wrap">
              <div className="content">
                {this.props.children}
              </div>
            </div>
            <Footer />
          </Col>
        </Row>
        
        
      </div>
    )
  }
}
