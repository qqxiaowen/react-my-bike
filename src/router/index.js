import React, { Component } from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'

import home from '../views/home'
import notMatch from '../views/notMatch'
import Admin from '../views/admin'
import sencodePage from '../views/sencodePage'

export default class Router extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <Switch>
                    {/* <Route path='/' exact component={Admin}/> */}
                    <Route path='/admin' render={() =>
                        <Admin>
                            <Switch>
                                <Route path='/admin/home' component={home}></Route>
                                <Route path='/admin/sencodePage' component={sencodePage}></Route>
                                <Route component={notMatch}/>
                            </Switch>
                        </Admin>
                    }></Route>
                    <Route component={notMatch}/>
                </Switch>
            </div>
      </HashRouter>
    )
  }
}
