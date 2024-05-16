/**
 * Configuration options for Cross-Origin Resource Sharing (CORS).
 * @module corsOptions
 */

const allowedOrigins = require("./allowedOrigins");

/**
 * Callback function to determine if a request origin is allowed.
 * @callback originCallback
 * @param {string} origin - The request origin.
 * @param {Function} callback - The callback function to be called with the result.
 * @param {Error} callback.error - An error object if the origin is not allowed, or null if it is allowed.
 * @param {boolean} callback.allowed - A boolean indicating whether the origin is allowed.
 */

/**
 * CORS options object.
 * @type {Object}
 * @property {originCallback} origin - The callback function to determine if a request origin is allowed.
 * @property {boolean} credentials - Indicates whether to include cookies in CORS requests.
 * @property {number} optionsSuccessStatus - The HTTP status code to be sent for successful CORS preflight requests.
 */
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
