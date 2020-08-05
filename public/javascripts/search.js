var search = document.getElementById('search');
var list = document.getElementById('resultBox');
search.addEventListener('keydown', (e) => {
    while(list.hasChildNodes()){
    list.removeChild(list.firstChild);
    }
    var data = {'search' : search.value};
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
    if(xhr.status === 200){
        var ru = JSON.parse(xhr.responseText).resultUser;
        if(ru.length>0){
            list.style.display = 'block';
            for(var i = 0; i < ru.length ; i++){
                var wrap = document.createElement('div');
                wrap.classList.add('postIdWrap');
                var postIdBox = document.createElement('div');
                postIdBox.classList.add('postIdBox');
                var div = document.createElement('div');
                var img = document.createElement('img');
                var aTag = document.createElement('a');
                var span = document.createElement('span');

                aTag.href = `/user/${ru[i].id}`;
                img.src=ru[i].profile;
                span.append(ru[i].nickname);

                list.append(wrap);
                wrap.append(postIdBox);
                postIdBox.append(div);
                postIdBox.append(aTag);
                aTag.append(span);
                div.append(img);
                
            }
        }else{
            list.style.display = 'none';
        }
    }else{
        console.error(xhr.responseText);
    }
    }
    xhr.open('post','/reco');
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(data);
})