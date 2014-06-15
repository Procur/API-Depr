FORMAT: 1A
HOST: http://api.procur.com

# Procur API

# Group Authentication

## Create User [/signup]

### Register [POST]
+ Request (application/json)
    
        {
            "firstName": "Doctor",
            "lastName": "Strangelove",
            "email": "dstrangelove@procur.com",
            "password": "m1n3$h@ftG@p"
        }
        

+ Response 200 (application/json)

        {
            "firstName": "Doctor",
            "lastName": "Strangelove",
            "email": "dstrangelove@procur.com",
            "emailVerified": true,
            "profileComplete": false,
            "active": true,
            "createdAt": "2014-06-15T16:10:58.710Z",
            "updatedAt": "2014-06-15T16:10:58.710Z",
            "token": "$2a$50$lccTmLXCO/328vKdgSwHpu8vnTamdWox98I2hcwx3OVfMwhAg97kW"
        }

## Authenticate [/login]
### Login [POST]
+ Request (application/json)

        {
            "email": "dstrangelove@procur.com",
            "password": "m1n3$h@ftG@p"
        }

+ Response 200 (application/json)

        {
            "firstName": "Doctor",
            "lastName": "Strangelove",
            "email": "dstrangelove@procur.com",
            "emailVerified": true,
            "profileComplete": false,
            "active": true,
            "createdAt": "2014-06-15T16:10:58.710Z",
            "updatedAt": "2014-06-15T16:10:58.710Z",
            "token": "$2a$50$lccTmLXCO/328vKdgSwHpu8vnTamdWox98I2hcwx3OVfMwhAg97kW"
        }

## Note [/notes/{id}]
A single Note object with all its details

+ Parameters
    + id (required, number, `1`) ... Numeric `id` of the Note to perform action with. Has example value.

### Retrieve a Note [GET]
+ Response 200 (application/json)

    + Header

            X-My-Header: The Value

    + Body

            { "id": 2, "title": "Pick-up posters from post-office" }

### Remove a Note [DELETE]
+ Response 204

# Group Company

# Group Buyer

# Group Supplier

# Group Location
## Location [/location/create]
### Create [POST]
+ Response 200 (application/json)

    + Header

            X-My-Header: The Value

    + Body

            { "id": 2, "title": "Pick-up posters from post-office" }
