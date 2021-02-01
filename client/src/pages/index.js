import React, { useState } from 'react';
import { gql } from '@apollo/client';
import Loading from '../components/Loading';
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const Index = () => {
  const GET_TASKS = gql`
    {
      getTasks {
        description
        completed
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_TASKS);

  const [description, setDescription] = useState('');
  const submit = (data) => {
    signin({ username: data.email, password: data.password });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={this.handleSubmit(createTodo)}>
            <List>
              <ListItem>
                <ListItemText>
                  <TextField
                    name='description'
                    label='Description'
                    placeholder='Write your task'
                    value={description}
                    onChange={this.handleChange}
                    disabled={loading}
                    margin='normal'
                    required
                    fullWidth
                  />
                </ListItemText>
              </ListItem>
            </List>

            <div>
              <Button
                disabled={loading}
                type='submit'
                variant='fab'
                color='primary'
                aria-label='Add'
              >
                <AddIcon />
              </Button>
            </div>
          </form>
          {data.getTasks.map((getTasks) => (
            <p key={getTasks.id}>{getTasks.description}</p>
          ))}
        </>
      )}
    </>
  );
};
export default Index;
