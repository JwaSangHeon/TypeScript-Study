# 왜 타입스크립트 일까?

1. 타입 안정성
2. 생산성
3. less-bug

## JS

1. [1,2,3,4] + false 의 결과 => '1,2,3,4false' (허용되면 안되는 코드인데 허용된다.)
2. 두 숫자를 나눠주는 함수
   function devide(a,b){
   return a/b
   };
   결과값 : divide('xxxxx') => NaN(잘못된 코드이지만 자바스크립트가 막아주지 않는다.)
   a 와 b가 숫자인지 말해주지 않는다, 입력값이 2개인데 한 개만 넣어도 작동한다.
3. const nico = {name : 'nico'};
   nico.hello() => 런타임 에러
   자바스크립트에선 실행했을 때야 알 수 있다.
