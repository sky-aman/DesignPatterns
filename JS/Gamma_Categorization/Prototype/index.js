// Explicit copying
class Address {
    constructor(streetAddress, city, country) {
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
    }
    // deepCopy() {
    //     return new Address(
    //         this.streetAddress,
    //         this.city,
    //         this.country
    //     )
    // }
    toString(){
        return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`
    }
}

class Person {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    // deepCopy() {
    //     return new Person(
    //         this.name,
    //         this.address.deepCopy()
    //     )
    // }
    toString() {
        return `${this.name} lives at ${this.address}`
    }

    greet() {
        console.log(`Hi, my name is ${this.name}, I live at ${this.address}`);
    }
}

class Serializer {
    constructor(types) {
        this.types = types;
    }

    markRecursive(object) {
        let idx = this.types.findIndex(t => {
            return t.name === object.constructor.name;
        })

        if (idx !== -1) {
            object['typeIndex'] = idx;

            for (let key in object) {
                if(object.hasOwnProperty(key)) {
                    this.markRecursive(object[key]);
                }
            }
        }
    }

    clone(object) {

    }
}

let john = new Person ('John', 
    new Address('123 London Road', 'London', 'UK')
);

// let jane = john.deepCopy();
let jane = JSON.parse(JSON.stringify(john));

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

console.log(john.toString());
console.log(`${jane}`);

// Copy through Serialization
