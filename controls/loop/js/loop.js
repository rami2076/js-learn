//while系
{
    //while文
    let i = 0;
    while ( /*条件式*/ i < 5) {
        //処理する文;
        console.log(i);
        i++;
    }



    //do-while文
    do {
        //必ず一回ブロック内の処理が実行される。
        //後置き条件

        //実行する文
        console.log(i);
        i++;
    } while (i < 5);
}

//for系
{
    //for文
    let total = 0;
    for (i = 0; i < 5; i++) {
        total += (i + 1);
    }
    console.log(total);

    //配列を利用したfor文
    function sum(numbers) {
        let total = 0;
        for (i = 0; i < numbers.length; i++) {
            total += numbers[i];
        }
        return total;
    }

    console.log(sum([1, 2, 3, 4, 5]));
}



//foreach
{
    /*
    配列は、高階関数であるforeachメソッドを持っている。
    それを利用した処理を記述できる。
    */
    const array = ["one", "two", "three"];
    array.forEach(value => console.log(value));


    //sumを実装する。
    function sum(...number) {
        let total = 0;
        number.forEach(num => total += num);
        return total;
    }
    console.log(sum(1, 2, 3, 4, 5));
}

//break文
{
    /*break文は繰り返しの{}の内階層が同じ{}を脱出することができる文*/
    //記述割愛
}

//配列の機能　some
{
    const array = [1, 3, 5];
    const isEven = num => (num % 2) === 0;
    const result = array.some(num => isEven(num));
    console.log(result);
}

//continue文
{
    /*while do-while for 文のブロック内で使用できる文。*/
    /*
    continue文が記述されたブロック同じ階層のloopを繰り返す際に使用する。
    */
}

//配列の機能
{

    const array = [1, 2, 3, 4, 5];
    // arrayの処理では、機能により渡される値は、現在の値だけでなく、indexも渡すことができる。
    //また、配列を渡す必要がある様子。
    //細かい流れは不明だが、一旦OK。次に進む。
    const filteredArray = array.filter((currentValue, index, array) => {
        // テストをパスするならtrue、そうでないならfalseを返す
        console.log("currentValue:" + currentValue);
        console.log("index:" + index);
        console.log(currentValue === 1);
        return (currentValue === 1);
    });
    console.log(filteredArray.length);


    //関数オブジェクトを用いて必要な引数文のみを使用した記述
    function isEven(num) {
        return num % 2 === 0;
    }
    console.log(array.filter(isEven));
    console.log(array.filter(value => isEven(value)));
    //無名関数を使用した記述
    console.log(array.filter(value => value % 2 === 0));
}


//for ...in文
{

    /*
    オブジェクトのプロパティに対して順不同で逐次処理を行う。
    連想配列のように使うことが可能。
    */
    const オブジェクト = {
        a: 1,
        b: 2,
        c: 3
    };
    for (const プロパティ in オブジェクト) {
        //実行する文
        const value = オブジェクト[プロパティ];
        console.log(`key:${プロパティ},value:${オブジェクト[プロパティ]}`);
    }

    //連想配列と同じようにプロパティの追加もできる。
    オブジェクト.d = 4;
    for (const プロパティ in オブジェクト) {
        //ブロック内の変数のスコープはブロック内のみに限る
        const value = オブジェクト[プロパティ];
        console.log(`key:${プロパティ},value:${オブジェクト[プロパティ]}`);
    }

    //仕様
    //上記の記述の場合、objectが子オブジェクトで、何らかの親オブジェクトを継承している場合、
    //自分自身のオブジェクトのプロパティのみならず、親のオブジェクトのプロパティもループ対象のプロパティとなる。
    //親オブジェクトのプロパティが存在しない場合はこれの限りでない。
    //親オブジェクトが複数存在する場合はrootの親オブジェクトまで参照し、ループ対象のプロパティとなる。

    //for ...in
    //処理対象のオブジェクトのプロパティに対してのみをループ対象としたい場合、Object#keys,Object#values,Object#entriesメソッドを利用する。


    //オブジェクトの要素をキーの配列として受取処理を行う際は、forEachを使用する。
    //for ...in文 は配列に対して上手く機能しない。
    Object.keys(オブジェクト).forEach(
        key => {
            const value = オブジェクト[key];
            console.log("this is " + key);
            console.log(value);
        });




    //下記はうまく動作しない。
    //あくまでオブジェクト内のプロパティを列挙する際に使用する。
    for (キー in Object.keys(オブジェクト)) {
        const value = オブジェクト[キー];
        console.log("n");
        //インデックスが表示される。
        console.log("キー=" + キー);
        //インデックス対応する値が表示される。
        console.log("value is " + value);
    };
}

//for...of文
{

    /*
    iterableオブジェクト
    JavaScriptでは、Symbol.iteratorという特別な名前のメソッドを実装したオブジェクトをiterableと呼ぶ。
    iterableオブジェクトは、for...ofで反復処理が可能。
     */


    /*
    for...of文
    JavaScriptでは、Symbol.iteratorという特別な名前のメソッドを実装したオブジェクトをiterableと呼ぶ。
    for...in文は、indexを取得し逐次処理を行う。
    一方、for...of文は、配列の値を取得し逐次処理を行う。
     */

    //配列を使用した例。
    const array = ["one", "two", "three"];
    for (variable of array) {
        //要素の抽出ができることを確認
        console.log(variable);
    }


    const obj = {
        a: 1,
        b: 2,
        c: 3

    }

    //Object#keysでキーの配列を取得しキー配列に対してfor...of文を使用できていることを確認
    for (key of Object.keys(obj)) {
        console.log(`key:${key} , value:${obj[key]}`);
    }
    //Object#valuesでバリューの配列を取得しバリュー配列に対してfor...of文を使用できていることを確認
    for (value of Object.values(obj)) {
        console.log(`value:${value}`);
    }
    //Objects#entriesでオブジェクトのエントリをを取得し、取得したエントリーの配列に対して、for...of文を使用できていることを確認
    for (const [key, value] of Object.entries(obj)) {
        console.log(`key:${key},value:${value}`);
    }


    //Stringオブジェクトを一文字ずつ逐次処理
    const str = "吉野家";
    for (const value of str) {
        console.log(value);
    }

    //Symbol#iteratorが実装されているオブジェクトはほかにも存在する。
    //TypedArray,Map,List,Dom NodeList　などそれらはfor...ofが使用できる。
}


//letではなく、const
{
    /*
    for文の課題
    配列(コレクション)の内容の集約をする際、
    for文を使用するとletキーワードを使用したmutableな変数を上書きする形で値を保持する他方法がない。
    しかし、mutableな値は意図しない値の更新の可能性を考慮してコードのリーディングを行う必要があるため、
    保守やメンテナンスのコストを増やす。またバグの原因にもなる。
    */


    /*
    解決法
    上記の課題は、reduceメソッドを使用することで回避することができる。
    */

    //下記のように記述する。※reduceの第一引数の関数は他にあと二つ存在するがここでは詳細を割愛。
    //function sum(numbers) {return numbers.reduce((前回の値, 現在の値) => { return 次の値を返す処理 }, 初期値);}
    //sum([1, 2, 3, 4]);

    //例 ラムダを利用した記述。
    function sum(numbers) {
        return numbers.reduce((total, num) => total + num, 0);
    }
    console.log(sum([1, 2, 3, 4, 5]));


    //例
    function sum2(numbers) {
        return numbers.reduce((total, num) => {
            return total + num
        }, 0);
    }
    console.log(sum2([1, 2, 3, 4, 5]));
}
