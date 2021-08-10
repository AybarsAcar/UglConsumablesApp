import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Divider, Form, Table } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

function ConfirmConsumablesTable() {
  const { tabStore, orderStore } = useStore();

  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // add the comment to the order object
    orderStore.orderToCreate.comment = comment;

    // make the request
    console.log(orderStore.orderToCreate);
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
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orderStore.orderToCreate.orderItems.map((orderItem) => (
            <Table.Row key={orderItem.id}>
              <Table.Cell>{orderItem.sapId}</Table.Cell>
              <Table.Cell>{orderItem.description}</Table.Cell>
              <Table.Cell>{orderItem.quantity}</Table.Cell>
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
        onClick={() => console.log(orderStore.orderToCreate)}
        content="Log the order"
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
