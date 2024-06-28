//const assert=require('assert');
const Logger=require("../logger.js");
const logger=new Logger("test");
// Mocha Test Case
describe('Mocha Test Case', function() {
    it('send', function(done) {
    	logger.send("a label");
        done();
    });
    it('sendDebug', function(done) {
    	logger.sendDebug("a label",{a:"test"});
//    	const Logger = require(../loggerNode");
//    	const Logger = require("node-red-contrib-logger");
//    	const logger = new Logger("test");
//    	logger.sendInfo("Copyright 2020 Jaroslav Peter Prib");
//        assert.equal(sqrt, 25);
        done();
    });
    it('set on', function(done) {
        let r=""
        logger.onOn({callFunction:()=>{r="setOn1"}})
        logger.onOn((a)=>{r=a},"setOn2")
        logger.onOff({callFunction:()=>{r="setOff1"}})
        logger.onOn((a)=>{r=a},"setOff2")
       	logger.active && logger.send("a label "+r);
        logger.setOff()
        logger.active && done("should not run")
        logger.setOn()
        logger.active?done():done("shown be on")
    });

});