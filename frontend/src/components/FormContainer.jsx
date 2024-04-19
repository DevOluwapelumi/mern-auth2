import { Container, Row, Col, Card } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6}>
          <Card className='p-4 shadow'>
            {children}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
  