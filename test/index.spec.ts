import test from 'japa'
import { $import } from './module'

test.group("Test dependency injection", async function() {
    test("Make sure normal bind returns different instance", async function(assert) {
        let firstBind = $import("normalBind").normalBind
        firstBind.message = "Bye"
        let secondBind = $import("normalBind").normalBind
        assert.notEqual(secondBind.message, "Bye")
    })

    test("Make sure singleton returns same instance", async function(assert) {
        let firstBind:any = $import("singletonBind")
        firstBind = firstBind.singletonBind
        firstBind.message = "Bye"
        let secondBind = $import("singletonBind").singletonBind
        assert.equal(secondBind.message, "Bye")
    })
})