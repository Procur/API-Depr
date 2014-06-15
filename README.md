# Procur API
### HOST: api.procur.com
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

