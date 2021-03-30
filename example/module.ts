import { iocContainer } from ".."

class HelloWorld {

    public message = "Hello world!"

    public static bind($container: iocContainer<injection>) {
        $container.bind("HelloWorld","App/Example/HelloWorld", () => new HelloWorld())
    }
}

interface injection {
    HelloWorld: HelloWorld
}

const $container = new iocContainer<injection>()

$container.load(HelloWorld)

export let { $import } = $container