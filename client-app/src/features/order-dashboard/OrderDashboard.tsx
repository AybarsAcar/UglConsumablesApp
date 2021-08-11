import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

function OrderDashboard() {
  const { orderStore } = useStore();

  useEffect(() => {
    if (orderStore.orders.length <= 0) {
      orderStore.loadOrders();
    }
  }, [orderStore, orderStore.loadOrders]);

  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Service Order</Table.HeaderCell>
          <Table.HeaderCell>Area of Work</Table.HeaderCell>
          <Table.HeaderCell>Created By</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Details</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {orderStore.orders.map((order) => (
          <Table.Row key={order.id}>
            <Table.Cell>{order.serviceOrderId}</Table.Cell>
            <Table.Cell>{order.areaOfWorkDescription}</Table.Cell>
            <Table.Cell>{order.createdBy}</Table.Cell>
            <Table.Cell>{order.createdAt}</Table.Cell>
            <Table.Cell>
              <Button
                floated="right"
                content="Not Completed"
                as={Link}
                to={`/admin/orders/${order.id}`}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default observer(OrderDashboard);
