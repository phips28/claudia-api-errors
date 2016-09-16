# Claudia API Errors

API Errors for [Claudia API Builder](https://github.com/claudiajs/claudia-api-builder)

---

# Usage

#### 1) Install and require the 'claudia-api-errors' module 
```javascript
npm install claudia-api-errors --save
```
```javascript
const ApiErrors = require('claudia-api-errors');
// e.g.: new ApiErrors.BadRequest(...)
```

#### 2) Define a function/endpoint 
Add some errors to the `additionalErrors` field.
```javascript
api.get('/sayMyName/{name}', (request) => {
  return { message: `Hello ${request.pathParams.name}` };
}, {
  success: 200, // optional, defaults to `200`
  error: {
    defaultCode: 500, // optional, defaults to `500`
    additionalErrors: [
      ApiErrors.BadRequest,
      // ...
    ],
  },
});
```
_This prints the given name._

#### 3) Add some error checking:
In this case we check if the name length is longer than 2 chars. If not we throw an error. There are **3** ways to throw it:
```javascript
api.get('/sayMyName/{name}', (request) => {
  if (request.pathParams.name.length <= 2) {
    throw new ApiErrors.BadRequest(); 
    // => default: {"message":"Something went wrong"}
    throw new ApiErrors.BadRequest('Parameter \'name\' is too short (min: 3 chars)'); 
    // => {"message":"Parameter 'name' is too short (min: 3 chars)"}
    throw new ApiErrors.BadRequest({ message: 'Parameter \'name\' is too short (min: 3 chars)' }); 
    // => {"message":"Parameter 'name' is too short (min: 3 chars)"}
    // add additional response key:value pairs
    throw new ApiErrors.BadRequest({ message: 'Parameter \'name\' is too short (min: 3 chars)', count: request.pathParams.name.length }); 
    // => {"message":"Parameter 'name' is too short (min: 3 chars)","count":2}
  }
  return { message: `Hello ${request.pathParams.name}` };
}, {
  success: 200, // optional, defaults to `200`
  error: {
    defaultCode: 500, // optional, defaults to `500`
    additionalErrors: [
      ApiErrors.BadRequest,
      // ...
    ],
  },
});
```
You can also use **Promise** to throw an error:
```javascript
return Promise.reject(new ApiErrors.BadRequest('Parameter \'name\' is too short (min: 3 chars)'));
```

#### 4) Test it

Success:
`curl https://[id].execute-api.us-east-1.amazonaws.com/[stage]/sayMyName/phil` _enter your APIG id and stage_
Response: HTTP/1.1 200 OK - {"message":"Hello phil"}

Error:
`curl https://[id].execute-api.us-east-1.amazonaws.com/[stage]/sayMyName/ph` _enter your APIG id and stage_
Response: HTTP/1.1 400 Bad Request - {"message":"Parameter 'name' is too short (min: 3 chars)"}

---

## Override Error Classes

You can create your own error class with a custom template. For more infos about pattern check out this: [AWS error pattern](https://aws.amazon.com/blogs/compute/error-handling-patterns-in-amazon-api-gateway-and-aws-lambda/)
```javascript
const ApiErrors = require('claudia-api-errors');
class CustomBadRequest extends ApiErrors.BadRequest {
  static get customTemplate() {
    return '$input.path(\'$.errorMessage.customData\')';
  }
}   

api.get('/sayMyName/{name}', (request) => {
  return { message: `Hello ${request.pathParams.name}` };
}, {
  success: 200, // optional, defaults to `200`
  error: {
    defaultCode: 500, // optional, defaults to `500`
    additionalErrors: [
      CustomBadRequest,
    ],
  },
});
```

---

## Questions, suggestions? 
[![Join the chat at https://gitter.im/claudiajs/claudia](https://badges.gitter.im/claudiajs/claudia.svg)](https://gitter.im/claudiajs/claudia?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## License

MIT
