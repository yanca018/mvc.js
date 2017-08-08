var indexController = {
	index: function(){
		var data = {
			name: 'Martin',
			age: 22,
			gender: 'male',
			lan: [
				'Js',
				'Css',
				'Html'
			]

		}
		$('#app').showView('index', data);
	},

	create: function() {
		alert('create');
	}
}