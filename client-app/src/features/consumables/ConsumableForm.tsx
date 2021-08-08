import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { ConsumableFormValues } from '../../app/models/consumable';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { Button, Checkbox, Form, Header, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import MyTextInput from '../../app/common/forms/MyTextInput';
import MyTextArea from '../../app/common/forms/MyTextArea';
import MySelectInput from '../../app/common/forms/MySelectInput';
import { Link } from 'react-router-dom';
import { AreaOfWork } from '../../app/models/areaOfWork';
import { count } from 'console';

const unitOfMeasureOptions = [
  { text: 'EA', value: 'EA' },
  { text: 'M', value: 'M' },
  { text: 'L', value: 'L' },
  { text: 'BOX', value: 'BOX' },
];

function ConsumableForm() {
  const { consumableStore, areaOfWorkStore } = useStore();

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

    if (areaOfWorkStore.areaOfWorks.length <= 0) {
      // fetch again
      areaOfWorkStore.loadAreaOfWorks();
    }
  }, [sapId, consumableStore.loadConsumable, consumableStore, areaOfWorkStore]);

  const [consumable, setConsumable] = useState<ConsumableFormValues>(
    new ConsumableFormValues()
  );

  function handleFormSubmit(consumable: ConsumableFormValues) {
    if (initialSapId == null) {
      // creating a new one
      let newConsumable = {
        sapId: consumable.sapId!,
        description: consumable.description,
        unitOfMeasure: consumable.unitOfMeasure,
        isSite: consumable.isSite,
      };
      consumableStore
        .createConsumable(newConsumable)
        .then(() => {
          if (consumable.areaOfWorks.length > 0) {
            consumable.areaOfWorks.forEach((serviceOrder) => {
              consumableStore.addToServiceOrder(
                newConsumable.sapId,
                serviceOrder
              );
            });
          }
        })
        .then(() => history.push('/consumables'));
    } else {
      // updating an existing one
      // TODO
    }
  }

  const validationSchema = Yup.object({
    sapId: Yup.number().required('Consumable sap id is required'),
    description: Yup.string().required('The activity description is required'),
    unitOfMeasure: Yup.string().required('Unit of Measure is required'),
  });

  if (areaOfWorkStore.isLoadingInitial) return <></>;

  return (
    <Segment clearing>
      <Header content="Consumable Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={consumable}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput type="number" name="sapId" placeholder="Sap Id" />

            <MyTextArea rows={3} placeholder="Description" name="description" />

            <MySelectInput
              isMultiple={false}
              options={unitOfMeasureOptions}
              placeholder="Select a Unit of Measure"
              name="unitOfMeasure"
            />

            <Checkbox name="isSite" toggle label="Site" />

            <Header content="Area of Works" sub color="teal" />

            <MySelectInput
              isMultiple={true}
              options={areaOfWorkStore.areaOfWorkOptions}
              placeholder="Select Area of Works"
              name="areaOfWorks"
            />

            <Button
              loading={isSubmitting}
              floated="right"
              positive
              disabled={isSubmitting || !dirty || !isValid}
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/consumables"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ConsumableForm);
