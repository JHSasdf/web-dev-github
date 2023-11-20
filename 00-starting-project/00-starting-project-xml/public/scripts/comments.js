const loadCommentsBtnElement = document.getElementById('load-comments-btn');

// 브라우저에서 자동으로 전송되지 않으므로 응답이 브라우저에서 자동으로 처리되지 않음, 추가 코드 작성 (어떻게 응답할지) 필요.
async function fetchCommentsForPost() {
    const postId = loadCommentsBtnElement.dataset.postid;
    const response = await fetch(`/posts/${postId}/comments`); // 이 경로로 fetch 요청을 보냄.
    const responseData = await response.json(); // 현재 (blog.js의 line 125에서)제이슨으로 인코딩된 데이터를 디코딩해서 js 데이터값으로 다시 변환
    // line 6에서 주소로  fetch 한 response에서 json을 찾아서 디코딩
    console.log(responseData);
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);