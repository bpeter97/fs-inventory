import React from 'react';
import { connect } from 'react-redux';

import Breadcrumb from '../common/Breadcrumb';
import NewJobForm from './NewJobForm';
import { getCall } from '../../redux/actions/callActions';

// import { getClients } from './../../redux/actions/clientActions';

class NewJob extends React.Component {
	componentDidMount() {
		let hasState = this.props.location.state;
		if (!hasState) {
			this.props.history.push('/');
		} else {
			this.props.getCall(hasState.id);
		}
	}

	render() {
		var crumbs = [
			{
				title: 'Dashboard',
				link: '/',
			},
			{
				title: 'Jobs',
				link: '/jobs',
			},
			{
				title: 'New Job',
			},
		];

		// Return new job page
		return (
			<div>
				<div className="container-fluid">
					<div className="col-12">
						<Breadcrumb crumbs={crumbs} />
					</div>
					<div className="col-12">
						<div className="row">
							<div className="col-12">
								{/* <!-- DataTales Example --> */}
								<div className="card shadow mb-4">
									<div className="card-header py-3">
										<h4 className="m-0 font-weight-bold vhi-blue text-center">
											New Job
										</h4>
									</div>
									<div className="card-body text-center">
										<NewJobForm
											history={this.props.history}
											call={this.props.call}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	call: state.calls.call,
});

export default connect(mapStateToProps, { getCall })(NewJob);
