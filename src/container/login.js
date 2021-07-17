import React from 'react';
import { client_id, client_secret, grant_type, scope, response_type, response_mode, state, redirect_uri, domain_url } from "./shared/authConfig"
import axios from 'axios';
import getFormData from 'form-data-urlencoded';

class Login extends React.Component {

	state = {
		name: "First Project",
	};

	componentDidMount() {
		this.getAuthConfigDetails();
	}

	getAuthConfigDetails = () => {
		const url = `${domain_url}/.well-known/openid-configuration`;
		const query = new URLSearchParams(this.props.location.search);
		axios.get(url).then((res) => {
			this.setState({
				authConfigDetails: res.data,
				tokenEndpoint: res.data.token_endpoint
			}, () => query.get('code') && this.getTokenDetails(res.data.token_endpoint, query.get('code')))
		}).catch((error) => {
			this.setState({
				message: "Some Error Occured",
			})
		});
	}

	getTokenDetails(apiUrl, code) {
		const data = {
			client_id,
			client_secret,
			redirect_uri,
			code,
			grant_type
		}
		const formData = getFormData(data);
		const url = apiUrl;

		axios.post(url, formData, { "Content-Type": "application/x-www-form-urlencoded" })
			.then((res) => {
				console.log('res: ', res.data);
				this.getUserDetails(this.state.authConfigDetails.userinfo_endpoint, res.data.access_token)
			})
			.catch((error) => {
				this.setState({
					message: "Some error occured",
				})
			});
	}

	getUserDetails = (apiUrl, token) => {
		const url = apiUrl;
		axios.get(url, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
			console.log('res.data: ', res.data);
			sessionStorage.setItem("username", res.data["https://auth0-info.com/email"]);
			this.props.history.push('/home');
		}).catch((error) => {
			this.setState({
				message: "Some Error Occured",
			})
		})
	}


	authConfigHandler = () => {
		let url = `${domain_url}/authorize?client_id=${client_id}&scope=${scope}&response_type=${response_type}&response_mode=${response_mode}&state=${state}&redirect_uri=${redirect_uri}`;
		window.location.href = url
	}

	render() {
		return <div>
			< h1 > Login page</ h1 >
			<button type="button" onClick={() => this.props.history.push('/home')}>Login to home</button>
			<button type="button" className="btn-transparent" onClick={this.authConfigHandler}>Login With Auth0</button>
		</div >
	}
}

export default Login;