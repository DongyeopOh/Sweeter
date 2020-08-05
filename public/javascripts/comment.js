function comment(postId, userId){
    var commentBox = document.getElementById(`comment${postId}`);
    var commentBtn = document.getElementById(`commentBtn${postId}`);
    var commentList = document.getElementById(`list${postId}`);
    while(commentList.hasChildNodes()){
        commentList.removeChild(commentList.firstChild);
    }
    commentBox.style.display = 'block';
    commentBtn.setAttribute('onclick',`hideComment(${postId},${userId})`);
    var xhr = new XMLHttpRequest();
    var data = {'postId':postId};
    data = JSON.stringify(data);
    xhr.onload = function(){
        if(xhr.status === 200){
            var result = JSON.parse(xhr.responseText);
            for(var i = 0; i < result.comment.length ; i++){
                var div = document.createElement('div');
                div.id= 'comment' + result.comment[i].id
                var id = document.createElement('span');
                var xBtn = document.createElement('button');
                xBtn.innerText = 'x';
                xBtn.setAttribute('onclick',`deleteComment(${result.comment[i].id},${postId})`)
                xBtn.classList.add('xBtn');
                id.classList.add('commentNick');
                var commentSpan = document.createElement('span');
                commentSpan.classList.add('commentBody');
                id.innerText = result.comment[i].user.nickname;
                commentSpan.innerText = result.comment[i].comment;
                div.append(id,commentSpan);
                if(result.comment[i].userId === userId){
                    div.append(xBtn); 
                }   
                commentList.append(div);
            }
        }else{
            console.error(xhr.responseText);
        }
    }
    xhr.open('POST','/showComment');
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(data);
}
function hideComment(postId, userId){
    var commentBox = document.getElementById(`comment${postId}`);
    var commentBtn = document.getElementById(`commentBtn${postId}`);
    commentBtn.setAttribute('onclick',`comment(${postId},${userId})`);
    commentBox.style.display = 'none';
}
function postComment(postId){
    var comment = document.getElementById(`postComment${postId}`).value;
    if(comment){
        var data = {'comment':comment,'postId':postId}
        data = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 200){
                var result = JSON.parse(xhr.responseText);
                var commentBox = document.getElementById(`comment${postId}`);
                var div = document.createElement('div');
                div.id= 'comment' + result.comment.id
                var id = document.createElement('span');
                id.classList.add('commentNick');
                var commentSpan = document.createElement('span');
                commentSpan.classList.add('commentBody');
                id.innerText = result.nickname;
                commentSpan.innerText = result.comment.comment;
                var xBtn = document.createElement('button');
                xBtn.innerText = 'x';
                xBtn.setAttribute('onclick',`deleteComment(${result.comment.id},${postId})`)
                xBtn.classList.add('xBtn');
                div.append(id,commentSpan,xBtn);
                commentBox.append(div);
            }else{
                console.error(xhr.responseText);
            }
        };
        xhr.open('POST', '/comment');
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(data);
        document.getElementById(`ccount${postId}`).innerText++;
        document.getElementById(`postComment${postId}`).value = '';
    }else{
        alert('댓글을 입력해주세요.');
    }   
}

function deleteComment(commentId,postId){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status===200){
            var target = document.getElementById(`comment${commentId}`);
            var parent = target.parentElement;
            parent.removeChild(target);
            document.getElementById(`ccount${postId}`).innerText--;
        }else{
            console.error(xhr.responseText);
        }
    }
    xhr.open('POST',`/deleteComment/${commentId}`);
    xhr.send();
}