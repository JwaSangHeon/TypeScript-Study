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
