import React from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Col, Container, Card } from 'react-bootstrap';

export class GenreView extends React.Component {
    render() {
    const { Genre, onBackClick } = this.props;
console.log(" props", this.props);
console.log(Genre);
        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title> {Genre?.Name} </Card.Title>
                                <Card.Text>Description: {Genre?.Description} </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* <Row className="mt-3">
                    <Col className="label">Genre: </Col>
                    <Col className="value">{genre.Genre.Name}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Description: </Col>
                    <Col className="value">{genre.Genre.Description}</Col>
                </Row> */}
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
            </Container>
        );
    }
}

// eslint-disable-next-line react/no-typos
GenreView.PropTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};