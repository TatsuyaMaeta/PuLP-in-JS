// この内容はベースとなった処理内容
// ただ、jsonの作り方を間違えていたため、アクセスが難しくなってしまっていた
let uniqueArr = new Array();
let keyArr = new Array();

const groupArray = [
    ["john", "kate", "noriko"],
    ["joe", "tatsuya", "michel"],
    ["newt", "steph", "zep"],
    ["jessy", "quee", "posse"],
    ["ptee", "yoko", "dheen"],
];

groupArray.forEach((v1) => {
    v1.forEach((v2) => {
        let obj = Object.create(null);
        let contentobj = Object.create(null);
        Object.defineProperty(obj, v2, { value: contentobj });

        uniqueArr.push(obj);
        keyArr.push(v2);
    });
});

console.dir(uniqueArr);
// console.log(uniqueArr[1]["kate"]);
// arr[0]["john"]["kate"] = 1;
// arr[0]["john"]["jessy"] = 1;
// arr[1]["kate"]["tatsuya"] = 1;

// console.log(uniqueArr);
// console.log(Object.keys(uniqueArr[0]));
// console.log(Object.keys(uniqueArr[0]["john"]));
// console.log(Object.keys(uniqueArr[1]["kate"]));
// console.log(uniqueArr[1]["kate"]["tatsuya"]);
// console.log(uniqueArr[1]["kate"]["zep"]);
// console.log(Object.keys(uniqueArr[5]["michel"]));

// console.dir(keyArr);

function hogehoge(uniqueArr = {}, groupArray = {}, keyArr = {}) {
    // ユニーク値となっているメンバー単位でループ処理をまず回す
    uniqueArr.forEach((v, index) => {
        // console.log(v[keyArr[index]]);

        // クラスメンバー単位でブルーぷを回す
        groupArray.forEach((grpV) => {
            // ユニークarrayで回している処理の名前と同じ人物がいた時に処理をする
            if (grpV.includes(keyArr[index])) {
                // そのメンバー本人以外を配列にして変数に格納
                const filteredGroupMember = grpV.filter(
                    (v) => v !== keyArr[index]
                );

                // フィルタリングされたメンバーを人数単位でループ処理
                filteredGroupMember.forEach((member) => {
                    // 同じグループになったことがなければ1を代入。なったことがあればインクリメント
                    uniqueArr[index][keyArr[index]][member] =
                        uniqueArr[index][keyArr[index]][member] !== undefined
                            ? (uniqueArr[index][keyArr[index]][member] += 1)
                            : (uniqueArr[index][keyArr[index]][member] = 1);
                });
            }
        });
    });

    console.log(uniqueArr);
    return uniqueArr;
}
// const n = hogehoge(uniqueArr, groupArray, keyArr);

const groupArray2 = [
    ["jessy", "posse", "noriko", "zep"],
    ["joe", "kate", "michel"],
    ["dheen", "steph", "tatsuya"],
    ["yoko", "quee"],
    ["ptee", "john"],
];

const n2 = hogehoge(uniqueArr, groupArray2, keyArr);
