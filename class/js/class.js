//クラス

//クラスの宣言
{
    {
        //宣言1
        class MyClass {
            constructor() {
                //インスタンス化する際に呼ばれる。
            }
        }
    }

    {
        //宣言2
        //クラスを値として定義
        const MyClass = class MyClass {
            constructor() {}
        };
    }

    //宣言3
    //匿名クラス
    const anonymouseClass = class {
        constructor() {}
    }

    //コンストラクタは省略可能
    //省略下場合もコンストラクタは存在する。
}

//クラスのインスタンス化
{

    //new 演算子を用いてクラスのインづったんぬ

    class MyClass {}
    // `MyClass`をインスタンス化する
    const myClass = new MyClass();
    // 毎回新しいインスタンス(オブジェクト)を作成する
    const myClassAnother = new MyClass();
    // それぞれのインスタンスは異なるオブジェクト
    console.log(myClass === myClassAnother); // => false
    // クラスのインスタンスかどうかは`instanceof`演算子で判定できる
    console.log(myClass instanceof MyClass); // => true
    console.log(myClassAnother instanceof MyClass); // => true
}


//プロトタイプメソッド
{

    /*
    プロトタイプメソッドとは、クラスの各インスタンスで共有されるメソッド
    */

    class Counter {
        constructor() {
            //各インスタンスがcountプロパティを持つ。
            this.count = 0;
        }

        increment() {
            //thisはCOunterのインスタンスを参照する。
            this.count++
        }

    }

    const counterA = new Counter();
    const counterB = new Counter();

    counterA.increment();
    //各インスタンスの状態は異なる。
    console.log(counterA.count);
    console.log(counterB.count);
    //プロパティの隠蔽はされない。
    counterA.count = 5;
    console.log(counterA.count);
    counterA.increment();
    console.log(counterA.count);


    //同じ関数オブジェクトを共有していることを確認
    console.log(counterA.increment === counterB.increment); //=>true
}


//クラスのインスタンスに対してメソッドを定義する。
{

    //クラスのインスタンスが各々メソッドを持つことが可能。
    //下記のように記述する。
    class Counter {
        constructor() {
            this.count = 0;
            this.increment = () => this.count++;
        }
    }
    const counterA = new Counter();
    const counterB = new Counter();

    counterA.increment();

    //別の状態を持つ。
    console.log(counterA.count);
    console.log(counterB.count);
    //異なる参照先を指す。
    console.log(counterA.increment === counterB.increment); //=>false


    //プロトタイプメソッドとは異なり、ArrowFunctionを利用できる。
    //ArrowFunctionのthisは静的にthisが決まるため必ずconstructorにおけるthisがとなる。
}

//クラスのおけるthis
{
    //各インスタンス毎にメソッドをarrow-funcionで定義した場合。
    {
        class ArrowClass {
            constructor() {
                // コンストラクタでの`this`は常にインスタンス
                this.method = () => {
                    // Arrow Functionにおける`this`は静的に決まる
                    // そのため`this`は常にインスタンスを参照する
                    return this;
                };
            }
        }
        const instance = new ArrowClass();
        const method = instance.method;
        // 呼び出し方法（ベースオブジェクト）に依存しないため、`this`がインスタンスを参照する
        console.log(method()); // => ArrowClassを指す。
    }

    //プロトタイプメソッドを定義した場合。
    {
        class PrototypeClass {
            method() {
                // `this`はベースオブジェクトを参照する
                return this;
            };
        }
        const instance = new PrototypeClass();
        const method = instance.method;
        // ベースオブジェクトはundefined
        console.log(method()); // => undefined
    }

    //thisの固定化を行うために、constructor内で記述するほうが良いと思われる。

}


//get set アクセッサプロパティ
{
    {
        class NumberWrapper {
            constructor(value) {
                this._value = value;
            }

            get value() { //getを付けるだけ
                console.log("getter");
                return this._value;
            }

            set value(newValue) { //セットを付けるだけ
                console.log("setter");
                this._value = newValue;
            }
        }
        const numberWrapper = new NumberWrapper(1);
        console.log(numberWrapper.value);
        numberWrapper.value = 42;
        console.log(numberWrapper.value);
    }

    /*
    外から読み書きしてほしくないプロパティをアンダーバー(_)で開始するのは習慣で、構文としての意味はない。
    
    */
}


