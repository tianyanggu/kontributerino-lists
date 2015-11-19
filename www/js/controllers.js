angular.module('kontribute.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseAuth, $state, $http, $ionicPopup, $location, $window, eventFactory, eventService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

   var vm = this;
   vm.result;
   

  // Form data for the login modal
  $scope.loginData = {};
  $scope.eventSubmitted = false; 
  $scope.eventCreation = false; 
  $scope.anotherOne = false; 
  $scope.attendingEvent = true;
  
  //for validation
  $scope.inputBoxesFilled = true; 
  $scope.titleInput = true; 
  $scope.timeInput = true;
  $scope.dateInput = true; 
  $scope.streetInput = true; 
  $scope.cityInput = true; 
  $scope.provinceInput = true; 
  $scope.descriptionInput = true; 
  $scope.guestsInput = true; 
  
  $scope.locationSelected = false; 

  $scope.kcount = 1;
  

  $scope.PizzaParty = { Title: 'Pizza Party', Time: '12:00', Address:'New York', Description:'Whoa'}; 
  $scope.PoopParty = { Title: 'Poop Party', Time: '12:20', Address:'Chiraq', Description:'Hello'}; 

  $scope.events = [$scope.PizzaParty, $scope.PoopParty]; 
  console.log($scope.events);  
  $scope.votingPoll = 'pollFalse';
  $scope.kontributeList = 'kontributeFalse';





$scope.getAllEventsHosting = 
  function() {
    return eventFactory.getAllHostedEvents().then(function(data){
          var array = []; 
          var temp =[];  
          $scope.events = []; 
          array = Object.keys(data.data.host);  
          console.log(array);      
          for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.host[array[i]]; 
            
               console.log($scope.events[i]); 
              }
            
          // array.forEach(function(element) {
          //   $scope.events
          // })
        console.log($scope.events); 
        $scope.setScope($scope.events); 
      
    });
  };


 $scope.setScope = function (arr) {
    $scope.events = arr; 
 }; 

 $scope.getUserDetails = 
   function () {
   $scope.eventSubmitted = true; 
     return eventFactory.getAllEvents().then(function(data) { 
              console.log("we out here" + data.Title); 
              $scope.name = data.data.event.Title;
              $scope.date = data.data.event.Date;  
              $scope.time = data.data.event.Time; 
              $scope.address = data.data.event.Address; 
              $scope.description = data.data.event.Description; 
              $scope.users = data.data.event.Users; 
              console.log(data.data.event.Title); 

    
             });
        

       };

$scope.getKontributeLists = 
  function() {
    return eventFactory.getKontributeLists().then(function(data){
        $scope.name = data.data.event.Title;
        $scope.list1 = data.data.event.klist1.list.List1; 
        $scope.list1current = data.data.event.klist1.list.List1detailsc.List1current;
        $scope.list1name = data.data.event.klist1.list.List1details.List1name;
        $scope.list1quantity = data.data.event.klist1.list.List1detailsq.List1quantity; 
        $scope.list2 = data.data.event.klist2.list.List2;
        $scope.list2current = data.data.event.klist2.list.List2detailsc.List2current;
        $scope.list2name = data.data.event.klist2.list.List2details.List2name;
        $scope.list2quantity = data.data.event.klist2.list.List2detailsq.List2quantity; 
        $scope.list3 = data.data.event.klist3.list.List3; 

      });
  };

$scope.locationClick = function(){
  if($scope.locationSelected == false){
    $scope.locationSelected = true; 
  } else {
    $scope.locationSelected = false; 
  }
 
}







$scope.showEvent = function(){
  $scope.eventCreation = false; 
  $scope.anotherOne = false; 
  breakButton(); 
}

$scope.breakButton = function(){
  $scope.anotherOne = false; 
}


  $scope.confirmEvent = 
  function (){
       
      var alert = $ionicPopup.alert({
        title: 'Event Created!', 
        template: 'Thanks for Kontributing!'
      });
      alert.then(function(res){
        $scope.eventCreation = true; 
         $scope.anotherOne = true; 
      }); 

  } 
