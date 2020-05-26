import React, { Component } from 'react';
import Register from './components/register/Register'
import UploadPhoto from './components/register/UploadPhoto'
import UserDashboard from './components/dashboard/UserDashboard'
import UserChat from './components/profile/UserChat'
import NewsFeed from './components/profile/NewsFeed'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getItemFromStorage } from './utils/localStorage';


class App extends Component {



  render() {
    return (
      <Router>
        {(this.props.authToken !== null || this.props.data.login !== null) ?
          <div>
            <UserDashboard />
            <Switch>
              <Route path="/" exact component={NewsFeed} />
              <Route path="/chat:id" component={UserChat} />
            </Switch>
          </div>
          : this.props.data.updateUserDetails === null && this.props.data.registerUser !== null ?
            <Switch>
              <div>
                <Route path="/" exact component={UploadPhoto} />
              </div>
            </Switch>
            : <Switch>
              <div>
                <Route path="/" exact component={Register} />
              </div>
            </Switch>
        }
      </Router>

      // <div>
      //   <UserDashboard />
      // </div>
    );
  }
}

function mapStateToProps(data) {
  return {
    data,
    authToken: getItemFromStorage('jwtToken')
  }
}

export default connect(mapStateToProps)(App);
