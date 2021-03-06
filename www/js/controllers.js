angular.module('kontribute.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseAuth, $state, $http, $ionicPopup, $location, $window, usersFactory, eventFactory, eventService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  var ref = new Firebase('https://torrid-torch-6578.firebaseio.com');
  var authData = ref.getAuth();

  try { 
  var profileInfo = usersFactory.getUser(authData.uid)
  $scope.userName = authData.uid; 
  } catch (e) {
    console.log("not logged in, go log in homie"); 
  }

   

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
  $scope.kcurr = 1;
  
  $scope.events = [];  
  $scope.votingPoll = 'pollFalse';
  $scope.kontributeList = 'kontributeFalse';





$scope.getAllEventsHosting = 
  function() {
    return eventFactory.getAllHostedEvents($scope.userName).then(function(data){
          var array = []; 
          var temp =[];  
          $scope.events = []; 
          array = Object.keys(data.data.host);        
          for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.host[array[i]];  
              }
            
          // array.forEach(function(element) {
          //   $scope.events
          // })
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
        $scope.list1 = data.data.event.klist1.list.List; 
        $scope.list1current = data.data.event.klist1.list.Listdetailsc.Listcurrent;
        $scope.list1name = data.data.event.klist1.list.Listdetails.Listname;
        $scope.list1quantity = data.data.event.klist1.list.Listdetailsq.Listquantity; 
        $scope.list2 = data.data.event.klist2.list.List;
        $scope.list2current = data.data.event.klist2.list.Listdetailsc.Listcurrent;
        $scope.list2name = data.data.event.klist2.list.Listdetails.Listname;
        $scope.list2quantity = data.data.event.klist2.list.Listdetailsq.Listquantity; 

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

  $scope.checkVote = function(votingPoll) {
  console.log("CheckVote");
  if(votingPoll == 'pollTrue') {
    $state.go('app.vote');
  } else {
    $state.go('app.kontribution');
  };
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

    eventService.createEvent(title, date, time, street, city, province, description, guests, $scope.userName);
    $scope.confirmEvent(); 
  }
    
  }; 
 
 
 
 
$scope.createLocalEvent = function(title, date, time, street, city, province, description, guests) {
  eventService.createLocalEvent(title, date, time, street, city, province, description, guests, $scope.userName);
}

$scope.createKontributeList = function(listname, listquantity, kcount) {
  eventService.createKontributeList(listname, listquantity, kcount);
  $scope.listname = null;
}

$scope.updatelist1 = function(changeq) {
  eventService.updatelist1(changeq);
  $window.location.reload();
}

$scope.updatelist2 = function(changeq) {
  eventService.updatelist2(changeq);
  $window.location.reload();
}

$scope.inviteUserToEvent = function(title, date, time, street, city, province, description, guests) {
  eventService.inviteUserToEvent(title, date, time, street, city, province, description, guests);
}



$scope.validation = function(){
  $scope.eventCreation = false; 
}; 

$scope.returnHome = function() {
  $state.go('app.home');
  $window.location.reload();
};

  // Open the login modal
$scope.login = function() {
    console.log("running?");
    $state.go('app.login');
    console.log("yes");
  };

})







// Handles login and registration
.controller('AuthCtrl', function($scope, authFactory, $firebaseAuth, $state, $window, $location, usersFactory, $rootScope) {
  $scope.loginClicked = false;
  $scope.registerButtonClicked = false;
  $scope.hideLogin = false; 
  $scope.hideRegister = false; 

  $scope.loginButtonClicked = function (){
      if($scope.loginClicked == true){
        $scope.loginClicked = false; 
        $scope.hideRegister = false; 
      } else {
        $scope.loginClicked = true; 
        $scope.hideRegister = true; 
        
      }
  }
$scope.registerButton= function (){
      if($scope.registerButtonClicked == true){
        $scope.registerButtonClicked = false; 
        $scope.hideLogin = false;  
      } else {
        $scope.registerButtonClicked = true;
        $scope.hideLogin = true;  

      }
  }





  var firebaseRef = new Firebase('https://torrid-torch-6578.firebaseio.com');
  var auth = $firebaseAuth(firebaseRef);

  var authCtrl = this;

  var userModel;

  authCtrl.user = {
    email: '',
    password: '',
  };

  authCtrl.register = {
    name: '',
  };


    // Perform the login action when the user submits the login form
  authCtrl.doLogin = function(username, password) {

    console.log(username, password); 

    auth.$authWithPassword(authCtrl.user).then(function(auth){
      $state.go('app.home');
      console.log(auth.uid);
 console.log(username, password + "in te fncSFH"); 
      $window.location.reload();
    }, function(error){
      authCtrl.error = error;
    });

  };

  $scope.goToRegister = function() {
    $state.go('app.register');
  }

  authCtrl.signUp = function(email, password, firstname, lastname) {
    console.log("signing up" + email, password); 


    authFactory.$createUser(authCtrl.user).then(function(user){
      $state.go('app.home');
     console.log(user.uid); 
      console.log("signing up again" + email, password); 
      usersFactory.createUser(user.uid, authCtrl.user.email, authCtrl.user.password, firstname, lastname);
      $window.location.reload();
    }, function(error) {
      authCtrl.error = error;
    });
  };


})

