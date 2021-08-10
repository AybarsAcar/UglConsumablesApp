import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container, Item } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

function AreaOfWorkSelection() {
  const { tabStore, areaOfWorkStore, orderStore } = useStore();

  useEffect(() => {
    if (areaOfWorkStore.areaOfWorks.length <= 0) {
      areaOfWorkStore.loadAreaOfWorks();
    }
  }, [areaOfWorkStore]);

  if (tabStore.activeTabIndex !== 1) return <></>;

  return (
    <Container>
      <Item.Group>
        {!areaOfWorkStore.isLoadingInitial &&
          areaOfWorkStore.areaOfWorks.map((areaOfWork) => (
            <Item key={areaOfWork.id}>
              <Item.Content verticalAlign="middle">
                <Item.Header
                  as="a"
                  onClick={() => {
                    areaOfWorkStore.selectAreaOfWork(areaOfWork.serviceOrder);
                    orderStore.orderToCreate.serviceOrderId =
                      areaOfWork.serviceOrder;

                    tabStore.setActiveTab(2);
                  }}
                  content={areaOfWork.description}
                />
              </Item.Content>
            </Item>
          ))}
      </Item.Group>
    </Container>
  );
}

export default observer(AreaOfWorkSelection);
