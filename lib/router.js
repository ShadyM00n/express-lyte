const express = require("express");

/**
 * @typedef {Object} RouterConfiguration
 * @property {String} name - Name of Router.
 * @property {String} path - Base path of the Router.
 */


class Router {
    /**
     * @param {RouterConfiguration} config - Configuration settings
     */
    constructor (config) {
        if (!config || typeof config !== 'object') throw new Error("Invalid config: expected an object.");
        /** @type {RouterConfiguration} */
        this.config = config;
        this.router = express.Router();
    }

    get (path, callback) {
        return this.router.get(path, callback);
    }

    post (path, callback) {
        return this.router.post(path, callback);
    }

    delete (path, callback) {
        return this.router.delete(path, callback);
    }
}


module.exports = Router;