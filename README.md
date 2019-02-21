# Alar-Ejs-Loader

**Ejs loader for [Alar](https://github.com/hyurl/alar) framework.**

When using this loader, ejs files can be loaded as Alar modules and take
benefits of auto-loading and hot-reloading.

For information about **ejs**, please visit 
[https://www.npmjs.com/package/ejs](https://www.npmjs.com/package/ejs).

## Example

```typescript
import { ModuleProxy } from "alar";
import { EjsLoader } from "alar-ejs-loader";

var view = new ModuleProxy("views", __dirname + "/views");

view.setLoader(new EjsLoader());

// assume there is hello.ejs file in views
// every ejs module instance has a render method and accepts an argument as data
// parsed to the template.
view.hello.instance().render({ /* data */ });
```

## API

### `new EjsLoader(options?: EjsLoader.Options)`

Interface `Options` includes:

- `encoding?: string` Specifies encoding for loading the template (default: 
    `utf8`).
- `compileDebug: boolean` When `false` no debug instrumentation is compiled.
- `delimiter: string` Character to use with angle brackets for open/close.
- `debug: boolean` Outputs generated function body.
- `strict: boolean` When `true`, generated function is in strict mode.
- `rmWhitespace: boolean` Removes all safe-to-remove whitespace, including 
    leading and trailing whitespace.