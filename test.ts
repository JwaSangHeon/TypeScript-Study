// age가 선택적(optional) 값 일때, 즉 있어도 되고 없어도 될때는 타입에 ?를 붙여준다.
const player: {
  name: string;
  age?: number;
} = {
  name: "SangHeon",
};

// age의 값은 undefined일 수도 있기 때문에, 조건을 추가한다.
if (player.age && player.age < 10) {
}

// 만약 플레이어 a와 b가 존재한다면 다음과 같은 코드 반복이 일어난다.
const playerAAA: {
  name: string;
  age?: number;
} = {
  name: "AAA",
};

const playerBBB: {
  name: string;
  age?: number;
} = {
  name: "BBB",
  age: 12,
};

// 이러한 중복을 막기위해서 Alias 타입이 있다. 적용하면 다음과 같다.
type Player = {
  name: string;
  age?: number;
};

const AAA: Player = {
  name: "AAA",
};

const BBB: Player = {
  name: "BBB",
  age: 12,
};

// 함수 표현 - 인수 자리에 type을 명시할 수 있다, return값의 type은 인자뒤에 명시한다.
const playerMaker = (name: string): Player => {
  return {
    //name: name,
    name,
  };
};

const ccc = playerMaker("CCC");
ccc.age = 12; // return값이 Player이기 때문에 no error

// 정한 값을 수정할 수 없게, 즉 읽기전용으로 만들고 싶다면 type에 readonly를 붙여주면된다.
const numbers: readonly number[] = [1, 2, 3, 4, 5];
// numbers.push(2) : push가 불가능하다(readonly이기 때문)

// Tuple은 array를 생성할 수 있게 하는데, 최소한의 길이를 가져야하고 특정위치에 특정값이 존재해야한다.
const student: [string, number, boolean] = ["Heon", 25, false];

// readonly도 사용가능하다.
// const student: readonly[string, number, boolean] = ["Heon", 25, false];

// type any를 쓰면 그냥 자바스크립트가 되어버림(모든 보호장치가 비활성화 된다). 권장하지 않음

// 변수의 타입을 미리 알지 못 할 때 unknown 타입을 사용한다.(만약 API의 응답을 받는데 그 응답의 타입을 모른다면..?)
let a: unknown;

if (typeof a === "number") {
  let b = a + 1; // 해당 스코프에선 a의 type이 number가 되기 때문에 오류가 나지 않는다.
}
if (typeof a === "string") {
  let b = a.toUpperCase(); // 해당 스코프에선 a의 type이 string이 되기 때문에 오류가 나지 않는다.
}

// void 타입은 '비어있는 것'을 의미한다. 즉 아무것도 return하지않는 함수의 return값은 void이다.
function hello() {
  console.log("hello");
} // 아무것도 return하지 않는다.

// never는 함수가 절대 return하지 않을 때 발생한다.
function hello2(): never {
  // return 'x'; // 오류가 난다.
  throw new Error("xxx");
} //return하지 않고 오류를 발생시키는 함수

// 또한 never는 절대 일어날 수 없는 것을 의미하기도 한다.
function hello3(name: string | number) {
  if (typeof name === "string") {
    name; // string
  } else if (typeof name === "number") {
    name; // number
  } else {
    name; // never
  }
}

// call signatures : 마우스 호버시 보게 되는 것
// signatures type 제작 : 미리 만들어 놓음으로서 바르게 설계할 수 있다.
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b; // arguments의 타입을 지정하지 않아도 된다.

// overloading(오버로딩) : 함수가 여러 개의 call signatures를 가지고 있을 때, 발생한다.
type Config = {
  path: string;
  state: object;
};
type Push = {
  (path: string): void;
  (config: Config): void;
};

const push: Push = (config) => {
  if (typeof config === "string") {
    console.log(config);
  } else {
    console.log(config.path);
  }
};
// 오버로딩은 파라미터의 갯수가 다를때도 발생한다.
type Add2 = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add2: Add2 = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};

// Polymorphism : 다양한 형태에 대응한다.
// generic 활용
type SuperPrint = {
  (arr: number[]): void;
  (arr: boolean[]): void;
  (arr: string[]): void;
}; // arr를 받아서 console을 찍는 call signature, 다른 타입의 배열이 들어온다면 추가해야될까? NO

// generic을 사용하면 된다.(return 값도 마찬가지)
type SuperPrintGeneric = <T>(arr: T[]) => void; // 코드를 보고 T에 우리가 작성한 타입을 넣어준다.

const superPrint: SuperPrintGeneric = (arr) => {
  arr.forEach((i) => console.log(i));
};

superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(["1", "2", "3", "4", true]);

// generic 다르게 사용하기
function superPrintFunc<T>(arr: T[]) {
  return arr[0];
} // 함수 선언때 사용

const superasd = <T>(arr: T[]) => {
  return arr[0];
};

// TypeScript Class

// private : 해당 class에서만 사용가능.
// protected : 해당 class를 상속받은 자식도 사용가능.(외부 접근에 대해서는 보호)
// public : 전부 사용가능.
abstract class User {
  constructor(
    protected firstName: string,
    protected lastName: string,
    protected nickName: string
  ) {}

  abstract getNickName(): void; // 추상 메서드는 추상 클래스 안에서 구현할 수 있으며, call signature으로만 선언한다.(상속 받은 곳에서 구현)

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
} // abstract class : 추상클래스로 자체로 인스턴스는 생성할 수 없고, 상속만 가능하다.

class PlayerClass extends User {
  getNickName() {
    console.log(this.nickName);
  }
}

const sh = new PlayerClass("Sang", "Heon", "Jwa");
