var fibonacci = require('../fibonacci').fibonacci 
var should = require('should')

describe('test/fibonacci.test.js', function() {
    it('fibonacci(10) should equal 55', function() {
        fibonacci(10).should.equal(55)
    })

    it('fibonacci(1) should equal 1', function() {
        fibonacci(1).should.equal(1)
    })

    it('fibonacci(0) should equal 0', function() {
        fibonacci(0).should.equal(0)
    })

    it('fibonacci should throw error when n > 10', function() {
        (function(){
            fibonacci(11)
        }).should.throw('n should <= 10')
    })

    it('fibonacci should throw error when n < 0', function() {
        (function(){
            fibonacci(-1)
        }).should.throw('n should >= 0')
    })

    it('fibonacci should throw error when n isnt a number', function() {
        (function() {
            fibonacci('string')
        }).should.throw('n should be a Number')
    })

    it('fibonacci should throw error when n is NaN', function() {
        (function() {
            fibonacci(NaN)
        }).should.throw('n should be a Number')
    })
})