import React, { useCallback, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { RepositoriesContextT } from '../context';

export type PaginationComponentProps = {
  className?: string;
  onClick: RepositoriesContextT['goto'];
  page: number;
  total: number;
  totalPages: number;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({ className, onClick, page, total, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(page);

  const handleClick = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    onClick({ page: newPage });
  }, []);

  return (
    <Pagination className={className}>
      <Pagination.First onClick={() => handleClick(1)} disabled={currentPage === 1}>&lt;&lt;</Pagination.First>
      <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>&lt;</Pagination.Prev>

      <Pagination.Item active={true}>
        {currentPage}
      </Pagination.Item>

      <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
}

export default PaginationComponent;
