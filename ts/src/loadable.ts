class Success<T> {
    value: T;
    kind: "success";
    map = (f: (x: T) => any) => map(f, this)
    constructor(value: T) {
        this.value = value;
        this.kind = "success";
    }
}

class Loading {
    kind: "loading";
    map = (f: (x: any) => any) => map(f, this)
    constructor() {
        this.kind = "loading"
    }
}

class Idle {
    kind: "idle";
    map = (f: (x: any) => any) => map(f, this)
    constructor() {
        this.kind = "idle"
    }
}

class Failure {
    kind: "failure";
    map = (f: (x: any) => any) => map(f, this)
    constructor() {
        this.kind = "failure"
    }
}

type Loadable<T> = Idle | Loading | Success<T> | Failure;

function map<A, B>(f: (x: A) => B, l: Loadable<A>): Loadable<B> {
  switch (l.kind) {
      case "idle": return new Idle();
      case "loading": return new Loading();
      case "success": return new Success(f(l.value));
      case "failure": return new Failure();
  }
}

interface Todo {
    title: string;
    status: string;
}

const loadableTodos = new Success([{title: "Prepare Talk", status: "In Progress"}])

const result = loadableTodos.map((todos) => 
    todos.map((t: Todo) => 
        ({...t, status: "Completed"})))


console.log(result)