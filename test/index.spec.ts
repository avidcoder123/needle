import test from 'japa'
import { $import } from './module'

test.group("Test dependency injection", async function() {
    test("Make sure normal bind returns different instance", async function(assert) {
        let firstBind = $import("App/Test/Normal").normalBind
        firstBind.message = "Bye"
        let secondBind = $import("App/Test/Normal").normalBind
        assert.notEqual(secondBind.message, "Bye")
    })

    test("Make sure singleton returns same instance", async function(assert) {
        let firstBind = $import("App/Test/Singleton").singletonBind
        firstBind.message = "Bye"
        let secondBind = $import("App/Test/Singleton").singletonBind
        assert.equal(secondBind.message, "Bye")
    })

    test("Nonexistant module should throw error", async function(assert) {
        assert.throw(
            () => $import("App/Test/NonExistant"),
            "Module App/Test/NonExistant could not be resolved."
        )
    })
})