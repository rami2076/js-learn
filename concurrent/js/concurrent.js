// 指定した`timeout`ミリ秒経過するまで同期的にブロックする関数

//非同期処理の代表例
//delayミリ秒後にコールバック関数を呼び出す処理。
//setTimeout(コールバック関数,delay);
{
    function blockTime(timeout) {
        const startTime = Date.now();
        while (true) {
            const diffTime = Date.now() - startTime;
            if (diffTime >= timeout) {
                return; // 指定時間経過したら関数の実行を終了
            }
        }
    }

    console.log("1. setTimeoutのコールバック関数を10ミリ秒後に実行します");
    setTimeout(() => {
        console.log("3. ブロックする処理を開始します");
        blockTime(1000); // 他の処理を1秒間ブロックする
        console.log("4. ブロックする処理が完了しました");
    }, 10);
    // ブロックする処理は非同期なタイミングで呼び出されるので、次の行が先に実行される
    console.log("2. 同期的な処理を実行します");
}

//非同期処理もメインスレッドで実行している。
{
    // 指定した`timeout`ミリ秒経過するまで同期的にブロックする関数
    function blockTime(timeout) {
        const startTime = Date.now();
        while (true) {
            const diffTime = Date.now() - startTime;
            if (diffTime >= timeout) {
                return; // 指定時間経過したら関数の実行を終了
            }
        }
    }

    const startTime = Date.now();
    // 10ミリ秒後にコールバック関数を呼び出すようにタイマーに登録する
    setTimeout(() => {
        const endTime = Date.now();
        console.log(`非同期処理のコールバックが呼ばれるまで${endTime - startTime}ミリ秒かかりました`);
    }, 10);
    console.log("ブロックする処理を開始します");
    blockTime(1000); // 1秒間処理をブロックする
    console.log("ブロックする処理が完了しました");


    /*
    JavaScriptの非同期処理は非同期なタイミングで実行される処理。
    基本的には、非同期処理もメインスレッドで実行される。
    */
}

//非同期処理と例外 非同期の例外をキャッチできない問題
{
    try {
        setTimeout(() => {
            // throw new Error("非同期的なエラー");
        }, 10);
    } catch (error) {
        // 非同期エラーはキャッチできないため、この行は実行されません
    }
    console.log("この行は実行されます");


}

//非同期の例外をキャッチする方法
{
    // 非同期処理の外
    setTimeout(() => {
        // 非同期処理の中
        try {
            throw new Error("エラー");
        } catch (error) {
            console.log("エラーをキャッチできる");
        }
    }, 10);
    console.log("この行は実行されます");


    //非同期処理の外側に例外が伝達できないことが問題。
}

//非同期の例外を外側に伝える方法1
{
    //エラーファーストコールバック
    /*
    ES2015以前は非同期処理中に発生した例外を扱う仕様はなかった。
    そこで、エラーファーストコールバックというルールが広く使われていた。
    */

    /*
    ・処理が失敗した場合は、コールバック関数の1番目の引数にエラーオブジェクトを渡して呼び出す
    ・処理が成功した場合は、コールバック関数の1番目の引数にはnullを渡し、2番目以降の引数に成功時の結果を渡して呼び出す
    */




    /**
     * 1000ミリ秒未満のランダムなタイミングでレスポンスを擬似的にデータ取得する関数
     * 指定した`path`にデータがある場合は`callback(null, レスポンス)`を呼ぶ
     * 指定した`path`にデータがない場合は`callback(エラー)`を呼ぶ
     */
    function dummyFetch(path, callback) {
        setTimeout(() => {
            // /success から始まるパスにはリソースがあるという設定
            if (path.startsWith("/success")) {
                callback(null, {
                    body: `Response body of ${path}`
                });
            } else {
                callback(new Error("NOT FOUND"));
            }
        }, 10 * Math.random());
    }
    // /success/data にリソースが存在するので、`response`にはデータが入る
    dummyFetch("/success/data", (error, response) => {
        if (error) { //truthyな値であれば実行。
            // この行は実行されません
        } else { //falsyな値であれば実行
            console.log(response); // => { body: "Response body of /success/data" }
        }
    });
    // /failure/data にリソースは存在しないので、`error`にはエラーオブジェクトが入る
    dummyFetch("/failure/data", (error, response) => {
        if (error) {
            console.log(error.message); // => "NOT FOUND"
        } else {
            // この行は実行されません
        }
    });
}

