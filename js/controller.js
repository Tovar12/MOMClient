//angular.module("controller",['LocalStorageModule'])
angular.module("controller",[])

.controller('GetMessages', ['$scope','$http', function($scope, $http){
  $scope.getData = function() {    
    var req = {
      method: 'GET',
      url: 'http://45.55.199.172:8090/allmessages',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    $http(req).success(function(response) {            
      rawJSON = JSON.parse(JSON.stringify(response));
      console.log(rawJSON);
    }).error(function() {
      console.log("Error trayendo a jotasón");
    });
  }
}])

.controller('producerCtrl', ['$scope','$http', '$window', function($scope, $http, $window){
  loadTopics();
  
  $scope.getData = function() {    
    var req = {
      method: 'GET',
      url: 'http://45.55.199.172:8090/allmessages',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    $http(req).success(function(response) {            
      rawJSON = JSON.parse(JSON.stringify(response));
      console.log(rawJSON);
    }).error(function() {
      console.log("Error trayendo a jotasón");
    });
  }
  
  $scope.createMessage = function(message) {
    console.log(JSON.stringify(message));  
    try{
      var topic = message.topic;
      var message = message.message;            
      var jsonMessage = {
        "topic": topic,
        "message": message,                        
      }
        console.log(JSON.stringify(jsonMessage));                
        sendMessage(jsonMessage);          
    }catch(e){
      $window.alert("An error occured, check your input");
    }
  }
  
  function sendMessage(data) {
    var req = {
      method: 'POST',
      url: 'http://45.55.199.172:8090/sendmessage',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
  $http(req).success(function(response) {
    console.log("ya");    
    document.forms["createMessage"].reset();
  }).error(function(response) {
    console.log("Error");    
    });
  }
  
  $scope.createTopic = function(topic) {
    console.log(JSON.stringify(topic));    
    var topic = topic.name;              
    var jsonTopic = {
      "topicName": topic                       
    }
      console.log(JSON.stringify(jsonTopic));
      sendNewTopic(jsonTopic);
	}
  
  function sendNewTopic(data) {
    var req = {
      method: 'POST',
      url: 'http://45.55.199.172:8090/createtopic',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
  $http(req).success(function(response) {
    console.log("ya");    
    window.location.reload();
  }).error(function(response) {
    console.log("Error");    
    });
  }  
  
  $scope.deleteTopic = function(deletetopic) {
    console.log(JSON.stringify(deletetopic));    
    var topic = deletetopic.topic;              
    var jsonTopic = {
      "topicName": topic                       
    }
      console.log("JSON " + JSON.stringify(jsonTopic));
      sendDeleteTopic(jsonTopic);
	}
  
  function sendDeleteTopic(data) {
    var req = {
      method: 'POST',
      url: 'http://45.55.199.172:8090/deletetopic',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
  $http(req).success(function(response) {
    console.log("ya");    
    window.location.reload();
  }).error(function(response) {
    console.log("Error");    
    });
  }  
  
  function loadTopics(){     
    var req = {
      method: 'GET',      
      url: 'http://45.55.199.172:8090/topics',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    $http(req).success(function(response) {      
      console.log(JSON.stringify(response));
      $scope.rawJSON = JSON.parse(JSON.stringify(response));
      fillDropDown();
    }).error(function() {
      console.log("otra cosa");      
    });    
  }
  
  function fillDropDown(){
    var sel = document.getElementById('topic');
    for(var i = 0; i < $scope.rawJSON.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = $scope.rawJSON[i];
      opt.value = $scope.rawJSON[i];
      sel.appendChild(opt);
    }
    var sel = document.getElementById('deletetopics');
    for(var i = 0; i < $scope.rawJSON.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = $scope.rawJSON[i];
      opt.value = $scope.rawJSON[i];
      sel.appendChild(opt);
    }    
  }   
  
}])

.controller('consumerCtrl', ['$scope','$http','$window',  function($scope, $http, $window){
  loadUserTopics();
  $scope.userID = sessionStorage.getItem("Id");
  
  $scope.getData = function() {    
    var req = {
      method: 'GET',
      url: 'http://45.55.199.172:8090/allmessages',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    $http(req).success(function(response) {            
      rawJSON = JSON.parse(JSON.stringify(response));
      console.log(rawJSON);
    }).error(function() {
      console.log("Error trayendo a jotasón");
    });
  } 
  
  $scope.updateUser = function(user) {
    console.log(JSON.stringify(user));    
    var id = sessionStorage.getItem("Id"); 
    var topic = user.topic;         
    var jsonUser = {
      "id": id,
      "topic": topic                       
    }
      console.log(JSON.stringify(jsonUser));
      sendNewTopic(jsonUser);
	}
  
  function sendNewTopic(data) {
    var req = {
      method: 'POST',
      url: 'http://45.55.199.172:8090/newtopic',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
  $http(req).success(function(response) {
    console.log("ya");    
    console.log(JSON.stringify(response));
    window.location.reload();
  }).error(function(response) {
    console.log("Error");    
    });
  }     

  $scope.getMessage = function(){
    $scope.id = sessionStorage.getItem("Id"); 
    var req = {
      method: 'GET',
      url: 'http://45.55.199.172:8090/message?id='+$scope.id,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  $http(req).success(function(response) {
    console.log("ya");    
    console.log(JSON.stringify(response));   
    $scope.messages = response.messages;
  }).error(function(response) {
    console.log("Error");    
    });
  }   
  
  function loadTopics(){     
    var req = {
      method: 'GET',      
      url: 'http://45.55.199.172:8090/topics',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    $http(req).success(function(response) {      
      console.log(JSON.stringify(response));
      $scope.rawJSON = JSON.parse(JSON.stringify(response));
      $scope.topics = $scope.myTopics;      
      fillDropDown();
    }).error(function() {
      console.log("otra cosa");      
    });    
  }
  
  function fillDropDown(){
    var newArray = []; 
    for(var i = 0; i < $scope.rawJSON.length; i++) {
      var found = false;
      for(var j = 0; j < $scope.myTopics.length && !found; j++) {
        if ($scope.rawJSON[i] == $scope.myTopics[j]) found = true;
      }
      if (!found) newArray.push($scope.rawJSON[i]);
    }    

    var sel = document.getElementById('topics');
    for(var i = 0; i < newArray.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = newArray[i];
      opt.value = newArray[i];
      sel.appendChild(opt);
    }
    var sel = document.getElementById('stopusers');
    for(var i = 0; i < $scope.topics.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = $scope.topics[i];
      opt.value = $scope.topics[i];
      sel.appendChild(opt);
    }    
  }  
  
  function loadUserTopics(){     
    var req = {
      method: 'GET',      
      url: 'http://45.55.199.172:8090/usertopics?id='+sessionStorage.getItem("Id"),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    $http(req).success(function(response) {      
      console.log(JSON.stringify(response));
      $scope.myTopics = JSON.parse(JSON.stringify(response));
      loadTopics();    
    }).error(function() {
      console.log("otra cosa");      
    });    
  }  
  
  $scope.stopListeningTopic = function(stopuser) {
    console.log(JSON.stringify(stopuser));    
    var id = sessionStorage.getItem("Id"); 
    var topic = stopuser.topic;         
    var jsonUser = {
      "id": id,
      "topic": topic                       
    }
      console.log(JSON.stringify(jsonUser));
      sendStopTopic(jsonUser);
	}
  
  function sendStopTopic(data) {
    var req = {
      method: 'POST',
      url: 'http://45.55.199.172:8090/stoptopic',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
  $http(req).success(function(response) {
    console.log("ya");    
    console.log(JSON.stringify(response));
    window.location.reload();
  }).error(function(response) {
    console.log("Error");    
    });
  }    
 
}])

.controller('newConsumerCtrl', ['$scope','$http','$window',  function($scope, $http, $window){
  loadTopics();
  
  $scope.createUser = function(user) {
    console.log(JSON.stringify(user));    
    var topic = user.topic;              
    var jsonUser = {
      "topic": topic                       
    }
      console.log(JSON.stringify(jsonUser));
      sendNewUser(jsonUser);
	}
  
  function sendNewUser(data) {
    var req = {
      method: 'POST',
      url: 'http://45.55.199.172:8090/createuser',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
  $http(req).success(function(response) {
    console.log("ya");    
    console.log(JSON.stringify(response));
    $scope.id = response.id;
    $scope.userTopic = response.topic;
    sessionStorage.setItem("Id", $scope.id);    
    $window.location='consumer.html';
  }).error(function(response) {
    console.log("Error");    
    });
  }  
  
  function loadTopics(){     
    var req = {
      method: 'GET',      
      url: 'http://45.55.199.172:8090/topics',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    $http(req).success(function(response) {      
      console.log(JSON.stringify(response));
      $scope.rawJSON = JSON.parse(JSON.stringify(response));      
      fillDropDown();
    }).error(function() {
      console.log("otra cosa");      
    });    
  }
  
  function fillDropDown(){
    var sel = document.getElementById('topics');
    for(var i = 0; i < $scope.rawJSON.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = $scope.rawJSON[i];
      opt.value = $scope.rawJSON[i];
      sel.appendChild(opt);
    }
  }    
  
  
}]);
