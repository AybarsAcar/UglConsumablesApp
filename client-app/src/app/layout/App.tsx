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
import areaOfWorkForm from '../../features/areaOfWorks/areaOfWorkForm';
import OrderDashboard from '../../features/order-dashboard/OrderDashboard';
import OrderDetailedPage from '../../features/order-dashboard/OrderDetailedPage';
import UserOrders from '../../features/order-dashboard/UserOrders';
import AdminRoute from './AdminRoute';

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
                {/* USER ROUTES */}
                <PrivateRoute
                  exact
                  path="/consumables"
                  component={ConsumableDashboard}
                />

                <PrivateRoute
                  exact
                  path="/user/orders"
                  component={UserOrders}
                />

                {/* ADMIN ROUTES */}
                <AdminRoute
                  exact
                  path="/create/consumable"
                  component={ConsumableForm}
                />

                <AdminRoute
                  exact
                  path="/edit/consumable/:sapId"
                  component={ConsumableForm}
                />

                <AdminRoute
                  exact
                  path="/create/areaOfWork"
                  component={areaOfWorkForm}
                />

                <AdminRoute
                  exact
                  path="/edit/areaOfWork/:sapId"
                  component={areaOfWorkForm}
                />

                <AdminRoute
                  exact
                  path="/admin/orders"
                  component={OrderDashboard}
                />

                <AdminRoute
                  exact
                  path="/admin/orders/:id"
                  component={OrderDetailedPage}
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
