import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
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
            <Menu.Item>
              <Button
                as={NavLink}
                exact
                to="/createActivity"
                positive
                content="Create Activity"
              />
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
