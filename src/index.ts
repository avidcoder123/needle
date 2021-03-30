export type moduleFunction<T> = ($container: iocContainer<T>, ...params) => any

enum moduleTypes {
    NORMAL = 0,
    SINGLETON = 1
}


export class iocContainer<T> {

    private singletonCache: T

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
        }
        if(module.type == moduleTypes.SINGLETON) {
            if(this.singletonCache[key]) {
                return this.singletonCache
            } else {
                this.singletonCache[key] = module.fn(this, ...module.params)
                return this.singletonCache
            }
        } else {
            return {[key]: module.fn(this, ...module.params)} as T
        }
    }
}