import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { ConsumableFormValues } from '../../app/models/consumable';
import { useStore } from '../../app/stores/store';

function ConsumableForm() {
  const { consumableStore } = useStore();

  // to push the user to a page
  const history = useHistory();

  // get the id form the router params
  // if sapId exists then edit form, if not create form
  const { sapId } = useParams<{ sapId: string }>();

  let initialSapId: number | null = null;

  useEffect(() => {
    if (sapId != null) {
      initialSapId = Number(sapId);
      consumableStore.loadConsumable(Number(sapId));
    }
  }, [sapId, consumableStore.loadConsumable, consumableStore]);

  const [consumable, setConsumable] = useState<ConsumableFormValues>(
    new ConsumableFormValues()
  );

  function handleFormSubmit(consumable: ConsumableFormValues) {
    if (initialSapId == null) {
    }
  }

  return <div></div>;
}

export default observer(ConsumableForm);
