import { iocContainer } from ".."

class normalBind {
    public message = "Hello"

    public static bind($container: iocContainer<testModule>) {
        $container.bind("normalBind", () => new normalBind())
    }
}

class singletonBind {
    public message = "Hello"

    public static bind($container: iocContainer<testModule>) {
        $container.singleton("singletonBind", () => new singletonBind())
    }
}


export interface testModule {
    normalBind: normalBind,
    singletonBind: singletonBind,
}

const $container = new iocContainer<testModule>()

$container.load(normalBind, singletonBind)

export let { $import } = $container