function writeNewFormResult(username, email, phone, message){
  var postData = {
    username: username,
    email: email,
    phone: phone,
    message: message
  };

  var newPostKey = firebase.database().ref().child('form').push().key;

  var updates = {};
  updates['form/form' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

//writeNewFormValue('gabriel', 'gabx.2010@gmail.com', '095781662', 'esto es una porquería :D');

var button = document.getElementById('button');

function formData(){
  var payload = {
    username : document.getElementById('username').value,
    email : document.getElementById('email').value,
    phone : document.getElementById('phone').value,
    message : document.getElementById('message').value
  };

  writeNewFormResult(payload.username, payload.email, payload.phone, payload.message);
  getElements('update', 'form');
}

function printElements(results, caso){
  var resultsContainer = document.getElementById('results');
  results.reverse();

  switch (caso) {
    case 'update':
      var result = _.first(results);

      var row = document.createElement("tr");
      row.innerHTML =
        '<td>' + result.username + '</td>' +
        '<td>' + result.email + '</td>' +
        '<td>' + result.phone + '</td>' +
        '<td>' + result.message + '</td>' +
        '<td><a class="waves-effect waves-light btn modal-trigger" data-edit data-id="' + result.id + '" href="#modal1">Edit</a>' +
        '<a class="waves-effect waves-light btn" data-remove data-id="' + result.id + '">Remove</a></td>';
        resultsContainer.insertBefore(row, resultsContainer.childNodes[0]);
      break;
    default:
    _.each(results, function(result){
      var row = document.createElement("tr");
      row.innerHTML =
        '<td>' + result.username + '</td>' +
        '<td>' + result.email + '</td>' +
        '<td>' + result.phone + '</td>' +
        '<td>' + result.message + '</td>' +
        '<td><a class="waves-effect waves-light btn modal-trigger" data-edit data-id="' + result.id + '" href="#modal1">Edit</a>' +
        '<a class="waves-effect waves-light btn" data-remove data-id="' + result.id + '">Remove</a></td>';
      resultsContainer.appendChild(row);
    });
  }

}

//INIT Elements
getElements('init', 'form');
button.addEventListener('click', formData);

function getElements(caso, payloadLocation){
  firebase.database().ref(payloadLocation).once('value').then(function(snapshot){
    var result = snapshot.val();
    var arrayResults = [];

    _.each(result, function(obj, key){
        obj.id = key;
        arrayResults.push(obj);
    })

    debugger;

    switch (payloadLocation) {
      case 'form':
          printElements(arrayResults, caso);
        break;
      default:

    }
  });
}

$('#results').on('click', '[data-remove]', function(){
  var dataId = $(this).data("id");
  console.log(dataId);
  $(this).closest('tr').remove();
  return firebase.database().ref('form/' + dataId).remove();
});

$('#results').on('click', '[data-edit]', function(){
  var dataId = $(this).data("id");
  console.log(dataId);
  debugger;
  getElements('modal', 'form/' + dataId);
});

(function ($) {
    $(function () {

        //initialize all modals
        $('.modal').modal();

        //or by click on trigger
        $('.trigger-modal').modal();

    }); // end of document ready
})(jQuery); // end of jQuery name space

//TODO: remove items
