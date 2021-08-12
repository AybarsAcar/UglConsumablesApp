import { observer } from 'mobx-react-lite';
import {
  Button,
  Divider,
  Grid,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';

function OrderDetailedPage() {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  // get the id from hte url
  const { id } = useParams<{ id: string }>();

  const { orderStore } = useStore();

  useEffect(() => {
    orderStore.loadOrder(Number(id));
  }, [id, orderStore, orderStore.loadOrder]);

  return (
    <>
      <Segment>
        <Grid columns={3} divided>
          <Grid.Column>
            <Header
              as="h2"
              content={orderStore.selectedOrder?.serviceOrderId}
            />
          </Grid.Column>
          <Grid.Column>
            <Header
              as="h2"
              content={orderStore.selectedOrder?.areaOfWorkDescription}
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Header
              as="h4"
              content={moment(orderStore.selectedOrder?.createdAt).calendar()}
            />
            <Header
              as="h4"
              content={`by ${orderStore.selectedOrder?.createdBy}`}
            />
          </Grid.Column>
        </Grid>

        <Divider />
        <p>{orderStore.selectedOrder?.comment}</p>
      </Segment>

      <Segment>
        <Button
          onClick={(e) =>
            exportToCSV(orderStore.selectedOrder?.orderItems, 'file')
          }
          color="green"
          basic
          floated="right"
          content="Export as Excel File"
          style={{ marginBottom: 5 }}
        />
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sap Id</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orderStore.selectedOrder?.orderItems.map((order) => (
              <Table.Row key={order.sapId}>
                <Table.Cell>{order.sapId}</Table.Cell>
                <Table.Cell>{order.description}</Table.Cell>
                <Table.Cell>{order.quantity}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
}

export default observer(OrderDetailedPage);
