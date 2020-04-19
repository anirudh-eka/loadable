class Success<T> {
    value: T;
    kind: "success";
    constructor(value: T) {
        this.value = value;
        this.kind = "success";
    }
}

class Loading {
    kind: "loading";
    constructor() {
        this.kind = "loading"
    }
}

class Idle {
    kind: "idle";
    constructor() {
        this.kind = "idle"
    }
}

class Failure {
    kind: "failure";
    constructor() {
        this.kind = "failure"
    }
}

type Loadable<T> = Success<T> | Loading | Idle | Failure;

function map<A, B>(l: Loadable<A>, f: (x: A) => B ): Loadable<B> {
  switch (l.kind) {
      case "success": return new Success(f(l.value));
      case "loading": return new Loading();
      case "failure": return new Failure();
      case "idle": return new Idle();
  }
}


interface Todo {
    title: string;
    status: string;
}

const todos: Array<Todo> = [{title: "Prepare Talk", status: "In Progress"}]

const loadableTodos: Loadable<Array<Todo>> = new Success(todos)

const result = map(loadableTodos, (todos) => todos.map((t: Todo) => ({...t, status: "Completed"})))

console.log(result)