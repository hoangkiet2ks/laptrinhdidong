// 1.
class Person {
  constructor(public name: string, public age: number) {}
  displayInfo() {
    return `${this.name}, ${this.age} years old`;
  }
}

// 2.
class Student extends Person {
  constructor(name: string, age: number, public grade: string) {
    super(name, age);
  }
  displayAllInfo() {
    return `${super.displayInfo()}, Grade: ${this.grade}`;
  }
}

// 3.
class Car {
  constructor(public brand: string, public model: string, public year: number) {}
  showInfo() {
    return `${this.brand} ${this.model} (${this.year})`;
  }
}

// 4.
class Rectangle {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

// 5.
class BankAccount {
  constructor(public balance: number) {}
  deposit(amount: number) {
    this.balance += amount;
    return this.balance;
  }
  withdraw(amount: number) {
    this.balance -= amount;
    return this.balance;
  }
}

// 6.
class Book {
  constructor(public title: string, public author: string, public year: number) {}
}

// 7
class User {
  constructor(private _name: string) {}
  get name() {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
  }
}

// 8
class Product {
  constructor(public name: string, public price: number) {}
}

// 9
interface Animal {
  name: string;
  sound(): string;
}

// 10
class Account {
  public id: number;
  private password: string;
  readonly createdAt: Date;
  constructor(id: number, password: string) {
    this.id = id;
    this.password = password;
    this.createdAt = new Date();
  }
}

// 11
class BaseAnimal {
  constructor(public name: string) {}
}
class Dog extends BaseAnimal {
  bark() { return `${this.name} says Woof`; }
}
class Cat extends BaseAnimal {
  meow() { return `${this.name} says Meow`; }
}

// 12
interface Flyable { fly(): string; }
interface Swimmable { swim(): string; }
class Bird implements Flyable {
  fly() { return "Bird is flying"; }
}
class Fish implements Swimmable {
  swim() { return "Fish is swimming"; }
}

// 13
abstract class Shape {
  abstract area(): number;
}
class Square extends Shape {
  constructor(public side: number) { super(); }
  area() { return this.side * this.side; }
}
class Circle extends Shape {
  constructor(public radius: number) { super(); }
  area() { return Math.PI * this.radius * this.radius; }
}

// 14
class Employee {
  constructor(public name: string) {}
}
class Manager extends Employee {
  manage() { return `${this.name} is managing`; }
}
class Developer extends Employee {
  code() { return `${this.name} is coding`; }
}

// 15
class Library {
  books: Book[] = [];
  users: User[] = [];
  addBook(book: Book) { this.books.push(book); }
}

// 16
class Box<T> {
  constructor(public value: T) {}
}

// 17
class Logger {
  private static instance: Logger;
  private constructor() {}
  static getInstance() {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }
  log(msg: string) { console.log("Log:", msg); }
}

// 18
class MathUtil {
  static add(a: number, b: number) { return a + b; }
  static subtract(a: number, b: number) { return a - b; }
  static multiply(a: number, b: number) { return a * b; }
  static divide(a: number, b: number) { return a / b; }
}

// 19
class PolyAnimal { sound(): string { return "Some sound"; } }
class PolyDog extends PolyAnimal { sound() { return "Woof"; } }
class PolyCat extends PolyAnimal { sound() { return "Meow"; } }

// 20
interface Vehicle { drive(): string; }
class VehicleCar implements Vehicle { drive() { return "Car driving"; } }
class Bike implements Vehicle { drive() { return "Bike driving"; } }

// 21
class Repository<T> {
  private items: T[] = [];
  add(item: T) { this.items.push(item); }
  getAll() { return this.items; }
}

// 22
class Stack<T> {
  private items: T[] = [];
  push(item: T) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}

// 23
interface Payment { pay(amount: number): string; }
class CashPayment implements Payment {
  pay(amount: number) { return `Paid ${amount} in cash`; }
}
class CardPayment implements Payment {
  pay(amount: number) { return `Paid ${amount} by card`; }
}

// 24
abstract class Appliance { abstract turnOn(): string; }
class Fan extends Appliance { turnOn() { return "Fan is on"; } }
class AirConditioner extends Appliance { turnOn() { return "AC is on"; } }

// 25
class StaticShape { static describe() { return "This is a shape"; } }

// 26
class Order {
  constructor(public products: Product[]) {}
  total() { return this.products.reduce((sum, p) => sum + p.price, 0); }
}

// 27
class Teacher extends Person {
  constructor(name: string, age: number, public subject: string) { super(name, age); }
  introduce() { return `I am ${this.name}, I teach ${this.subject}`; }
}

// 28
class BaseAnimal2 {
  constructor(public name: string) {}
  protected makeSound(): string { return "Generic sound"; }
}
class Dog2 extends BaseAnimal2 {
  makeSound(): string { return `${this.name} barks`; }
}
class Cat2 extends BaseAnimal2 {
  makeSound(): string { return `${this.name} meows`; }
}

// 29
interface Movable { move(): string; }
class MovableCar implements Movable { move() { return "Car moves"; } }
class Robot implements Movable { move() { return "Robot moves"; } }

// 30
class School {
  students: Student[] = [];
  teachers: Teacher[] = [];
  addStudent(s: Student) { this.students.push(s); }
  addTeacher(t: Teacher) { this.teachers.push(t); }
  displayInfo() {
    return { students: this.students.map(s => s.displayAllInfo()), teachers: this.teachers.map(t => t.introduce()) };
  }
}

async function Demo() {
  console.log("1.", new Person("Alice", 30).displayInfo());
  console.log("2.", new Student("Bob", 20, "A").displayAllInfo());
  console.log("3.", new Car("Toyota", "Corolla", 2020).showInfo());
  console.log("4.", new Rectangle(4, 5).area(), new Rectangle(4, 5).perimeter());
  console.log("5.", new BankAccount(100).deposit(50));
  console.log("6.", new Book("BookTitle", "Author", 2021));
  const u = new User("Charlie"); u.name = "Charles"; console.log("7.", u.name);
  const products = [new Product("Pen", 10), new Product("Laptop", 1000)];
  console.log("8.", products.filter(p => p.price > 100));
  const dog: Animal = { name: "Doggy", sound: () => "Woof" }; console.log("9.", dog.sound());
  console.log("10.", new Account(1, "pwd"));
  console.log("11.", new Dog("Max").bark(), new Cat("Kitty").meow());
  console.log("12.", new Bird().fly(), new Fish().swim());
  console.log("13.", new Square(4).area(), new Circle(3).area());
  console.log("14.", new Manager("Tom").manage(), new Developer("Jerry").code());
  const lib = new Library(); lib.addBook(new Book("B", "A", 2000)); console.log("15.", lib.books);
  console.log("16.", new Box<number>(123).value);
  Logger.getInstance().log("17. Singleton works");
  console.log("18.", MathUtil.add(2,3));
  console.log("19.", new PolyDog().sound(), new PolyCat().sound());
  console.log("20.", new VehicleCar().drive(), new Bike().drive());
  const repo = new Repository<number>(); repo.add(1); console.log("21.", repo.getAll());
  const stack = new Stack<number>(); stack.push(10); console.log("22.", stack.peek());
  console.log("23.", new CashPayment().pay(50), new CardPayment().pay(100));
  console.log("24.", new Fan().turnOn(), new AirConditioner().turnOn());
  console.log("25.", StaticShape.describe());
  console.log("26.", new Order([new Product("A", 50), new Product("B", 100)]).total());
  console.log("27.", new Teacher("Anna", 40, "Math").introduce());
  console.log("28.", new Dog2("Rex").makeSound(), new Cat2("Mimi").makeSound());
  console.log("29.", new MovableCar().move(), new Robot().move());
  const school = new School();
  school.addStudent(new Student("S1", 18, "B"));
  school.addTeacher(new Teacher("T1", 45, "Physics"));
  console.log("30.", school.displayInfo());
}

