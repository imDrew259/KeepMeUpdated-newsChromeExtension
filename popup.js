function fetchNews(){
    const url = "http://newsapi.org/v2/top-headlines?country=in&apiKey=c61e4bf1368248c6ad39d4c2311ae826";
    return fetch(url)
        .then(response => {
            if (response.status === 200) {
            return response.json()
            } else {
            throw new Error('Unable to fetch News');
            }
        })
        .catch(err => {
            throw err;
        })
}

function showNews(dataArray){
    dataArray.forEach(dataItem=>{
        let li = document.createElement("li");

        let titleNode = document.createTextNode(dataItem.title);

        let aTag = document.createElement('a');
        aTag.setAttribute('href',dataItem.url);
        aTag.setAttribute('target','_blank');
        aTag.appendChild(titleNode);

        let img = document.createElement('img');
        img.setAttribute('src',dataItem.urlToImage);
        img.setAttribute('alt'," Image Not Available")
        li.appendChild(img);
        
        li.appendChild(aTag);

        if(dataItem.description!=null){
            let content = dataItem.description;
            if(content.length > 170) content = content.substr(0,150) + "...";
            let contentNode = document.createTextNode(content);
            let span = document.createElement('SPAN');
            span.appendChild(contentNode);
            li.appendChild(span);
        }
      
        let  ul = document.getElementById('listItems');
        ul.appendChild(li);
    })
}

window.addEventListener('load',(e)=>{
    fetchNews().then(data=>{
        showNews(data.articles);
    }).catch(err=>{
         document.getElementById("error").innerHTML = '<span class="material-icons"> error_outline </span>' + err;
    })

})
