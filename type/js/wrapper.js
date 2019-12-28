//正規表現リテラル

//プリミティブ型(Number,Boolean,String)はobjectに変換可能。
//ラッパーオブジェクトに包むことでオブジェクトとして扱える。
//new演算子と対応するコンストラクタ関数を利用して作成できる。
//String
const strWrap = new String("文字列");
//型識別されないため不便
console.log(typeof strWrap);
//ラッパーオブジェクトのプロパティを使用できる。
console.log(strWrap.length);


//プリミティブ型のobjectはオートボクシング機能でラッパーオブジェクトに変換されるため、
//明示的に変換する必要はない。
