import React, { Component, Fragment} from 'react';

import Navbar from './components/Navbar/Navbar';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Body />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
