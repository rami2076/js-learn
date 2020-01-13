/*
Setオブジェクトは重複なしを保障した集合。
要素はindexを持たずindexによるアクセスができない。
順序は要素の挿入順序を保障する。
*/

//
{
    /*初期化*/
    const set = new Set();

    //要素数
    console.log(set.size); //=>0


    //追加
    set.add("a");
    set.add("b");
    set.add("a");
    //重複は無視されるのでサイズは2になる。
    console.log(set.size); //=>2
    console.log(set)




    //存在確認
    console.log(set.has("a"));
    console.log(set.has("c"));

    //反復　foreachが使用可能。(要素を追加した順で反復)
    set.forEach((e) => console.log(e));


    //削除
    set.delete("a");

    //全要素削除
    set.clear();

    //Setコレクションからiteratableオブジェクトの生成
    /*
    Setはkeys,values,entriesを持つ。
    keysはvakuesと同じ。
    valuesは、挿入順序の要素のiteratableオブジェクトを返却する。
    entriesはkeyとvalue両方同じオブジェクトのエントリーのiteratableを返却する。 
    */

}



/*WeakSet*/
/*
Mapと同じく弱参照の要素がGCにより削除されるSetもある。

*/
