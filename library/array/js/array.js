/*
配列・Arrayに関する記述
 */

//作成
{
    const emptyArray = [];
    const numbers = [1, 2, 3];
    //二重配列
    const matrix = [["a", "b"], ["c", "d"]];
}
//参照
{
    //一次元
    const array = ["one", "two", "three"];
    console.log(array[0]);

    //二次元
    const matrix = [
    ["a", "b"],
    ["c", "d"]
    ];
    console.log(matrix[0][0]); // => "a"
}
//要素数
{
    const array = ["one", "two", "three"];
    console.log(array.length); // => 3
}

//最期の要素へのアクセス。
{
    const array = ["one", "two", "three"];
    // 配列の要素数 - 1 が 最後の要素のインデックスとなる
    console.log(array[array.length - 1]); // => "three"
}

//存在しない要素へのアクセス。
{
    const array = ["one", "two", "three"];
    // `array`にはインデックスが100の要素は定義されていない
    console.log(array[100]); // => undefined
}

//未定義の要素へのアクセス。
{
    // 未定義の箇所が1つ含まれる疎な配列
    const sparseArray = [1, , 3];
    console.log(sparseArray.length); // => 3 
    // 1番目の要素は存在しないため undefined が返る
    console.log(sparseArray[1]); // => undefined
}

//疎な配列と密な配列
{
    /*
    未定義な要素が存在する配列を「疎な配列」 sparse array　(スパース配列)
    未定義な要素が存在しない配列を「密な配列」dence array (デンス配列)　又は　ノーマル
    */
}

//配列か？
{
    /*
    Array#isArrayで判別可能。
    */
    const obj = {};
    const array = [];

    console.log(Array.isArray(obj));
    console.log(Array.isArray(array));
}

//JavaScriptのArrayの特徴
{
    //Arrayの特徴
    /*
    ・可変長
    ・型の統一不要
    ・格納順序に従う。
    ・isArrayによりArrayの判別が可能。
    */
}

//JavaScriptのTypedArrayの特徴
{
    //TypedArrayの特徴　since ES2015
    /*
    ・固定長
    ・型の統一が必要
    ・格納順序に従う。
    ・isArrayによりArrayの判別が不可能。
    */
    const typedArray = new Int8Array(8);
    console.log(Array.isArray(typedArray)); //=>false
}

//分割代入
{

    //Destructuring assignment　ES2015
    const array = ["one", "two", "three"];
    const [first, second, third] = array;
    console.log(first); // => "one"
    console.log(second); // => "two"
    console.log(third); // => "three"

}

//undefinedの要素と未定義の要素の違い
{
    /*
    sparseArrayとdenceArrayの違いの判別をするためには、hasOwnPropertyを使用する。
    hasOwnPropertyは、オブジェクトのプロパティ以外に配列のindexに対しても使用できる。
    */
    const sparseArray = [1, , 3];
    const denseArray = [1, undefined, 3];
    // 要素自体は`undefined`値が存在する
    console.log(denseArray.hasOwnProperty(1)); //=> true
    // 要素自体がない
    console.log(sparseArray.hasOwnProperty(1)); // => false

}




