import ProductAdmin from './products_admin.js';
import ProductAdminEdit from './products_admin_edit.js';
import Transaction from './transactions.js';
import "style.css";

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {currentTab: 'products'};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(event){
		this.setState({
			currentTab: event.target.name
		});
	}
	render () {
		return ( 
			<ReactRouterDOM.HashRouter>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="container-fluid">
						<div className="col-sm-10">
							<a className="navbar-brand" href="/">Gift Shop Products</a>
						</div>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<a className="btn btn-info" href="/">Back to Site</a>
							<Link className="btn btn-light ms-3" to="/logout">Logout</Link>
						</div>
					</div>
				</nav>
				<div className="justify-content-center">
					<div className="container">
						<ul className="nav nav-pills mb-3">
						  <li className="nav-item">
							<Link className={'nav-link' + (this.state.currentTab == 'products' ? ' active':'')} name="products" onClick={this.handleClick} to="/">Products</Link>
						  </li>
						  <li className="nav-item">
							<Link className={'nav-link' + (this.state.currentTab == 'addproduct' ? ' active':'')} name="addproduct" onClick={this.handleClick} to="/product/add">Add/Edit Product</Link>
						  </li>
						  <li className="nav-item">
							<Link className={'nav-link' + (this.state.currentTab == 'transactions' ? ' active':'')} name="transactions" onClick={this.handleClick} to="/transactions">Transactions Report</Link>
						  </li>
						</ul>
					</div>
				</div>
				<Route path="/" exact component={ProductAdmin} />
				<Route path="/logout" render={()=><Logout />} />
				<Route key="add" path="/product/add" component={ProductAdminEdit} />
				<Route key="editproduct" path="/product/edit/:id" component={ProductAdminEdit} />
				<Route path="/transactions" component={Transaction} />
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
