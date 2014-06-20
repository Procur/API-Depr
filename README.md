# Procur API
### HOST: api.procur.com
#Authentication

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

#Administration

##Fetch Error Logs [/fetchlogs]

### Fetch All Logs [GET]
+ Request Logs (application/json)

                
        + Headers
        {
            "apitoken": "$2a$$$10sGiu6GBwz62sfdvcMSLC6iL.keJekpS2xB.nLIMlUltU8ms0kkRi4yS"
        }

+ Response 200 (application/json)
       
        [
          {
            "clientIp": "127.0.0.1",
            "content": "Invalid API token sent",
            "createdAt": "2014-06-15T02:44:32.955Z",
            "updatedAt": "2014-06-15T02:44:32.955Z",
            "id": "539d08909869a793104f06fe"
          },
          {
            "clientIp": "127.0.0.1",
            "content": "Invalid API token sent",
            "createdAt": "2014-06-15T02:44:42.117Z",
            "updatedAt": "2014-06-15T02:44:42.117Z",
            "id": "539d089a9869a793104f06ff"
          },
          {
            "clientIp": "127.0.0.1",
            "content": "Invalid API token sent",
            "createdAt": "2014-06-15T02:45:21.703Z",
            "updatedAt": "2014-06-15T02:45:21.703Z",
            "id": "539d08c15cddf5f310a037ff"
          }
        ]
        
### Fetch Single Log [GET]
+ Request Log (application/json)

                
        + Headers
        {
            "apitoken": "$2a$$$10sGiu6GBwz62sfdvcMSLC6iL.keJekpS2xB.nLIMlUltU8ms0kkRi4yS"
        }
        
        + Params
        {
            "id": "539d08c15cddf5f310a037ff"
        }

+ Response 200 (application/json)
       
        {
            "clientIp": "127.0.0.1",
            "content": "Invalid API token sent",
            "createdAt": "2014-06-15T02:45:21.703Z",
            "updatedAt": "2014-06-15T02:45:21.703Z",
            "id": "539d08c15cd55f5f312a037ff"
        }
