import React from "react";

import "./Breadcrumb.css";

const Breadcrumb = ({ crumbs }) => {
	return (
		<div>
			<ol id="body-breadcrumb" className="breadcrumb body mr-auto">
				{crumbs.map((crumb) => {
					if (crumb.link) {
						return (
							<li
								className="breadcrumb-item"
								key={Math.random(10)}
							>
								<a
									className="breadcrumb-link"
									href={crumb.link}
								>
									{crumb.title}
								</a>
							</li>
						);
					} else {
						return (
							<li
								className="breadcrumb-item"
								key={Math.random(10)}
							>
								{crumb.title}
							</li>
						);
					}
				})}
			</ol>
		</div>
	);
};

export default Breadcrumb;
