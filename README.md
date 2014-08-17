# Simple Webserver Using Node.js, Express and JADE

This application is a simple node.js web server that employs all CRUD operations as well as serves pages using JADE as the view engine.

## Routing Non-API Pages
All pages with the route of /, for example /index or /helloworld are handled with their own get requests in the following section of the application:

    // ========================================= SERVING WEB PAGES ============================================
    // GET hello world page
    router.get('/helloworld', function(req, res) {
      console.log('Hello World Page Has Been Served.');
      res.render('helloworld', { title: 'Hello World!' });
    });
    
    // ========================================= END SERVING WEB PAGES =========================================

At present the POSTing and GETting of tools are not supported in the view engine but will be very soon.

## Routing API Pages
The API as mentioned is fully developed and connected to a MongoDB database called which is being used to store "tools" objects.

The application supports:

- GET
- POST
- UPDATE
- DELETE

The route of the API is /api/tools which triggers a full GET for the database, that is - returning all the objects in the document store.

## Things To Do

1.  Define the correct variables for the Tools object.
2.  Connect the front end to the backend of the application.
3.  Buildout user stories.