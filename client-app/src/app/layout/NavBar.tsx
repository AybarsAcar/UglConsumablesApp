import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Container, Divider, Dropdown, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

function NavBar() {
  const { accountStore } = useStore();
  const { isLoggedIn } = accountStore;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          UGL Consumables
        </Menu.Item>

        {isLoggedIn && (
          <>
            <Menu.Item
              as={NavLink}
              exact
              to="/consumables"
              name="Order Consumables"
            />
            <Menu.Item as={NavLink} exact to="/errors" name="Errors" />
            <Menu.Item as={NavLink} exact to="/user/orders" name="My Orders" />
            <Menu.Item>
              <Dropdown pointing="top left" text="Admin">
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/admin/orders`}
                    text="Orders Dashboard"
                    icon="th list"
                  />
                  <Divider />
                  <Dropdown.Item
                    as={Link}
                    to={`/create/areaOfWork`}
                    text="Create an Area of Work"
                    icon="industry"
                  />

                  <Dropdown.Item
                    as={Link}
                    to={`/create/consumable`}
                    text="Create a Consumable"
                    icon="dolly"
                  />

                  <Dropdown.Item
                    onClick={accountStore.logout}
                    text="Logout"
                    icon="power"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </>
        )}
      </Container>
      <img
        src="/assets/ugl-limited-logo-vector.png"
        alt="logo"
        style={{ marginRight: '10px', width: '100px' }}
      />
    </Menu>
  );
}

export default observer(NavBar);
