(function(){ var i=0; window.requestAnimationFrame=function(f){ return setTimeout(function(){ f(++i*16); },16); };
             window.cancelAnimationFrame=function(h){ clearTimeout(h); }; })();
var OUT = [];
function say(k, v){ OUT.push(k + "=" + v); var d=document.getElementById("probe"); if(d) d.textContent = OUT.join(" | "); }
function grab(label, fn){ try{ say(label, fn()); }catch(err){ say(label, "THREW " + err.message); } }
window.addEventListener("error", function(e){ say("JSERROR", (e.message||"") + " @line" + (e.lineno||"")); });

var DONE7 = ["do","meet","re","ear","hunter","read","dore"];
if (!sessionStorage.getItem("pass2")){
  sessionStorage.setItem("pass2","1");
  localStorage.setItem("solWorld.done", JSON.stringify(DONE7));
  localStorage.setItem("solWorld.round","7");
  location.reload();
} else {
  grab("full", function(){ return window.__solFull === true; });
  grab("doneStored", function(){ return (JSON.parse(localStorage.getItem("solWorld.done")||"[]")).length; });
  grab("pathLen", function(){ return (window.__solPath||[]).length; });
  grab("chapters", function(){ return (window.__solChapters||[]).length; });
  setTimeout(function(){
    grab("peeks", function(){ return document.querySelectorAll(".stone.peek").length; });
    grab("shutPeeks", function(){ return document.querySelectorAll(".stone.peek.shut").length; });
    grab("gateStar", function(){ return document.querySelectorAll(".gate").length; });
    grab("devRowKids", function(){ var r=document.getElementById("devRow"); return r ? r.children.length : -1; });
    grab("clickShut", function(){
      var sh = document.querySelectorAll(".stone.peek.shut");
      if (!sh.length) return "no-shut-stone";
      sh[sh.length-1].dispatchEvent(new MouseEvent("click",{bubbles:true}));
      return "clicked";
    });
    setTimeout(function(){
      grab("buyOpen", function(){ return document.getElementById("buyDoor").classList.contains("on"); });
      grab("buyHref", function(){ return document.getElementById("buyGo").getAttribute("href") || "none"; });
      grab("laterCloses", function(){
        document.getElementById("buyLater").dispatchEvent(new MouseEvent("click",{bubbles:true}));
        return !document.getElementById("buyDoor").classList.contains("on");
      });
      say("DONE", 1);
    }, 400);
  }, 2600);
}
