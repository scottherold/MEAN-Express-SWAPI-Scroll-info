// Module performs AJAX calls on scroll
$( () => { // on DOM load
    let position = null;
    let dataArray = null; // variable for data to limit one api call
    
    // <--- Primary Functions --->
    // people button
    $('#peopleBtn').click( () => {
        $.get('/people', data => { // AJAX Route for people, returns JSON from server
            console.log("got the data", data); // log the data to be sure we have it before we dive into manipulating the DOM

            // assigns dataArray with people data
            dataArray = data;
            position = 10;

            // Creates HTML string for names
            var names = '<p class="text-center">' + data[0].name + '</p>'
            for (var i = 1; i < position; i++) {
                names = names + '<p class="text-center">' + data[i].name + '</p>'
            }

            // injects names into dynamic HTML box for #data
            var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`

            // injects the dynamically generated HTML into elements with id
            $('#data').html(info);
        }, 'json'); // callback designates JSON object
    });

    // planet button
    $('#planetBtn').click( () => {
        $.get('/planets', data => { // AJAX Route for people, returns JSON from server
            console.log("got the data", data); // log the data to be sure we have it before we dive into manipulating the DOM

            // assigns dataArray with people data
            dataArray = data;
            position = 10;

            // Creates HTML string for names
            var names = '<p class="text-center">' + data[0].name + '</p>'
            for (var i = 1; i < position; i++) {
                names = names + '<p class="text-center">' + data[i].name + '</p>'
            }

            // injects names into dynamic HTML box for #data
            var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`

            // injects the dynamically generated HTML into elements with id
            $('#data').html(info);
        }, 'json'); // callback designates JSON object
    });

    // <--- Delegate Functions --->
    // Delegated functions MUST be used for dynamically generated content
    // the DOM does not understand where dynamically generate elements are without delegation
    
    // People
    // Dynamic AJAX on scroll
    $('#container').on( 'DOMMouseScroll mousewheel', event => {
        if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            // scroll down
            // end handler
            var end = null;

            if(position < dataArray.length) {
                end = position;
                position++; // iterates postion for next scroll
            } else {
                end = dataArray.length;
            }

            // Creates HTML string for names
            var names = '<p class="text-center">' + dataArray[0].name + '</p>'
            for (var i = 1; i < end; i++) {
                names = names + '<p class="text-center">' + dataArray[i].name + '</p>'
            }

            // injects names into dynamic HTML box for #data
            var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`

            // injects the dynamically generated HTML into elements with id
            $('#data').html(info);
        // console.log('Down'); Remove for brevity
        } else {
          //scroll up
          // end handler
          var end = null;

          if(position > 10) {
              end = position;
              position--; // iterates postion for next scroll
          } else {
              end = 10;
          }
          
          // Creates HTML string for names
          var names = '<p class="text-center">' + dataArray[0].name + '</p>'
          for (var i = 1; i < end; i++) {
              names = names + '<p class="text-center">' + dataArray[i].name + '</p>'
          }

          // injects names into dynamic HTML box for #data
          var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`

          // injects the dynamically generated HTML into elements with id
          $('#data').html(info);
            // console.log('Up');
        }
        // Returning false will prevent the page from scrolling if you want to use it in the future
        // return false;
    });
});