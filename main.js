let game ={
    
    gold:0,
    dps:0,
    clickDamage:1,
    
    monsterHealth:10,
    zone:1,
    zoneHealth:10,
    zoneReward:1,
    monstersRemaining:10,
    monsterTotal:10,

    heroes: [],
    
    cid: {
        price: 5,
        level: 0,
        dpc: 0,
        dpp: 1,
    },
    
    
    
    lastUpdate: Date.now(),
}

function F(amount) { // Format
    let power = Decimal.floor(Decimal.log10(amount));
    let mantissa = (Decimal.divide(amount,(Decimal.pow(10,power))));
    if (Decimal.lt(power,6)) return Decimal.floor(amount);
    // if (Decimal.gt(power,200)) return new Decimal(amount);
    return Decimal.divide((Decimal.ceil(Decimal.times(mantissa,100))),100) + "e" + power;
}

function D(num){ // Unused Format
    new Decimal(num);
    return;
}

function damageMonster (){ // Click monster to damage monster
    if(document.getElementById("monster").innerHTML == "☠️"){return};
    let x = new Decimal(game.monsterHealth);
    let y = new Decimal(game.clickDamage);
    z = Decimal.minus(x,y);
    game.monsterHealth = z;
    // console.log(game.monsterHealth);
    updateGUI();
}

function killMonster (){ // What happens when monster dies. Uses monster health, zone health, monsters remaining, gold, zone reward
    if (Decimal.lte(game.monsterHealth,0)){
        let x = new Decimal(game.monsterHealth);
        let y = new Decimal(game.zoneHealth);
        z = Decimal.plus(x,y);
        game.monsterHealth = z;
        // console.log(game.monsterHealth);

        let u = new Decimal(game.monstersRemaining);
        let v = new Decimal(game.gold);
        let w = new Decimal(game.zoneReward);
        uu=Decimal.minus(u,1);
        g=Decimal.plus(v,w);
        game.gold = g;
        game.monstersRemaining = uu
        deathAnimation1();
        updateGUI();
    
    }
}

function deathAnimation1 (){
    let elem1 = document.getElementById("monster");
    elem1.innerHTML = "☠️";
    setTimeout(deathAnimation2, 500);
}

function deathAnimation2 (){
    let elem1 = document.getElementById("monster");
    elem1.innerHTML = "👾";
}

function nextZone() { // What happens when all monsters in a zone are dead. Uses monsters remaining, zone, zone health, zone reward, monster amount
    if (Decimal.equals(game.monstersRemaining,0)){
        console.log("next zone activated");
        let x = new Decimal(game.zone);
        // let y = new Decimal(game.zoneHealth);
        // let z = new Decimal(game.zoneReward);

        n = Decimal.ceil(   (   Decimal.times(10,((Decimal.plus(x,1)).minus(1).plus((Decimal.pow(1.55,(Decimal.minus((Decimal.plus(x,1)),1))))))   ) )   )
        o = Decimal.plus(x,1);
        p = Decimal.ceil(Decimal.divide(n,15));

        game.zoneHealth = n;
        game.monsterHealth = n;
        game.monstersRemaining = game.monsterTotal;
       
        game.zone = o;
        game.zoneReward = p;
    }
}

function buyCid (){  // Buys Cid. Affects gold, click damage, Cid level, Cid price, Cid DPC
    let v = new Decimal(game.gold);
    let w = new Decimal(game.clickDamage);
    let x = new Decimal(game.cid.level);
    let y = new Decimal(game.cid.price);
    let z = new Decimal(game.cid.dpc);
    let zz = new Decimal(game.cid.dpp);
    if (Decimal.gte(v,y)){
        a = Decimal.minus(v,y); // change gold amount
        b = Decimal.floor(Decimal.times((Decimal.plus(6,x)),(Decimal.pow(1.07,x)))); // change cid cost
        c = Decimal.plus(z,1); // add to cid level
        d = Decimal.plus(w,zz); // add to click damage
        e = Decimal.plus(z,zz); // add to cid dpc

        game.gold = a;
        game.clickDamage = d;
        game.cid.level = c;
        game.cid.price = b;
        game.cid.dpc = z;
        

    }else{return};
}

function updateGUI() { // Updates GUI
    document.getElementById("gold-value").textContent = F(game.gold);
    document.getElementById("dpc-value").textContent = F(game.clickDamage);
    document.getElementById("monster-health").textContent = F(game.monsterHealth);
    document.getElementById("cid-price").textContent = F(game.cid.price);
    document.getElementById("level-cid").textContent = game.cid.level;
    document.getElementById("dpc-cid").textContent = F(game.cid.dpc);
    document.getElementById("zone").textContent = "Zone " + game.zone;
    document.getElementById("monsters-remaining").textContent = game.monstersRemaining + "/" + game.monsterTotal;

    nextZone();
    killMonster();
    
}

function mainLoop() { // Main loop, GUI updates every second because of this
    var diff = (Date.now() - game.lastUpdate) / 1000;


    updateGUI();

    game.lastUpdate = Date.now();
}

setInterval(mainLoop, 50);