//staticメソッド
{
    class ArrayWrapper {
        constructor(array = []) {
            this.array = array;
        }

        // rest parametersとして要素を受け付ける
        static of (...items) {
            return new ArrayWrapper(items);
        }

        get length() {
            return this.array.length;
        }
    }

    // 配列を引数として渡している
    const arrayWrapperA = new ArrayWrapper([1, 2, 3]);
    // 要素を引数として渡している
    const arrayWrapperB = ArrayWrapper.of(1, 2, 3);
    console.log(arrayWrapperA.length); // => 3
    console.log(arrayWrapperB.length); // => 3



    //静的メソッド、staticメソッドはインスタンス化せずに使用できるメソッド
}

//static メソッドのthis
{
    /*
    staticメソッドのthisはクラス自身を指すためnew this()と記述することも可能。
    */

    class ArrayWrapper {
        constructor(array = []) {
            this.array = array;
        }

        static of (...items) {
            // `this`は`ArrayWrapper`を参照する
            return new this(items);
        }

        get length() {
            return this.array.length;
        }
    }

    const arrayWrapper = ArrayWrapper.of(1, 2, 3);
    console.log(arrayWrapper.length); // => 3
}

//プロトタイプメソッドの定義とインスタンスオブジェクトに対するメソッドの定義
{
    /*
    どちらも定義可能。
    インスタンスオブジェクトに対するメソッド定義が優先される。
    */
    class ConflictClass {
        constructor() {
            // インスタンスオブジェクトに`method`を定義
            this.method = () => {
                console.log("インスタンスオブジェクトのメソッド");
            };
        }

        // クラスのプロトタイプメソッドとして`method`を定義
        method() {
            console.log("プロトタイプのメソッド");
        }
    }

    const conflict = new ConflictClass();
    conflict.method(); //=>インスタンスオブジェクトのメソッド

    //インスタンスオブジェクトから削除
    delete conflict.method;
    conflict.method(); //=>プロトタイプのメソッド

    //どちらも存在している。

    //上記の仕組みは、プロトタイプオブジェクトとプロトタイプチェーンという仕組むから成り立っている。

}


//二つのメソッドについて
{
    //どこに定義されるのか
    /*
    プロトタイプメソッドは、プロトタイプオブジェクトへ
    インスタンスオブジェクトのメソッドはインスタンスオブジェクトへ
    */
    class MyClass {
        method() {
            console.log("method!")
        }
    }

    //プロトタイプが存在することを確認
    console.log(typeof MyClass.prototype);
    // プロトタイプ内に定義されていることを確認
    console.log(MyClass.prototype);
    const myClass = new MyClass();


    //同じものを参照していることを確認
    console.log(myClass.method === MyClass.prototype.method); //=>true
    myClass.method(); //=>インスタンス化しなくて呼び出せる。
    MyClass.prototype.method(); //=>インスタンス化しなくても呼び出せる。
    //MyClass.method();//呼び出しできない。

}


//クラスのプロトタイプは各インスタンスの内部プロパティに保存される。
//インスタンスはクラスのプロトタイプを元に作成される。
//そのため自身のオブジェクトに定義されていないメソッドの呼び出しが可能となる。
{
    class MyClass {
        method() {
            console.log("プロトタイプのメソッド");
        }
    }
    const instance = new MyClass();
    // `instance`の`[[Prototype]]`内部プロパティは`MyClass.prototype`と一致する
    const MyClassPrototype = Object.getPrototypeOf(instance);
    console.log(MyClassPrototype === MyClass.prototype); // => true
}


{
    //インスタンスの元となるプロトタイプの読み取りはObject.getPrototypeOf(オブジェクト)で可能。
    //書き込みはObject.setPrototypeOf(オブジェクト, プロトタイプオブジェクト)で可能。
    //また内部プロパティの設定の変更は__proto__という特殊なアクセッサプロパティから可能。
    //不用意に扱うべきではない。
}

