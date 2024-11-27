// Single Responsibility Principle
import fs from 'fs';

console.log('--Single responsibility principle');
class Journal {
    constructor() {
        this.entries = {};
    }

    addEntry(text) {
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index){
        delete this.entries[index];
    }

    toString() {
        return Object.values(this.entries).join('\n');
    }

    // handling more than one responsibilities
    save(filename) {
        fs.writeFileSync(filename, this.toString());
    }

    load(filename) {
        //
    }

    loadFromUrl(url) {
        //
    }
}
Journal.count = 0;

class PersistenceManager {
    preprocess(j) {
        //
    }

    saveToFile(journal, filename) {
        // fs.writeFileSync(filename, journal.toString());
    }
}

let j = new Journal();

j.addEntry('I worked out today');
j.addEntry('I resolved a bug');
console.log(j.toString());

let p = new PersistenceManager();
let filename = 'journal.txt';
p.saveToFile(j, filename);

// Open-Closed Principle
console.log('--Open-closed Principle')
let Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

let Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large'
})

class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

class ProductFilter {
    filterByColor(products, color) {
        return products.filter(p => p.color === color);
    }

    // breaking open closed principle by modfying this class by adding new function
    filterBySize(products, size) {
        return products.filter(p => p.size === size);
    }
}

// specification
class ColorSpecification {
    constructor(color) {
        this.color = color;
    }
    
    isSatisfied(item) {
        return item.color === this.color;
    }
}

class SizeSpecification {
    constructor(size) {
        this.size = size;
    }

    isSatisfied(item) {
        return item.size === this.size;
    }
}

class AndSpecification {
    constructor(...specs) {
        this.specs = specs;
    }

    isSatisfied(item) {
        return this.specs.every(x => x.isSatisfied(item));
    }
}

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let hourse = new Product('House', Color.blue, Size.large);

let products = [apple, tree, hourse];

let pf = new ProductFilter()
console.log(`Green products (old):`);
for(let p of pf.filterByColor(products, Color.green)) {
    console.log(` * ${p.name} is green`);
}
class BetterFilter{
    filter(items, spec) {
        return items.filter(x => spec.isSatisfied(x))
    }
}

const bf = new BetterFilter();

console.log(`Green products (new):`);
for(let p of bf.filter(products, new ColorSpecification(Color.green))) {
    console.log(` * ${p.name} is green`);
}

console.log('Large and green products:');
let spec = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
);

for(let p of bf.filter(products, spec)) {
    console.log(` * ${p.name} is large and green`);
}

// Liskov Substitution Principle
console.log('Liskov Substitution Principle');

class Rectangle {
    constructor(width, height){
        this._width = width;
        this._height = height;
    }

    get width() {return this._width;}
    get height() {return this._height;}

    set width(value) { this._width = value;}
    set height(value) { this._height = value;}

    area() {
        return this._width*this._height;
    }

    get isSquare() {
        return this._width === this._height;
    }

    toString() {
        return `${this._width}x${this._height}`;
    }
}

// class Square extends Rectangle {
//     constructor(side) {
//         super(side, side);
//     }
//     set width(value) {
//         this._width = value;
//         this._height = value;
//     }
//     set height(value) {
//         this._width = value;
//         this._height = value;    
//     }
// }

// let r = new Rectangle(5,10);
// console.log(`area of rectangle ${r.toString()} is ${r.area()}`);

// let s = new Square(5);
// console.log(`area of square ${s.toString()} is ${s.area()}`);
// s.width = 10;
// console.log(`after width update area of square ${s.toString()} is ${s.area()}`);

// // failing function working for parent but failing for dervied
// const AreUsed = (rc) => {
//     const width = rc._width;
//     rc.height = 20;
//     console.log(`Expected area is ${width*20} and got ${rc.area()}`);
// }

// AreUsed(r);
// AreUsed(s);

// Interface Segregation Principle

class Document {

}

class Machine {
    constructor() {
        if(this.constructor.name === 'Machine')
            throw new Error('Machine is abstract');
    }

    print(doc){}
    fax(doc){}
    scan(doc){}
}

class MultiFunctionPrinter extends Machine {
    print(doc) {
        super.print();
    }
    fax(doc){
        //
    }
    scan(doc){
        //
    }
}

class NotImplementedError extends Error {
    constructor(name) {
        let msg = `${name} is not implemented`;
        super(msg);
        if(Error.captureStackTrace)
            Error.captureStackTrace(this, NotImplementedError);
    }
}

class oldFashionedPrinter extends Machine {
    print(doc) {
        //
    }

    fax(doc) {
        // does nothing
        // break the principle of least surprise
    }
    scan(doc) {
        throw new Error("oldFashionedPrinter.scan not implemented")
    }
}

// for solving this issue

class Printer {
    constructor(){
        if(this.constructor.name === 'Printer')
            throw new Error('Printer is abstract');
    }

    print(doc){}
}

class Scanner {
    constructor() {
        if(this.constructor.name === 'Scanner')
            throw new Error('Scanner is abstract');
    }
}

// class ModernPrinter extends Printer, Scanner { // not possible in JS

// }

class oldPrinter extends Printer {

}

// Dependency Inversion Principle
console.log('Dependency Inversion Principle');

let Relationship = Object.freeze({
    parent: 0,
    child: 1,
    sibling: 2,
});

class Person {
    constructor(name) {
        this.name = name;
    }
}

// LOW-LEVEL MODULE
class RelationshipBrowser {
    constructor() {
        if(this.constructor.name === 'RelationshipBrowser')
            throw new Error("RelationshipBrowser is abstract!");
    }
    findAllChildrenOf(name){}
}
// concerned with low level work like storage
class Relationships extends RelationshipBrowser {
    constructor() {
        super();
        this.data = []; //
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child
        })
    }

    findAllChildrenOf(name) {
        return this.data.filter(
            r => r.from.name === name && 
            r.type === Relationship.parent
        ).map(r => r.to)
    }
}


// HIGH-LEVEL MODULE
// concerned with high level work like getting the data out or research.
class Research {
    // constructor(relationships) {
    //     // find all children of John
    //     let relations = relationships.data; //
    //     for (let rel of relations.filter(r => r.from.name === 'John' && r.type === Relationship.parent)) {
    //         console.log(
    //             `John has a child named ${rel.to.name}`
    //         )
    //     }
    // }
    constructor(browser) {
        for(let p of browser.findAllChildrenOf('John')) {
            console.log(`John has a child named ${p.to.name}`);
        }
    }
}

let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);