//配列から要素を検索
{
    //検索では以下3つの目的がある。
    /*
    ・インデックスの取得
    ・要素自体の取得
    ・要素が含まれるかの真偽値の取得
     */

    //#インデックスの取得
    {
        //以下3つがある。
        /*
        Array#indexOf　　　　　　　　　　　　　　　 前方から検索 引数===で合致する場合、indexを返却。
        Array#lastIndexOf                      後方から検索 合致しない場合、-1を返却。
        Array#findIndex    since ES2015　　　　　
         */

        //プリミティブな要素の検索
        {
            const array = ["Java", "JavaScript", "Ruby"];
            const indexOfJs = array.indexOf("JavaScript");
            //存在するため、indexを位置を返却
            console.log(indexOfJs); //=>1
            console.log(array[indexOfJs]); //=>JavaScript
            const indexOfRust = array.indexOf("Rust");
            //存在しないため、-1を返却。
            console.log(indexOfRust); //=>-1
        }

        //オブジェクト要素位置検索時の問題
        {
            const obj = {
                key: "value"
            };
            const array = ["A", "B", obj];
            console.log(array.indexOf({
                key: "value"
            })); // => -1
            // リテラルは新しいオブジェクトを作るため、異なるオブジェクトだと判定される
            console.log(obj === {
                key: "value"
            }); // => false
            // 等価のオブジェクトを検索してインデックスを返す
            console.log(array.indexOf(obj)); // => 2
            //要素の位置を取得する際の検索対象がオブジェクトの場合、
            //完全一位のオブジェクトでないと検索できないため、使いづらい問題がある。
        }

        //オブジェクトの要素位置の検索
        {
            //解決するためにfindIndex

            // colorプロパティを持つオブジェクトの配列
            const colors = [
                {
                    "color": "red"
                },
                {
                    "color": "green"
                },
                {
                    "color": "blue"
                }
            ];
            // `color`プロパティが"blue"のオブジェクトのインデックスを取得
            const indexOfBlue = colors.findIndex((obj) => {
                return obj.color === "blue";
            });
            console.log(indexOfBlue); // => 2
            console.log(colors[indexOfBlue]); // => { "color": "blue" }
        }





    }

    //#要素自体の取得
    {
        /*
        
        */
        //特定要素の取得
        {
            /*
            特定要素の取得はindexを取得してから要素を取り出す方法を取れば可能だが、
            直接取得することも可能
            */

            //Array#find ES2015
            const colors = [
                {
                    "color": "red"
                },
                {
                    "color": "green"
                },
                {
                    "color": "blue"
                }
            ];


            const blueColor = colors.find(obj => obj.color === "blue");
            console.log(blueColor); //要素が存在しない場合はundefinedが返却。


        }
        //指定範囲の配列の取得
        {
            /*
            第二引数が省略できるArray#slice
            ・省略した場合、最後の要素までを範囲とする。
            ・indexは0始まり
            ・引数のindexを含めた範囲を返却
            */

            const array = ["A", "B", "C", "D", "E"];
            // インデックス1から4の範囲を取り出す
            console.log(array.slice(1, 4)); // => ["B", "C", "D"]
            // 第二引数を省略した場合は、第一引数から末尾の要素までを取り出す
            console.log(array.slice(1)); // => ["B", "C", "D", "E"]
            // マイナスを指定すると後ろからの数えた位置となる
            console.log(array.slice(-1)); // => ["E"]
            // 第一引数 > 第二引数の場合、常に空配列を返す
            console.log(array.slice(4, 1)); // => []
        }
    }

    //#要素が含まれるかの真偽値の取得
    {
        //indexOfを使用した冗長なコード
        {
            const array = ["Java", "JavaScript", "Ruby"];
            // `indexOf`メソッドは含まれていないときのみ`-1`を返すことを利用
            const indexOfJS = array.indexOf("JavaScript");
            if (indexOfJS !== -1) {
                console.log("配列にJavaScriptが含まれている");
                // ... いろいろな処理 ...
                // `indexOfJS`は、含まれているのかの判定以外には利用してない
            }
        }


        //簡潔なコード
        {
            //Array#includes since ES2016
            /*
            プリミティブな値の検索に用いる。
             */
            const array = ["Java", "JavaScript", "Ruby"];
            // `includes`は含まれているなら`true`を返す
            if (array.includes("JavaScript")) {
                console.log("配列にJavaScriptが含まれている");
            }

            //Array#some since ES2015
            /*
            オブジェクトの検索に用いる。
            https://garafu.blogspot.com/2016/06/ecmascript5.html#array-some
             */

            const colors = [
                {
                    "color": "red"
                },
                {
                    "color": "green"
                },
                {
                    "color": "blue"
                }
            ];


            // `color`プロパティが"blue"のオブジェクトがあるかどうか
            const isIncludedBlueColor = colors.some((obj) => {
                return obj.color === "blue";
            });
            console.log(isIncludedBlueColor); // => true
        }
    }
}


