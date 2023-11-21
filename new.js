// 객체는 key-value를 -> 변수-value의 구조로 선언한다. 
const obj = {name1 : '멍멍', name2: '야용', name3:"꿀꿀"}
const {name2, name3, name1} = obj;
console.log(name2, name1, name3)

// 배열은 인덱스별로 상수를 생성해서 넣기 때문에 순서가 중요함.
const arr = ['김', '이', '박'];
const [fir, sec, trd] = arr;
console.log(fir, trd, sec);
