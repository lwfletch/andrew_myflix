import React, { useState } from 'react';
// import { Form, FormGroup, Button, Row, Col, Container } from 'react-bootstrap/Form';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    //declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    //validate user inputs
    const validate = () => {
      let isReq = true;
      if(!username){
        setUsernameErr('Username Required');
        isReq = false;
      }else if(username.length < 2){
        setUsernameErr('Username must be at least 2 characters long');
        isReq = false;
      }
      if(!password){
        setPasswordErr('Password Required');
        isReq = false;
      }else if(password.length < 6){
        setPasswordErr('Password must be at least 6 characters long');
        isReq = false;
      }

      return isReq
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
          //send request to server for authentication
        axios.post('https://berry-node-api.herokuapp.com/login', {
            Username: username,
            Password: password
          })
            .then(response => {
              const data = response.data;
              props.onLoggedIn(data);
            })
            .catch(e => {
              console.log('no such user')
            });
        }
      };

    return (
        <Form className="form-login">
            {/* <img src='img/banner.png'></img> */}
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                {/* displays validation error */}
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                {/* displays validation error */}
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
    
}