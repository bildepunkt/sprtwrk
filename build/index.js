"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foo_1 = require("./pkg/Foo");
function greeter(person) {
    var foo = new Foo_1.default("baz");
    return "Hello " + person.fname + " " + person.lname;
}
console.log(greeter({ fname: "Diego", lname: "Sanchez" }));
