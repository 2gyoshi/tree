'use strict'

(function () {
	const obj = [
		{
			server: 'server1',
			database: 'database1',
			table: 'table1'
		},
		{
			server: 'server1',
			database: 'database1',
			table: 'table2'
		},
		{
			server: 'server1',
			database: 'database1',
			table: 'table3'
		},
		{
			server: 'server1',
			database: 'database2',
			table: 'table1'
		},
		{
			server: 'server1',
			database: 'database2',
			table: 'table2'
		},
		{
			server: 'server1',
			database: 'database2',
			table: 'table3'
		},
		{
			server: 'server2',
			database: 'database1',
			table: 'table1'
		}
	];

	const root = new Node('ALL');
	let server, database, table, tmp;
	for (let row of obj) {
		tmp    = root;
		server = new Node(row.server);
		if(tmp.getSameValueChild(server.value) === null){
			tmp.addChild(server);
		}

		tmp      = tmp.getSameValueChild(server.value);
		database = new Node(row.database);
		if(tmp.getSameValueChild(database.value) === null){
			tmp.addChild(database);
		}

		tmp   = tmp.getSameValueChild(database.value);
		table = new Leaf(row.table);
		if(tmp.getSameValueChild(table.value) === null){
			tmp.addChild(table);
		}
	}
	
	const navi = new Navi();
	root.addObserver(navi);
	root.render(document.querySelector('#js-sidebar'));
}());