//非同期処理の例外処理の別の記述
{
    /**
     * リソースの取得に成功した場合は`successCallback(レスポンス)`を呼び出す
     * リソースの取得に失敗した場合は`failureCallback(エラー)`を呼び出す
     */
    function dummyFetch(path, successCallback, failureCallback) {
        setTimeout(() => {
            if (path.startsWith("/success")) {
                successCallback({
                    body: `Response body of ${path}`
                });
            } else {
                failureCallback(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    }

    //異常時と正常時の処理別々で渡す。
}


//Since ES2015 Promise 
{
    //ES2015以前
    {
        // asyncTask関数はエラーファーストコールバックを受け取る
        //    asyncTask((error, result) => {
        //        if (error) {
        //            // 非同期処理が失敗したときの処理
        //        } else {
        //            // 非同期処理が成功したときの処理
        //        }
        //    });
    }
    //ES2015
    {
        // asyncPromiseTask関数はPromiseインスタンスを返す
        //   asyncPromiseTask().then(() => {
        // 非同期処理が成功したときの処理
        //     }).catch(() => {
        // 非同期処理が失敗したときの処理
        //    });
    }

}


//プロミスの作り方
{
    // `Promise`インスタンスを作成
    const promise = new Promise((resolve, reject) => {
        // 非同期の処理が成功したときはresolve()を呼ぶ
        // 非同期の処理が失敗したときにはreject()を呼ぶ
    });
    const onFulfilled = () => {
        console.log("resolveされたときに呼ばれる");
    };
    const onRejected = () => {
        console.log("rejectされたときに呼ばれる");
    };
    // `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
    promise.then(onFulfilled, onRejected);
}

//プロミスの使い方
{
    /**
     * 1000ミリ秒未満のランダムなタイミングでレスポンスを擬似的にデータ取得する関数
     * 指定した`path`にデータがある場合、成功として**Resolved**状態のPromiseオブジェクトを返す
     * 指定した`path`にデータがない場合、失敗として**Rejected**状態のPromiseオブジェクトを返す
     */
    function dummyFetch(path) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (path.startsWith("/success")) {
                    resolve({
                        body: `Response body of ${path}`
                    });
                } else {
                    reject(new Error("NOT FOUND"));
                }
            }, 1000 * Math.random());
        });
    }
    // `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
    // /success/data のリソースは存在するので成功しonFulfilledが呼ばれる
    dummyFetch("/success/data").then(function onFulfilled(response) {
        console.log(response); // => { body: "Response body of /success/data" }
    }, function onRejected(error) {
        // この行は実行されません
    });
    // /failure/data のリソースは存在しないのでonRejectedが呼ばれる
    dummyFetch("/failure/data").then(function onFulfilled(response) {
        // この行は実行されません
    }, function onRejected(error) {
        console.log(error); // Error: "NOT FOUND"
    });
}

//第二引数、失敗時の挙動の省略
{
    function delay(timeoutMs) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeoutMs);
        });
    }
    // `then`メソッドで成功時のコールバック関数だけを登録
    delay(10).then(() => {
        console.log("10ミリ秒後に呼ばれる");
    });
}

//第一引数成功時の挙動の省略
{
    function errorPromise(message) {
        return new Promise((resolve, reject) => {
            reject(new Error(message));
        });
    }
    // 非推奨: `then`メソッドで失敗時のコールバック関数だけを登録
    errorPromise("thenでエラーハンドリング").then(undefined, (error) => {
        console.log(error.message); // => "thenでエラーハンドリング"
    });
    // 推奨: `catch`メソッドで失敗時のコールバック関数を登録
    errorPromise("catchでエラーハンドリング").catch(error => {
        console.log(error.message); // => "catchでエラーハンドリング"
    });
}

//try...catch構文の省略
{
    function throwPromise() {
        return new Promise((resolve, reject) => {
            // Promiseコンストラクタの中で例外は自動的にキャッチされrejectを呼ぶ
            throw new Error("例外が発生");
            // 例外が発生すると、これ以降のコンストラクタの処理は実行されません
        });
    }

    throwPromise().catch(error => {
        console.log(error.message); // => "例外が発生"
    });
}


