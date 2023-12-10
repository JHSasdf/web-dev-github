function handleErrors (error, req, res, next) { // 첫번째 argument는 오류에 대한 내용을 담음
    console.log(error);

    if (error.code === 404) {
        return res.status(404).render('shared/404');
    }

    res.status(500).render('shared/500');
}

module.exports = handleErrors;