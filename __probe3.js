(function(){ var i=0; window.requestAnimationFrame=function(f){ return setTimeout(function(){ f(++i*16); },16); };
             window.cancelAnimationFrame=function(h){ clearTimeout(h); }; })();
var OUT = [];
function say(k, v){ OUT.push(k + "=" + v); var d=document.getElementById("probe"); if(d) d.textContent = OUT.join(" | "); }
function grab(label, fn){ try{ say(label, fn()); }catch(err){ say(label, "THREW " + err.message); } }
grab("search", function(){ return location.search || "(clean)"; });
grab("stored", function(){ return localStorage.getItem("solWorld.full") || "none"; });
grab("full", function(){ return window.__solFull === true; });
grab("pathLen", function(){ return (window.__solPath||[]).length; });
grab("chapters", function(){ return (window.__solChapters||[]).length; });
setTimeout(function(){
  grab("devRowKids", function(){ var r=document.getElementById("devRow"); return r ? r.children.length : -1; });
  grab("peeks", function(){ return document.querySelectorAll(".stone.peek").length; });
  grab("shutPeeks", function(){ return document.querySelectorAll(".stone.peek.shut").length; });
  grab("clickShutOpensBuy", function(){
    var sh = document.querySelectorAll(".stone.peek.shut");
    if (!sh.length) return "no-shut-stone";
    sh[sh.length-1].dispatchEvent(new MouseEvent("click",{bubbles:true}));
    return document.getElementById("buyDoor").classList.contains("on");
  });
  say("DONE", 1);
}, 2600);
