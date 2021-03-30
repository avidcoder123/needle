export type moduleFunction<T> = ($container: iocContainer<T>, ...params: Array<any>) => any

enum moduleTypes {
    NORMAL = 0,
    SINGLETON = 1
}


export class iocContainer<T> {

    private singletonCache = {}

    private registry: {[key: string]: {type: moduleTypes, fn: moduleFunction<T>, params?: Array<any>}} = {}

    public bind = (key: string, module: moduleFunction<T>, params?: Array<any>): void => {
        this.registry[key] = {type: moduleTypes.NORMAL, fn: module, params: params?params:[]}
    }

    public singleton = (key: string, module: moduleFunction<T>, params?: Array<any>): void => {
        this.registry[key] = {type: moduleTypes.SINGLETON, fn: module, params: params?params:[]}
    }

    public load = (...classNames: any): void => {
        for(let className of classNames) {
            className.bind(this)
        }
    }

    public $import = (key: string): T => {
        const module = this.registry[key]
        if(!module) {
            throw new Error("Module " + key + " could not be resolved.")
        } else if(module.type == moduleTypes.SINGLETON) {
            if(key in this.singletonCache) {
                if (this.singletonCache == undefined) {
                    throw new Error("Somethigs up")
                }
                return this.singletonCache as T
            } else {
                this.singletonCache[key] = module.fn(this, ...module.params)
                return this.singletonCache as T
            }
        } else {
            return {[key]: module.fn(this, ...module.params)} as T
        }
    }
}