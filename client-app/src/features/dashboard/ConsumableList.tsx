import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { OrderItem } from '../../app/models/order';
import { useStore } from '../../app/stores/store';
import ConsumableListItem from '../consumables/ConsumableListItem';

function ConsumableList() {
  const { consumableStore, tabStore, orderStore } = useStore();

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
        onClick={() => console.log(orderStore.orderToCreate)}
        content="Log the order"
        floated="left"
        color="red"
      />

      <Button
        onClick={() => {
          for (var i = 0; i < orderStore.orderItemsToAdd.size; i++) {
            var key = Number(Object.keys(orderStore.orderItemsToAdd)[i]);

            var value = orderStore.orderItemsToAdd.get(key);

            var consumable = consumableStore.consumableRegistry.get(key);

            var newOrder = new OrderItem();

            newOrder.id = consumable!.id;
            newOrder.sapId = consumable!.sapId;
            newOrder.description = consumable!.description;
            newOrder.quantity = value!;
          }

          tabStore.setActiveTab(3);
        }}
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
