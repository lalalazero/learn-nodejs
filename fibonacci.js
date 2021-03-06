var fibonacci = function(n) {
    if (typeof n !== 'number' || isNaN(n)) {
        throw new Error('n should be a Number')
    }
    if (n < 0) {
        throw new Error('n should >= 0')
    }
    if (n > 10) {
        throw new Error('n should <= 10')
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}
if (require.main === module) {
    // 如果直接执行 fibonacci.js 则进入此处，
    // 如果是被其他 module require, 那么这里不会执行
    var n = Number(process.argv[2])
    console.log('fibonacci(' + n + ') is ' + fibonacci(n))
}
exports.fibonacci = fibonacci