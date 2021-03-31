export type moduleFunction<T> = ($container: iocContainer<T>, ...params: Array<any>) => any

enum moduleTypes {
    NORMAL = 0,
    SINGLETON = 1
}


export class iocContainer<T> {

    private singletonCache = {}

    private registry: {[key: string]: {moduleName: string, type: moduleTypes, fn: moduleFunction<T>, params?: Array<any>}} = {}

    public bind = (key: string, moduleName: string, module: moduleFunction<T>, params?: Array<any>): void => {
        this.registry[key] = {moduleName, type: moduleTypes.NORMAL, fn: module, params: params?params:[]}
    }

    public singleton = (key: string, moduleName: string, module: moduleFunction<T>, params?: Array<any>): void => {
        this.registry[key] = {moduleName, type: moduleTypes.SINGLETON, fn: module, params: params?params:[]}
    }

    public load = (...classNames: any): void => {
        for(let className of classNames) {
            className.bind(this)
        }
    }

    public $import = (name: string): T => {
        let key;
        for(let moduleName in this.registry) {
            if(this.registry[moduleName].moduleName == name) {
                key = moduleName
                break
            }
        }
        const module = this.registry[key]
        if(!module) {
            throw new Error("Module " + key + " could not be resolved.")
        } else if(module.type == moduleTypes.SINGLETON) {
            if(key in this.singletonCache) {
                return {[key]: this.singletonCache[key]} as T
            } else {
                this.singletonCache[key] = module.fn(this, ...module.params)
                return {[key]: this.singletonCache[key]} as T
            }
        } else {
            return {[key]: module.fn(this, ...module.params)} as T
        }
    }
}