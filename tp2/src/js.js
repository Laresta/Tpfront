function demarrer(){
    scene =  document.querySelector("#scene");
    tool = document.querySelector("#tools");
    listimg = document.querySelector("#selecteur");
    imgApercu = document.querySelector("#apercu");
    nbrcol = document.querySelector("#nbrcol");
    nbrrow = document.querySelector("#nbrrow");
    remplirSelecteur();
    total = document.querySelector("#nbrpieces");
    puzzle = document.querySelector("#puzzle");
    selectedPiece = null;
    currentScore = 0;
}


function ajouterScene(){
    let toolbox = tool.getBoundingClientRect();
    let hauteurScene = window.innerHeight - toolbox.height ; 
    scene.style.height = hauteurScene + "px";
}

function remplirSelecteur(){
    tabimg.forEach(img => {
        let option = document.createElement("option");
        option.value = img;
        img = img.replace(/[.]+[a-z]*$/,"");
        option.textContent = img;        
        listimg.appendChild(option);
    });
}

function actualiserApercu(){
   imgApercu.src = "../dist/"+listimg.value;
}

function verifNbr(e){
    if (isNaN(parseInt(e.value))|| parseInt(e.value) < 2){
        e.value = 2;
    }
    if (parseInt(e.value)>10 )
    {
        e.value = 10;
    }
}

function verifSaisie(saisie){
    verifNbr(saisie);   
}

function actualiserTotal(){
    let totalpiece  = parseInt(nbrcol.value) * parseInt(nbrrow.value) ;
    if (isNaN(totalpiece)){
        totalpiece = 0;
    }
    total.textContent = totalpiece ;
}

function acuataliserPuzzle(){
    let col = parseInt(nbrcol.value);
    let row = parseInt(nbrrow.value);
    selectedPiece = null;
    let allpiece = [];

    ratio = (imgApercu.naturalWidth / col) / (imgApercu.naturalHeight / row);
    let largeurPiece = 50;
    let hauteurPiece = Math.floor(largeurPiece / ratio) ; 
    puzzle.style.height = (hauteurPiece * row) + "px";
    puzzle.style.width = (largeurPiece * col) +"px";

    while (puzzle.firstChild){
        puzzle.removeChild(puzzle.firstChild);
    }

    for (let i = 0 ; i < col ; i++){
        for(let j = 0 ; j < row ; j++){
            let piece = document.createElement("div");
            piece.classList.add("piece");   
            piece.style.width = largeurPiece + "px" ;
            piece.style.height = hauteurPiece + "px";
            piece.style.left = (largeurPiece) * i +"px";
            piece.style.top = (hauteurPiece) * j +"px"; 
            let urll = "../dist/" + listimg.value;
            piece.style.backgroundImage = "url("+urll+")";
            piece.style.backgroundSize = puzzle.style.width+" "+ puzzle.style.height;
            piece.style.backgroundPosition = "-"+ piece.style.left  +" -"+ piece.style.top ;
            piece.dataset.solutionX = piece.style.left;
            piece.dataset.solutionY = piece.style.top;
            piece.dataset.currentX = piece.style.left;
            piece.dataset.currentY = piece.style.top; 
            piece.addEventListener('click', event =>{
               clicPiece(event);
            })
            allpiece.push(piece);
            puzzle.appendChild(piece);
        }
    }
    melangerPieceV1(allpiece , 100);
}   

function melangerPieceV1 (allpiece , nbrtour ){
    let currenttour = 0; 
    while (nbrtour != currenttour){
        let pieceA = allpiece[Math.floor(Math.random()*allpiece.length)];
        let pieceB = allpiece[Math.floor(Math.random()*allpiece.length)];
        permuterPiece(pieceA,pieceB);
        currenttour ++;
    }

}

function permuterPiece(pieceA , pieceB){
    let XtoB = pieceA.dataset.currentX ;
    let YtoB = pieceA.dataset.currentY;
    let XtoA = pieceB.dataset.currentX;
    let YtoA = pieceB.dataset.currentY;
    pieceA.dataset.currentX = XtoA;
    pieceA.dataset.currentY = YtoA;
    pieceB.dataset.currentX = XtoB;
    pieceB.dataset.currentY = YtoB;
    pieceA.style.top = YtoA;
    pieceA.style.left = XtoA;
    pieceB.style.top = YtoB;
    pieceB.style.left = XtoB;
    if(pieceOk(pieceA)){
        score ++;
    }
    if(pieceOk(pieceB)){
        score ++ ;
    }
}

function clicPiece(evt){
    if (selectedPiece === null ){
        selectedPiece = evt.target;
        selectedPiece.style.opacity = "0.5";
    }
    else {
        permuterPiece(selectedPiece , evt.target);
        selectedPiece.style.opacity = "1";
        selectedPiece = null;
    }
}

function pieceOk(piece){
    if(piece.dataset.currentX === piece.dataset.solutionX && piece.dataset.currentY === piece.dataset.solutionY ){
        return true;
    }
    return false;
}