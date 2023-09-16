let lib = "mcl-projectoid"
let API_URL = "https://api.projectoid.site/v1/telegram"

function jTQS(jsonData) {
  var queryString = Object.keys(jsonData).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(jsonData[key]);
  }).join('&');
  return queryString;
}

function apiCall(options) {
  if (!options) {
    throw 'options not found';
    return;
  }
  let url = API_URL + '/' + options.path;
  if(options.method.toLowerCase() === 'get') {
    url += '?' + jTQS(options.body);
  }
  let apiData = {
    url: url,
    headers: {
      ...(options.method.toLowerCase() === 'get' ? {} : { "Content-Type": "application/json" })
    },
    body: options.body,
    query: options.body,
    folow_redirects: true,
    completed_commands_count: 0,
    success: libPrefix + 'onApiAnswer ' + options.onSuccess,
    error: libPrefix + 'onApiError'
  };

function mcl(user_id, chat_id){
  if(!location){
    throw 'ProjectoidLib-> weather: location not found to extract details'
    return;
  }
  if(!command){
    throw 'ProjectoidLib-> weather: Command not found to return response'
    return;
  }
  let data = {
    method: 'get',
    path: 'weather',
    body: {
      location: location
    },
    onSuccess: command
  };
  apiCall(data)
}
