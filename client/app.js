import React from 'react';
import { connect } from 'react-redux';

import Nav from './components/Nav';
import Routes from './routes';
import LoadingPage from './components/LoadingPage';
import { me } from './store';

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { loading } = this.props;
    if (loading) return <LoadingPage />;

    return (
      <>
        <Nav />
        <Routes />
      </>
    );
  }
}

const mapState = (state) => ({
  loading: state.loading.general,
});

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(App);
