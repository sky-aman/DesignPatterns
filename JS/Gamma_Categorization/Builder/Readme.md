# Builder
* Builder provides an API for constructing an object step-by-step
* A way to create a builder which provide easier interface to create and interact with the other class.

* Seperate component for building an object.
* Can either give builder an initializer or return it via a static function.
* To make builder fluent, return self.
* Different facets of an object can be build with different builder working in tandem via a base class.