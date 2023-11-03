const fs = require('fs'); // 파일시스템 부분은 브라우저에서는 인식할 수 없음.

function readFile() {
    try {
    const fileData = fs.readFileSync('data.json');
} catch {
    console.log('An error occurred!');
}
    console.log('Hi there!');
}

readFile();