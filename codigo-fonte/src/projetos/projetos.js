 
 function expandNav(){
    element = document.getElementsByClassName('lista-categoria-1col');
    var iconeExpand = document.getElementById("icone-dropdown");
    if(element[0].classList.contains("expanded-menu-1col"))
    {
        element[0].classList.remove("expanded-menu-1col");
        iconeExpand.classList.remove("fa-caret-up");
        iconeExpand.classList.add("fa-caret-down");  
    }
    else
    {
        element[0].classList.add("expanded-menu-1col");
        iconeExpand.classList.add("fa-caret-up");
        iconeExpand.classList.remove("fa-caret-down");     
    }
}

 function expandMenu(){
    element = document.getElementsByClassName('flex-container-header');

    if(element[0].classList.contains("expanded-menu")){
        element[0].classList.remove("expanded-menu");
        element[0].classList.add("shrink-menu");
    }
    else
    {
        element[0].classList.add("expanded-menu");
        element[0].classList.remove("shrink-menu");
        
    }
}

function createCards(querySelector, project, index) // cria dinamicamente os cards e os anexa na classe passada como parametro
{
    let containerCard = document.createElement("div");
    containerCard.setAttribute("class", "container-card");
    
    let imageCards = document.createElement("img");
    imageCards.setAttribute("class", "image-cards");
    imageCards.setAttribute("src", project.imgLink);
    
    let article = document.createElement("article");
    
    let h2 = document.createElement("h2");
    h2.innerText = project.projectName;
    
    let p = document.createElement("p");
    p.setAttribute("class", "botao-vermais");
    p.innerText = "ver detalhes";
    p.addEventListener("click",function(){
        modal(index);
    });

    containerCard.appendChild(imageCards);
    article.appendChild(h2);
    article.appendChild(p);
    containerCard.appendChild(article);


    var nodeLocal = document.querySelector(querySelector);
    nodeLocal.appendChild(containerCard);

}

function createMenuLateral(categories, classNode){ //Preenche o menu lateral com as categorias e seus links dinamicamente
    let node = document.querySelector(classNode);
    for(var category in categories){
        let li = document.createElement("li");
        li.setAttribute("class", "item-categoria");
        let a = document.createElement("a");
        a.setAttribute("class", "link-categoria");
        a.innerText = categories[category];
        a.setAttribute("href", "projetos.html?categoryName=" + encodeURI(categories[category]));
        li.appendChild(a);
        node.appendChild(li);
    }    
}

function deleteAllNodes(parentNodeClass){ // Deleta todos os nós abaixo do nó passado como parametro
    let parent = document.querySelector(parentNodeClass);
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function deleteAllCards(parentName){ // deleta todos os cards
    let parent = document.querySelector(parentName);
    let cards = document.querySelectorAll(".container-card");
    cards.forEach(function(card) {
        console.log(card.textContent);
        parent.removeChild(card);
      });
}
function categoryFilter(project, category){ //Funcao para filtrar os projetos por categoria, usados com filter
    if(project.categoryName==category)
    {
        return project;
    }
}
//==============================================================================

var queryString = location.search; //Verifica se há na barre de navegacao alguma query de filtro de categoria
if(queryString){
    
    let categoryName=decodeURI(queryString.trim().split("=")[1]);
    var filtered = listaProjetos.filter(project =>categoryFilter(project, categoryName));
    for(project in filtered)
    {
      createCards(".grid-wrapper", filtered[project], filtered[project].id);
    }
}
else // sem query de pesquisa, carrega todos os cards
{
    for(const index in listaProjetos){
   
        createCards(".grid-wrapper", listaProjetos[index], listaProjetos[index].id);
    }
}


createMenuLateral(categorias, ".menu-ul"); // Cria o menu lateral
createMenuLateral(categorias, ".menu-ul2"); //Cria o menu lateral expansivo

