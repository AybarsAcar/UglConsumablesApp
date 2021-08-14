import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Divider, Form, Table } from 'semantic-ui-react';
import { OrderFormValues } from '../../app/models/order';
import { useStore } from '../../app/stores/store';

function ConfirmConsumablesTable() {
  const { tabStore, orderStore } = useStore();

  const [comment, setComment] = useState('');
  const [order, setOrder] = useState<OrderFormValues>(orderStore.orderToCreate);

  const handleSubmit = async () => {
    // add the comment to the order object
    order.comment = comment;

    // make the request
    await orderStore.confirmOrder(order);
  };

  if (tabStore.activeTabIndex !== 3) return <></>;

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sap Id</Table.HeaderCell>
            <Table.HeaderCell>Part Description</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Unit of Measure</Table.HeaderCell>
            <Table.HeaderCell>PRD</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orderStore.orderToCreate.orderItems.map((orderItem) => (
            <Table.Row key={orderItem.sapId}>
              <Table.Cell>{orderItem.sapId}</Table.Cell>
              <Table.Cell>{orderItem.description}</Table.Cell>
              <Table.Cell>{orderItem.quantity}</Table.Cell>
              <Table.Cell>{orderItem.unitOfMeasure}</Table.Cell>
              <Table.Cell>{orderItem.isPrd ? 'PRD item' : 'B01'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Divider horizontal>Comments</Divider>

      <Form className="ui form">
        <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setComment(e.target.value)
          }
          name="comment"
          value={comment}
          placeholder="Enter your comment (Press Enter for a new line)"
          rows={4}
        />
      </Form>

      <Divider />

      <Button
        onClick={() => tabStore.setActiveTab(2)}
        content="Back"
        floated="left"
        color="red"
      />

      <Button
        loading={false}
        type="button"
        onClick={() => {
          handleSubmit();
        }}
        icon="check"
        labelPosition="right"
        content="Confirm Order"
        floated="right"
        color="green"
      />
    </>
  );
}

export default observer(ConfirmConsumablesTable);
