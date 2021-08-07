import { Icon, Step } from 'semantic-ui-react';

interface Props {
  activeStep: number;
}

function Stepper({ activeStep }: Props) {
  return (
    <Step.Group ordered>
      <Step
        active={activeStep === 1}
        completed={activeStep > 1}
        disabled={activeStep < 1}
      >
        <Step.Content>
          <Step.Title>Area of Work</Step.Title>
          <Step.Description>Choose your area of work</Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={activeStep === 2}
        completed={activeStep > 2}
        disabled={activeStep < 2}
      >
        <Step.Content>
          <Step.Title>Consumables</Step.Title>
          <Step.Description>
            Enter the consumables you wish to order
          </Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={activeStep === 3}
        completed={activeStep > 3}
        disabled={activeStep < 3}
      >
        <Step.Content>
          <Step.Title>Confirm Order</Step.Title>
          <Step.Description>Confirm your list & add your note</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  );
}

export default Stepper;
