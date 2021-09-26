import Login from './register.js';
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: '', password: '', email: '', error: '', history:null};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value 
		});
	}
	componentDidMount() {
		const { bHistory } = this.props.location.state
		this.setState({
			history : bHistory
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		let username = this.state.username;
		let password = this.state.password;
		let email = this.state.email;
		let errorMsg = '';
		let isValid = true;
		if (username == '') {
			errorMsg = 'Invalid username';
		} else if (email == '') {
			errorMsg = 'Invalid email';
		} else if (password == '') {
			errorMsg = 'Invalid password';
		}
		this.setState({
			error: errorMsg 
		});
		const user = {name:username, email:email, password:password};
		axios.post('/api/user/register', user)
			.then(res => {
				const result = res.data;
				if ( result.status == 'success' ) {
					this.state.history.push('/');
				} else {
					this.setState({
						error: result.message 
					});
				}
			})
		
	}
	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="container col-md-3">
					<h1>Create New Account</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="error">{this.state.error}</div>
						<div className="form-group row col-md-8">
							<label>Username:</label>
							<input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleChange} />
						</div>
						<div className="form-group row col-md-8">
							<label>Email:</label>
							<input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
						</div>
						<div className="form-group row col-md-8">
							<label>Password:</label>
							<input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
						</div>
						<div className="form-group mt-3 ml-0">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
export default Register;
