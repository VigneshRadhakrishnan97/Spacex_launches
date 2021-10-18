import React from 'react'
import store from './store'
import {Provider} from 'react-redux'
import Landing from './Landing'
import Header from './Header'
import Launch from './components/Launch'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css'

const App = () => {
    return (
      <Provider store={store}>
        <Header />
        <Router>
          <Switch>
            <Route
              path="/launch/page/:no/:f/:o/filter/:st/:s/:e"
              component={Launch}
              exact
            />
            <Route path="/" component={Landing} exact />
          </Switch>
        </Router>
      </Provider>
    );
}

export default App
