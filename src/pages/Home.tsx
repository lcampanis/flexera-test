import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { RepositoriesProvider } from '../context';
import RepositoryList from '../components/RepositoryList';
import PaginationRepositories from '../components/PaginationRepositories';

const Home = () => {
  return (
    <RepositoriesProvider>
      <Container className="app">
        <Row>
          <Col>
            <h1>Browse Github</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <RepositoryList />
          </Col>
        </Row>

        <Row>
          <Col>
            <PaginationRepositories />
          </Col>
        </Row>
      </Container>
    </RepositoriesProvider>
  )
}

export default Home;
