const getApiUri = () => {
	var url;

	if (process.env.NODE_ENV === "production") {
		url = "https://vhi-jm.herokuapp.com/api";
	} else {
		url = "http://localhost:5000/api";
	}

	return url;
};

module.exports = getApiUri;
