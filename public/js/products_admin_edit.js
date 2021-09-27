class ProductAdminEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			id : '',
			name : '', 
			description : '', 
			img : '',
			image_path : '',
			category_id : '', 
			price : '', 
			categories : [],
			message: '',
			showMessage: false,
			classMessage: '',
			formType: 'Add'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		axios.get('/api/categories')
			.then(res => {
				const result = res.data;
				this.setState({ categories : result.data });
			})

		let id = this.props.match.params.id;
		if ( typeof id !== undefined && id > 0 ) {
			axios.get('/api/product/'+id)
			.then(res => {
				const product = res.data.data;
				this.setState({ 
					id : product.id,
					name : product.name,
					description : product.description,
					category_id : product.category_id,
					price : product.price,
					image_path : product.image_path, 
					formType: 'Edit' 
				});
			})

		}
	}
	handleChange(event) {
		let value;
		if ( event.target.name == 'img' ) {
			value = event.target.files.length > 0 ? event.target.files[0] : '';
		} else {
			value = event.target.value;
		}
		this.setState({
			[event.target.name]: value 
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		let name = this.state.name;
		let description = this.state.description;
		let category_id = this.state.category_id;
		let price = this.state.price;
		let img = this.state.img;
		let errorMsg = [];
		if (name == '') {
			errorMsg.push('invalid name');
		}
		if (description == '') {
			errorMsg.push('invalid description');
		}
		if (price == '') {
			errorMsg.push('invalid price');
		}
		if (category_id == '') {
			errorMsg.push('category not selected');
		}
		if (this.state.formType == 'Add' && img == '') {
			errorMsg.push('image not selected');
		}
		if ( errorMsg.length > 0 ) {
			this.setState({
				showMessage: true,
				message: 'There were some errors: '+errorMsg.join(', '),
				classMessage: 'alert alert-danger' 
			});
		} else {
			const productData = new FormData();
			productData.append('name', name);
			productData.append('description', description);
			productData.append('category_id', category_id);
			productData.append('price', price);
			productData.append('image', img);
			let endpoint = '/api/product/add';
			let messageSuccess = 'The product has been added successfully';
			if ( this.state.formType == 'Edit' && this.state.id > 0 ) {
				endpoint = '/api/product/edit/'+this.state.id;
				messageSuccess = 'The product has been edited successfully';
			}
			axios.post(endpoint, productData)
				.then(res => {
					const result = res.data;
					this.setState({showMessage: true, 
									message: messageSuccess,
									classMessage: 'alert alert-success'});
				})
		}
	}
	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="container col-md-6">
					<h3>{this.state.formType} Product</h3>
					{this.state.showMessage && (
					<div className={this.state.classMessage}>{this.state.message}</div>)}
					{this.state.image_path != '' && (
						<img className="product-image" src={'/images/products/'+this.state.image_path} />
					)}
					<form onSubmit={this.handleSubmit} encType="multipart/form-data">
						<div className="error">{this.state.error}</div>
						<div className="col-md-8 mb-3">
							<label>Name:</label>
							<input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleChange} />
						</div>
						<div className="col-md-8 mb-3">
							<label>Description:</label>
							<textarea name="description" className="form-control" value={this.state.description} onChange={this.handleChange} />
						</div>
						<div className="col-md-8 mb-3">
							<label>Category:</label>
							<select name="category_id" className="form-select" onChange={this.handleChange}>
								<option>Select a category</option>
								{ this.state.categories.map(category => (
									(this.state.category_id == category.id ?
										<option value={category.id} selected>{category.name}</option>
									:
									<option value={category.id}>{category.name}</option>)
								))}
							</select>
						</div>
						<div className="col-md-3 mb-3">
							<label>Price:</label>
							<input type="text" name="price" className="form-control" value={this.state.price} onChange={this.handleChange} />
						</div>
						<div className="col-md-8 mb-3">
							<label>Upload Image:</label>
							<input type="file" name="img" className="form-control" onChange={this.handleChange} />
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
export default ProductAdminEdit;
