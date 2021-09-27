class Transaction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {transactions: [], links: []};
		this.handleClickPagination = this.handleClickPagination.bind(this);
	}
	handleClickPagination(event){
		let page = event.target.getAttribute('page');
		this.loadTransactions(page);	
	}
	loadTransactions( page = null){
		let endpoint = page != null ? page.replace('http:','') : '/api/transactions';
		axios.get(endpoint)
				.then(res => {
					const transactions = res.data.data;
					const links = res.data.meta.links;
					this.setState({ transactions, links });
		})
	}
	componentDidMount() {
		this.loadTransactions();	
	}

	render() {
		return (
			<div className="justify-content-center">
				<div className="container">
					<h1>Latest transactions</h1>
					
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Id</th>
								<th scope="col">User</th>
								<th scope="col">Total</th>
								<th scope="col">Response</th>
								<th scope="col">Date</th>
							</tr>
						</thead>
						<tbody>
							{ this.state.transactions.map(transaction => (
								<tr key={transaction.id}>
									<td>{transaction.id}</td>
									<td>{transaction.username}</td>
									<td>${transaction.total}</td>
									<td>{transaction.response}</td>
									<td>{transaction.created_at}</td>
								</tr>
								))
							}	
						</tbody>
					</table>

					<nav aria-label="Page navigation example">
						<ul className="pagination">
							{ this.state.links.map(link => (
								<li className={"page-item" + (link.active ? ' active':'')}>
									<a className="page-link" page={link.url} onClick={this.handleClickPagination}>{link.label.replace(/&(l|r)aquo;/, '')}</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		)
	}
}
export default Transaction;
