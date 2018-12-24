import React, { Component, Fragment} from 'react';

import Navbar from './components/Navbar/Navbar';
import Body from './components/Body/Body';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Body />
      </Fragment>
    );
  }
}

export default App;
