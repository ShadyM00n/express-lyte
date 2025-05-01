const rateLimit = require("express-rate-limit");

/**
 * @typedef {Object} RateLimiterConfiguration
 * @property {Number} window - Reset rate limit time.
 * @property {Number} max - Max requests per window.
 * @property {String} message - Rate limit message.
 */

class RateLimiter {
    /**
     * @param {RateLimiterConfiguration} config - Configuration settings
     */
    constructor(config) {
      return rateLimit({
        windowMs: config.window || 5 * 60 * 1000,
        max: config.max || 100,
        message: config.message || "Too many requests from this IP, please try again later."
    });
    }
}


module.exports = RateLimiter;
