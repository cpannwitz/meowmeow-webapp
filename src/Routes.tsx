import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch, RouteProps } from 'react-router-dom'

import { useSession } from './services/firebase'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Welcome from './components/Welcome'
import GameScreen from './components/GameScreen'

export const routePaths = {
  home: '/',
  dashboard: {
    home: '/dashboard',
    invites: '/invites',
    people: '/people',
  },
  profile: '/profile',
  welcome: '/welcome',
  match: '/match/:matchId',
}

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const user = useSession()
  if (!user) {
    return (
      <Route
        render={({ location }) => (
          <Redirect
            to={{
              pathname: routePaths.home,
              state: { from: location },
            }}
          />
        )}
      ></Route>
    )
  }
  return <Route {...rest} render={() => <>{children}</>}></Route>
}
const PublicRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const user = useSession()
  if (user) {
    return (
      <Route
        render={({ location }) => (
          <Redirect
            to={{
              pathname: routePaths.dashboard.home,
              state: { from: location },
            }}
          />
        )}
      ></Route>
    )
  }
  return <Route {...rest} render={() => <>{children}</>}></Route>
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path={routePaths.home} component={Home} />
        <PrivateRoute path={routePaths.dashboard.home} component={Dashboard} />
        <PrivateRoute path={routePaths.profile} component={Profile} />
        <PrivateRoute path={routePaths.welcome} component={Welcome} />
        <PrivateRoute path={routePaths.match} component={GameScreen} />
      </Switch>
    </Router>
  )
}

export default Routes
