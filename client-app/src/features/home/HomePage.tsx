import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Header,
  Segment,
  Image,
} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../account/LoginForm';
import RegisterForm from '../account/RegisterForm';

function HomePage() {
  const { accountStore, modalStore, commonStore } = useStore();

  useEffect(() => {
    accountStore.getUser();
  }, [accountStore]);

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          Consumables App
        </Header>
        <Image
          size="small"
          src="/assets/ugl-limited-logo-vector.png"
          alt="logo"
          style={{ position: 'absolute', right: '2%', bottom: '2%' }}
        />

        {commonStore.isAppLoaded && accountStore.isLoggedIn ? (
          <>
            <Header
              as="h2"
              inverted
              content={`Welcome ${accountStore.user?.username}`}
              style={{ paddingBottom: '50px' }}
            />
            <Button as={Link} to="/consumables" size="huge" inverted>
              Start ordering consumables
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register
            </Button>

            <Divider horizontal inverted>
              Or
            </Divider>
            <p>Contact UGL Application Support</p>
          </>
        )}
      </Container>
    </Segment>
  );
}

export default observer(HomePage);
