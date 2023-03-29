import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Tasks() {
  return (<>
    <h2>Showing tasks</h2>
    <Card>
      <Card.Header>2 Quotes Received</Card.Header>
      <Card.Body>
        <Card.Title>Fixing the broken stairs</Card.Title>
        <Card.Text>
          This task would need 5 days of work
        </Card.Text>
        <Button variant="primary">Home</Button>
        
        <Button variant="primary">Next</Button>
      </Card.Body>
    </Card>
    </>
  );
}

export default Tasks;