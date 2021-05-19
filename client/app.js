import React from 'react';
import { connect } from 'react-redux';

import Nav from './components/Nav';
import Routes from './routes';
import { me } from './store';

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { loading } = this.props;
    if (loading) return <span style={{ placeSelf: 'center' }}>Loading</span>;

    return (
      <>
        <Nav />
        <Routes />
      </>
    );
  }
}

const mapState = (state) => ({
  loading: state.loading,
});

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(App);
