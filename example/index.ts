import { iocContainer, moduleFunction } from ".."

class HelloWorld {

    public message = "Hello world!"

    public static bind($container: iocContainer<injection>) {
        $container.bind("HelloWorld", () => new HelloWorld())
    }
}

interface injection {
    HelloWorld?: HelloWorld
}

const { load, $import } = new iocContainer<injection>()

load(HelloWorld)

let hi = $import("HelloWorld")

console.log(hi.HelloWorld.message)

