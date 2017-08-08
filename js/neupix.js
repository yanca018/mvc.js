(function ($) {

$.fn.showView = function(url, data) {
	$('.view').hide();
	var self = $(this);
	var sView = url.split("/"); 
	sView = sView[sView.length-1]+'-view';
    nx.getView(url, function(d) {
    	$('#'+sView).html(d).show();
    	self;
    }, data);
};

})(jQuery);

var nx = {
	views: [],
	getView: function(url, f, data) {

		//ex: view/to/path --> path-view
		var sView = url.split("/"); 
		sView = sView[sView.length-1]+'-view';

		//insert if not exist
		if ($('#'+sView).length == 0){
			$('#app').append('<div id="'+sView+'" class="view"></div>');
			$.get('./app/views/'+url+'.html', function(html) {
				var vw = {id: sView, html: html};
				nx.views.push(vw);
				console.log('AJAX VIEW');
				f(nx.compileView(html, data));
			});
		}else{
			var find = sView;
			$.each(nx.views, function(index, val) {
				if (this.id == find) {
					console.log('NO AJAX VIEW');
					f(nx.compileView(this.html, data));
				}
			});
		}
	},

	importController: function(controller, cb) {
		if ($('#app').length == 0)
			$('body').append('<div id="app"><div>');

		//insert if not exist
		if ($('#'+controller+'-controller').length == 0) {
			$('#controllers').append('<script id="'+controller+'-controller"></script>');
			var ctr = controller.replace('Controller', '');
			$.getScript('./app/controllers/'+ctr+'.js', function(data) {
				$('#'+controller+'-controller').html(data);
				console.log('AJAX CONTROLLER');
				cb();
			});
		}else{
			console.log('NO AJAX CONTROLLER');
			cb();
		}
	},


	compileView: function(html, data) {
		$.each(data, function(index, val) {
			if (typeof val == 'object') {
				//inicio each
				var size = index.length+7;
				var from = parseInt(html.indexOf('#each-$'+index));
				var to   = from+size;

				//contenido a compilar
				var content = html;
				content = content.substr(to);


				//fin ecah-end
				var size_end = index.length+10;
				var from_end = parseInt(content.indexOf('#endeach-$'+index));
				var to_end   = from_end+size_end;

				//tomando el contenido a compilar
				content = content.substr(0, from_end);
				// console.log('VVV CONTENT VVVVV!')
				// console.log(content)

				// console.log(val.length)

				//compilar contenido
				var txt_tmp    = content;
				var txt_fromat = ''; 
				var thisLength = val.length;
				var thisArr = val;
				if (typeof val == 'object') {
					try{
						for (var i = 0; i < val.length; i++) {
							var parentEach = index;
							var ctx = val[i];
							var txt_tempAux = txt_tmp;
							$.each(thisArr[i], function(index, val) {
								txt_tempAux = txt_tempAux.replace('$'+parentEach+'.'+index, ctx[index]);
							});
							txt_fromat += txt_tempAux;
						}
					}catch(err){
						for (var i = 0; i < val.length; i++) {
							txt_fromat += txt_tmp.replace('$'+index, val[i]);
						}
					}
				}else{
					for (var i = 0; i < val.length; i++) {
						txt_fromat += txt_tmp.replace('$'+index, val[i]);
					}
				}



				
				// console.log(txt_fromat);
				//html compilado!
				// console.log(txt_fromat);

				//quitamos el texto cifrado
				content = html.substr(from);
				// console.log('FROM')
				// console.log(content)


				from_end = parseInt(content.indexOf('#endeach-$'+index));
				to_end   = from_end+size_end;
				content = content.substr(0, to_end);

				// console.log('TO')
				// console.log(content)
				html = html.replace(content, txt_fromat);

				


				//search each of this object
				// console.log('#each-$'+index);
				// console.log('DE: '+from+' A: '+to);

				// console.log('#endeach');
				// console.log('DE: '+from_end+' A: '+to_end);

			}else{
				html = html.replace('$'+index, val);
			}
			// console.log(index+' => '+typeof val)
		});
		return html;
	}
}




//On all loaded
$(function() {
	$('body').append('<div id="controllers" style="display:none;"></div>');
	$('head').append('<script src="./app/routes.js"></script>');
});
