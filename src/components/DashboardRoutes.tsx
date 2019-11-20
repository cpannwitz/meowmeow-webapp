import React from 'react'
import { useRouteMatch, Switch, Route, match } from 'react-router-dom'
import { routePaths } from '../Routes'
import Onlinelist from './Onlinelist'
import Invitelist from './Invitelist'
import Matchlist from './Matchlist'

const DashboardRoutes: React.FC = () => {
  const { path } = useRouteMatch() as match<{}>
  return (
    <Switch>
      <Route exact path={path}>
        <Matchlist />
      </Route>
      <Route path={`${path}${routePaths.dashboard.invites}`}>
        <Invitelist />
      </Route>
      <Route path={`${path}${routePaths.dashboard.people}`}>
        <Onlinelist />
      </Route>
    </Switch>
  )
}

export default DashboardRoutes
