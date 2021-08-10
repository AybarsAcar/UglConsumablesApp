import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, ButtonGroup, Icon, Input, Table } from 'semantic-ui-react';
import { Consumable } from '../../app/models/consumable';
import { OrderItem } from '../../app/models/order';
import { useStore } from '../../app/stores/store';

interface Props {
  consumable: Consumable;
}

function ConsumableListItem({ consumable }: Props) {
  const { orderStore } = useStore();

  const [quantity, setQuantity] = useState(0);

  const handleAddToOrder = () => {
    setQuantity(quantity + 1);

    if (orderStore.orderItemsToAdd.has(consumable.sapId)) {
      // already exists
      var orderItem = orderStore.orderItemsToAdd.get(consumable.sapId)!;
      orderItem.quantity++;
    } else {
      // create entry
      var orderItem = new OrderItem(consumable);
      orderItem.quantity = 1;

      orderStore.orderItemsToAdd.set(orderItem.sapId, orderItem);
    }
  };
  const handleRemoveFromOrder = () => {
    if (quantity <= 0) return;

    setQuantity(quantity - 1);

    var orderItem = orderStore.orderItemsToAdd.get(consumable.sapId)!;

    orderItem.quantity--;
  };

  return (
    <Table.Row>
      <Table.Cell>{consumable.sapId}</Table.Cell>
      <Table.Cell>{consumable.description}</Table.Cell>
      <Table.Cell>
        <Input type="number" name="quantity" value={quantity} />

        <ButtonGroup floated="right">
          <Button
            onClick={handleAddToOrder}
            animated="vertical"
            basic
            color="blue"
          >
            <Button.Content hidden>Add</Button.Content>
            <Button.Content visible>
              <Icon name="plus" />
            </Button.Content>
          </Button>
          <Button
            onClick={handleRemoveFromOrder}
            animated="vertical"
            basic
            color="blue"
          >
            <Button.Content hidden>Remove</Button.Content>
            <Button.Content visible>
              <Icon name="minus" />
            </Button.Content>
          </Button>
        </ButtonGroup>
      </Table.Cell>
    </Table.Row>
  );
}

export default observer(ConsumableListItem);
