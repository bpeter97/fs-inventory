import React, { Component } from 'react';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import PrivateRoute from "./../components/common/PrivateRoute"
import { ConnectedRouter as Router } from 'connected-react-router';
import PrivateRoute from './../components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import setAuthToken from './../utils/setAuthToken';
import { setCurrentUser, logoutUser } from './../redux/actions/authActions';

import Sidebar from '../components/navbar/Sidebar';
import Topbar from '../components/navbar/Topbar';
import Footer from '../components/footer/Footer';
import Home from '../components/home/Home';
import Admin from '../components/admin/Admin';
import Login from '../components/login/Login';
import Register from '../components/registration/Register';
import NotFound from '../components/notfound/NotFound';
import Notifications from '../components/notifications/Notifications';
import Settings from '../components/settings/Settings';
import Users from '../components/users/Users';
import CreateUser from '../components/users/CreateUser';
import NewCall from '../components/call/NewCall';
import EditCall from '../components/call/EditCall';

const createHistory = require('history').createBrowserHistory;

const history = createHistory({ forceRefresh: true });

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Sidebar />

					{/* <!-- Content Wrapper --> */}
					<div id="content-wrapper" className="d-flex flex-column">
						{/* <!-- Main Content --> */}
						<div id="content">
							<Topbar />
							<Switch>
								<PrivateRoute exact path="/" component={Home} />
								<Route exact path="/login" component={Login} />
								<Route
									exact
									path="/register"
									component={Register}
								/>
								<PrivateRoute
									exact
									path="/notifications"
									component={Notifications}
								/>
								<PrivateRoute
									exact
									path="/settings"
									component={Settings}
								/>
								<PrivateRoute
									exact
									path="/admin"
									component={Admin}
								/>
								<PrivateRoute
									exact
									path="/calls/new"
									component={NewCall}
								/>
								<PrivateRoute
									exact
									path="/calls/edit"
									component={EditCall}
								/>
								<PrivateRoute
									exact
									path="/users"
									component={Users}
								/>
								<PrivateRoute
									exact
									path="/users/create"
									component={CreateUser}
								/>
								<Route component={NotFound} />
							</Switch>

							<Footer />
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
