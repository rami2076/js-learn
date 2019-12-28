//objectにはnullが代入できる。
var object1 = null;

document.write("<p>" + object1 + "</p>");

//objectの初期化
var object2 = {name:"Hiroshi",age:22};
document.write("<p>" + object2.name +":"+ object2.age + object2 + "</p>");



//オブジェクトリテラル
const obj = {};//中身が空のobjectを作成

//{key:value}形式で定義する。
//keyは文字列またはシンボル
//valueはどんな型の値も格納可能。

const obj2 ={
    //key=key
  key:"value"
    //value="value"
    
};

/*
objectが持つkeyをプロパティ名と呼ぶ。
obj2はkeyというプロパティを持っている状態
オブジェクトのプロパティを参照するには、二つの記述方法がある。
.(ドット)または[](ブラケット)で参照できる。
*/
//ドット記法
console.log(obj2.key);
//ブラケット記法
console.log(obj2["key"]);



// プロパティ名は文字列の"123"
const obj3 = {
    "123": "value"
};
/*
キー名は変数名としても使用されるため、識別子として利用できないプロパティ名はブラケット記法のみ利用できる。
*/
console.log(obj3["123"]);
/*
ドット記法は例外が発生する。
console.log(obj3.123);
*/