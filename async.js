//  Asynchronous: 비동기식: 이 operation은 다른 operation과 동시에 실행되어도 된다.
const fs = require("fs/promises"); // file system method의 promises버전

// 앞에 async를 넣으면 자동으로 promise를 반환, await와 함께 쓰임
async function readFile() {
  let fileData;
  //   fileData = fs.readFileSync("data.txt"); // Sync: Synchronous, 동기식: 이 operation이 다음 operation이 시작, 실행되기 전에 (분석) 완료되어야 한다. 시간이 좀 걸림.

  // callback함수: 수행하고 나서 결과값이 다른함수에 인자로 전달되는 함수, 변수나 상수에 저장할 수 없음. 함수 안에서만 그 값을 사용 가능. 그리고 그 값을 parameter에 수신함.
  // 비동기식: 이 operation은 다른 operation과 동시에 실행되어도 된다.
  // readfile 실행 완료 후 (data.txt의 parsing)에 실행되는 function

  //   fs.readFile("data.txt", function (error, fileData) {
  //     if (error) {
  //       console.log(error);
  //     }
  //     console.log("File parsing done!");
  //     console.log(fileData.toString());
  // json.parse는 json파일이 아니라서 수행할 수 없다.

  // start another async task that sends the data to a database
  //   });

  // 프로미스, 비동기니까 try catch 사용 불가.
  // fs.readFile('data.txt')는 프로미스라는 객체를 반환함. 읽어온 것에 대한 return값.
  // await는 프로미스를 반환하는 모든 메소드 앞에 적을 수 있다. await를 적으면 그 결과를 변수, 상수값에 저장할 수 있다. 이게 비동기 작업인 것처럼 그래서 try error를 사용할 수 있음.
  try {
  fileData = await fs.readFile("data.txt"); // line 28부터는 27이 실행될때까지 종료됨.
} catch (error) { // try에서 error가 발생할 경우 readFile에서 자동으로 parameter에 오류 객체를 반환함
    console.log(error)
}
  console.log("File parsing done!");
      console.log(fileData.toString());

      //return anotherAsynoperation();
      

  // 이런식으로 여러개의 then을 합치는 것도 가능
  //   fs.readFile("data.txt").then(function (fileData) {
  //     console.log("File parsing done!");
  //     console.log(fileData.toString());
  //     return anotherAsyncfunction();
  //   }).then(function (result) {
  //     console.log(result) 
  //   });

}

readFile();
console.log("Hi there!"); // 이게 제일 먼저 실행됨. 이후에 data.txt를 parsing하고 나서 line 14, 15가 실행된다.
