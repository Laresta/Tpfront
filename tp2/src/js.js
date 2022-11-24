function ajouterScene(){
    let scene =  document.querySelector("#scene");
    let tool = document.querySelector("#tool");
    let toolbox = tool.getBoundingClientRect();
    let hauteurScene = window.innerHeight - toolbox.height ; 
    scene.style.height = hauteurScene + "px";
}