// Handles user profile
.controller('ProfileCtrl', function($ionicModal, $state, authFactory, $window, usersFactory, $http, $scope, $rootScope) {
  var profileCtrl = this;

  var ref = new Firebase('https://torrid-torch-6578.firebaseio.com/');
  var usersRef = new Firebase('https://torrid-torch-6578.firebaseio.com/users')
  var authData = ref.getAuth();
  var friendsRef = new Firebase('https://torrid-torch-6578.firebaseio.com/users/'+authData.uid+'/friends')

  $scope.getProfileInfo = function() {
    return usersFactory.getUser(authData.uid).then(function(data){
      $scope.email = data.data.email;
      $scope.name = data.data.name;
      console.log($scope.name);
    })
  };

  $scope.getAllUsers = function() {
    usersRef.on('value', function(snapshot){
      $scope.allUsers = snapshot.val();
      console.log($scope.allUsers);
    })

  }

  $scope.getFriends = function(){
    friendsRef.on('value', function(snapshot){
      $scope.allFriends = snapshot.val();
      console.log($scope.allFriends);
    })
  };

  $scope.addFriend = function(user) {
    var friendUid = user.uid;
    usersFactory.addFriend(authData.uid, user, friendUid);
  };



  $ionicModal.fromTemplateUrl('templates/friends.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.closeFriends = function() {
    $scope.modal.hide();
  };

  $scope.showFriends = function() {
    $scope.modal.show();

  };






  profileCtrl.doLogout = function(){
    authFactory.$unauth();
    console.log("logout?")
    $state.go('app.home');
    $window.location.reload();
  };

})


.controller('MapController', function($scope, $ionicLoading, eventFactory, eventService) {
 


  var ref = new Firebase('https://torrid-torch-6578.firebaseio.com');
  var authData = ref.getAuth();

  try { 
  var profileInfo = usersFactory.getUser(authData.uid)
  $scope.userName = authData.uid; 
  console.log("dude is back" + $scope.userName); 
  } catch (e) {
    console.log("not logged in, go log in homie"); 
  }


$scope.allEventsShowing = false; 
$scope.showAll; 


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

        





};

google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise())
    

    $scope.getEventsForMap = function(){
        return eventFactory.getEventsForMap($scope.userName).then(function(data) { 
              var array = []; 
              
              array = Object.keys(data.data.invited);
              
              $scope.events = []; 
             
             
              for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.invited[array[i]]; 
              console.log($scope.events[i]); 
               }
                  
    });
  };

  $scope.plotOnMap = function(name){
            var geocoder;
            var map;
            var address = name; 
            
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(-34.397, 150.644);
     

            var myOptions = {
              zoom: 8,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);

        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
                }

            })

 
};

$scope.plotAllOnMap = function(showAll){
  if (showAll == false){ 
       $scope.initialise();  
        } else { 
    return eventFactory.getEventsForMap($scope.userName).then(function(data) { 
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


}
};
})
 
 
.controller('VoteController',function($scope,$ionicPopup, $state, $window){
        console.log("vote controller");

        $scope.items=[];
        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.vote">',
                title: 'Enter New Option',
                subTitle: 'Add New Option',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Add</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.vote) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                                console.log("FAGGOT");
                            } else {
                              console.log("TESTERINO");
                                return $scope.data;
                              console.log("Test 2");
                            }
                        }
                    },
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
                if(typeof res!='undefined')
                  res.close="ion-close";
                $scope.items.push(res)

                console.log($scope.items);
                console.log('Testing123');
            });
           /* $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);*/
          $scope.removeTestCase=function(){
          $scope.remove();
           };
          };

         $scope.addVoteOption=function(){
            $scope.showPopup();
        };

        $scope.remove = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
      };

      $scope.returnEvent = function() {
        $scope.confirmEvent();
        // $state.go('app.events');
      };

      $scope.toKontributeList = function() {
        $state.go('app.kontribution');
      };

})

.controller('KontributeController',function($scope,$ionicPopup, $state, $window){
        console.log("kontribute controller");

        $scope.items=[];
        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.kontribute">',
                title: 'Enter New Option',
                subTitle: 'Add New Option',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Add</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.kontribute) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                                console.log("FAGGOT");
                            } else {
                              console.log("TESTERINO");
                                return $scope.data;
                              console.log("Test 2");
                            }
                        }
                   },
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
                if(typeof res!='undefined')
                  res.close="ion-close";
                $scope.items.push(res)

                console.log($scope.items);
                console.log('Testing123');
            });
           /* $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);*/
          $scope.removeTestCase=function(){
          $scope.remove();
           };
          };

         $scope.addKontributeOption=function(){
            $scope.showPopup();
        };

        $scope.remove = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
      };

      $scope.returnEvent = function() {
        $scope.confirmEvent();
        $state.go('app.events');
      };
});
