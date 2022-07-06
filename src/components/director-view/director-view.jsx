import React from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Col, Container, Card } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;
        
        return (
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title> {director?.Name} </Card.Title>
                                <Card.Text>Born: {director?.Birth} </Card.Text>
                                <Card.Text>About: {director?.Bio} </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>                
            </Container>
        )
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};