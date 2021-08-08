import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ConsumableListItem from '../consumables/ConsumableListItem';

function ConsumableList() {
  const { consumableStore, tabStore } = useStore();

  if (tabStore.activeTabIndex !== 2) return <></>;

  return (
    <Segment clearing>
      <Header content="Select Consumables to Order" sub color="teal" />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sap Id</Table.HeaderCell>
            <Table.HeaderCell>Part Description</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {consumableStore.consumables.map((consumable) => (
            <ConsumableListItem consumable={consumable} />
          ))}
        </Table.Body>
      </Table>

      <Button
        onClick={() => tabStore.setActiveTab(1)}
        content="Back"
        floated="left"
        color="red"
      />

      <Button
        onClick={() => tabStore.setActiveTab(3)}
        icon="right arrow"
        content="Next"
        labelPosition="right"
        floated="right"
        primary
      />
    </Segment>
  );
}

export default observer(ConsumableList);
