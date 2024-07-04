import { useRepositories } from '../hooks';
import React from 'react';
import Pagination from './Pagination';


const PaginationRepositories: React.FC = () => {
  const repositories = useRepositories();

  if (!repositories.total) {
    return null;
  }

  return (
    <Pagination
      className="mx-auto"
      onClick={(params) => repositories.goto?.(params)}
      page={repositories.params.page}
      totalPages={repositories.totalPages}
      total={repositories.total}
    />
  );
}

export default PaginationRepositories;
