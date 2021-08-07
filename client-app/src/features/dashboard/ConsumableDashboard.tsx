import { observer } from 'mobx-react-lite';
import Stepper from '../../app/common/Stepper';
import { useStore } from '../../app/stores/store';
import ConfirmConsumblesTable from '../consumables/ConfirmConsumblesTable';
import AreaOfWorkSelection from './AreaOfWorkSelection';
import ConsumableList from './ConsumableList';

function ConsumableDashboard() {
  const { tabStore } = useStore();

  return (
    <>
      <Stepper activeStep={tabStore.activeTabIndex} />

      <AreaOfWorkSelection />
      <ConsumableList />
      <ConfirmConsumblesTable />
    </>
  );
}

export default observer(ConsumableDashboard);
