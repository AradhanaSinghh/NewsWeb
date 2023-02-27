let newsAccordion = document.getElementById("newsAccordion");
// Create an ajax get request
let source='BBC-news';
let apiKey='c97edbeed8a24253b6b6a785eb9e4576';
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function(element, index) {
  let news = `<div class="card">
  <div class="card-header" id="heading${index}">
      <h2 class="mb-0">
      <button class="btn btn-link  collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
          aria-expanded="false" aria-controls="collapse${index}">
         <span class="text-danger"><b>Breaking News ${index+1}:  </b></span> ${element.title}
      </button>
      </h2>
  </div>

  <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
      <div class="card-body text-success"> ${element.content}. <a href="${element['url']}" target="_blank" class="text-primary">Read more here</a>  </div>
  </div>
</div>`;
newsHtml += news;
});
newsAccordion.innerHTML = newsHtml;
}
else {
    document.write("page not found error 404");
console.log("error occured!")
}
}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let card = document.getElementsByClassName('card');
    Array.from(card).forEach(function(element){
        let cardTxt = element.getElementsByTagName("div")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        localStorage.setItem('search',inputVal);
    })
})


xhr.send()

