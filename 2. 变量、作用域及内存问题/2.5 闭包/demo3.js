var createCounter = function() {
    var privateCount = 0;

    function changeBy(step) {
        privateCount += step;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        getValue: function() {
            return privateCount;
        }
    }
}

var counter1 = createCounter();
var counter2 = createCounter();
console.log(counter1.getValue()); // 0
console.log(counter2.getValue()); // 0
counter1.increment();
counter1.increment();
console.log(counter1.getValue()); // 2
console.log(counter2.getValue()); // 0