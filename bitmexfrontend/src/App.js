import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import Nav from './components/Nav'
import Routes from '../src/components/Routes'
import 'semantic-ui/dist/semantic.min.css'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <div className="App">
                {/* <Nav></Nav> HIER NAV??   */}
                <Home></Home>
              </div>
            </Routes>
          </BrowserRouter>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;