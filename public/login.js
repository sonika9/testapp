import Register from './register.js';
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const Redirect = ReactRouterDOM.Redirect;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '', 
			password: '', 
			error: '', 
			history: null};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		if (this.props.location.state != null){
			const { bHistory } = this.props.location.state
			this.setState({
				history:bHistory
			});
		}
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value 
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		let errorMsg = '';
		if (email == '' || password == '') {
			errorMsg = 'Invalid username or password';
		}
		this.setState({
			error: errorMsg 
		});
		const user = {email:email, password:password};
		axios.defaults.withCredentials = true;
		axios.get('/sanctum/csrf-cookie').then(response => {
		axios.post('/api/user/login', user)
			.then(res => {
				const result = res.data;
				if (result.status == 'loggedin'){
					this.setState({
						loggedin: true,
						isAdmin: result.isAdmin
					});
					//this.state.history.push('/');
					window.location.href = '/';
				}
			})})
	}
	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="container col-md-3">
				<h1>Sign In</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="error">{this.state.error}</div>
						<div className="form-group row">
							<label>Email:</label>
							<input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
						</div>
						<div className="form-group row">
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
export default Login;
