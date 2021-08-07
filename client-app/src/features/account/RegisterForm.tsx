import { Formik, ErrorMessage } from 'formik';
import { Form, Header, Label, Button } from 'semantic-ui-react';
import MyTextInput from '../../app/common/forms/MyTextInput';
import { useStore } from '../../app/stores/store';

function RegisterForm() {
  const { accountStore } = useStore();

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', error: '' }}
      onSubmit={(values, { setErrors }) =>
        accountStore
          .register(values)
          .catch((error) => setErrors({ error: error.response.data }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Enter Credentials to Register"
            color="blue"
            textAlign="center"
          />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
