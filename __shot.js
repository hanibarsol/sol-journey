(function(){ var i=0; window.requestAnimationFrame=function(f){ return setTimeout(function(){ f(++i*16); },16); };
             window.cancelAnimationFrame=function(h){ clearTimeout(h); }; })();
var DONE7 = ["do","meet","re","ear","hunter","read","dore"];
if (!sessionStorage.getItem("pass2")){
  sessionStorage.setItem("pass2","1");
  localStorage.setItem("solWorld.done", JSON.stringify(DONE7));
  localStorage.setItem("solWorld.round","7");
  localStorage.setItem("solWorld.coins","14");
  localStorage.setItem("solWorld.intro","1");
  location.reload();
} else {
  setTimeout(function(){
    var go = document.getElementById("introGo");
    if (go) go.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    setTimeout(function(){
      if (location.search.indexOf("open") >= 0){
        var sh = document.querySelectorAll(".stone.peek.shut");
        if (sh.length) sh[sh.length-1].dispatchEvent(new MouseEvent("click",{bubbles:true}));
      }
    }, 2600);
  }, 1200);
}
