"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ejs = require("ejs");
class EjsLoader {
    constructor(options = {}) {
        this.options = options;
        this.extension = ".ejs";
        this.cache = {};
    }
    load(filename) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }
        let tpl = fs.readFileSync(filename, this.options.encoding || "utf8");
        return this.cache[filename] = {
            render: ejs.compile(tpl, Object.assign(Object.assign({}, this.options), { filename, cache: false, async: false }))
        };
    }
    unload(filename) {
        delete this.cache[filename];
    }
}
exports.EjsLoader = EjsLoader;
exports.default = EjsLoader;
//# sourceMappingURL=index.js.map