import React, { useState } from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';

import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const Index = () => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const submit = (data) => {
    setIsLoading(true);
    signin({ username: data.username, password: data.password });
  };

  return (
    <Mutation
      mutation={CREATE_TODO}
      variables={{ title, description }}
      update={this.handleUpdate}
    >
      {(createTodo, { loading }) => {
        return (
          <form onSubmit={this.handleSubmit(createTodo)}>
            <List>
              <ListItem>
                <ListItemText>
                  <TextField
                    name='description'
                    label='Description'
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
        );
      }}
    </Mutation>
  );
};

export default Index;
