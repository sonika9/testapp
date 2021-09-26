<html>
	<head>
		<meta charset='UTF-8'>
		<link rel="stylesheet" type="text/css" href="/style.css">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
		<script src='https://unpkg.com/react@16.3.1/umd/react.production.min.js'></script>
		<script src='https://unpkg.com/react-dom@16.3.1/umd/react-dom.production.min.js'></script>
		<script src='https://unpkg.com/react-router-dom@5.0.0/umd/react-router-dom.min.js'></script>
		<script src='https://unpkg.com/babel-standalone@6.26.0/babel.js'></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.5.4/axios.standalone.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/history/4.5.1/history.js"></script>

		<script type="text/babel" data-plugins="transform-es2015-modules-umd" src='products_admin_edit.js'></script>
		<script type="text/babel" data-plugins="transform-es2015-modules-umd" src='products_admin.js'></script>
		<script type="text/babel" data-plugins="transform-es2015-modules-umd" src='transactions.js'></script>
		<script type="text/babel" data-plugins="transform-es2015-modules-umd" src='index_admin.js'></script>
	</head>
	<body>
        @yield('content')
    </body>
</html>
