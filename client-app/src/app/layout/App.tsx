import HomePage from '../../features/home/HomePage';
import { Route, Switch, useLocation } from 'react-router';
import { useStore } from '../stores/store';
import ModalContainer from '../common/ModalContainer';
import { Container, Loader } from 'semantic-ui-react';
import PrivateRoute from './PrivateRoute';
import NavBar from './NavBar';
import ConsumableDashboard from '../../features/dashboard/ConsumableDashboard';
import NotFound from '../../features/errors/NotFound';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import ConsumableForm from '../../features/consumables/ConsumableForm';

function App() {
  // get the location so we can re-render the component as the route changes
  const location = useLocation();

  const { commonStore, accountStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      accountStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, accountStore]);

  if (!commonStore.isAppLoaded) return <Loader>Loading ...</Loader>;

  return (
    <>
      <ModalContainer />
      <Route exact path="/" component={HomePage} />

      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/consumables"
                  component={ConsumableDashboard}
                />

                <PrivateRoute
                  exact
                  path="/create/consumable"
                  component={ConsumableForm}
                />

                <PrivateRoute
                  exact
                  path="/edit/consumable/:sapId"
                  component={ConsumableForm}
                />

                {/* NOT FOUND PAGE - This is a fallback page when the route is not found */}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
