# demo-services

### To start this demo api app:
1. Clone the repo
1. Create .env file and add these variables into it:
    - DATABASE_URL (which should contain valid postgres database url)
    - PORT
    - SECRET
1. Don't forget to start postgres server
1. Install packages by write in the terminal `npm i`
1. Finally run the app `npm start`

### Small APIs Docs
1. Auth APIs: 
    - `/signup` with email and password in the body object
    - `/login` with encoded email and password in the authorization header
    - `/delete` to delete current user
    - `/generate-token` with id in the body
1. User APIs:
    - `/user/:id` to get user by id
    - `all-users` to get all users
1. Reflection APIs:
    - `/reflection/create` with take_away, low_point and success in the body object
    - `/reflection/getOne/:id` to get one reflection
    - `/reflection/getAll` to get all reflections
    - `/reflection/update/:id` with take_away, low_point and success in the body object
    - `/reflection/delete/:id` to delete reflection