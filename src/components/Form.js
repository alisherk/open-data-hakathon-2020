import React, { useState } from 'react';
import { Form, Segment, Header, Message } from 'semantic-ui-react';
import { processMessage } from '../actions/actions';

const options = [
  { key: 1, text: 'Yes', value: 'yes' },
  { key: 2, text: 'No', value: 'no' }
];
const InputComponent = () => {
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const [resp, setResponse] = useState();

  const handleChange = (e, { value }) => {
    setSeverity(value);
  };

  const onSubmit = async () => {
    const data = {
      message,
      severity
    };
   const msg = await processMessage(data);
   setResponse(msg);
  };

  return (
    <Segment>
      <Header sub content='Submit incident' />
      <Form onSubmit={onSubmit}>
        <Form.Input
          onChange={e => setMessage(e.target.value)}
          placeholder='Your query'
        />
        <Form.Dropdown
          selection
          placeholder='Mark severity'
          options={options}
          onChange={handleChange}
          value={severity}
        />
        <Form.Button primary content='submit' />
      </Form>
      {resp && (
         <Message content={resp} /> 
      )}
    </Segment>
  );
};

export default InputComponent;
