# Needle
![A needle.](https://i.imgur.com/FwUP9wj.jpeg)

## What is Needle?
Needle is a dependency injection library for Typescript. It is framework-agnostic and can run anywhere where Javascript can.
<br>
## Why Needle?
Needle is lightweight and simple to use. You can import items from a container with just one function without missing out on features like Intellisense. Unlike other dependency injection libraries, Needle does not need a custom compiler nor does it overuse decorators.
<br>
# Documentation
## Creating a Container
To start using Needle, you will need to create an IoC container to store your dependencies. To do this, you must first import the `iocContainer` class.
You will also need to create a container interface for Intellisense to work properly.
This interface will list every single class you would like to store in your container. Here is an example:
```typescript 
import { iocContainer } from 'needle';

class helloWorld {}

const container = new iocContainer<dependencies>()

interface dependencies {
    helloWorld: helloWorld
}
```
This tells Needle that you want to create a container which will hold a dependancy of class helloWorld.

## Binding a dependency

However, at the moment this isn't very useful. You can't actually use your helloWorld dependency, and we need to register it in the container. We can register our class as a dependency with `container.bind`,which has three parameters: `className`, `moduleName`, and `fn`.


Let's examine each parameter of the bind function.

`className` is the literal name of your class. This is case sensitive and lets you use intellisense. In this case, it is `helloWorld`. 

`moduleName` can be anything you want. It is simply a string that will be used to identify your module. Let's call it `Example/HelloWorld`.


`fn` is the setup for your dependency. It should return a new instance of your class. Real world dependencies usually have dependencies themselves, so you can use this function to import modules. Let's register our dependency.

```typescript
container.bind(
  "helloWorld",
  "Example/HelloWord",
  (container)=>new helloWorld()
)
```

## Importing the Dependency

Now, we can use our dependency anywhere with `container.$import`. The import function takes only one argument: the module name. However, it returns an object. This object.[Your dependency class name] will return your dependency. The reason you must also take the class name is so you can have intellisense for the module without having to do an ESM import for its type information. Here is an example of importing our helloWord class:
```typescript
let myDependency = container.$import("Example/HelloWorld").helloWorld
//You can also use destructuring
{ helloWorld } = container.$import("Example/HelloWorld")
```
You may notice that every time you $inport the module, it creates a new instance of `helloWorld`. If we want to use a single instance of our module across the app, we must use singletons.

## Registering a Singleton

The parameters for registering a singleton is the same as the one for binding. Let's do the same thing:
```typescript
container.singleton(
  "helloWorld",
  "Example/Singleton",
  (container)=>new helloWorld()
)
```
Now when we $import our module it will create the class once and cache the result for reuse. The $import function works both on normal modules and singletons.

## Loading a Class File

It can be tedious to manually bind your dependencies yourself in one file. To solve this, Needle lets you load a class file so it can automatically bind itself to the container. We can define our binding login in a static class method named `bind`. Let's do it with our `helloWorld` class:
```typescript
class helloWorld{
  public static bind(container: iocContainer<dependencies>) {
    container.bind(
      "helloWorld",
      "Example/HelloWorld"
      ()=>new helloWorld()
    )
  }
}
```
Now instead of writing our binding logic in one file, we can just run
```typescript
container.load(helloWorld)
```
