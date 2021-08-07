import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { useStore } from '../stores/store';

interface Props extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

function PrivateRoute({ component: Component, ...rest }: Props) {
  const { accountStore } = useStore();

  return (
    <Route
      {...rest}
      render={(props) =>
        accountStore.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
