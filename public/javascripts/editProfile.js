var myId = document.getElementById('myId').value;
document.getElementById('profileUpload').addEventListener('change', function(){
    var formData = new FormData();
    formData.append('img', this.files[0]);
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            var url = JSON.parse(xhr.responseText).url;
            document.getElementById('profileImage').src = url;
        }else{
            console.error(xhr.responseText);
        }
    }
    xhr.open('POST', `/user/${myId}/change`);
    xhr.send(formData);
})