{
    //以下の順序でメソッドを探索する。
    /*
    instanceオブジェクト自身
    instanceオブジェクトの[[Prototype]]の参照先（プロトタイプオブジェクト）
    どこにもなかった場合はundefined
    */
    //上記の探索のつながりをプロトタイプチェーンと呼ぶ。
    class MyClass {
        method() {
            console.log("プロトタイプのメソッド");
        }
    }
    const instance = new MyClass();
    // インスタンスには`method`プロパティがないため、プロトタイプオブジェクトの`method`が参照される
    instance.method(); // "プロトタイプのメソッド"
    // `instance.method`の参照はプロトタイプオブジェクトの`method`と一致する
    const Prototype = Object.getPrototypeOf(instance);
    console.log(instance.method === Prototype.method); // => true
}



//継承
{
    //extends キーワードで継承できる。

    class Parent {}
    class Child extends Parent {}
    const instance = new Child();
    console.log(instance);

}

//super
{
    // 親クラス
    class Parent {
        constructor(...args) {
            console.log("Parentコンストラクタの処理", ...args);
        }
    }
    // Parentを継承したChildクラスの定義
    class Child extends Parent {
        constructor(...args) {
            // Parentのコンストラクタ処理を呼びだす
            super(...args);
            console.log("Childコンストラクタの処理", ...args);
        }
    }
    const child = new Child("引数1", "引数2");
    // "Parentコンストラクタの処理", "引数1", "引数2"
    // "Childコンストラクタの処理", "引数1", "引数2"



    //親クラスが何もしていない場合は親クラスのコンストラクタの呼び出しは不要。
    //親クラスのコンストラクタが何かしている場合は、必ず親のコンストラクタを呼び出す必要がある。
    //親クラスのコンストラクタを先に呼び出す必要がある。
}

//プロトタイプ継承
{
    //親クラスのプロトタイプメソッドもプロトタイプチェーンの仕組みで継承可能。
    class Parent {
        method() {
            console.log("Parent#method");
        }
    }
    // `Parent`を継承した`Child`を定義
    class Child extends Parent {
        // methodの定義はない
    }
    // `Child`のインスタンスは`Parent`のプロトタイプメソッドを継承している
    const instance = new Child();
    instance.method(); // "Parent#method"
}
//静的メソッドの継承
{
    class Parent {
        static hello() {
            return "Hello";
        }
    }
    class Child extends Parent {}
    console.log(Child.hello()); // => "Hello"
    //プロトタイプチェーンの仕組みがあるためオナアジ用に継承できる。
}

//superにより親クラスのメソッドの参照が可能。
{
    class Parent {
        method() {
            console.log("Parent#method");
        }
    }
    class Child extends Parent {
        method() {
            console.log("Child#method");
            // `this.method()`だと自分(`this`)のmethodを呼び出して無限ループする
            // そのため明示的に`super.method()`とParent#methodを呼びだす
            super.method();
        }
    }
    const child = new Child();
    child.method();
    // コンソールには次のように出力される
    // "Child#method"
    // "Parent#method"

}

//superにより親クラスの静的メソッドの呼び出しが可能。
{
    class Parent {
        static method() {
            console.log("Parent.method");
        }
    }
    class Child extends Parent {
        static method() {
            console.log("Child.method");
            // `super.method()`で`Parent.method`を呼びだす
            super.method();
        }
    }
    Child.method();
    // コンソールには次のように出力される
    // "Child.method"
    // "Parent.method"

}


//クラスの継承の確認
{
    class Parent {}
    class Child extends Parent {}

    const parent = new Parent();
    const child = new Child();
    // `Parent`のインスタンスは`Parent`のみを継承したインスタンス
    console.log(parent instanceof Parent); // => true
    console.log(parent instanceof Child); // => false
    // `Child`のインスタンスは`Child`と`Parent`を継承したインスタンス
    console.log(child instanceof Parent); // => true
    console.log(child instanceof Child); // => true

    //継承しているかはinstanceofで確認できる。
}

//ビルトインオブジェクトの継承
{
    class MyArray extends Array {
        get first() {
            if (this.length === 0) {
                return undefined;
            } else {
                return this[0];
            }
        }

        get last() {
            if (this.length === 0) {
                return undefined;
            } else {
                return this[this.length - 1];
            }
        }
    }

    // Arrayを継承しているのでArray.fromも継承している
    // Array.fromはIterableなオブジェクトから配列インスタンスを作成する
    const array = MyArray.from([1, 2, 3, 4, 5]);
    console.log(array.length); // => 5
    console.log(array.first); // => 1
    console.log(array.last); // => 5
}
