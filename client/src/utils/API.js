import axios from "axios";
const headers = {
	"Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
	login: function(email, password) {
		return axios.post(`${burl}/user/login`,
			{
				email,
				password
			},
			{
				headers: headers
			}
		);
	},
	logout: function() {
		localStorage.clear();
	}
};