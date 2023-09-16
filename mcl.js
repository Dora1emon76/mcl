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

function mcl(user_id, chat_id,command){
  if(!user_id){
    throw 'ProjectoidLib-> mcl: location not found to extract details'
    return;
  }
  if(!chat_id){
    throw 'ProjectoidLib-> mcl: Commmand not found to return response'
    return;
  }
  if(!command){
    throw 'ProjectoidLib-> weather: Command not found to return response'
    return;
  }
  let data = {
    method: 'get',
    path: 'membership',
    body: {
      userId: user_id,
      chatIds:chat_id
    },
    onSuccess: command
  };
  apiCall(data)
}

function onApiAnswer() {

  // Parse the content of the response, which is in JSON format
  let options = content;
  try {
    options = JSON.parse(options);
  } catch(error) {
  }
  
  if(!params || params === null || params === 'null'){
     
  }else{
    Bot.runCommand(params, options);
  }
}

// Function called when an API request results in an error
function onApiError() {
  throw content + '\nGet Help at @ProjectoidChat';
}
  publish({
    apiCall: apiCall,
    mcl: mcl
  })

on(lib + "onApiAnswer", onApiAnswer)
on(lib + "onApiError", onApiError)
