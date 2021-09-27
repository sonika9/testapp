const PRODUCT_DETAIL = 1; 
const ADDED_TO_CART = 2;
const REMOVED_ITEMS = 3;
const CHECKED_OUT = 4;

const Link = ReactRouterDOM.Link;

class ProductDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { detailType: PRODUCT_DETAIL, quantity: 1, payment_type: 1 };
		this.handleClickAddToCart = this.handleClickAddToCart.bind(this);
		this.handleClickCheckout = this.handleClickCheckout.bind(this);
		this.handleClickRemoveFromCart = this.handleClickRemoveFromCart.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		let value = event.target.value;
		this.setState({
			[event.target.name]: value 
		});
	}
	handleClickAddToCart(event){
		let userProducts = localStorage.getItem('userProducts');
		let userProductsTotal = localStorage.getItem('userProductsTotal');
		let itemId = this.state.product.id;
		userProductsTotal = userProductsTotal == null ? 0 : parseInt(userProductsTotal);
		for (let i=0; i < this.state.quantity; i++) {
			userProductsTotal = userProductsTotal + parseInt(this.state.product.price);
			userProducts = (userProducts == null || userProducts == '') ? itemId.toString() : userProducts.concat(',',itemId);
			localStorage.setItem('userProducts', userProducts);
		}
		localStorage.setItem('userProductsTotal', userProductsTotal);
		let totalArticles = userProducts.split(',').length;
		this.setState({
			detailType: ADDED_TO_CART,
			userProductsTotal,
			totalArticles
		});
	}
	handleClickRemoveFromCart(event){
		localStorage.setItem('userProducts', '');
		localStorage.setItem('userProductsTotal', 0);
		this.setState({detailType: REMOVED_ITEMS, 
			message: 'The items have been removed from your cart'});
	}
	handleClickCheckout(event){
		let userProducts = localStorage.getItem('userProducts');
		if ( userProducts != null ) {
			let items = userProducts.split(',');
			let	data = {items: items, payment_type: this.state.payment_type};	
				axios.post('/api/product/checkout', data)
					.then(res => {
						if ( res.data.status == 'success' ) {
							localStorage.setItem('userProducts', '');
							localStorage.setItem('userProductsTotal', 0);
							this.setState({detailType: CHECKED_OUT, message:res.data.message});
						} else {
							this.setState({errorMsg: res.data.message, classMessage: 'alert alert-danger'});
						}
					})
		}
	}
	componentDidMount() {
		let id = this.props.match.params.id;

		if ( typeof id !== undefined && id > 0 ) {
			axios.get('/api/product/'+id)
			.then(res => {
				const product = res.data.data;
				this.setState({
					product: product
				});
			})
		}
	}
	render() {
		let quantities = [];
		for ( let i=1; i <= 10; i++ ) {
			let selected = i == 1 ? 'selected':'';
			quantities.push(<option key={'q-'+i} value={i} selected={selected}>{i}</option>);
		}
		return (
			<div className="d-flex justify-content-center">
				<div className="container">
					<h1>Gift Shop Product Detail</h1>
					{this.state.product && (
						this.state.detailType == ADDED_TO_CART ? 
							<div className="row product-added-box">
									<div className="col product-image-box col-md-3 product-added">
										<h2>The product has been added to your cart!</h2>
										<h3 className="title">{this.state.product.name}</h3>
									</div>
									<div className="col confirmation">
										<div className="row col-md-8 description">
											<h3>Do you want to proceed to checkout?</h3>
										</div>
										<div className="row price mb-3">
											<div className="col">
												<span className="subtotal">Cart Subtotal ({this.state.totalArticles} articles):</span> ${this.state.userProductsTotal}
											</div>
										</div>
										<div className="row mb-3">
											<div className="col">
												<label className="form-label">Select payment type:</label>
												<div className="form-check form-check-inline ms-3">
												  <input className="form-check-input" type="radio" value="1" checked name="flexRadioDefault" name="payment_type" onChange={this.handleChange}/>
												  <label className="form-check-label">
													<img className="payment-icon" src="/images/paypal.png" />
												  </label>
												</div>
												<div className="form-check form-check-inline">
												  <input className="form-check-input" type="radio" value="2" name="flexRadioDefault" name="payment_type" onChange={this.handleChange}/>
												  <label className="form-check-label">
													<img className="payment-icon" src="/images/visa.jpg" />
												  </label>
												</div>
										</div>
										</div>
										<div className="row">
											<div className="col">	
												<button type="button" className="btn btn-success col-md-2" onClick={this.handleClickCheckout}>Checkout</button>
												<button type="button" className="btn btn-warning col-md-2 ms-3" onClick={this.handleClickRemoveFromCart}>Remove Items</button>
												<Link className="btn btn-secondary col-md-2 ms-3" to="/">Back to products</Link>
											</div>
										</div>
										<div className={this.state.classMessage + ' mt-3'}>{this.state.errorMsg}</div>
									</div>
								</div>
								: (	this.state.detailType == CHECKED_OUT ? 
									<CartAction message={this.state.message} nextAction="Found similar products here:" category={this.state.product.category_id}/>
								: ( this.state.detailType == REMOVED_ITEMS ?
									<CartAction message={this.state.message} nextAction="Continue checking new products" category=""/>	
									:
										<div className="row">
											<div className="row">
												<h2>{this.state.product.name}</h2>
											</div>
											<div className="col product-image-box col-md-3">
												<img className="product-image-small" src={"/images/products/"+this.state.product.image_path}/>
											</div>
											<div className="col">
												<div className="row col-md-12 description">
												<p><span className="price">${this.state.product.price}</span> {this.state.product.description}</p>
												</div>
											</div>
											<div className="col">
												<div className="row mb-5 col-md-8">
													<div className="row">
														<label>Quantity:</label>
														<select className="form-select mb-3 quantity" name="quantity" onChange={this.handleChange}>
															{quantities}
														</select>
													</div>
													<button type="button" className="btn btn-success" item={this.state.product.id} onClick={this.handleClickAddToCart}>Add to Cart</button>
													<Link className="btn btn-secondary mt-3" to="/">Back to products</Link>
												</div>
												<div className="row">
													<p className="similar">Found similar products <Link to={"/category/"+this.state.product.category_id}>here</Link></p>
												</div>
											</div>
										</div>
									)
								)
					)}
				</div>
			</div>
		)
	}
}
function CartAction(props) {
	return (
		<div className="row product-added-box">
			<div className="col confirmation">
				<div className="row description">
						<h2>{props.message}</h2>
						<h3>{props.nextAction}</h3>
						{props.category != '' ? 
							<Link className="btn btn-secondary col-md-2 ms-3 mt-3" to={"/category/"+props.category}>Back to products</Link>
							:
							<Link className="btn btn-secondary col-md-2 ms-3 mt-3" to="/">Back to products</Link>
						}
				</div>
			</div>
		</div>
	)
}
export default ProductDetail
