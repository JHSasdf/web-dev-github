function enableCors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 클라이언트가 추가할 수 있는 url주소를 허용 설정하는 헤더, 헤더의 값(신청하는 도메인)
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS'); //  클라이언트가 추가할 수 있는 method를 허용 설정하는 헤더,
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); //  클라이언트가 추가할 수 있는 headers를 허용 설정하는 헤더, 
    next();
}

module.exports = enableCors