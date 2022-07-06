import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col, FormGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');


    //validate user inputs
    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username Required');
            isReq = false;
        }else if(username < 2){
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        }else if(password < 6){
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        if(!email){
            setEmailErr('Email Required');
            isReq = false;
        }else if(email.indexOf('@') === -1){
            setEmailErr('Email is invalid');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
            //sends request to server for authentication
            axios.post('https://berry-node-api.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday : birthday
            })
            .then(response =>{
                const data = response.data;
                console.log(data);
                alert("Registration complete, please login!");
                window.open('/', '_self');
                //page will open in current tab
            })
            .catch((response) => {
                console.log(response);
                alert("Error registering user");
            });
        }
    };

    return (
        <Row className="mt-5">
            <Col md={12}>
                <Form>
                    <h3>Sign Up</h3>
                    <p></p>
                    <Form.Group controlId="formUsername" className="reg-form-inputs">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="reg-form-inputs">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required minLength="5" />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="reg-form-inputs">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="updateBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" name="birthday" onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    <p></p>
                    <p>Already registered <Link to={'/'}>Sign in</Link> here</p>
                </Form>
            </Col>
        </Row>
    );
}

// RegistrationView.propTypes = {
//     register: PropTypes.shape({
//         Userame: PropTypes.string.isRequired,
//         Password: PropTypes.string.isRequired,
//         Email: PropTypes.string.isRequired
//     }),
// };