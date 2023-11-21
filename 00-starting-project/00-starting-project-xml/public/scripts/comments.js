const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

// 브라우저에서 자동으로 전송되지 않으므로 응답이 브라우저에서 자동으로 처리되지 않음, 추가 코드 작성 (어떻게 응답할지) 필요.

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
        <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
        </article>
        `;
        commentListElement.appendChild(commentElement);
  }
  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;

  try {
      const response = await fetch(`/posts/${postId}/comments`); // 이 경로로 fetch 요청을 보냄. 이게 fetch = get, (데이터 가져오기)

    
        if (!response.ok) {
            alert('Fetching comments failed!');
            return;
        }
      const responseData = await response.json(); // 현재 (blog.js의 line 125에서)제이슨으로 인코딩된 데이터를 디코딩해서 js 데이터값으로 다시 변환, get 요청일때
      // line 6에서 주소로  fetch 한 response에서 json을 찾아서 디코딩
    
        if (responseData && responseData.length > 0) {
            const commentsListElement = createCommentsList(responseData);
            commentsSectionElement.innerHTML = '';
            commentsSectionElement.appendChild(commentsListElement);
        } else {
            commentsSectionElement.firstElementChild.textContent = 
            'We could not find any comments. maybe add one?';
        }
    } catch(error) {
        alert('Getting comments failed!');
    }
  } 

async function saveComment(event) {
    event.preventDefault();
    const postId = commentsFormElement.dataset.postid;

    const enteredTitle = commentTitleElement.value;
    const enteredText = commentTextElement.value;

    const comment = { title: enteredTitle, text: enteredText}; // 해당 객체 형식을 line 47에서 json 형식으로 만들어주기

    try {
        const response = await fetch(`/posts/${postId}/comments`, { // 이 요청을 POST 요청으로 구성하기, fetch. 이 정보를 바탕으로 서버측 라우터에 주기
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {                      // app.use가 작동되는 방식은 메타데이터에서 content-type을 보고 urlencoded인지, json인지 확인하는거라서 수동으로 할때는 정의 필요
                'Content-Type': 'application/json'
            }
        }); 
        if (response.ok) {
            fetchCommentsForPost();
        } else {
            alert('Could not send comment!');
        }

    } catch (error) {
        alert('Could not send request - maybe ry again later!')
    }
    
   
    // fetch 뿐만이 아니라 원래는 실제로 post 요청을 포함해서 모든 종류의 HTTP 요청을 보내기 위한 것

   
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment)