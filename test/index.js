const assert = require("assert");
const alar = require("alar");
const { EjsLoader } = require("..");

var view = new alar.ModuleProxy("views", __dirname);

view.setLoader(new EjsLoader());

assert.strictEqual(view.hello.instance().render({ title: "Alar" }), "<h1>Alar</h1>");

console.log("#### OK ####");