//追加と削除
{
    const array = ["A", "B", "C"];
    //末尾に追加
    {
        array.push("D");
    }
    //末尾の要素を削除し、末尾の要素を返却。
    {
        const tail = array.pop();
        console.log(tail);
    }
    //先頭に追加
    {
        array.unshift("z");
    }
    //先頭の要素を削除し、先頭の要素を返却。
    {
        const top = array.shift();
        console.log(top);
    }

}

//配列の結合
{
    const array = ["A", "B", "C"];
    //配列の結合
    const newArray = array.concat(["D", "E"]);
    console.log(newArray); // => ["A", "B", "C", "D", "E"]
    //要素の追加
    const newArray2 = newArray.concat("新要素");
    console.log(newArray2);
}

//配列の展開による配列の結合
{
    const array = ["A", "B", "C"];
    // Spread構文を使った場合1
    const newArray = ["X", "Y", "Z", ...array]; //...Spread構文により配列を展開して結合している。
    console.log(newArray); // => ["X", "Y", "Z", "A", "B", "C"]

    const newArray2 = ["X", ...array, "Z"]; //Spread構文の場合、結合位置を問わない。
    console.log(newArray2); // => ["X", "A", "B", "C", "Z"]


}

//配列のフラット化
{
    /*
    Array#flat ES2019 
    多次元配列をフラットな配列に変換
    ・引数で階層を指定
    ・Infinityを指定すると必ず1次元の配列を返却する。
    ・1次元配列に使用した場合、新しい1次元の配列を返却する。
     */
    {
        const array = [[["A"], "B"], "C"];
        // 引数なしは 1 を指定した場合と同じ
        console.log(array.flat()); // => [["A"], "B", "C"]
        console.log(array.flat(1)); // => [["A"], "B", "C"]
        console.log(array.flat(2)); // => ["A", "B", "C"]
        // すべてをフラット化するには Inifinity を渡す
        console.log(array.flat(Infinity)); // => ["A", "B", "C"]

        const arrayD1 = [1, 2, 3];
        console.log(arrayD1.flat());

    }
}


//配列から要素を削除
{
    /*
    Array#splice splice:接合する
    
    ・指定した数だけ要素を削除し、必要な場合は、要素を追加可能。
    ・削除した要素を自動で詰める。
    ・配列の任意のインデックスを削除可能。
    
    
    const array = [];
    
    array.splice(インデックス,削除する要素数);
    または、
    array.splice(インデックス,削除する要素数,...追加する要素);
    
    */


    const array = ["a", "b", "c", "d"];

    //要素の削除 cを削除。
    {
        array.splice(2, 1);
        console.log(array); //=>["a", "b", "d"]
    }

    //要素を削除し、要素を追加。
    {
        array.splice(1, 1, "b", "C");
        console.log(array); //=>["a", "b", "C", "d"]
    }

    //削除する要素数を指定せず削除
    {
        array.splice(1);
        //index 1 以降が削除。
        console.log(array); //=>["a"]
    }
    //すべての要素を削除する
    {
        array.splice(0, array.length);
        console.log(array);
    }

    //undeifinedも接合される。

}

//配列の要素数を切り詰める方法
{
    /*
    配列の要素を削除する方法にspliceを提示したが、
    末尾の要素を削除する場合や要素を空にする場合は、
    lengthプロパティの値を変更するだけでも可能。
     */


    //末尾を一つ削除
    {
        const array = [1, 2, 3, 4, 5];
        array.length = array.length - 1;
        console.log(array);
    }

    //末尾から2つ削除
    {
        const array = [1, 2, 3, 4, 5];
        array.length = array.length - 2;
        console.log(array);
    }

    //要素をすべて削除
    {
        const array = [1, 2, 3, 4, 5];
        array.length = 0;
        console.log(array);
    }
}

//新規の配列を代入し空にする。
{
    /*
    再代入処理になるため、let キーワードを使用する
    */

    let array = [1, 2, 3];
    array = [];
    console.log(array);

}
