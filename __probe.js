(function(){ var i=0; window.requestAnimationFrame=function(f){ return setTimeout(function(){ f(++i*16); },16); };
             window.cancelAnimationFrame=function(h){ clearTimeout(h); }; })();
var OUT = [];
function say(k, v){ OUT.push(k + "=" + v); var d=document.getElementById("probe"); if(d) d.textContent = OUT.join(" | "); }
window.addEventListener("error", function(e){ say("JSERROR", (e.message||"") + " @line" + (e.lineno||"")); });
function grab(label, fn){ try{ say(label, fn()); }catch(err){ say(label, "THREW " + err.message); } }
grab("full", function(){ return window.__solFull === true; });
grab("pathLen", function(){ return (window.__solPath||[]).length; });
grab("chapters", function(){ return (window.__solChapters||[]).length; });
grab("lastStage", function(){ return (window.__solPath||[]).slice(-1)[0] || "none"; });
grab("buyDoorExists", function(){ return !!document.getElementById("buyDoor"); });
setTimeout(function(){
  grab("showBuyFn", function(){ return typeof window.__solShowBuy; });
  grab("devRowKids", function(){ var r=document.getElementById("devRow"); return r ? r.children.length : -1; });
  grab("peeks", function(){ return document.querySelectorAll(".stone.peek").length; });
  grab("shutPeeks", function(){ return document.querySelectorAll(".stone.peek.shut").length; });
  grab("openStones", function(){ return document.querySelectorAll(".stone.open").length; });
  grab("clickShut", function(){
    var sh = document.querySelectorAll(".stone.peek.shut");
    if (!sh.length) return "no-shut-stone";
    sh[sh.length-1].dispatchEvent(new MouseEvent("click",{bubbles:true}));
    return "clicked";
  });
  setTimeout(function(){
    grab("buyOpen", function(){ return document.getElementById("buyDoor").classList.contains("on"); });
    grab("buyHref", function(){ return document.getElementById("buyGo").getAttribute("href") || "none"; });
    grab("buyFaceSet", function(){ return (document.getElementById("buyFace").getAttribute("src")||"").length > 50; });
    say("DONE", 1);
  }, 400);
}, 2500);
