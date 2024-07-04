import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useRepositories } from '../hooks';
import RepositoryList from './RepositoryList';

// Hook is mocked
jest.mock('../hooks');

// Mock the Repository component
jest.mock('./Repository', () => () => <div>Mocked Repository</div>);

describe('RepositoryList', () => {
  test('shows loading spinner when repositories are loading', () => {
    (useRepositories as jest.Mock).mockReturnValue({
      isLoading: true,
      items: [],
      total: 0,
    });

    render(<RepositoryList />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows no repositories found message when there are no repositories', () => {
    // Mock the hook's return value
    (useRepositories as jest.Mock).mockReturnValue({
      isLoading: false,
      items: [],
      total: 0,
    });

    render(<RepositoryList />);

    expect(screen.getByText('No repositories found')).toBeInTheDocument();
  });

  test('renders list of repositories when data is available', () => {
    (useRepositories as jest.Mock).mockReturnValue({
      isLoading: false,
      items: [{ id: 1, name: 'Repo 1' }, { id: 2, name: 'Repo 2' }],
      total: 2,
    });

    render(<RepositoryList />);

    expect(screen.getAllByText('Mocked Repository').length).toBe(2);
  });
});
