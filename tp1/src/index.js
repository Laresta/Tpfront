function demarrer(){
   scene = document.querySelector("#scene");
   charger();
}
  
let coef_zoom = 1;
let papillion_width = 200;
let papillion_height = 200;


function ajouterPapillon(texte , dataset){
     let papillon = document.createElement('div');
     let textA = document.createElement('textarea');
     papillon.classList.add('papillon');
     if (dataset === null ){
      angle = (Math.random() *20)-10;
     }
     else {
      angle = dataset.angles;
     }

     papillon.style.height = papillion_height * coef_zoom + "px";
     papillon.style.width = papillion_width * coef_zoom + "px";

     let button_suppr = document.createElement("img");
     button_suppr.src= "suppr";
     button_suppr.classList.add("button_papillion", "button_suppr");
     button_suppr.addEventListener('click', event =>{
      suppr_papillon(papillon);
     })


     let button_droite = document.createElement("img");
     button_droite.src= "droite";
     button_droite.classList.add("button_papillion", "button_droite");
     button_droite.addEventListener('click', event =>{
      descendre_papillion(papillon);
     })

     let button_gauche = document.createElement("img");
     button_gauche.src= "gauche";
     button_gauche.classList.add("button_papillion", "button_gauche");
     button_gauche.addEventListener('click', event =>{
      remonter_papillon(papillon);
     })

     textA.textContent=texte;
     textA.addEventListener("change" , (event) => {
      sauvegarder();
     })
     papillon.style.transform = "rotate("+angle+"deg)";
     papillon.dataset.angles=angle;

     papillon.appendChild(textA); 
     papillon.appendChild(button_suppr);
     papillon.appendChild(button_droite);
     papillon.appendChild(button_gauche);
     scene.appendChild(papillon);
}
  
function sauvegarder(){
      enfants = scene.childNodes;      
      let infos = [];
      enfants.forEach(enfant=> {
         let info = [] ; 
         let child = enfant.firstChild;
         info.push(child.value);
         info.push(enfant.dataset)
         infos.push(info);
      });
      localStorage.setItem("papillion-item",JSON.stringify(infos));     
}

function charger(){
   let infos = JSON.parse(localStorage.getItem("papillion-item"));
   infos.forEach(info => {
      console.log(info);
      let text = info[0];
      let angle = info[1];
      ajouterPapillon(text,angle);
    });
   coef_zoom = parseFloat(localStorage.getItem("coef_zoom"));
}

function suppr_papillon(element){
 scene.removeChild(element);
 sauvegarder();
}

function remonter_papillon(element){
   scene.insertBefore(element , element.previousSibling);
   sauvegarder();
}

function descendre_papillion(element){
   scene.insertBefore(element.nextSibling, element);
   sauvegarder();
}

function zoom_in(){
   coef_zoom *= 1.1;
   console.log(coef_zoom);
   ajust_papillion(coef_zoom);
}

function zoom_out(){
   coef_zoom /= 1.1;
   console.log(coef_zoom);
   ajust_papillion(coef_zoom);
}

function ajust_papillion(coef_zoom){
   enfants = scene.childNodes;      
   enfants.forEach(papillon=>{
      papillon.style.height = (papillion_height * coef_zoom) + "px";
      papillon.style.width = (papillion_width * coef_zoom) + "px";
   })
}