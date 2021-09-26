const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {products: [], links: [], categories: [], product_name: '', category_id: ''};
		this.handleClickPagination = this.handleClickPagination.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleClickPagination(event){
		let page = event.target.getAttribute('page');
		this.loadProducts(page);	
	}
	
	handleChange(event) {
		let value = event.target.value;
		this.setState({
			[event.target.name]: value 
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		let productName = this.state.product_name; 
		let category_id = this.state.category_id;
		let qs = 'product_name='+productName+'&category_id='+category_id;
		this.loadProducts(null, qs);
	}
	loadProducts( page = null, qs = '' ){
		let endpoint = page != null ? page+qs : ('/api/products/search'+(qs != '' ? '?'+qs : ''));
		axios.get(endpoint)
				.then(res => {
					const products = res.data.products.data;
					const links = res.data.products.links;
					this.setState({ products, links });
		})
	}
	componentDidMount() {
		let categoryId = this.props.match.params.id;
		let qs = '';
		if (typeof categoryId !== undefined && categoryId > 0) {
			qs = 'category_id='+categoryId;
			this.setState({category_id: categoryId});
		}
		this.loadProducts(null, qs);
		axios.get('/api/categories')
			.then(res => {
				const result = res.data;
				this.setState({ categories : result.data });
			})
	}
	render() {
		return (
		<ReactRouterDOM.HashRouter>
			<div className="d-flex justify-content-center">
				<div className="container products-list">
					<h1>Gift Shop Products List</h1>
						<form onSubmit={this.handleSubmit}>
							<div className="row mb-5">
								<div className="col">
									<input type="text" name="product_name" 
										value={this.state.product_name} 
										className="form-control" 
										placeholder="Search by product name"
										onChange={this.handleChange} />
								</div>
								<div className="col">
									<select className="form-select" name="category_id" onChange={this.handleChange}>
										<option value="0">Select a category</option>
										{ this.state.categories.map(category => (
											(this.state.category_id == category.id ?
												<option value={category.id} selected>{category.name}</option>
											:
											<option value={category.id}>{category.name}</option>)
										))}
									</select>
								</div>
								<div className="col">
									<button type="submit" className="btn btn-success">Search</button>
								</div>
							</div>
						</form>
					{ this.state.products.map(product => (
						<div key={product.id} className="d-inline-flex mb-3 product-box">
<div className="row">
							<div className="row">
								<Link to={"/product/detail/"+product.id}>
									<img className="product-image-small" src={"/images/products/"+product.image_path}/>
								</Link>
							</div>
							<div className="row item-title">{product.name}
							</div>
							<div className="row item-desc"><span className="item-price">${product.price}</span>{product.description.length > 120 ? product.description.substring(0,120) + '...' : product.description}
							</div>
</div>
						</div>
						))
					}

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
export default Product;
