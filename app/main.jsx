'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider, connect } from 'react-redux'
import {Route, Router, browserHistory, IndexRoute, IndexRedirect} from 'react-router';
import AppContainer from 'APP/app/containers/AppContainer'
import Play from 'APP/app/components/Play'
import Welcome from 'APP/app/components/Welcome'
import Analyze from 'APP/app/components/Analyze'
import store from './store'
import PlayContainer from 'APP/app/containers/PlayContainer'
import ResultsContainer from 'APP/app/containers/ResultsContainer'

render (
  <Provider store={store}>
   {/* <Root/> */}
   <Router history={browserHistory}>
   	<Route path='/' component={AppContainer} >
   		<IndexRoute component={Welcome}/>
      <Route path="/play" component={PlayContainer} />
      <Route path="/analyze" component={Analyze} />
      <Route path="/madlib" component={ResultsContainer} />
   	</Route>
   </Router>
  </Provider>,
  document.getElementById('main')
)