
## tech Stack 
---------------------------------
* Node.JS
*  Express.JS
* MONGODB
* AWS


token : Authorization Bearer token

## End point of All requests
* createUser --- (/user) --- Post Api
* LoginUser --- (/Login) --- Post Api
* getUsers --- (/user) --- GET API // Restricted
* updateUsers --- (/user) --- PUT API   // Restricted
* deleteUsers --- (/user) --- Delete API  // Restricted

## Restricted  Api 
getAllUsers
updateUser
deleteUser

## Login Credentials
Use Email and Password

-------------------------------------------------------------------------------------------------
create user using from data in body 
like this

```
{
    "status": true,
    "message": "User created successfully",
    "data": {
        "Name": "Ketan",
        "Email": "guptaketan675@gmail.com",
        "Mobile": "8359856065",
        "profilePicture": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/shopping-cart-page-04-product-01.jpg",
        "Password": "Ketan@123",
        "isDeleted": false,
        "_id": "64c943c5492eb645fc584588",
        "createdAt": "2023-08-01T17:41:25.405Z",
        "updatedAt": "2023-08-01T17:41:25.405Z",
        "__v": 0
    }
}
```

[![Screenshot-2023-08-01-231203.png](https://i.postimg.cc/Px05xSj3/Screenshot-2023-08-01-231203.png)
