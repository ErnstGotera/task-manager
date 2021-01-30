import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TASKS_QUERY = gql`
  query {
    tasksList {
      items {
        description
        completed
      }
    }
  }
`;

const Tasks = ({ tasks }) => {
  const { loading, error, data } = useQuery(GET_TASKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
};

export default Tasks;
