import ProductAdminEdit from './products_admin_edit.js';
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

class ProductAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {products: [], links: []};
		this.handleClickPagination = this.handleClickPagination.bind(this);
		this.handleClickRemove = this.handleClickRemove.bind(this);
	}
	handleClickPagination(event){
		let page = event.target.getAttribute('page');
		this.loadProducts(page);	
	}
	handleClickRemove(event){
		let itemId = event.target.getAttribute('item');
		axios.delete('/api/product/delete/'+itemId)
				.then(res => {
				this.loadProducts();
		})
	}
	loadProducts( page = null){
		let endpoint = page != null ? page.replace('http:','') : '/api/products';
		axios.get(endpoint)
				.then(res => {
					const products = res.data.data;
					const links = res.data.meta.links;
					this.setState({ products, links });
		})
	}
	componentDidMount() {
		this.loadProducts();	
	}

	render() {
		return (
		<ReactRouterDOM.HashRouter>
			<div className="justify-content-center">
				<div className="container">
					<h1>Gift Shop Products Admin List</h1>
					
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Created Date</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{ this.state.products.map(product => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td><Link to={"/product/edit/"+product.id}>{product.name}</Link></td>
									<td>{product.created_at}</td>
									<td><button className="btn btn-danger" item={product.id} onClick={this.handleClickRemove}>Remove</button></td>
								</tr>
								))
							}
							
						</tbody>
					</table>

					<nav aria-label="Page navigation example">
						<ul className="pagination">
							{ this.state.links.map(link => (
								<li className={"page-item" + (link.active ? ' active':'')}>
									<a className="page-link" href="#" page={link.url} onClick={this.handleClickPagination}>{link.label.replace(/&(l|r)aquo;/, '')}</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</ReactRouterDOM.HashRouter>
		)
	}
}
export default ProductAdmin;
