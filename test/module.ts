import { iocContainer } from ".."

class normalBind {
    public message = "Hello"

    public static bind($container: iocContainer<testModule>) {
        $container.bind("normalBind", "App/Test/Normal", () => new normalBind())
    }
}

class singletonBind {
    public message = "Hello"

    public static bind($container: iocContainer<testModule>) {
        $container.singleton("singletonBind", "App/Test/Singleton", () => new singletonBind())
    }
}



export interface testModule {
    normalBind: normalBind,
    singletonBind: singletonBind
}

const $container = new iocContainer<testModule>()

$container.load(normalBind, singletonBind)

export let { $import } = $container