import React from 'react';
import ReactDOM from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { createRoot } from 'react-dom/client';

import MainView from './components/main-view/main-view';


//import statement to indicate that you need to bundle `./index.scss`
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';


const store = createStore(moviesApp);

//Main component (will eventually use all others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView></MainView>
                </Container>
            </Provider>
        );
    }
}







//Find the root of your app
const container = document.getElementById('root')

//Tells react to render your app in the root DOM element
const root = ReactDOM.createRoot(container);
root.render(<MyFlixApplication/>);