import React from "react";
import { connect } from "react-redux";
// import { Button, Modal } from "react-bootstrap";

import "./Home.css";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			noteModal: false,
			createCallModal: false,
			showFilters: false,
			deleteVerification: false,
			deleteId: null,
			notes: "",
		};
	}
	componentDidMount() {
		// this.props.getJobs();
		// this.props.getCalls();
	}

	render() {
		return (
			<div>
				<div className="container-fluid">
					<div className="col-12">
						{/* <Breadcrumb crumbs={crumbs} /> */}
					</div>
					<div className="col-12">
						<div className="row">
							<div className="col-12">
								{/* <!-- DataTales Example --> */}
								<div className="card shadow mb-4">
									<div className="card-header py-3">
										<h4 className="m-0 font-weight-bold fs-purple text-center">
											Dashboard
										</h4>
									</div>
									<div className="card-body text-center">
										sada
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Home);
