/*標準ライブラリMap*/

/*
Since ES2015
連想配列のこと。
*/

//初期化
{
    const map = new Map();
    console.log(map.size);
}

//初期化2
{
    const map = new Map([[1, "one"], [2, "two"], [3, "three"]]);
    console.log(map.size);
}

//要素の追加・取り出し。
{
    const map = new Map();
    //要素の追加
    map.set("key", "value");
    //サイズはプロパティ
    console.log(map.size);
    //値の取得
    console.log(map.get("key"));
    //値の更新
    map.set("key", "value2");
    console.log(map.get("key"));
    //キーの存在確認
    console.log(map.has("key")); //=>true
    console.log(map.has("MyKey")); //=>false

    //エントリーの削除
    map.set("key1", "V1");
    map.set("key2", "V2");
    map.delete("key1")
    console.log(map);
    //すべてのエントリーを削除
    map.clear();
    console.log(map.size);
}

//反復処理
{
    //forEach
    {
        const map = new Map([[1, "one"], [2, "two"], [3, "three"]]);
        const entries = [];
        map.forEach((key, value) => {
            console.log(key + "=" + value);
            entries.push(key + "=" + value);
        });

        console.log(entries);
    }


    //iteratable オブジェクトの反復 for of 
    {
        const map = new Map([[1, "one"], [2, "two"], [3, "three"]]);

        //arrayへの変換1
        {
            const keys = []
            //or map.valuesでkeyの集合またはvalueの集合をiteratable objectとして取得できる。
            for (key of map.keys()) {
                keys.push(key);
            }
            console.log(keys);
        }

        //arrayへの変換2
        {
            const keys = Array.from(map.keys());
            console.log(keys);

        }
        //keys.forEach((key) => console.log(key));
        //iteratableオブジェクトはnext()を持ち、返却は、イテレータリザルトというオブジェクトを持つオブジェクト。
        /*
        foreah などの処理は実装されていないため。使用したい場合は、for of を使ってArrayオブジェクトを作成する。
        */



        //entries
        {
            const map = new Map([["key1", "value1"], ["key2", "value2"]]);
            const entries = [];
            for (const [key, value] of map.entries()) {
                entries.push(`${key}:${value}`);
            }
            console.log(entries); // => ["key1:value1","key2:value2"]
        }



        //Map
        {
            const map = new Map([["key1", "value1"], ["key2", "value2"]]);
            const results = [];
            for (const [key, value] of map) {
                results.push(`${key}:${value}`);
            }
            console.log(results); // => ["key1:value1","key2:value2"]
        }

    }




}

//WeakMapという参照の弱いMapも存在する。
//オブジェクトに格納されたKey、valueがどこからも参照されていない場合に
//ガーベージコレクションによるメモリ解放の対象に選ばれる。
//また、WeakMapはIteratableではない。
//keysやsizeもない。
