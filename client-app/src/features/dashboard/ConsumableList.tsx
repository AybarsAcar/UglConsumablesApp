import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ConsumableListItem from '../consumables/ConsumableListItem';

function ConsumableList() {
  const {
    consumableStore: {
      consumableRegistry,
      loadConsumables,
      consumables,
      isLoadingInitial,
      isLoading,
    },
    tabStore,
  } = useStore();

  useEffect(() => {
    if (consumableRegistry.size <= 1 && tabStore.activeTabIndex === 2) {
      loadConsumables();
    }
  }, [loadConsumables, consumableRegistry.size, tabStore.activeTabIndex]);

  if (tabStore.activeTabIndex !== 2) return <></>;

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
          {!isLoadingInitial &&
            consumables.map((consumable) => (
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
        onClick={() => tabStore.setActiveTab(3)}
        icon="right arrow"
        content="Next"
        labelPosition="right"
        floated="right"
        primary
      />
    </>
  );
}

export default observer(ConsumableList);
