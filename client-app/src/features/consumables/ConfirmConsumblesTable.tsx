import { Field, FieldProps, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Form, Loader, Table } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

function ConfirmConsumablesTable() {
  const { tabStore, orderStore } = useStore();

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

        <Table.Body></Table.Body>
      </Table>

      <Divider horizontal>Comments</Divider>
      <Formik
        onSubmit={(values, { resetForm }) =>
          // commentStore.addComments(values).then(() => resetForm())
          console.log('submitted')
        }
        initialValues={{ body: '' }}
        // validationSchema={Yup.object({
        //   body: Yup.string().required(),
        // })}
      >
        {({ isSubmitting, isValid, dirty, handleSubmit }) => (
          <Form className="ui form">
            <Field name="body">
              {(props: FieldProps) => (
                <div style={{ position: 'relative' }}>
                  <Loader active={isSubmitting} />
                  <textarea
                    placeholder="Enter your comment (Press Enter for a new line)"
                    rows={2}
                    {...props.field}
                  />
                </div>
              )}
            </Field>
          </Form>
        )}
      </Formik>

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
        onClick={() => tabStore.setActiveTab(3)}
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
