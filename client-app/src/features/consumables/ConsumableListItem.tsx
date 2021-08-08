import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Icon, Input, Table } from 'semantic-ui-react';
import { Consumable } from '../../app/models/consumable';

interface Props {
  consumable: Consumable;
}

function ConsumableListItem({ consumable }: Props) {
  return (
    <Table.Row>
      <Table.Cell>{consumable.sapId}</Table.Cell>
      <Table.Cell>{consumable.description}</Table.Cell>
      <Table.Cell>
        <Input
          type="number"
          name="orderQuantity"
          value={consumable.orderQuantity ?? 0}
        />

        <ButtonGroup floated="right">
          <Button animated="vertical" basic color="blue">
            <Button.Content hidden>Add</Button.Content>
            <Button.Content visible>
              <Icon name="plus" />
            </Button.Content>
          </Button>
          <Button animated="vertical" basic color="blue">
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
