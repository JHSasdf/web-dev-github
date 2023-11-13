const hobbies = ["Sports", "Cooking"]; // a pointer to the array is stored. 객체의 주소만 저장함.
const age = 32; // the value itself is stored

hobbies.push("Reading"); // the address of the array doesn't change

// hobbies = ['Coding', 'Sleeping']; // not allowed! new address is stored.

console.log(hobbies);

const person = { age: 32 };


function getAdultYears(p) {
  p.age -= 18;
  return p.age;
// return p.age - 18;
}

console.log((getAdultYears({...person}))); // key value pairs를 모두 가져와서 새로운 객체{}를 생성한다. spread 연산자는 모든 값을 가져와서 값 목록을 생성하는거니까 가능.  deepcopy랑 같은것.
// console.log(getAdultYears(person));
console.log(person);