function like(postId){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            document.getElementById(`like${postId}`).classList.remove('like');
            document.getElementById(`like${postId}`).classList.add('unlike');
            document.getElementById(`count${postId}`).innerText++;
            document.getElementById(`like${postId}`).setAttribute("onclick",`unlike(${postId})`);
        }else{
            console.error(xhr.responseText);
        }
    }
    xhr.open('GET', `/${postId}/like`);
    xhr.send();
}
function unlike(postId){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            document.getElementById(`like${postId}`).classList.remove('unlike');
            document.getElementById(`like${postId}`).classList.add('like');
            document.getElementById(`count${postId}`).innerText--;
            document.getElementById(`like${postId}`).setAttribute("onclick",`like(${postId})`);
        }else{
            console.error(xhr.responseText);
        }
    }
    xhr.open('GET', `/${postId}/unlike`);
    xhr.send();
}