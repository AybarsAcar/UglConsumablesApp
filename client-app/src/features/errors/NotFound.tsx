import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere and could not find this.
      </Header>
      <Segment.Inline>
        <Button size="large" as={Link} to="/consumables" primary>
          Return to dashboard
        </Button>
      </Segment.Inline>
    </Segment>
  );
}

export default NotFound;