//Promiseの状態
{
    //以下3つの状態がある。
    /*
    #Fulfilled  成功  onFulfilledが呼ばれる
    #Rejected   失敗　onRejectedが呼ばれる
    #Pending    初期値
    */
    //上記は、ECMAScriptの仕様として決められている内部的な状態。

    //Promiseの状態について1
    /*
    上記の状態はPromiseから取り出すことはできない。
    Promiseの理解のために必要な知識。
    */

    //Promiseの状態について
    /*
    FulfilledとRejectedの状態であることをSettledと呼ぶ。
    Settledは不変や、固定したなどの意味の言葉。
    作成時のPendingから一度だけSettledな状態に変化する。
    それ以降は別の状態に変化しない。
     */

    //Promiseの状態がSettledであることの検証
    const promise = new Promise((resolve, reject) => {
        // 非同期でresolveする
        setTimeout(() => {
            console.log("Before:");
            resolve();
            console.log("After:1");
            // 既にresolveされているため無視される
            reject(new Error("エラー"));
            console.log("After:2");
            resolve();
        }, 16);
    });
    promise.then(() => {
        console.log("Fulfilledとなった");
    }, (error) => {
        // この行は呼び出されない
        console.log("この行の呼び出しはあるか？");
    });

    /*
    Promiseオブジェクトの状態は、onFulfilledまたは、onRejectedが呼ばれた時に、
    Settledになる。そしてPromiseのonFulfilledはonRejected一度だけしか呼べないため、
    一度だけ状態が変化するように見える。
    */



    /*
    promiseオブジェクトに登録したresolveとrejectの関数オブジェクトは、
    一度だけ呼び出される。
    */

}


//Fulfilledな状態のPromiseインスタンスの活用。
{
    /*
    プロミスオブジェクトは、固定された状態のオブジェクトを生成することが可能。
    まず、Fulfilledな状態のPromiseインスタンスの活用を確認する。
    */

}


//FulFilled Promiseの生成/実行
{

    //生成
    {
        const fulFilledPromise = Promise.resolve();
    }

    //生成に関する注釈
    {
        /*
        Promise.resolve()は糖衣構文。
        内部では、下記のような処理がされている。
        */
        //なにもしないresolveを呼ぶ。
        const fulFilledPromise = new Promise((resolve => resolve()));
    }

    //生成時に値を渡す。
    {
        //42を次の処理に渡すプロミスを設定
        const fulFilledPromise = Promise.resolve(42);
        fulFilledPromise.then(value => console.log(value));
    }
}


//Rejectedな状態のPromiseインスタンスの活用。
{
    /*
    プロミスオブジェクトは、固定された状態のオブジェクトを生成することが可能。
    次に、Rejectedな状態のPromiseインスタンスの活用を確認する。
    */

}

//Rejected Promiseの生成/実行
{

    //下記も同様に糖衣構文。
    {
        const rejectedPromise = Promise.reject(new Error('RejectedなPromiseインスタンスの作成'));
    }

    //実態は下記のコードとなる。
    {
        const rejectedPromise = new Promise((resolve, reject) => {
            reject(Error('ejectedなPromiseインスタンスの作成'));
        });
    }

    //呼び出し
    {
        Promise.reject('Rejected Promise インスタンス').catch(() => console.log('2.Rejectedなインスタンスが実行された。'));

        console.log("1.同期的な処理が実行された。")
    }


    /*
    Promise.reject
    Promise.resole
    上記のメソッドは短くかけるため、テストコードで使用される場合が多い。
    
    */

}



//Promiseチェーンについて。
{
    /*
    Promiseインスタンスは複数の非同期処理を順番に組み合わせて実行できる。
    仕組みは、Promise#then または Promise#catchの実行後は常に新規Promiseインスタンスを
    返却する仕様があるからです。
    上記の仕様をうまく使用すると、Promise#thenの後にまたPromise#thenでメソッドを繋げることで
    非同期処理を順番に組み合わせることが可能となる。
    メソッドとつなげる処理のことをメソッドチェーンと呼ぶ。
    PromiseオブジェクトのメソッドチェーンのことをここではPromiseチェーンと呼ぶ。
    */
}


//Promiseをthenでつなげる。
{
    Promise.resolve().
    then(() => console.log("kokode" + 1)).
    then(() => console.log("kokode" + 2));
}


