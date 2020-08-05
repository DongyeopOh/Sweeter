if(document.getElementById('img')){
    document.getElementById('img').addEventListener('change', function(e) {
        var formData = new FormData();
        formData.append('img', this.files[0]);
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 200){
                var url = JSON.parse(xhr.responseText).url;
                document.getElementById('imgUrl').value = url;
                document.getElementById('imgPreview').src = url;
                document.getElementById('imgPreviewContainer').style.display = 'block';
            }else{
                console.error(xhr.responseText);
            }
        };
        xhr.open('POST', '/post/img');
        xhr.send(formData);
    });
}