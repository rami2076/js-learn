//条件式にはtruthlyまたはfalsyな式を記述できる。

//if文

//#1 truthlyな式
if ( /*条件式*/ 100) {
    //実行する文;
    console.log("fire!");
}
//#2　booleanな式
if (true) {
    console.log("ice!");
}

//#3　比較演算子を用いた式
const x = 42;
if (x > 0) {
    console.log("bolt!");
}


/*
truthlyな式の例。
*/

if (true) {
    console.log("この行は実行されます");
}
if ("文字列") {
    console.log("この行は実行されます");
}
if (42) {
    console.log("この行は実行されます");
}
if (["配列"]) {
    console.log("この行は実行されます");
}
if ({
        name: "オブジェクト"
    }) {
    console.log("この行は実行されます");
}


/*
falsyな式の例
*/

if (false) {
    // この行は実行されません
}
if ("") {
    // この行は実行されません
}
if (0) {
    // この行は実行されません
}
if (undefined) {
    // この行は実行されません
}
if (null) {
    // この行は実行されません
}

// else if文
const version = "ES6";
if (version === "ES5") {
    console.log("ECMAScript 5");
} else if (version === "ES6") {
    console.log("ECMAScript 2015");
} else if (version === "ES7") {
    console.log("ECMAScript 2016");
}

//else 文
const num = 1;
if (num > 10) {
    console.log(`numは10より大きいです: ${num}`);
} else {
    console.log(`numは10以下です: ${num}`);
}


//ネストしたif文
//#1ブロック内にネストしたif文を記述する。コードは割愛。

//switch文
const version_1 = "ES6";
switch (version_1) {
    case "ES5": //==="ES5"と同じ処理をしている。
        console.log("ECMAScript 5");
        break; //break文を省略するとswitch文内の現在のケースより下の処理も逐次実行する。
    case "ES6":
        console.log("ECMAScript 2015");
        break;
    case "ES7":
        console.log("ECMAScript 2016");
        break;
    default:
        console.log("しらないバージョンです");
        break;
}




function getECMAScriptName(version) {

    switch (version) {
        case "ES5":
            return "ECMAScript 5"; //早期リターン可能。
        case "ES6":
            return "ECMAScript 2015";
        case "ES7":
            return "ECMAScript 2016";
        default:
            return "しらないバージョンです";
    }
}
getECMAScriptName("ES6");