//Promise#resolve/#rejectで生成されたインスタンスが新規インスタンスであることの確認
{
    const firstPromise = Promise.resolve();
    const secondPromise = firstPromise.then(() => console.log("one:" + 1));
    const thirdPromise = secondPromise.then(() => console.log("two:" + 2));

    //下記が評価されてからthenが実行されている。不思議。
    console.log("firstPromise === secondPromise:" + (firstPromise === secondPromise));
    console.log("secondPromise === thirdPromise:" + (secondPromise === thirdPromise));
}



//Promiseの具体的な使用例
{

    // ランダムでFulfilledまたはRejectedの`Promise`インスタンスを返す関数
    function asyncTask() {
        return Math.random() > 0.5 ?
            Promise.resolve("成功") :
            Promise.reject(new Error("失敗"));
    }

    // asyncTask関数は新しい`Promise`インスタンスを返す
    asyncTask()
        // thenメソッドは新しい`Promise`インスタンスを返す
        .then(function onFulfilled(value) {
            console.log(value); // => "成功"
        })
        // catchメソッドは新しい`Promise`インスタンスを返す
        .catch(function onRejected(error) {
            console.log(error.message); // => "失敗"
        });




    /*
    プロミスの結果が失敗だった場合、後続の中で一番近いcatchまで処理がスキップされる。
    例外処理はその仕組みを利用して行う。
    */


    // RejectedなPromiseは次の失敗時の処理までスキップする
    const rejectedPromise = Promise.reject(new Error("失敗"));
    rejectedPromise.then(() => {
        console.log("このthenのコールバック関数は呼び出されません");
    }).then(() => {
        console.log("このthenのコールバック関数は呼び出されません");
    }).catch(error => {
        console.log(error.message); // => "失敗"
    });
}



//catch後のPromiseインスタンスはFulfilled状態のPromise
{


    //失敗をキャッチしてキャッチした処理が成功した場合成功状態のプロミスが生成される。
    Promise.reject(new Error("エラー")).catch(error => {
        console.log(error); // Error: エラー
    }).then(() => {
        console.log("thenのコールバック関数が呼び出される");
    });


}


//Promiseチェーンで値を渡す。
{

    /*
    Promiseはコールバック関数で実行した処理の戻り値を引数として次のコールバック関数が受け取ることができる。
    
    
    
    */
    Promise.resolve(1).then((value) => {
        console.log(value); // => 1
        return value * 2;
    }).then(value => {
        console.log(value); // => 2
        return value * 2;
    }).then(value => {
        console.log(value); // => 4
        // 値を返さない場合は undefined を返すのと同じ
    }).then(value => {
        console.log(value); // => undefined
    });
}


//プロミスチェーンで値を返却を簡潔に記述する。
{
    Promise.resolve(1)
        .then((v) => v + 1)
        .then((v) => v * 2)
        .then(v => console.log("結果：" + v)); //=>4
}


//rejectedな状態の継続。
{
    /*
    エラーが発生しない場合、rejected promiseがcatchで処理された場合、
    fulfilledなpromiseとして扱われる。
    ただ、一度rejectedなpromiseが発生した場合それ以降のpromiseチェーンでは、
    rejectedなPromiseとして扱ってほしいという思いが発生する機会がよくあると思います。
    その場合は、catch内での処理でrejected promiseを発生させることで解決できる。
    すこし無理やりだけどこの方法でrejectedからのfulfilledへの復帰を阻止できる。
    以下コード
    */

    function main() {
        return Promise.reject(new Error("エラー"));
    }
    // mainはRejectedなPromiseを返す
    main().catch(error => {
        // asyncFunctionで発生したエラーのログを出力する
        console.log(error);
        // Promiseチェーンはそのままエラーを継続させる
        return Promise.reject(error);
    }).then(() => {
        // 前のcatchでRejectedなPromiseが返されたため、この行は実行されません
    }).catch(error => {
        //errorオブジェクトの受け渡しに成功している。
        console.log(error.message + "メインの処理が失敗した");
    });
}


