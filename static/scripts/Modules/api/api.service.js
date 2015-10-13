
// Generic Servie to read API CRUD / OPTIONS
function apiService($resource,$cookies,$http, URL) {
    //options: {method : "POST", params:{ format: 'json'}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}
	var service = $resource(URL,
		{'Id': '@id'}, {
		query:  {method: 'GET', params: { format: 'json'}, isArray: false} 
	});
	// Add URL to Service Provider - needed to navigate Controllers to Add/Edit/View Pages
	service.url = function() {
		var url = URL;
		if(URL.lastIndexOf("/:")> -1) {
			url =  URL.slice(0,URL.lastIndexOf("/:")+1);
		}
		return url; 		
	};
	
	// source: http://stackoverflow.com/questions/23149151/jquery-and-django-rest-framework-bulk-send-list
	service.create = function(data) {
		var url = URL;
		if(URL.lastIndexOf("/:")> -1) {
			url =  URL.slice(0,URL.lastIndexOf("/:")+1);
		}
		return $http({
			method: 'POST',
			url: url,
			contentType: "application/json; charset=utf-8",
			dataType: "json",			
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			//params:{"format": "json"},
			data: "csrfmiddlewaretoken=" + $cookies.get('csrftoken') + "&_content_type=application/json" + "&_content="+JSON.stringify(data),
			//data: JSON.stringify(data),
			beforeSend: function(xhr, settings) {
				  xhr.setRequestHeader("X-CSRFToken", $cookies.get('csrftoken'));
				}			
		});
	};
	
	// add any methods here using prototype
	service.options = function() {
		var url = URL;
		if(URL.lastIndexOf("/:")> -1) {
			url =  URL.slice(0,URL.lastIndexOf("/:")+1);
		} 
		return $http({
			method: 'POST',
			url: url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			params:{"format": "json"},
			data: "csrfmiddlewaretoken="+$cookies.get('csrftoken')+"&_method=OPTIONS"
		});
	};
	return service;  
}