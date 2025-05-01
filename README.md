# express-lyte

`express-lyte` is a lightweight library for quickly setting up APIs with Express. It simplifies the API creation process and ensures compatibility with popular Express extensions, like `express-rate-limit`. With minimal configuration, you can easily structure your API, manage routes, and extend your app's functionality.

## Features

- Simple API and router creation
- Compatible with popular Express extensions (e.g., `express-rate-limit`)
- Easy setup for versioned APIs
- Flexible routing with minimal configuration
- Built-in support for rate limiting, authentication, and more

## Installation

To install `express-lyte`, run the following command:

```
npm install express-lyte
```

## Usage

### Basic Setup

`express-lyte` allows you to create APIs with versioned routes. Below is an example of setting up a versioned API with rate limiting and authentication.

```javascript
const { API, Router, Auth, RateLimiter } = require("express-lyte");

const Authization = new Auth([                      // Creates an auth gateway for your API.
    "cd9e7837-9194-4009-ad2c-b698368b8423"
]);

const apiV1Router = new Router({ name: "V1 API", path: "/api/v1" });           // Creates a route for /api/v1
const apiV2Router = new Router({ name: "V2 API", path: "/api/v2" });           // Creates a route for /api/v2

apiV1Router.get("/", (req, res) => { res.json({ timestamp: Date.now() }); });  // Creates a GET endpoint at /api/v1/
apiV2Router.get("/", (req, res) => { res.json({ timestamp: Date.now() }); });  // Creates a GET endpoint at /api/v2/

// Rate limiter setup
const limiter = new RateLimiter({
    window: 5 * 60 * 1000,  // Limit requests to every 5 minutes
    max: 100,               // Max 100 requests per window
    message: "Too many requests from this IP, please try again later."
});

const api = new API({                   // Creates an API instance.
    port: 8081,                         // Set the API to run on port 8081.
    Routers: [apiV1Router, apiV2Router]  // Attach versioned routers to the API.
});

// Apply the rate limiter globally
api.use(limiter);

// Apply the authorization gateway globally
api.use(Authization);

api.listen(() => {                      // Start the API.
    console.log("API is running");      // Log a message when the API starts.
});
```

### Explanation

- **Router Setup**: You define versioned routes (e.g., `/api/v1`, `/api/v2`) using `Router`. This helps organize your API endpoints into logical versions.

- **Rate Limiting**: The `RateLimiter` class is used to limit the number of requests per IP in a 5-minute window (maximum of 100 requests). If the limit is exceeded, the message "Too many requests from this IP, please try again later" is sent.

- **Authentication**: The `Auth` class provides an easy way to enforce authentication in your API. In the example, an API key `"cd9e7837-9194-4009-ad2c-b698368b8423"` is required for accessing the routes. If a request doesn't include a valid API key, it is denied.

- **API Initialization**: Create an `API` instance, attach routers, and start the server on port `8081`. The rate limiter and authentication middleware are applied globally using `api.use()`.

### Compatibility

`express-lyte` is fully compatible with popular Express extensions. In the above example, `RateLimiter` is used to manage the rate of requests, and `Auth` is used to secure the API. You can easily integrate other middlewares or extensions to suit your app’s needs.

## Documentation

For more detailed documentation, visit the GitHub repository:

[https://github.com/ShadyM00n/express-lyte](https://github.com/ShadyM00n/express-lyte)

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## License

MIT License. See the [License](License) file for more details.
