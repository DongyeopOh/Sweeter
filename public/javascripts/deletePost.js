function deletePost(userId,postId){
    var cf = confirm("정말 삭제하시겠습니까?");
    if(cf){
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status ===200){
                location.href = `/user/${userId}`
            }else{
                console.error(responseText);
            }
        }
        xhr.open('POST',`/user/${userId}/delete/${postId}`);
        xhr.send();
    }
}