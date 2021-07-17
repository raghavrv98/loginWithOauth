import history from "./history";
import { client_id, domain_url } from "./authConfig"

export function logoutHandler() {
	let url = `${domain_url}/logout?client_id=${client_id}`
	console.log('url: ', url);
	let internalUser = sessionStorage.getItem('internalUser')
	sessionStorage.clear();
	localStorage.clear();
	if (internalUser === "true") {
		history.push("/");
	}
	else {
		window.location.href = url
	}
}
