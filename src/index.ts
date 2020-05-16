import * as fs from "fs";
import * as ejs from "ejs";
import { ModuleLoader } from "alar";

export namespace EjsLoader {
    export interface View {
        render(data: { [name: string]: any }): string;
    }

    export interface Options {
        /**
         * Specifies encoding for loading the template (default: `utf8`).
         */
        encoding?: BufferEncoding;
        /** When `false` no debug instrumentation is compiled. */
        compileDebug?: boolean;
        /** Character to use with angle brackets for open/close. */
        delimiter?: string;
        /** Outputs generated function body. */
        debug?: boolean;
        /** When `true`, generated function is in strict mode. */
        strict?: boolean;
        /** 
         * Removes all safe-to-remove whitespace, including leading and trailing 
         * whitespace.
         */
        rmWhitespace?: boolean;
    }
}

export class EjsLoader implements ModuleLoader {
    extension = ".ejs";
    cache: { [filename: string]: EjsLoader.View } = {};

    constructor(private options: EjsLoader.Options = {}) { }

    load(filename: string) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        let tpl = fs.readFileSync(filename, this.options.encoding || "utf8");

        return this.cache[filename] = {
            render: ejs.compile(tpl, {
                ...this.options,
                filename,
                cache: false,
                async: false
            })
        };
    }

    unload(filename: string) {
        delete this.cache[filename];
    }
}

export default EjsLoader;