import { observer } from 'mobx-react-lite';
import { Container, Item } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

function AreaOfWorkSelection() {
  const { tabStore } = useStore();

  if (tabStore.activeTabIndex !== 1) return <></>;

  return (
    <Container>
      <Item.Group>
        <Item>
          <Item.Content verticalAlign="middle">
            <Item.Header
              as="a"
              onClick={() => {
                tabStore.setActiveTab(2);
              }}
              content="Car Shop 2 Vehicle Builders"
            />
          </Item.Content>
        </Item>

        <Item>
          <Item.Content verticalAlign="middle">
            <Item.Header
              as="a"
              onClick={() => {
                tabStore.setActiveTab(2);
              }}
              content="Car Shop 2 Mechanicals"
            />
          </Item.Content>
        </Item>

        <Item>
          <Item.Content verticalAlign="middle">
            <Item.Header
              as="a"
              onClick={() => {
                tabStore.setActiveTab(2);
              }}
              content="Car Shop 1 Fabrication"
            />
          </Item.Content>
        </Item>
        <Item>
          <Item.Content verticalAlign="middle">
            <Item.Header
              as="a"
              onClick={() => {
                tabStore.setActiveTab(2);
              }}
              content="Bogie Overhaul"
            />
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
}

export default observer(AreaOfWorkSelection);
