import axios from "axios";
const headers = {
	"Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
	// envoi requête post via axios
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
	// se déconnecter
	logout: function() {
		localStorage.clear();
	}
};