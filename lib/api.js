const express = require("express");
const app = express();


/**
 * @typedef {Object} APIConfiguration
 * @property {Number} port - Port the API runs on.
 * @property {Array} Routers - List of routers used by the API.
 */



class API {
    /**
     * @param {APIConfiguration} config - Configuration settings
     */
    constructor (config) {
        if (!config || typeof config !== 'object') throw new Error("Invalid config: expected an object.");
        /** @type {APIConfiguration} */
        this.config = config;
    }


    uploadRouters () {
        this.config.Routers.forEach(router => {
            app.use(router.config.path, router.router);
        });
    }

    use (...args) {
        return app.use(...args);
    }

    listen (callback) {
        this.uploadRouters();
        return app.listen(this.config.port, callback);
    }
}


module.exports = API;