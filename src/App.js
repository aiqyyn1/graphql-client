import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useReducer, useState } from 'react';
import { GET_ALL_USERS } from './graphql/query/user';
import { CREATE_USER } from './graphql/mutations/user';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { name: action.name, email: state.email };
    case 'SET_EMAIL':
      return { name: state.name, email: action.email };
  }
}
function App() {
  const { data, loading, errors } = useQuery(GET_ALL_USERS);
  const { newUser } = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(reducer, { name: '', email: '' });
  const handleSetName = (e) => {
    dispatch({ type: 'SET_NAME', name: e.target.value });
  };
  const handleSetEmail = (e) => {
    dispatch({ type: 'SET_EMAIL', email: e.target.value });
  };

  const [createUser, { data1, error }] = useMutation(CREATE_USER);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const { data1 } = await createUser({
        variables: {
          name: state.name,
          email: state.email,
        },
      });

      console.log(data1);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  useEffect(() => {
    if (data && !errors) {
      setUsers(data.users);
    }
  }, [data]);
  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className='App'>
      <form onSubmit={handleAddUser}>
        <input type='text' onChange={handleSetName}></input>
        <input type='text' onChange={handleSetEmail}></input>
        <button type='submit'>submit</button>
      </form>
      {users.map((item) => (
        <div>
          <div>{!item.name ? '' : item.name}</div>
          <div>{item.email}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