//since ES2018 Promiseチェーンの最後に処理を記述。Promise#finally
{
    /*
    try-catch-finallyと同様の思考でpromiseを記述できるようになった。
    Promiseにfinnalyメソッドが追加された。
    これは状態に関係なく処理後必ず実行される。
    */
    // `promise`にはResolvedまたはRejectedなPromiseインスタンスがランダムで入る
    {
        const promise = Math.random() < 0.5 ? Promise.resolve() : Promise.reject();
        promise.then(() => {
            console.log("Promise#then");
        }).catch((error) => {
            console.log("Promise#catch");
        }).finally(() => {
            // 成功、失敗どちらの場合でも呼び出される
            console.log("Promise#finally");
        });
    }
    //この処理は、ES2018で導入され、IEではサポートされていない。


    {
        /*
        finallyもまたpromiseを返却する。
        返却されたPromiseはfulfilled Promise.
        */
        const promise = Math.random() < 0.5 ? Promise.resolve() : Promise.reject();
        promise.then(() => {
            console.log("Promise#then");
        }).catch((error) => {
            console.log("Promise#catch");
        }).finally(() => {
            // 成功、失敗どちらの場合でも呼び出される
            console.log("Promise#finally");
        }).then(() => console.log("After#finally.onThen"));
    }
}

//finnalyの実用例
{
    function dummyFetch(path) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (path.startsWith("/resource")) {
                    resolve({
                        body: `Response body of ${path}`
                    });
                } else {
                    reject(new Error("NOT FOUND"));
                }
            }, 1000 * Math.random());
        });
    }
    // リソースを取得中かどうかのフラグ
    let isLoading = true;
    dummyFetch("/resource/A").then(response => {
        console.log(response);
    }).catch(error => {
        console.error(error);
    }).finally(() => {
        isLoading = false;
        console.log("Promise#finally");
    });
}


//Promiseチェーンで逐次処理
{
    /*
    非同期処理を逐次処理のように行う。
    */

    function dummyFetch(path) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (path.startsWith("/resource")) {
                    resolve({
                        body: `Response body of ${path}`
                    });
                } else {
                    reject(new Error("NOT FOUND"));
                }
            }, 1000 * Math.random());
        });
    }

    const results = [];
    // Resource Aを取得する
    dummyFetch("/resource/A").then(response => {
        results.push(response.body);
        // Resource Bを取得する
        return dummyFetch("/resource/B");
    }).then(response => {
        results.push(response.body);
    }).then(() => {
        console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
    });
}

//論理積のようなPromise　All
{

    //Promise#Allはすべてのタスクが成功の場合にのみtrue(fulfilled)となり、一つでも失敗のタスクがあった場合は、false(rejected)なPromiseを返却する。

    // `timeoutMs`ミリ秒後にresolveする
    function delay(timeoutMs) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(timeoutMs);
            }, timeoutMs);
        });
    }
    const promise1 = delay(1);
    const promise2 = delay(2);
    const promise3 = delay(3);

    Promise.all([promise1, promise2, promise3]).then(function (values) {
        console.log(values); // => [1, 2, 3]
    });



    /*
    promise#Allは処理順序に保証がない。
    そのため、順序を持つ処理を行わない場合で処理速度が求められかつ、処理量が多い時に使用すること。
    */
}


//Promise#allの使用例2
{
    //リソースの取得順序保障がなくてもよい場合。
    //Promise#allで表現する。
    function dummyFetch(path) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (path.startsWith("/resource")) {
                    resolve({
                        body: `Responce body of ${path}`
                    });
                } else {
                    reject(new Errpr("NOT FOUND"));
                }
            }, 1000 * Math.random);
        });
    }


    const fetchedPromise = Promise.all([
        dummyFetch("/resource/ABC"),
        dummyFetch("/resource/BCD")
    ]);
    //Destructuringで配列要素を順次格納している。
    fetchedPromise.then(([one, two]) => {
        console.log(one.body);
        console.log(two.body);
    });
}


//Promise#allで一つでも失敗が会った場合
{
    function dummyFetch(path) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (path.startsWith("/resource")) {
                    resolve({
                        body: `Response body of ${path}`
                    });
                } else {
                    reject(new Error("Promise#all NOT FOUND"));
                }
            }, 1000 * Math.random());
        });
    }

    const fetchedPromise = Promise.all([
    dummyFetch("/resource/A"),
    dummyFetch("/not_found/B") // Bは存在しないため失敗する
]);
    fetchedPromise.then(([responseA, responseB]) => {
        // この行は実行されません
    }).catch(error => {
        console.error(error); // Error: NOT FOUND
    });



    //Promise#allはすべての処理が完了するまで処理を待つ。
}


