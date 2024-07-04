import { useContext } from 'react';
import { RepositoriesContext } from '../context';

const useRepositories = () => {
  return useContext(RepositoriesContext);
}

export default useRepositories;
