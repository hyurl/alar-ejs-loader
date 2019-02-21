"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ejs = require("ejs");
class EjsLoader {
    constructor(options = {}) {
        this.options = options;
        this.extesion = ".ejs";
        this.cache = {};
    }
    load(path) {
        if (this.cache[path]) {
            return this.cache[path];
        }
        let filename = path + this.extesion;
        let tpl = fs.readFileSync(filename, this.options.encoding || "utf8");
        return this.cache[path] = {
            render: ejs.compile(tpl, Object.assign({}, this.options, { filename, cache: false, async: false }))
        };
    }
    unload(path) {
        delete this.cache[path];
    }
}
exports.EjsLoader = EjsLoader;
//# sourceMappingURL=index.js.map