//Promise#racce race:競争、急流、品種、種族=>競争の意味で使用する。
{

    // `timeoutMs`ミリ秒後にresolveする
    function delay(timeoutMs) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(timeoutMs);
            }, timeoutMs);
        });
    }
    // 一つでもresolveまたはrejectした時点で次の処理を呼び出す
    const racePromise = Promise.race([
    delay(1),
    delay(32),
    delay(64),
    delay(128)
    ]);
    racePromise.then(value => {
        // もっとも早く完了するのは1ミリ秒後
        console.log(value); // => 1
    });



    /*
    promise#raceのポイントは、
    一つのPromiseインスタンスの中でonRejectedメソッドまたはonResolvedメソッドが一度でも呼ばれると
    その後、メソッドが実行されることはないというPromiseの仕組みにある。
    
    Promise#raceが実行されたあと最初に処理を終えたPromiseが次のpromiseになる。
    おそらく内部的に何らかの方法で統合されたPromiseを扱っているためだと思われる。
    他に設定された関数は、その後しっかり実行されるが、登録されたメソッドは実行されないという仕組みになっている。
    また、初めに処理を終えた処理の結果が次のPromiseの状態を決定する。
    */

}


//Promise#raceの応用。
{

    /*
    Promiseを使用することでタイムアウトの制御を実装することができる。
    
    
    */


    // `timeoutMs`ミリ秒後にrejectする
    function timeout(timeoutMs) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`Timeout: ${timeoutMs}ミリ秒経過`));
            }, timeoutMs);
        });
    }

    function dummyFetch(path) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (path.startsWith("/resource")) {
                    resolve({
                        body: `Response body of ${path}`
                    });
                } else {
                    reject(new Error("NOT FOUND"));
                }
            }, 1000 * Math.random());
        });
    }
    // 500ミリ秒以内に取得できなければ失敗時の処理が呼ばれる
    Promise.race([
    dummyFetch("/resource/data"),
    timeout(500),
    ]).then(response => {
        console.log(response.body); // => "Response body of /resource/data"
    }).catch(error => {
        console.log(error.message); // => "Timeout: 500ミリ秒経過"
    });


    /*
    timeoutが先に完了すれば、body要素の取得処理は無視される。
    構文ではなく、メソッドでの利用になるため少し読みづらさが残っていた。
    */

}


//since ES2017 Async Function  IEは未対応。
{

    /*
    Promiseの読みづらさを解消するために構文レベルで非同期処理を扱えるように
    Async Functionが導入された。
    */

    {
        async function doAsync() {
            return "値";
        }
        // doAsync関数はPromiseを返す
        doAsync().then(value => {
            console.log(value); // => "値"
        });
    }

    /*
    キーワードasyncを付与した場合thenableな関数オブジェクトを定義できる仕組みが採用された。
    async function構文により読みやすさ、コードの簡潔さが向上。
    分かりやすく、簡単な記述で非同期処理を記述できるようになった。
    */


    //以下のようなPromiseオブジェクトで書いた場合と同じ意味となる。
    {
        // 通常の関数でPromiseインスタンスを返している
        function doAsync() {
            return Promise.resolve("値");
        }
        doAsync().then(value => {
            console.log(value); // => "値"
        });
    }

}


//Async Functionの定義
{

    /*
    AsyncFunctionは　定義時asyncを付けるだけでよい。
    */


    // 関数宣言のAsync Function版
    async function fn1() {}
    // 関数式のAsync Function版
    const fn2 = async function () {};
    // Arrow FunctionのAsync Function版
    const fn3 = async () => {};
    // メソッドの短縮記法のAsync Function版
    const obj = {
        async method() {}
    };


    //Async Functionは
    /*
    必ずPromiseを返却する。
    await式が利用できる。
    */
}

