import readline from 'readline';
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const CoordinateSystem = {
  cartesian: 0,
  polar: 1,
}
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  // constructor(rho, theta) {
  //     this.x = rho * Math.cos(theta);
  //     this.y = rho * Math.sin(theta);
  // }

  // if we want to keep both functionality
  // constructor(a, b, cs = CoordinateSystem.cartesian) {
  //     switch(cs) {
  //         case CoordinateSystem.cartesian:
  //             this.x = a;
  //             this.y = b;
  //             break;
  //         case CoordinateSystem.polar:
  //             this.x = a * Math.cos(b);
  //             this.y = a * Math.sin(b);
  //             break;
  //     }
  // }
}

class PointFactory {
    static newCartesianPoint(x, y) { // factory method 1
        return new Point(x, y);
    }

    static newPolarPoints(rho, theta) { // factory method 2
    return new Point(
        rho * Math.cos(theta), 
        rho * Math.sin(theta)
    );
    }
}

let p = PointFactory.newCartesianPoint(4,5);
console.log(p);

let p2 = PointFactory.newPolarPoints(5, Math.PI/2);
console.log(p2);

// Abstract Factory
class HotDrink {
    consume() {}
}

class Tea extends HotDrink {
    consume() {
        console.log(`This tea is nice with lemon!'`);
    }
}

class Coffee extends HotDrink {
    consume() {
        console.log(`This coffee is delicious!'`);
    }
}

class HotDrinkFactory {
    prepare(amount) {/* abstract */ }
}

class TeaFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Put in tea bag, boil water, pour ${amount}ml`);
        return new Tea(); // customize
    }
}

class CoffeeFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Grind some beans, boil water, pour ${amount}ml`);
        return new Coffee();
    }
}

let AvailableDrink = Object.freeze({
    coffee: CoffeeFactory,
    tea: TeaFactory
})

class HotDrinkMachine {
    constructor() {
        this.factories = {};
        for(let drink in AvailableDrink) {
            this.factories[drink] = new AvailableDrink[drink]();
        }
    }

    interact(consumer) {
        rl.question('Please specify drink and amount (e.g., tea 50): ', answer => {
            let parts = answer.split(' ');
            let name = parts[0];
            let amount = parseInt(parts[1]);

            let d = this.factories[name].prepare(amount);
            rl.close();
            consumer(d);
        })
    }

    makeDrink(type) {
        switch (type) {
            case 'tea': return new TeaFactory().prepare(200);

            case 'coffee': return new CoffeeFactory().prepare(50);

            default: throw new Error('');
        }
    }
}

let machine = new HotDrinkMachine();
// rl.question('Which drink?', function(answer) {
//     let drink = machine.makeDrink(answer);
//     drink.consume();

//     rl.close();
// });
machine.interact(function(drink) {
    drink.consume();
});