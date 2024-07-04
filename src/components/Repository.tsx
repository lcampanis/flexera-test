import React, { useCallback, useMemo } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import useLocalStorageState from 'use-local-storage-state';
import { Respository } from '../actions';

export type RepositoryProps = {
  repository: Respository;
  className?: string;
}

const Repository: React.FC<RepositoryProps> = ({ repository, className }) => {
  const [flags, setFlags] = useLocalStorageState<number[]>('todos', {
    defaultValue: []
  });

  const isVisible = useMemo(() => !flags.includes(repository.id), [flags]);

  const handleFlagClick = useCallback(() => {
    const flagSet = new Set(flags);

    if (flagSet.has(repository.id)) {
      flagSet.delete(repository.id);
    } else {
      flagSet.add(repository.id);
    }

    setFlags(Array.from(flagSet));
  }, [flags]);

  return (
    <Card className={className}>
      <Card.Body className={`d-flex ${isVisible ? '' : 'opacity-50'}`}>
        <a href={repository.owner?.avatar_url} target="_blank" className="d-inline-block me-3">
          <Image src={repository.owner?.avatar_url} alt=" " className="rounded" style={{ width: 30, height: 30 }} />
        </a>
        <div>
          <Card.Text>{repository.full_name}</Card.Text>
          <Card.Text className="text-gray">{repository.description}</Card.Text>
        </div>
        <Button className="ms-auto align-self-start" onClick={handleFlagClick}>
          {isVisible ? '+' : '-'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Repository;
