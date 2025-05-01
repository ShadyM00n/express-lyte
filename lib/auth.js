class Auth {
    /**
     * @param {Array} apiKeys - An array of valid and usable apikeys.
     */
    constructor(apiKeys) {
        this.keyed = apiKeys;
        this.verify = this.verify.bind(this);
        return this.verify; 
    }

    verify(req, res, next) {
        const apiKey = req.headers['authorization'];
        if (!apiKey) return res.status(401).send("Missing API Key");
        if (!this.keyed.includes(apiKey)) return res.status(403).send("Invalid API Key");
        next();
    }
}

module.exports = Auth;
