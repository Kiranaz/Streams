/*We can use the async keyword before a function name to wrap the 
return value of this function in a Promise. We can use the await 
keyword (in an async function) to wait for a promise to be resolved or
 rejected before continuing code execution in this block. */

 /*The one thing you need to know about async functions is that;
  they always returns a promise.
  When do we use it? If we have an asynchronous function inside of an async block.
   So let's say we need to fetch some data from our server and then use that data within our async block.
   We will use await to pause the function execution and resume after the data comes in. */

   import axios from 'axios';

   export default axios.create({
       baseURL: 'http://localhost:3001'
   })