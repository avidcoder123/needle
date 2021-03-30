import { iocContainer, moduleFunction } from ".."

class HelloWorld {
    public message = "Hello world!"
}

interface injection {
    HelloWorld?: HelloWorld
}

const $container = new iocContainer<injection>()

$container.bind("HelloWorld", ($container) => { return new HelloWorld()})

let hi = $container.$import("HelloWorld")

console.log(hi.HelloWorld.message)

