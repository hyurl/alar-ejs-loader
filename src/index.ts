import * as fs from "fs";
import * as ejs from "ejs";
import { View, ViewLoader } from "sfn";

export interface EjsOptions {
    /**
     * Sets a specified encoding for loading the template file (default: `utf8`).
     */
    encoding?: string;
    /** When `false` no debug instrumentation is compiled. */
    compileDebug?: boolean;
    /** Character to use with angle brackets for open/close. */
    delimiter?: string;
    /** Output generated function body. */
    debug?: boolean;
    /** When `true`, generated function is in strict mode. */
    strict?: boolean;
    /** 
     * Remove all safe-to-remove whitespace, including leading and trailing 
     * whitespace.
     */
    rmWhitespace?: boolean;
}

export class EjsLoader implements ViewLoader {
    extesion = ".ejs";
    cache: { [path: string]: View } = {};

    constructor(private options: EjsOptions = {}) { }

    load(path: string): View {
        if (this.cache[path]) {
            return this.cache[path];
        }

        let filename = path + this.extesion;
        let tpl = fs.readFileSync(filename, this.options.encoding || "utf8");

        return this.cache[path] = {
            render: ejs.compile(tpl, {
                ...this.options,
                filename,
                cache: false,
                async: false
            })
        };
    }

    unload(path: string) {
        delete this.cache[path];
    }
}