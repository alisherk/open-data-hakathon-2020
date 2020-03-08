import React from 'react';
import Form from './components/Form';
import { Container, Grid, Divider } from 'semantic-ui-react';
import BarChart from './components/BarChart';
import Messages from './components/Messages';

function App() {
  return (
    <>
    <Divider />
      <Container>
        <Grid stackable>
          <Grid.Column width={10}>
            <Form />
          </Grid.Column>
          <Grid.Column width={6}>
            <Messages />
            <Divider />
            <BarChart />
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default App;
