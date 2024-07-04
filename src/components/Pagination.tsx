import React, { useCallback, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { RepositoriesContextT } from '../context';

export type PaginationComponentProps = {
  className?: string;
  onClick: RepositoriesContextT['goto'];
  page: number;
  total: number;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({ onClick, page, total }) => {
  const [currentPage, setCurrentPage] = useState(page);

  const handleClick = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    onClick({ page: newPage });
  }, []);

  return (
    <Pagination>
      <Pagination.First onClick={() => handleClick(1)} />
      <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} />

      {[...Array(total).keys()].map(pageNumber => (
        <Pagination.Item key={pageNumber + 1} active={pageNumber + 1 === currentPage} onClick={() => handleClick(pageNumber + 1)}>
          {pageNumber + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled={currentPage === total} />
      <Pagination.Last onClick={() => handleClick(total)} />
    </Pagination>
  );
}

export default PaginationComponent;
