(function (root) {
  "use strict";
  var names = ["尚服局女官", "自立门户", "与沈砚共读人间", "随陆九看遍山河", "锦绣坊新掌柜", "名动江南的绣圣", "灯下病骨", "一纸远行契", "留下自己的名字"];
  function rankLevel(g) {
    if (g.season >= 3 && g.art >= 92 && g.fame >= 55) return 3;
    if (g.season >= 1 && g.art >= 72 && g.fame >= 24) return 2;
    if (g.art >= 20 && g.season >= 0) return 1;
    return 0;
  }
  function endingId(g) {
    if (g.art >= 88 && g.fame >= 45) return "saint";
    if (g.fame >= 52 && g.art >= 68) return "palace";
    if (g.cash >= 100 && g.spirit >= 28) return "atelier";
    if (g.aff[0] >= 22 && g.fame >= 18) return "shen";
    if (g.aff[1] >= 22 && g.spirit >= 25) return "lu";
    if (g.aff[2] >= 24 && g.art >= 48) return "掌柜";
    if (g.spirit <= 12) return "ill";
    if (g.cash < 12 && g.fame < 18) return "sold";
    return "ownname";
  }
  function apply(g, action, roll) {
    function factor(key, act) {
      var value=g[key]||0, level=value>=80?0.25:value>=60?0.4:value>=35?0.65:1;
      var repeat=g.lastAction===act?Math.max(0.35,1-Math.max(0,g.actionStreak||0)*0.18):1;
      return level*repeat;
    }
    function change(key, amount) { var cap=key==="cash"?999:100;g[key]=Math.max(0,Math.min(cap,(g[key]||0)+amount)); }
    function gain(key, amount, act) { change(key,Math.round(amount*factor(key,act))); }
    if(action==="work"){gain("cash",5+roll,action);gain("art",2+(roll===2?1:0),action);change("spirit",-6-(g.lastAction===action?Math.min(7,(g.actionStreak||0)*2):0));}
    if(action==="learn"){gain("art",3+roll,action);change("spirit",-7);gain("fame",roll===2?1:0,action);}
    if(action==="market"){gain("cash",7+roll,action);gain("fame",1,action);change("spirit",-5);}
    if(action==="school"){gain("art",1,action);gain("fame",1,action);change("spirit",-4);g.aff[0]=Math.min(100,g.aff[0]+1);}
    if(action==="dock"){gain("cash",4+roll,action);g.aff[1]=Math.min(100,g.aff[1]+2);change("spirit",-6);}
    if(action==="rest")change("spirit",18);
    if(action==="contest"){gain("art",2,action);gain("fame",3+roll,action);change("spirit",-7);}
    if(g.lastAction===action)g.actionStreak=(g.actionStreak||0)+1;else{g.lastAction=action;g.actionStreak=1;}
    g.turn++; if (g.turn === 2) { g.turn = 0; g.day++; if (g.day > 10) { g.day = 1; g.season++; g.spirit = Math.min(100, g.spirit + 12); } }
    return g;
  }
  var api = { rankLevel: rankLevel, endingId: endingId, endingNames: names, apply: apply };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.JXFEngine = api;
}(this));
