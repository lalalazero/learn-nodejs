var app = require('../app')
var supertest = require('supertest')
var should = require('should')

var request = supertest(app)

describe('test/app.test.js', function() {
    it('should return 55 when n is 10', function(done) {
        request.get('/fib').query({ n: 10 }).end(function(err, res) {
            should.not.exist(err)
            res.text.should.equal('55')
        })
        return done()
    })

    it('should return 0 when n is 0', function(done) {
        testFib(0, 200, '0', done)
    })

    it('should return 1 when n is 1', function(done) {
        testFib(1, 200, '1', done)
    })

    it('should return 55 when n is 10', function(done) {
        testFib(10, 200, '55', done)
    })

    it('should throw error when n > 10', function(done) {
        testFib(11, 500, 'n should <= 10', done)
    })

    it('should throw error when n < 0', function(done) {
        testFib(-1, 500, 'n should >= 0', done)
    })

    it('should throw error when n isnt number', function(done) {
        testFib('haha', 500, 'n should be a Number', done)
    })

    it('should throw error when n is NaN', function(done) {
        testFib(NaN, 500, 'n should be a Number', done)
    })

    // 单独测试一下返回码 500
    it('should status 500 when error', function(done) {
        request.get('/fib').query({ n: 100 }).expect(500).end(function(err, res) {
            done(err)
        })
    })

})

var testFib = function(n, statusCode, expect, done) {
    request.get('/fib')
        .query({ n: n })
        .expect(statusCode)
        .end(function(err, res) {
            res.text.should.equal(expect)
            done(err)
        })
}