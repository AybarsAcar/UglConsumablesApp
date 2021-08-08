import { useField } from 'formik';
import { Dropdown, Form, Label, Select } from 'semantic-ui-react';
import { AreaOfWork } from '../../models/areaOfWork';

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
  isMultiple: boolean;
}

function MySelectInput(props: Props) {
  // helpers allows us to manually set a value
  // and manually set the touched status of the input component
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>

      <Dropdown
        selection
        multiple={props.isMultiple}
        fluid
        options={props.options}
        value={field.value}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}

export default MySelectInput;
