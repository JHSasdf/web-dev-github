function greetUser(greetingPrefix, userName = 'user') {
    console.log(greetingPrefix + ' Hi '+ userName + '!');
}
// default parameter는 무조건 default parameter를 가지지 않는 parameter의 뒤에 와야한다.

greetUser('HI!','max');
greetUser('hello');

function sumUp(numbers) {
    let result = 0;
    for (const number of numbers) {
        result += number;
    }
    return result;
}

console.log(sumUp([1,5,10,11]));