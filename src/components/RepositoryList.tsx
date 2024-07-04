import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useRepositories } from '../hooks';
import Repository from './Repository';

const RepositoryList: React.FC = () => {
  const repositories = useRepositories();

  if (repositories.isLoading) {
    return <div className="text-center py-4"><Spinner /></div>;
  }

  if (!repositories?.total) {
    return <div className="text-center p-4">No repositories found</div>;
  }

  return (
    <>
      {repositories.items.map((repo, i) => <Repository key={i} repository={repo} className="mb-2" />)}
    </>
  );
}

export default RepositoryList;
