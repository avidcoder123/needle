import { $import } from "./module"


let { HelloWorld } = $import("App/Example/HelloWorld")

console.log(HelloWorld.message)