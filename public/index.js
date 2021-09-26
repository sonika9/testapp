import Product from './products.js';
import Register from './register.js';
import Login from './login.js';
import ProductDetail from './product_detail.js';

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

export const history = History.createBrowserHistory({forceRefresh:true});
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {loggedin: false, isAdmin: false};
	}
	componentDidMount(prevProps){
		axios.get('/api/user/isloggedin')
			.then(res => {
				const result = res.data;
				if (result.status == 'loggedin'){
					this.setState({
						loggedin: true,
						isAdmin: result.isAdmin
					});
				}
		})
	}
	render() {
		const { loggedin, isAdmin } = this.state;
		return (
			<ReactRouterDOM.HashRouter>

				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="container-fluid">
						<div className="col-sm-10">
							<Link className="navbar-brand" to="/">Gift Shop Products</Link>
						</div>
						{loggedin ?
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
									{isAdmin ? <a className="btn btn-info" href="/admin">Admin</a> : ''}
									<Link className="btn btn-light ms-3" to="/logout">Logout</Link>
							</div>
						:
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<Link className="btn btn-warning" to={{pathname:"/login", state:{bHistory: history}}}>Login</Link>
								<Link className="btn btn-light ms-2" to={{pathname:"/register", state:{bHistory: history}}}>Register</Link>
							</div>	
						}
					</div>

				</nav>
				<Route key="list" path="/" exact component={Product} />
				<Route key="listsearch" path="/category/:id" component={Product} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/logout" render={()=><Logout />} />
				<Route key="productdetail" path="/product/detail/:id" component={ProductDetail} />
			</ReactRouterDOM.HashRouter>
		)
	}
}
function Logout() {
	axios.get('/api/user/logout')
		.then(res => {
			window.location.href = '/';
		})
	return '' 
}
ReactDOM.render(<App />, document.querySelector('#root'));
