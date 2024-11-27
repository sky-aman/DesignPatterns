# Factories

Motivation
* Object creation logic becomes too convoluted.
* Initializer is not descriptive. 
 * Name is always ```__init__```
 * Cannot overload with same sets of arguments
 * Can turn into 'optional parameter hell'

* Wholesale object creation (non-peicewise, unlike Builder) can be outsourced to
 * A separate method (factory method)
 * That may exist in a separate class (factory)
 * Can create hierarchy of factories with Abstract method

<p>A component responsible solely for the wholesale (not piecewise) creation of objects.</p>

* Seperation of concern
* Single responsibility principle

## Abstract Factory

### Summary
1. A factory method is a static method that creates objects.
2. A factory is an entity that can take care of object creation.
3. A factory can be external or reside inside the object as an inner class.
4. Hierarchies of factories can be used to create related objects.

