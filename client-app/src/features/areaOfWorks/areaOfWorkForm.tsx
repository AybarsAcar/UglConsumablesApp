import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import MyTextInput from '../../app/common/forms/MyTextInput';
import MyTextArea from '../../app/common/forms/MyTextArea';
import { Link } from 'react-router-dom';
import { AreaOfWorkFormValues } from '../../app/models/areaOfWork';

function AreaOfWorkForm() {
  const { consumableStore, areaOfWorkStore } = useStore();

  // to push the user to a page
  const history = useHistory();

  // get the id form the router params
  // if sapId exists then edit form, if not create form
  const { serviceOrderId } = useParams<{ serviceOrderId: string }>();

  let initialServiceOrderId: number | null = null;

  useEffect(() => {
    if (serviceOrderId != null) {
      initialServiceOrderId = Number(serviceOrderId);
      areaOfWorkStore.selectAreaOfWork(Number(serviceOrderId));
    }
  }, [
    serviceOrderId,
    consumableStore.loadConsumable,
    consumableStore,
    areaOfWorkStore,
  ]);

  const [areaOfWork, setAreaOfWork] = useState<AreaOfWorkFormValues>(
    new AreaOfWorkFormValues()
  );

  function handleFormSubmit(areaOfWork: AreaOfWorkFormValues) {
    if (initialServiceOrderId == null) {
      // creating a new one

      areaOfWorkStore
        .createAreaOfWork(areaOfWork)
        .then(() => history.push('/consumables'));
    } else {
      // updating an existing one
      // TODO
    }
  }

  const validationSchema = Yup.object({
    serviceOrder: Yup.number().required('Service Order is required'),
    description: Yup.string().required(
      'The area of work description is required'
    ),
  });

  if (areaOfWorkStore.isLoadingInitial) return <></>;

  return (
    <Segment clearing>
      <Header content="Area of Work Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={areaOfWork}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput
              type="number"
              name="serviceOrder"
              placeholder="Service Order"
            />

            <MyTextArea rows={3} placeholder="Description" name="description" />

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

export default observer(AreaOfWorkForm);
