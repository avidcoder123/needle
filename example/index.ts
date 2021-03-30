import { $import } from "./module"


let { HelloWorld } = $import("HelloWorld")

console.log(HelloWorld.message)

