import Foo from "./pkg/Foo";

interface Person {
  fname: string;
  lname: string;
}

function greeter (person: Person) {
  var foo = new Foo("baz");
  return "Hello " + person.fname + " "  + person.lname;
}

console.log(
  greeter({ fname: "Diego", lname: "Sanchez" })
);
