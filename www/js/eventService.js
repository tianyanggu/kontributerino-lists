angular.module('kontribute.services', [])
    .service('eventService', function(eventFactory) {

        var vm = this; 
        vm.createEvent = createEvent;
        vm.data;
        vm.events = {}; 

        

      
        function createEvent(title, date, time, address, description, guests, list1name, list1quantity){
            var newEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: address, 
                Description: description, 
                Users: guests, 
				List1: "true",
				List1details: {
					List1name: list1name,
					List1current: "0",
					List1quantity: list1quantity
				},
			}; 

            console.log(newEvent.Time + " new event"); 
            eventFactory.createEvent(newEvent); 
    
             };
			 
		function updatelist1(){
            var newUpdate = { 
				List1: "false",
			}; 

            console.log(newUpdate.Time + " new update"); 
            eventFactory.createEvent(newUpdate); 
    
             };
         

       
   
            

         
       
    });