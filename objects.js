// const job = { title: "Developer", location: "New York", salary: 50000 };

const { type } = require("os");

// console.log(new Date().toISOString());

// const job2 = {
//   title: "Cook",
//   location: "Munich",
//   salary: 35000,
// };

// 클래스
class Job {
    constructor(jobTitle, place, salary) {
        this.title = jobTitle; //생성될 객체 참조 this: 생성자를 기반으로 생성될 객체
        this.location = place;
        this.salary = salary;
    }

    describe() {
        console.log(`I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}`);
    }
}

const developer = new Job('Developer', 'New York', 50000); // 순서 중요.
const cook = new Job('Cook', 'Munich', 35000);

developer.describe();
cook.describe();



const input = ['max', 'schwarzmuller', 'jihun'];

const firstName = input[0];
const lastName = input[1];

const [ first, last ] = input; // 배열 비구조화 destructureing

console.log(first);
console.log(last);

const occupation = {title:'Developer', location: 'New york'};

// 객체 비구조화
let { title } = occupation; // 객체 비구조화 title은 occupation의 (key, property) 값중 하나이기 떄문에 넣은 것. 이름이 중요함.
// occupation의 key인 title 값을 let 변수 title에 복사함. (깊은복사)

let { title: jTitle} = occupation; // occupation의 title 값을 jTitle이라는 변수를 생성해서 넣음. 깊은복사값인듯. 
// occupation의 key인 title 값을 let 변수 jtitle에 복사함. (깊은복사)

console.log(title);
console.log(jTitle);
title = 'a'
console.log(occupation);
console.log(typeof title);
console.log(typeof jTitle);

const myInform = {name:'Jihun', age:26}
const { age: myage} = myInform;
console.log(myage);
