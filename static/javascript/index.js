// Modules performs AJAX calls
$( () => { // on load
    // <--- Primary Functions --->
    // people button
    $('#peopleBtn').click( () => {
        $.get('/people', data => { // AJAX Route for people, returns JSON from server
            console.log("got the data", data); // log the data to be sure we have it before we dive into manipulating the DOM

            // Creates HTML string for names
            var names = '<p class="text-center">' + data.results[0].name + '</p>'
            for (var i = 1; i < data.results.length; i++) {
                names = names + '<p class="text-center">' + data.results[i].name + '</p>'
            }

            // injects names into dynamic HTML box for #data
            var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`

            // Dynamically generates links for accessing new data pages -- slice is used on the 'next' attribute to grab the page!
            var links = `<button id="people/all" class="btn btn-link mx-3">Show All ${data.count} People</button>
                            <button id="people/${data.next.slice(data.next.length-1, data.next.length)}" class="btn btn-link mx-3">Next 10</button>`

            // injects the dynamically generated HTML into elements with id
            $('#data').html(info);
            $('#links').html(links)
        }, 'json'); // callback designates JSON object
    });

    // planets button
    $('#planetBtn').click( () => {
        $.get('/planets', data => { // AJAX route for planets, returns JSON from server
            console.log("got the data", data); // log the data to be sure we have it before we dive into manipulating the DOM

            // Creates HTML string for names
            var names = '<p class="text-center">' + data.results[0].name + '</p>'
            for (var i = 1; i < data.results.length; i++) {
                names = names + '<p class="text-center">' + data.results[i].name + '</p>'
            }

            // injects names into dynamic HTML box for #data
            var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`

            // Dynamically generates links for accesing new data pages -- slice is used on the 'next' attribute to grab the page!
            var links = `<button id="allPlanets" class="btn btn-link mx-3">Show All ${data.count} Planets</button>
                <button id="planets/${data.next.slice(data.next.length-1, data.next.length)}" class="btn btn-link mx-3">Next 10</button>`

            // injects the dynamically generated HTML into elements with id
            $('#data').html(info);
            $('#links').html(links);
        }, 'json'); // callback designates JSON object
    });

    // <--- Delegated Functions --->
    // Delegated functions MUST be used for dynamically generated content
    // the DOM does not understand where dynamically generate elements are without delegation

    // People Link
    // targets links, delegated function that serachs for id 'like' people due to dynamic path variable
    $(`#links`).on(`click`, `[id^='people']`, function() {
        // Boolean for path variable:
        if (this.id == "people/all") {
            $.get("people/all", data => {
                console.log("got the data", data); //log the data to be sure we have it before we dive into manipulating the DOM

                // Creates HTML string for names
                // only uses 'data' due to custom object being sent via the server response rather than raw API call
                var names = '<p class="text-center">' + data[0].name + '</p>'
                for (var i = 1; i < data.length; i++) {
                    names = names + '<p class="text-center">' + data[i].name + '</p>'
                }

                // injects names into dynamic HTML box for #data
                var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`
                
                // injects the dynamically generated HTML into elements with id
                $('#data').html(info);
                $('#links').empty(); // removes links

            }, 'json');
        } else {
            $.get(`/people/show/${this.id.slice(this.id.length-1, this.id.length)}`, data => { // converts to readable route by server
                console.log("got the data", data); //log the data to be sure we have it before we dive into manipulating the DOM

                // Creates HTML string for names
                var names = '<p class="text-center">' + data.results[0].name + '</p>'
                for (var i = 1; i < data.results.length; i++) {
                    names = names + '<p class="text-center">' + data.results[i].name + '</p>'
                }

                // injects names into dynamic HTML box for #data
                var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`

                // Dynamically generates links for accesing new data pages -- slice is used on the 'next'/'previous' attribute to grab the page!
                // booleans for links based on API data
                var links = "";
                if (data.previous !== null) {
                    links += `<button id="people/${data.previous.slice(data.previous.length-1, data.previous.length)}" class="btn btn-link mx-3">Previous 10</button>`
                }
                links += `<button id="people/all" class="btn btn-link mx-3">Show All ${data.count} People</button>`
                if (data.next !== null) {
                    links += `<button id="people/${data.next.slice(data.next.length-1, data.next.length)}" class="btn btn-link mx-3">Next 10</button>`
                }

                // injects the dynamically generated HTML into elements with id
                $('#data').html(info);
                $('#links').html(links);
            }, 'json');
        };
    });

    // Planets Link
    // targets links, delegated function that serachs for id 'like' planets due to dynamic path variable
    $(`#links`).on(`click`, `[id^='planets']`, function() {
        // Boolean for path variable:
        if (this.id == "planets/all") {
            $.get("planets/all", data => {
                console.log("got the data", data); //log the data to be sure we have it before we dive into manipulating the DOM

                // Creates HTML string for names
                // only uses 'data' due to custom object being sent via the server response rather than raw API call
                var names = '<p class="text-center">' + data[0].name + '</p>'
                for (var i = 1; i < data.length; i++) {
                    names = names + '<p class="text-center">' + data[i].name + '</p>'
                }

                // injects names into dynamic HTML box for #data
                var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`
                
                // injects the dynamically generated HTML into elements with id
                $('#data').html(info);
                $('#links').empty(); // removes links

            }, 'json');
        } else {
            $.get(`/planets/show/${this.id.slice(this.id.length-1, this.id.length)}`, data => { // converts to readable route by server
                console.log("got the data", data); //log the data to be sure we have it before we dive into manipulating the DOM

                // Creates HTML string for names
                var names = '<p class="text-center">' + data.results[0].name + '</p>'
                for (var i = 1; i < data.results.length; i++) {
                    names = names + '<p class="text-center">' + data.results[i].name + '</p>'
                }

                // injects names into dynamic HTML box for #data
                var info = `<div class="col-4 bg-white border rounded p-2"> ${names} </div>`

                // Dynamically generates links for accesing new data pages -- slice is used on the 'next'/'previous' attribute to grab the page!
                // booleans for links based on API data
                var links = "";
                if (data.previous !== null) {
                    links += `<button id="planets/${data.previous.slice(data.previous.length-1, data.previous.length)}" class="btn btn-link mx-3">Previous 10</button>`
                }
                links += `<button id="planets/all" class="btn btn-link mx-3">Show All ${data.count} Planets</button>`
                if (data.next !== null) {
                    links += `<button id="planets/${data.next.slice(data.next.length-1, data.next.length)}" class="btn btn-link mx-3">Next 10</button>`
                }

                // injects the dynamically generated HTML into elements with id
                $('#data').html(info);
                $('#links').html(links);
            }, 'json');
        };
    });
});