$scope.createEvent = 
  function(title, date, time, street, city, province, description, guests){
    console.log("here in CTRL", title, date, time, street, city, province, description, guests); 

  
if(title == undefined) {
$scope.titleInput = false;
} else {
$scope.titleInput = true;
}
if(date == undefined) {
$scope.dateInput = false;  
} else {
$scope.dateInput = true;
}
if(time == undefined) {
$scope.timeInput = false; 
} else {
$scope.timeInput = true;
}
if(street == undefined){
$scope.streetInput = false; 
} else {
$scope.streetInput = true; 
}
if(city == undefined){
$scope.cityInput = false; 
} else {
$scope.cityInput = true; 
}
if(province == undefined){
$scope.provinceInput = false; 
} else {
$scope.provinceInput = true; 
}
if(description == undefined){
$scope.descriptionInput = false; 
} else {
$scope.descriptionInput = true; 
}
if(guests == undefined){
$scope.guestsInput = false; 
} else {
$scope.guestsInput = true; 
}
     

    if(!$scope.titleInput || !$scope.dateInput || !$scope.timeInput 
      || !$scope.streetInput || !$scope.cityInput || !$scope.provinceInput || !$scope.descriptionInput || !$scope.descriptionInput || !$scope.guestsInput) {
       $scope.inputBoxesFilled = false; 
    } else {

    eventService.createEvent(title, date, time, street, city, province, description, guests);
    $scope.confirmEvent(); 
  }
    
  }; 
 
 
 
 
$scope.createLocalEvent = function(title, date, time, street, city, province, description, guests) {
  eventService.createLocalEvent(title, date, time, street, city, province, description, guests);
}

$scope.createKontributeList = function(list1name, list1quantity) {
  eventService.createKontributeList(list1name, list1quantity);
}

$scope.updatelist1 = function(changeq) {
  eventService.updatelist1(changeq);
}

$scope.updatelist2 = function(changeq) {
  eventService.updatelist2(changeq);
}

$scope.inviteUserToEvent = function(title, date, time, street, city, province, description, guests) {
  eventService.inviteUserToEvent(title, date, time, street, city, province, description, guests);
}



$scope.validation = function(){
  $scope.eventCreation = false; 
}; 

  // Open the login modal
$scope.login = function() {
    console.log("running?");
    $state.go('app.login');
    console.log("yes");
  };

})








// Handles login and registration
.controller('AuthCtrl', function($scope, authFactory, $firebaseAuth, $state, $window, $location ) {

  var firebaseRef = new Firebase('https://torrid-torch-6578.firebaseio.com');
  var auth = $firebaseAuth(firebaseRef);

  var authCtrl = this;

  authCtrl.user = {
    email: '',
    password: ''
  };

    // Perform the login action when the user submits the login form
  authCtrl.doLogin = function() {
    authFactory.$authWithPassword(authCtrl.user).then(function(auth){
      $state.go('app.home');
    }, function(error){
      authCtrl.error = error;
    });

  };

  $scope.goToRegister = function() {
    $state.go('app.register');
  }

  authCtrl.signUp = function() {
    authFactory.$createUser(authCtrl.user).then(function(user){
      $state.go('app.home');
      $window.location.reload();
    }, function(error) {
      authCtrl.error = error;
    });
  };


})

// Handles user profile
.controller('ProfileCtrl', function($state, authFactory, $window, usersFactory) {
  var profileCtrl = this;



  profileCtrl.doLogout = function(){
    authFactory.$unauth();
    console.log("logout?")
    $state.go('app.home');
    $window.location.reload();
  };

})


.controller('MapController', function($scope, $ionicLoading, eventFactory, eventService) {
 
    $scope.initialise = function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $scope.map = map;

        return eventFactory.getEventsForMap().then(function(data) { 
              var array = [];               
              array = Object.keys(data.data.invited);
              $scope.events = []; 
              $scope.locations = []; 
             
              for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.invited[array[i]]; 
               }

              for(var j=0; j< $scope.events.length; j++){
                $scope.locations[j] = $scope.events[j].event.Address; 
              }


            var geocoder;
            var map;
            
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(-34.397, 150.644);
     

            var myOptions = {
              zoom: 8,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    


    map = new google.maps.Map(document.getElementById("map"), myOptions);
  
    for(var z = 0; z < $scope.locations.length; z++){
       var address = $scope.locations[z]; 
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
                }

            })
        }



});


    };

    google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise())


    $scope.getEventsForMap = function(){
        return eventFactory.getEventsForMap().then(function(data) { 
              var array = []; 
              
              array = Object.keys(data.data.invited);
              
              $scope.events = []; 
             
             
              for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.invited[array[i]]; 
              console.log($scope.events[i]); 
               }
                  
    });
  };
 
});


 
