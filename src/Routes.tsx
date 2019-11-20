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

const CustomRoute: React.FC<{ isPrivate?: boolean; isPublic?: boolean } & RouteProps> = ({
  isPrivate,
  isPublic,
  children,
  ...rest
}) => {
  const user = useSession()
  if (!user && isPrivate) {
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
  if (user && isPublic) {
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
        <CustomRoute exact path={routePaths.home} component={Home} isPublic />
        <CustomRoute path={routePaths.dashboard.home} component={Dashboard} isPrivate />
        <CustomRoute path={routePaths.profile} component={Profile} isPrivate />
        <CustomRoute path={routePaths.welcome} component={Welcome} isPrivate />
        <CustomRoute path={routePaths.match} component={GameScreen} isPrivate />
      </Switch>
    </Router>
  )
}

export default Routes