//Async FunctionがPromiseを返却しているか検証。
{

    /*
    Async Functionは値をreturnした場合、その返り値をもつFulfilledなPromiseを返す
    Async FunctionがPromiseをreturnした場合、その返り値のPromiseをそのまま返す
    Async Function内で例外が発生した場合は、そのエラーをもつRejectedなPromiseを返す
    */

    // 1. resolveFnは値を返している
    // 何もreturnしていない場合はundefinedを返したのと同じ扱いとなる
    async function resolveFn() {
        return "返り値";
    }
    resolveFn().then(value => {
        console.log(value); // => "返り値"
    });

    // 2. rejectFnはPromiseインスタンスを返している
    async function rejectFn() {
        return Promise.reject(new Error("エラーメッセージ"));
    }

    // rejectFnはRejectedなPromiseを返すのでcatchできる
    rejectFn().catch(error => {
        console.log(error.message); // => "エラーメッセージ"
    });

    // 3. exceptionFnは例外を投げている
    async function exceptionFn() {
        throw new Error("例外が発生しました");
        // 例外が発生したため、この行は実行されません
    }

    // Async Functionで例外が発生するとRejectedなPromiseが返される
    exceptionFn().catch(error => {
        console.log(error.message); // => "例外が発生しました"
    });

}


//How to use await?
{

    /*
    awaitは処理が非同期な関数を同期処理として扱うためのキーワード。
    await PromiseInstanceで実行できる。
    awaitを付けると戻り値がある場合、Promiseでラップされた値を取り出してくれる。
    */

    // async functionは必ずPromiseを返す
    async function doAsync() {
        // 非同期処理
    }
    async function asyncMain() {
        // doAsyncの非同期処理が完了するまでまつ
        await doAsync();
        // 次の行はdoAsyncの非同期処理が完了されるまで実行されない
        console.log("この行は非同期処理が完了後に実行される");
    }

    /*ポイント*/
    //awaitはasync function内でしか実行できない。
}



//Promise with return value with await
{
    //async/awaitを使用した場合
    {
        async function asyncMain() {
            const value = await Promise.resolve(98);
            console.log(value); //逐次処理のように記述することが可能。
        }
        asyncMain();
    }

    //async/awaitを使用しない場合
    {
        function asyncMain() {
            return Promise.resolve(103)
                .then((v) => console.log(v));
        }
        asyncMain();
    }
}


//async/await rejectedの場合
{
    async function doMain() {
        const value = await Promise.reject(new Error("ここで例外が取り出されるためこの行までしか評価されない。例外はスローされるが、Promiseに包まれる。"))
    }

    doMain().catch(error => console.log(error.message));
}


//async/await and try catch
{

    /*
    async function 内でawaitした場合、try-catch構文が利用できる。
    */

    async function doMain() {
        try {
            const value = await Promise.reject(new Error("async/await and try catch"));
        } catch (error) {
            console.log(error.message);

        }
    }


    //トライキャッチすることでasync functionがfulfilled　promiseとなっているため下記の処理は実行されない。
    doMain().catch(error => console.log("この処理は呼ばれない" + error.message));
}




//async/awaitはみやすいのか？
{
    //not use async/await
    {

        function dummyFetch(path) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (path.startsWith("/resource")) {
                        resolve({
                            body: `Response body of ${path}`
                        });
                    } else {
                        reject(new Error("NOT FOUND"));
                    }
                }, 1000 * Math.random());
            });
        }
        // リソースAとリソースBを順番に取得する
        function fetchAB() {
            const results = [];
            return dummyFetch("/resource/A").then(response => {
                results.push(response.body);
                return dummyFetch("/resource/B");
            }).then(response => {
                results.push(response.body);
                return results;
            });
        }
        // リソースを取得して出力する
        fetchAB().then((results) => {
            console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
        });
    }

    //use async/await
    {
        function dummyFetch(path) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (path.startsWith("/resource")) {
                        resolve({
                            body: `Response body of ${path}`
                        });
                    } else {
                        reject(new Error("NOT FOUND"));
                    }
                }, 1000 * Math.random());
            });
        }
        // リソースAとリソースBを順番に取得する
        async function fetchAB() {
            const results = [];
            const responseA = await dummyFetch("/resource/A");
            results.push(responseA.body);
            const responseB = await dummyFetch("/resource/B");
            results.push(responseB.body);
            return results;
        }
        // リソースを取得して出力する
        fetchAB().then((results) => {
            console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
        });
    }



    /*
    逐次的に記述できる分読みやすさが向上している。
    ネストとした処理が多い分、認知負荷が大きいことが改めてわかる。
    */
}
