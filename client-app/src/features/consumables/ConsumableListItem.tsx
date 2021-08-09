import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, ButtonGroup, Icon, Input, Table } from 'semantic-ui-react';
import { Consumable } from '../../app/models/consumable';
import { useStore } from '../../app/stores/store';

interface Props {
  consumable: Consumable;
}

function ConsumableListItem({ consumable }: Props) {
  const { orderStore, consumableStore } = useStore();

  const [quantity, setQuantity] = useState(0);

  const handleAddToOrder = () => {
    setQuantity(quantity + 1);

    if (orderStore.orderItemsToAdd.has(consumable.sapId)) {
      // already exists
      var val = orderStore.orderItemsToAdd.get(consumable.sapId)!;
      orderStore.orderItemsToAdd.set(consumable.sapId, val + 1);
    } else {
      // create entry
      orderStore.orderItemsToAdd.set(consumable.sapId, 1);
    }
  };
  const handleRemoveFromOrder = () => {
    if (quantity <= 0) return;

    setQuantity(quantity - 1);

    var val = orderStore.orderItemsToAdd.get(consumable.sapId)!;
    orderStore.orderItemsToAdd.set(consumable.sapId, val - 1);
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
