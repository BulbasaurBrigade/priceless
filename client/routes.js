/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/UserAuth/AuthForm';
import Admin from './components/Admin';

import Homepage from './components/Homepage';
import MainContainer from './components/MainContainer';
import CreatePost from './components/CreatePost';
import Chat from './components/chat/Chat';
import MyAccount from './components/myAccount/MyAccount';
import MyPosts from './components/myAccount/MyPosts';
import EditPost from './components/myAccount/EditPost';
import EditProfile from './components/myAccount/EditProfile';
import FAQ from './components/FAQ';
import MoreInfo from './components/UserAuth/MoreInfo';

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    const { isLoggedIn, hasDisplayName, isAdmin } = this.props;

    // If a user is logged in but has not display name
    // The website won't let them do anything except for update their profile, or log out
    if (isLoggedIn && !hasDisplayName) return <MoreInfo />;

    return (
      <>
        {/* All users have ability to view homepage, all posts, and FAQ */}
        {/* Not logged in users can log in or sign up */}
        {/* Logged in users have additional access to their account, ability to add posts and view chats */}
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/posts" component={MainContainer} />
            <Route path="/add" component={CreatePost} />
            <Route path="/chat/:chatId?" component={Chat} />
            <Route path="/myaccount" component={MyAccount} />
            <Route path="/myposts" component={MyPosts} />
            <Route path="/mypost/:id" component={EditPost} />
            <Route path="/profile" component={EditProfile} />
            <Route path="/faq" component={FAQ} />
            {/* Only gives a user access to admin routes if they are in fact an admin */}
            {isAdmin && <Route path="/admin/:view?" component={Admin} />}
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/posts" component={MainContainer} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/faq" component={FAQ} />
            <Redirect to="/login" />
          </Switch>
        )}
      </>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    hasDisplayName: !!state.auth.displayName,
    isAdmin: state.auth.isAdmin,
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Routes));
