function greetUser(greetingPrefix, userName = 'user') {
//   console.log(greetingPrefix + ' Hi '+ userName + '!');
 console.log(`${greetingPrefix} Hi ${userName} !`);
}
// function은 객체다!
// default parameter는 무조건 default parameter를 가지지 않는 parameter의 뒤에 와야한다.

greetUser('HI!','max');
greetUser('hello');

// 스프레드 연산자:  배열, 문자열, 객체 등 반복가능한 객체를 개별요소로 분리하는 기능
function sumUp(...numbers) { // parameter 안에 쓰이면 parameter 개수에 제한이 없음, 이후 모든 매개변수는 자바스크립트에 의해 배열이 됨.
    let result = 0;
    for (const number of numbers) {
        result += number;
    }
    return result;
}
const inputNumbers = [1, 5, 10, 11, 20, 31];

// console.log(Math.max(1,2,3,4));
console.log(sumUp(1,2,3,4));
console.log(sumUp(...inputNumbers)); // spread 연산자로 배열을 여러 개별 값으로 분산시킴. 배열의 모든 값을 가져와 독립형 값으로 제공. 쉽게 말하면 대괄호를 제거한다.
console.log(...inputNumbers);
console.log(inputNumbers);

console.log(sumUp);

