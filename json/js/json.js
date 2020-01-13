/*
JSON：JavaScript Object Notationは、
JavaScriptのオブジェクトリテラルをベースに作られた軽量なdataフォーマット
人にも機械にも読みやすい構造。

JavaScriptのオブジェクトリテラルと一部記述ルールが異なる。
なぜなら、機械がパースしやすいように下記の仕様で制約が取り決められたからです。
http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf
日本語のJSONドキュメント
http://www.json.org/json-ja.html
*/


/*
JSONオブジェクトは、下記のように記述する。文字列は"ダブルクォーテーションで囲むことがルールとなる。
{
    "object": { 
        "number": 1, 
        "string": "js-primer",
        "boolean": true,
        "null": null,
        "array": [1, 2, 3]
    }
}
*/



//JSON文字列をオブジェクトに変換する。
{
    /*
    JSONの文字列は"ダブルクォート囲いなので、javascriptで定義する場合、
    シングルクォートで全体を囲む。
    */
    const json = '{ "id" : 1, "name" : "Tom" }';
    /*
    key:value形式で定義
    次の要素を示す場合、カンマ「,」を使用する。
    */



    //JSONデータ文字列をオブジェクトに変換
    const obj = JSON.parse(json);
    console.log(obj.id); //=>1
    console.log(obj.name); //=>Tom







}


//文字列が配列形式の場合は配列が返却される。
{
    const json = '[1,2,3]';
    JSON.parse(json).forEach(v => console.log(v));
}

//文字列がjson形式でない場合は例外がスローされる。
{
    const invalidJson = "not json value";
    try {

        JSON.parse(invalidJson);

    } catch (error) { // Unexpected token o in JSON at position 1
        console.log("パースできませんでした。");
    }
}


//ObjectをJSON形式の文字列に変換する。
{
    const obj = {
        id: 1,
        name: "Gil",
        bio: null
    };


    console.log(JSON.stringify(obj));

    //null=>null
    //undefined=>プロパティが消える。
    //空文字=>""
}

//stringifyのオプショナルな第二引数　replacer引数
{
    /*
    replacerは関数オブジェクト。
    例として値がnullの場合、JSON文字列内にそのプロパティを含めない時の関数を以下に示す。
    */

    /*
    方針
    valueがnullの場合undefinedに変更する。
    undefinedの場合、エントリーを除外するため。
    */

    const obj = {
        id: 1,
        name: "Aru",
        bio: null
    }

    const replacer = (key, value) => {
        if (value === null) {
            return undefined;
        } else {
            return value;
        }
    }

    console.log(JSON.stringify(obj, replacer));

}



//第二引数が関数でなく、
//配列の場合はホワイトリストとして使われ、その配列に含まれる名前のプロパティのみ変換される。
{
    const obj = {
        id: 1,
        name: "Aru",
        bio: null
    }

    const whiteList = ["id", "name"];

    console.log(JSON.stringify(obj, whiteList));

}

/*
第三引数はspace引数とも呼ばれる。
JSON形式の文字列にインデントを与えてることができる
*/
{
    const obj = {
        id: 1,
        name: "Aru",
        bio: null
    }


    //数値の場合 スペース2でインデントする。
    console.log(JSON.stringify(obj, null, 2));
    //文字列の場合　文字列でインデントする。
    console.log(JSON.stringify(obj, null, "ttt"));
    console.log(JSON.stringify(obj, null, "\t"));
}


//JSON形式とJavaScriptの形式
{
    // 値が関数のプロパティ
    console.log(JSON.stringify({
        x: function () {}
    })); // => '{}'
    // 値がSymbolのプロパティ
    console.log(JSON.stringify({
        x: Symbol("")
    })); // => '{}'
    // 値がundefinedのプロパティ
    console.log(JSON.stringify({
        x: undefined
    })); // => '{}'
    // 配列の場合
    console.log(JSON.stringify({
        x: [10, function () {}]
    })); // => '{"x":[10,null]}'
    // キーがSymbolのプロパティ
    JSON.stringify({
        [Symbol("foo")]: "foo"
    }); // => '{}'
    // 値がRegExpのプロパティ
    console.log(JSON.stringify({
        x: /foo/
    })); // => '{"x":{}}'
    // 値がMapのプロパティ
    const map = new Map();
    map.set("foo", "foo");
    console.log(JSON.stringify({
        x: map
    })); // => '{"x":{}}'


    //以下対応表。
    /*
        文字列・ 数値・ 真偽値 対応する値
        null null
        配列 配列
        オブジェクト オブジェクト
        関数 変換されない（ 配列のときはnull）
        undefined 変換されない（ 配列のときはnull）
        Symbol 変換されない（ 配列のときはnull）
        RegExp {}
        Map, Set {}
    */



    /*
    Map/Setはオブジェクトを持たないので、{}となる。
    Json形式への変換はオブジェクトの列挙を行う方針で変換しているため発生する。
    */


    /*
    objectが循環参照を起こしている場合は例外が発生する。
    */


    /*
    変換対象のJSON.stringifyは変換対象のtoJSONメソッドを持っている場合はその形式に従って変換する。
    MAPにそのようなメソッドを持たせたらMapもjson形式文字列に変換が可能ということ。
    */
}
