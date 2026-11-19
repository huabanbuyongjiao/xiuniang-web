(function () {
  "use strict";
  var STORAGE_KEY = "jinxiufang_web_v2";
  var STORAGE_MIN_CLIENT_VERSION = 9460;
  const ENABLE_REWARD = false; var WEB_BUILD = true;
  var seasons = ["春", "夏", "秋", "冬"];
  var names = ["沈砚", "陆九", "苏掌柜"];
  var ranks = ["学徒", "绣娘", "大绣娘", "首席"];
  var endings = [
    { id:"palace", title:"尚服局女官", hint:"名声与绣艺皆出众，宫中自有一席。", verdict:"锦针入云章", body:"京中来信时，阿绣的手已能以针代笔。她入尚服局掌衣纹，也将女工的工钱与休息一并写进新例。宫门深深，她仍记得江南雨声；每逢新徒入局，先教她们认自己的名字，再教她们绣天下。", test:function(g){return g.fame>=52&&g.art>=68;} },
    { id:"atelier", title:"自立门户", hint:"攒足本钱，也要留住一口心气。", verdict:"一坊自有春", body:"她拿多年积蓄租下临河小屋，门楣只题自己的名字。起初客少账薄，她便教街坊姑娘识线、议价、分工。坊中不问出身，只问针脚与心意。后来窗下常有新绣架，阿绣终于把当年的契纸，换成了一把能开门的钥匙。", test:function(g){return g.cash>=100&&g.spirit>=28;} },
    { id:"shen", title:"与沈砚共读人间", hint:"常与沈砚相知，也让名字传开。", verdict:"并肩看山河", body:"沈砚赴书院那日，她没有收起自己的针线。两人一人教字、一人教绣，沿途把旧祠堂改作女学，也替无依的姑娘寻工。情意落在寻常灯火里，不是谁依附谁；春来共读，秋去各忙，桌上始终留着两盏温茶与两条宽阔的路。", test:function(g){return g.aff[0]>=22&&g.fame>=18;} },
    { id:"lu", title:"随陆九看遍山河", hint:"与陆九同行，且把心气照料好。", verdict:"帆外有归途", body:"陆九的船驶出苏州时，阿绣带走了针盒，也带走自己的账本。她替沿河人家修衣换宿，教船上女眷做活议价；遇见风浪便停船，遇见不平便开口。江湖并非故事里的快意，她却在每座陌生码头都找到落脚处，知道归途由自己择定。", test:function(g){return g.aff[1]>=22&&g.spirit>=25;} },
    { id:"掌柜", title:"锦绣坊新掌柜", hint:"赢得苏掌柜信任，绣艺也要过硬。", verdict:"旧坊换新主", body:"苏掌柜将账册和钥匙交到她手里，没有一句挽留。阿绣先重订工钱，再把学徒的名字写进每笔账。锦绣坊照旧临河而开，规矩却渐渐不同：女工可以议价，可以歇息，也可以离去。她守住老招牌，更替后来的人留了一道不必低头的门。", test:function(g){return g.aff[2]>=24&&g.art>=48;} },
    { id:"saint", title:"名动江南的绣圣", hint:"以极深绣艺和声名写成一卷。", verdict:"千针照万家", body:"她的一幅《归舟》传遍江南，绣线里既有水乡烟雨，也有女子归家或远行的身影。人们称她绣圣，她只说每一针都从许多双手学来。成名后她不闭门藏艺，反而把针法写成薄册送往各地，让寻常人家的女儿也能凭手艺谋生。", test:function(g){return g.art>=88&&g.fame>=45;} },
    { id:"ill", title:"灯下病骨", hint:"若总不肯歇息，身子会先替你作答。", verdict:"灯尽针犹暖", body:"长年赶工终于压弯了她的肩。病榻边堆着未完的绣样，窗外姑娘们轮流替她收针、讨工钱。阿绣没有留下惊天名声，却把一册针法和一张工价表交给后来人。灯火渐弱时，她听见坊里有人笑谈明日的安排，明白自己的辛苦终究没有白费。", test:function(g){return g.spirit<=12;} },
    { id:"sold", title:"一纸远行契", hint:"钱粮与名声都未能攒下，契约仍在。", verdict:"身去心不卖", body:"债主递来新的契纸，她看清字句后没有哭，只将旧账一笔笔念给众人听。终究还是离开苏州，去往陌生人家做绣工；临行前，她把针法留给同伴，也记下欠她工钱的人名。路途未必宽阔，但那枚指印不再代表沉默，她知道自己还会为自由作证。", test:function(g){return g.cash<12&&g.fame<18;} },
    { id:"ownname", title:"留下自己的名字", hint:"这一年如何取舍，皆会落在自己的名字下。", verdict:"此生自落款", body:"岁末绣卷铺开，既无宫门召书，也无富贵车马。阿绣却把四季做过的针脚都绣进一幅长图：有同伴的手，有自己的名字，也有未曾走完的路。她不把平凡当作输赢，收起针时心中已有主意。明年要去哪里、做什么，都由她亲自落款。", test:function(){return true;} }
  ];
  var eventPool = [[
      ["春雨漏檐","一场夜雨打湿了后院绣架。新来的小徒急得直哭，苏掌柜却只问谁肯先挪自己的被褥。","替她护住绣架","拆下旧帘遮雨","先把自己的活做完"],
      ["错针疑云","一幅待交的海棠屏上多出半寸错针。众人都看向你，针脚旁却留着一根不属于你的金线。","当众拆线复绣","请苏掌柜查账","默默补好再说"],
      ["书院墙外","沈砚在墙外捡到你遗落的帕子，上头绣着未写完的名字。他把纸笔递来，说识字也是一条路。","向他学两个字","把帕子赠给他","笑说先学算工钱"],
      ["新样争议","一位老绣娘说双面绣不该由学徒碰。她的手指已经发僵，却仍把针线攥得很紧。","请她教你一针","拿旧绢试新样","说手艺不该有门槛"],
      ["春市失窃","集市上少了一包绣线，摊主认定是坊里姑娘拿的。陆九带人来问，眼神却落在潮湿的车辙上。","陪他沿车辙找","用自己的钱赔线","请摊主再点一遍"],
      ["春试帖","绣庄春试的帖子终于送来。苏掌柜把帖子压在账本下，说机会不等于恩典。","报名比试","先替同伴赶工","问她想看什么本事"]
    ]].concat(window.JXFSeasonEvents || []);
  var actionLines = {
    work:["针尖落处，日子便有了实在的分量。","一寸绫罗换几文钱，也换来手上稳当。","灯影微晃，针脚却比昨日齐整。"],
    learn:["隔帘看来的花样，终究成了自己的本事。","你把不敢问的那一针，悄悄记在心里。"],
    market:["帕子递出去时，连吆喝声都轻快了些。","买主挑走一方帕，也留下两句好话。"],
    school:["墙外书声落在耳边，心里多开了一扇窗。","识得一个字，便不必总等别人念给你听。"],
    dock:["码头风大，货单与人情都得看仔细。","你把货送到，顺手替船工缝好裂开的袖口。"],
    rest:["歇下针，听一阵檐水；身子也值得被照料。","半日闲坐，心气又慢慢聚了回来。"],
    visit:["一盏茶的工夫，有些话便不必藏在针脚里。","你带去一方帕，也带回一句真心话。"],
    contest:["台上针线如云，你把自己的来路绣进答案里。","绣庄看过你的作品，第一次认真记住了你的名字。"]
  };
  var game = null;
  var el = {};
  var promotionPending = false;
  function q(id) { return document.getElementById(id); }
  function readBuildVersion(options) { var env = options && options.miniToolEnv; return Number(env && env.buildVersion) || 0; }
  function isClientVersionAtLeast(buildVersion, minimum) { return Math.floor((Number(buildVersion) || 0) / 1000) >= minimum; }
  async function getBuildVersion() {
    var xhs = window.xhs;
    var sync = readBuildVersion(xhs && xhs.launchOptions);
    if (sync) return sync;
    var mini = xhs && xhs.miniTool;
    if (!mini || typeof mini.getLaunchOptions !== "function") return 0;
    try { return readBuildVersion(await mini.getLaunchOptions()); } catch (error) { return 0; }
  }
  async function getLocalData(key) { try { var raw=localStorage.getItem(key); return raw?JSON.parse(raw):null; } catch(error) { return null; } }
  async function setLocalData(key,data) { try { localStorage.setItem(key,JSON.stringify(data)); return true; } catch(error) { return false; } }
  function freshGame(name) { return { name:name || "阿绣", season:0, day:1, turn:0, cash:18, art:8, fame:0, spirit:70, bond:0, aff:[0,0,2], eventSeen:{}, endings:[], contest:false, ending:null, rankLevel:0, lastAction:"", actionStreak:0, busy:false }; }
  function showScreen(id) { ["home","game","gallery"].forEach(function (name) { q(name).classList.toggle("hidden", name !== id); }); }
  function say(text) { q("narrative").textContent = text; }
  function toast(text) { q("toast").textContent = text; window.setTimeout(function () { if (q("toast")) q("toast").textContent = ""; }, 2400); }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function change(key, amount) { var cap=key==="cash"?999:100;game[key] = clamp(game[key] + amount, 0, cap); }
  function gainFactor(key, action) {
    var value=game[key]||0;var level=value>=80?0.25:value>=60?0.4:value>=35?0.65:1;
    var repeat=game.lastAction===action?Math.max(0.35,1-Math.max(0,game.actionStreak)*0.18):1;
    return level*repeat;
  }
  function gain(key, amount, action) { change(key, Math.round(amount*gainFactor(key,action))); }
  function updateRank() {
    var level = window.JXFEngine.rankLevel(game);
    if (level > game.rankLevel) {
      game.rankLevel = level;
      promotionPending = true;
      modal("【晋升】" + ranks[level], "一针一线皆有回响，你的手艺终于赢得了坊中认可。", [
        {label:"是", run:function(){promotionPending=false;closeModal();}}
      ]);
    }
    q("rank-label").textContent = ranks[level];
  }
  function render() {
    var terminal=game.season>=4;var seasonName=terminal?"冬":seasons[game.season];
    q("season-label").textContent = terminal?"冬卷·终":seasonName + "卷";
    q("day-label").textContent = terminal?"四季已尽 · 终章":seasonName + game.day + "日 · " + (game.turn === 0 ? "辰时" : "午时");
    q("turn-label").textContent = game.turn === 0 ? "第一时辰" : "第二时辰";
    q("cash-stat").textContent = game.cash; q("art-stat").textContent = game.art; q("fame-stat").textContent = game.fame; q("spirit-stat").textContent = game.spirit; q("bond-stat").textContent = game.bond;
    q("aff-shen").textContent = game.aff[0]; q("aff-lu").textContent = game.aff[1]; q("aff-su").textContent = game.aff[2];
    q("contest-btn").disabled = game.season === 0 && game.day < 10;
    q("contest-btn").textContent = game.season === 0 && game.day < 10 ? "春末比试" : "绣庄比试";
    updateRank();
  }
  async function refreshReward() { var rb = q("reward-btn"); if (rb) rb.classList.add("hidden"); }
  async function save() { if (!game) return; var ok = await setLocalData(STORAGE_KEY, game); if (ok) toast("这一针一线，已妥善收好。"); else toast("当前环境暂不支持持久存档；本次打开期间仍可继续。"); }
  function modal(title, copy, options) {
    var root = q("modal-root"); root.innerHTML = "";
    var backdrop = document.createElement("div"); backdrop.className = "modal-backdrop";
    var box = document.createElement("section"); box.className = "modal";
    var kicker = document.createElement("p"); kicker.className = "modal-kicker"; kicker.textContent = "锦绣坊 · 一念之间";
    var heading = document.createElement("h2"); heading.textContent = typeof title === "string" && title.trim() ? title : "一段绣坊往事";
    var paragraph = document.createElement("p"); paragraph.className = "modal-copy"; paragraph.textContent = copy;
    box.appendChild(kicker); box.appendChild(heading); box.appendChild(paragraph);
    var list = document.createElement("div"); list.className = "choice-list";
    options.forEach(function (option) { var button = document.createElement("button"); button.className = "choice"; button.textContent = option.label; button.disabled = !!option.disabled; button.addEventListener("click", function () { if (!button.disabled) option.run(); }); list.appendChild(button); });
    box.appendChild(list); backdrop.appendChild(box); root.appendChild(backdrop);
  }
  function closeModal() { q("modal-root").innerHTML = ""; }
  function openEvent(index) {
    var dayIndex = game.day - 1;
    var eventDays = [2, 3, 4, 6, 8, 9];
    var eventNumber = eventDays.indexOf(game.day);
    if (eventNumber < 0) return;
    var seasonEvents = eventPool[index];
    var data = seasonEvents && seasonEvents[eventNumber];
    if (!data || !data[0] || !data[0].trim()) data = ["绣坊小事", "针线间有些寻常琐事，众人各有主意。", "听听大家的想法", "按自己的心意行事", "先把手边活计做好"];
    var choices = data.slice(2).map(function (label, choiceIndex) {
      var requirement = ""; var disabled = false;
      if (choiceIndex === 0 && game.art < 15) { requirement = "（绣艺15可选）"; disabled = true; }
      if (choiceIndex === 1 && game.cash < 10) { requirement = "（银钱10可选）"; disabled = true; }
      return { label:label + requirement, disabled:disabled, run:function () { resolveEvent(index,eventNumber,choiceIndex); } };
    });
    modal(data[0], data[1], choices);
  }
  function resolveEvent(season,eventNo,choice) {
    closeModal();
    var rewards = [
      [[0,4,0,4,2],[0,2,0,2,1],[-2,1,0,-1,0]],
      [[0,1,2,3,2],[-2,2,1,2,1],[0,0,1,3,3]],
      [[3,2,3,2,2],[1,4,4,1,3],[0,2,1,3,4]],
      [[2,3,3,1,3],[-6,1,0,4,4],[0,2,2,2,4]]
    ];
    var row = rewards[season][choice]; change("cash",row[0]);change("art",row[1]);change("fame",row[2]);change("spirit",row[3]);change("bond",row[4]);
    var person = (eventNo + choice + season) % 3; game.aff[person] = clamp(game.aff[person] + (choice === 0 ? 2 : 1),0,100);
    say("风过帘角，针线仍在你手中。你没有等别人替你定夺。");
    toast("心意已定，手艺与人情各有回响。"); render(); save();
  }
  function maybeEvent() {
    if (!game || game.ending || game.season >= 4) return;
    if (promotionPending) { window.setTimeout(maybeEvent, 120); return; }
    var key = game.season + "-" + game.day;
    if ((game.day === 2 || game.day === 3 || game.day === 4 || game.day === 6 || game.day === 8 || game.day === 9 || game.day === 10) && !game.eventSeen[key]) {
      game.eventSeen[key] = true;
      if (game.day === 10) {
        var finale = (window.JXFSeasonFinales || ["春卷末 · 绣庄春试"])[game.season];
        modal(finale, "四季的门槛就在眼前。你要把这一季学来的本事，绣成下一程的路。", [
          {label:"以作品答题（绣艺15）",disabled:game.art<15,run:function(){closeModal();change("art",5);change("fame",5);game.contest=true;say("评席无声片刻，随后有人念出了你的名字。");toast("卷末比试：你凭本事赢得了席位。");render();save();}},
          {label:"与同伴合绣",run:function(){closeModal();change("bond",6);change("fame",2);say("一人一针，空白绢上终于有了众人的去处。");toast("卷末比试：你们的名字并排写在绣卷上。");render();save();}},
          {label:"写下自己的名字",run:function(){closeModal();change("spirit",8);change("fame",2);say("你把名字落在绢角，风将它吹向门外。");render();save();}}
        ]); return;
      }
      openEvent(game.season);
    }
  }

  function doAction(type) {
    if (!game || game.busy) return;
    if (game.springComplete && game.season === 0 && game.day === 10 && game.turn === 1) { toast("春卷已收，绣局暂歇。"); return; }
    if (game.spirit <= 0 && type !== "rest") { toast("心气已尽，今日只能歇息。"); type="rest"; }
    if (type === "visit") { modal("去看望谁", "有人在河埠、有人成天守着账本。你想把这段时光留给谁？", names.map(function (name,idx) { return {label:"拜访"+name,run:function(){closeModal();game.aff[idx]=clamp(game.aff[idx]+Math.max(1,Math.round(4*gainFactor("bond","visit"))),0,100);gain("bond",2,"visit");change("spirit",2);say(name+"替你斟了半盏茶。话未说尽，心意已明。");recordAction("visit");advance();}}; })); return; }
    if (type === "contest" && game.season===0 && game.day<10) { toast("春末才开试，眼下先把针脚练稳。"); return; }
    var roll = Math.floor(Math.random()*3);
    if(type==="work"){gain("cash",5+roll,type);gain("art",2+(roll===2?1:0),type);change("spirit",-6-(game.lastAction===type?Math.min(7,game.actionStreak*2):0));}
    if(type==="learn"){gain("art",3+roll,type);change("spirit",-7);gain("fame",roll===2?1:0,type);}
    if(type==="market"){gain("cash",7+roll,type);gain("fame",1,type);change("spirit",-5);}
    if(type==="school"){gain("art",1,type);gain("fame",1,type);change("spirit",-4);game.aff[0]=clamp(game.aff[0]+1,0,100);}
    if(type==="dock"){gain("cash",4+roll,type);game.aff[1]=clamp(game.aff[1]+2,0,100);change("spirit",-6);}
    if(type==="rest"){change("spirit",18);}
    if(type==="contest"){gain("art",2,type);gain("fame",3+roll,type);change("spirit",-7);game.contest=true;}
    recordAction(type);
    say(actionLines[type][roll%actionLines[type].length]); render(); advance();
  }
  function recordAction(type) { if(game.lastAction===type)game.actionStreak+=1;else{game.lastAction=type;game.actionStreak=1;} }
  async function advance() {
    game.turn += 1;
    if (game.turn >= 2) { game.turn=0;game.day+=1; }
    if (game.day > 10) {
      if (game.season === 0) { game.day=10; game.turn=1; game.springComplete=true; showSpringEnd(); await save(); return; }
      game.season+=1;game.day=1;game.spirit=clamp(game.spirit+12,0,100);
      if(game.season>=4){game.season=4;game.day=10;game.turn=1;finishGame();return;}
    }
    render(); await save(); window.setTimeout(maybeEvent,80);
  }
  function finishGame() {
    if (!game || game.ending) return;
    var available=endings.filter(function(e){return e.test(game);});
    if(!available.length) available=[endings[game.spirit<12?6:7]];
    var ending=available[Math.floor(Math.random()*available.length)];game.ending=ending.id;
    if(game.endings.indexOf(ending.id)<0)game.endings.push(ending.id);
    game.busy=true;render();
    modal("一年已尽 · " + ending.title, "四卷绣图收在案上。你走过的每一步，都成了自己的判词。", [
      {label:"收下这卷判词",run:function(){closeModal();showEnding(ending);save();}},
      {label:"看看结局图鉴",run:function(){closeModal();showGallery("game");save();}}
    ]);
  }
  function showEnding(ending) {
    var root=q("modal-root");root.innerHTML="";var backdrop=document.createElement("div");backdrop.className="modal-backdrop";var box=document.createElement("section");box.className="modal";
    var kicker=document.createElement("p");kicker.className="modal-kicker";kicker.textContent="锦绣成章 · 结局";var h=document.createElement("h2");h.textContent=ending.title;var quote=document.createElement("p");quote.className="ending-quote";quote.textContent=ending.verdict;var story=document.createElement("p");story.className="modal-copy ending-body";story.textContent=ending.body;
    var stats=document.createElement("p");stats.className="modal-copy";stats.textContent="银钱 "+game.cash+" · 绣艺 "+game.art+" · 名声 "+game.fame+" · 心气 "+game.spirit;
    var buttons=document.createElement("div");buttons.className="modal-actions";var gallery=document.createElement("button");gallery.className="modal-primary";gallery.textContent="结局图鉴";gallery.addEventListener("click",function(){closeModal();showGallery("game");});var restart=document.createElement("button");restart.className="modal-secondary";restart.textContent="再绣一生";restart.addEventListener("click",function(){closeModal();newGame();});buttons.appendChild(gallery);buttons.appendChild(restart);box.appendChild(kicker);box.appendChild(h);box.appendChild(quote);box.appendChild(story);box.appendChild(stats);box.appendChild(buttons);backdrop.appendChild(box);root.appendChild(backdrop);
  }
  async function showSpringEnd() {
    game.springComplete=true; render();
    if (WEB_BUILD && localStorage.getItem("jxf_access_v2") !== "1") { showUnlockCard(); return; }
    if (WEB_BUILD) { game.season=1; game.day=1; game.turn=0; render(); return; }
    var tier = game.art >= 28 ? 2 : (game.art >= 17 ? 1 : 0);
    var titles = ["一针初成", "绣娘初名", "春色入针"];
    var bodies = ["春雨收在檐角，你的针脚尚有青涩，却已把自己的名字绣进素绢。往后的日子仍长，先把这一季的耐心与勇气收好。", "十日春光，你从学徒走到了绣娘。坊里有人记住了你的手艺，你也记住了自己的分量。下一卷还在慢慢绣制，眼前的春色已足够作答。", "春末的评席传来掌声，你以一幅新样证明了本事。名声初起，路仍由你选；把这份笃定带到下一段光阴里。"];
    var stats = "春卷小结 · 银钱 " + game.cash + " · 绣艺 " + game.art + " · 名声 " + game.fame + " · 心气 " + game.spirit + " · 人缘 " + game.bond + "\n沈砚 " + game.aff[0] + " · 陆九 " + game.aff[1] + " · 苏掌柜 " + game.aff[2];
    var options=[{label:"再绣一次春卷",run:function(){closeModal();newGame();}}];
    modal(titles[tier], bodies[tier] + "\n\n" + stats + "\n\n夏卷正在绣制中，敬请期待。收藏关注，第一时间看到新卷。", options);
  }
  function showUnlockCard() {
    var root=q("modal-root");root.innerHTML="";var back=document.createElement("div");back.className="modal-backdrop";var box=document.createElement("section");box.className="modal";
    var h=document.createElement("h2");h.textContent="春卷已绣完";var p=document.createElement("p");p.className="modal-copy";p.textContent="输入解锁码，继续夏、秋、冬三卷与全部 9 个结局（一次买断，手机电脑都能玩）";
    var input=document.createElement("input");input.id="unlock-input";input.setAttribute("aria-label","解锁码");input.placeholder="JXF-XXXX-XXXX";input.className="unlock-input";var status=document.createElement("p");status.id="unlock-status";status.className="unlock-status";status.setAttribute("role","status");
    var button=document.createElement("button");button.className="modal-primary";button.textContent="解锁";button.addEventListener("click",function(){if(!window.JXFCode.valid(input.value)){status.textContent="码无效，请检查后再试。";return;}localStorage.setItem("jxf_access_v2","1");status.textContent="已解锁";window.setTimeout(function(){closeModal();game.season=1;game.day=1;game.turn=0;render();say("已解锁。夏日新长，门外的路由由你自己选。");save();},250);});
    box.appendChild(h);box.appendChild(p);box.appendChild(input);box.appendChild(button);box.appendChild(status);back.appendChild(box);root.appendChild(back);
  }
  async function newGame() { game=freshGame(q("player-name").value.trim().slice(0,4));if(!game.name)game.name="阿绣";game.rankLevel=0;showScreen("game");say(game.name+"在一纸契书上按下指印。她没有看见自己的名字，便在绣架边，先绣下了它。");render();refreshReward();await save(); }
  async function continueGame() { var data=await getLocalData(STORAGE_KEY);if(!data){toast("还没有存下的故事。");return;}game=data;game.busy=false;if(typeof game.rankLevel!=="number"||!isFinite(game.rankLevel))game.rankLevel=0;if(game.springComplete){if(localStorage.getItem("jxf_access_v2")==="1"){game.season=1;game.day=1;game.turn=0;}else{showScreen("game");render();showUnlockCard();return;}}showScreen("game");render();say("针线仍在原处，故事从你离开的那一针继续。"); }
  function showGallery(back) {
    showScreen("gallery");var list=q("ending-list");list.innerHTML="";
    endings.forEach(function(ending){var unlocked=game&&game.endings.indexOf(ending.id)>=0;var card=document.createElement("article");card.className="ending-card";var seal=document.createElement("span");seal.className="ending-seal";seal.textContent=unlocked?"绣":"？";var info=document.createElement("div");var title=document.createElement("h3");title.textContent=unlocked?ending.title:"未解之结";var hint=document.createElement("p");hint.textContent=unlocked?ending.verdict+" · "+ending.body.slice(0,30):ending.hint;info.appendChild(title);info.appendChild(hint);card.appendChild(seal);card.appendChild(info);list.appendChild(card);});
    list.setAttribute("data-back",back||"home");
  }
  function bind() {
    q("start-btn").addEventListener("click",function(){if(game&&game.season===0&&game.day===1&&game.turn===0){ }newGame();});
    q("continue-btn").addEventListener("click",continueGame);
    q("gallery-btn").addEventListener("click",function(){showGallery("home");});
    q("home-gallery-btn").addEventListener("click",function(){showGallery("game");});
    q("save-btn").addEventListener("click",save);
    q("restart-btn").addEventListener("click",function(){modal("重新开始？","重新开始会覆盖当前存档。你已走过的结局图鉴会保留。",[{label:"确认重开",run:function(){var found=game?game.endings.slice():[];closeModal();newGame().then(function(){game.endings=found;save();});}},{label:"再想一想",run:closeModal}]);});
    document.querySelectorAll("[data-action]").forEach(function(button){button.addEventListener("click",function(){doAction(button.getAttribute("data-action"));});});
    document.querySelectorAll("[data-back]").forEach(function(button){button.addEventListener("click",function(){showScreen(button.getAttribute("data-back"));});});
  }
  async function refreshContinue() { var data=await getLocalData(STORAGE_KEY);var button=q("continue-btn");button.disabled=!data;button.style.opacity=data?"1":".48"; }
  function mountDebugHook() {
    if (window.location.search.indexOf("debug=1") < 0) return;
    Object.defineProperty(window, "__jxfDebug", { configurable:false, enumerable:false, value:Object.freeze({
      getState:function() {
        var activeScreen="home";
        ["game","gallery"].some(function(id){if(!q(id).classList.contains("hidden")){activeScreen=id;return true;}return false;});
        var heading=q("modal-root").querySelector(".modal h2");
        return Object.freeze({screen:activeScreen, season:game?game.season:null, day:game?game.day:null, turn:game?game.turn:null, art:game?game.art:null, spirit:game?game.spirit:null, rankLevel:game?game.rankLevel:null, ending:game?game.ending:null, unlockedEndings:game?game.endings.length:0, modalTitle:heading?heading.textContent:""});
      }
    }) });
  }
  function init() { ["home","game","gallery","modal-root"].forEach(function(id){el[id]=q(id);});bind();mountDebugHook();refreshContinue(); }
  init();
}());
