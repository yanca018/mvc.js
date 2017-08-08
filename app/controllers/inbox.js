var inboxController = {
	index: function(){
		console.log('hola');
		var data = {
			name: 'Inbox',
			msgs: [
			{
				name: 'Martin',
				msg: 'sd',
				date: 'ayer'
			},
			{
				name: 'Martin',
				msg: 'HAY Q PESADO',
				date: 'antier'
			}]
		}
		$('#app').showView('inbox', data);
	},

	create: function() {
		alert('create');
	}
}