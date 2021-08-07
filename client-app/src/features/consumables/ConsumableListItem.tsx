import { observer } from 'mobx-react-lite';
import React from 'react';
import { Table } from 'semantic-ui-react';
import { Consumable } from '../../app/models/consumable';

interface Props {
  consumable: Consumable;
}

function ConsumableListItem({ consumable }: Props) {
  return (
    <Table.Row>
      <Table.Cell>{consumable.sapId}</Table.Cell>
      <Table.Cell>{consumable.description}</Table.Cell>
      <Table.Cell>{consumable.orderQuantity ?? 0}</Table.Cell>
    </Table.Row>
  );
}

export default observer(ConsumableListItem);
