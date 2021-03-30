# Needle
![A needle.](https://i.imgur.com/FwUP9wj.jpeg)

<br>
## What is Needle?
Needle is a dependency injection library for Typescript. It is framework-agnostic and can run anywhere where Javascript can.
<br>
## Why Needle?
Needle is lightweight and simple to use. You can import items from a container with just one function without missing out on features like Intellisense. Unlike other dependency injection libraries, Needle does not need a custom compiler nor does it overuse decorators.
<br>
# Documentation
## Your first dependency
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
However, at the moment this isn't very useful. You can't actually use your helloWorld dependency. We can store our class in the container with `container.bind(className: string, moduleName: string, bindingProcess: ($container: iocContainer) => any)`.
Let's examine each parameter of the bind function.
className is the literal name of your class. This is case sensitive and lets you use intellisense. In this case, it is `helloWorld`. 
moduleName can be anything you want. It is simply a string that will be used to identify your module. Let's call it `Example/HelloWorld`.
bindingProcess is the setup for your dependency. It should return a new instance of your class. Real world dependencies usually have dependencies themselves, so you can use this function to import modules. 