import data from "./class20230404.json" assert { type: "json" };

// レビュー会をした実績のjsonからレビューグループを抽出
function filteredRevueGroup(jsonData = {}) {
    let returnArray = [];

    const revueGroups = jsonData["revue_groups"];

    revueGroups.forEach((v) => {
        let inner_group = [];
        v["member"].forEach((v2) => {
            inner_group.push(v2.id);
        });
        returnArray.push(inner_group);
    });

    return returnArray;
}
const json_groups = filteredRevueGroup(data[0]);
console.log(json_groups, "json_groups");

const makeInitUniqueNameArray = function (baseArray = [[], []]) {
    let uArray = new Array();

    baseArray.forEach((v1) => {
        v1.forEach((v2) => {
            let memberObject = {
                name: v2,
                sameGroupMember: [],
                // sameGroupMemberの配列内の形
                // { name: "", count: 0 }
            };
            uArray.push(memberObject);
        });
    });

    // 文字列のソートだと以下のやつはなぜか動作しない
    // uArray.sort((x, y) => x["name"] - y["name"]);

    // こちらで文字列のnameをソート
    uArray.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });

    return uArray;
};

let uniqueMemberArray = makeInitUniqueNameArray(json_groups);
console.log(uniqueMemberArray, "uniqueMemberArray");

function nyaaa(uniqueMembersArray = [], revueGroupsArray = []) {
    // ユニーク値となっているメンバー単位でループ処理をまず回す
    uniqueMembersArray.forEach((v, index) => {
        // console.log("");
        // console.log(v.name, "この人で今回ってます");

        // クラスメンバー単位でブルーぷを回す
        revueGroupsArray.forEach((grpV) => {
            // console.log(grpV);
            // ユニークarrayで回している処理の名前と同じ人物がいた時に処理をする
            if (grpV.includes(v.name)) {
                // そのメンバー本人以外を配列にして変数に格納
                const filteredGroupMember = grpV.filter(
                    (filteredStudentName) => filteredStudentName !== v.name
                );
                // console.log(filteredGroupMember);

                // フィルタリングされたメンバーを人数単位でループ処理
                filteredGroupMember.forEach((filteredMemberName) => {
                    // console.log(
                    //     filteredMemberName,
                    //     "フィルタリングされたmember"
                    // );
                    // console.log(uniqueMemberArray[index]["sameGroupMember"]);

                    // 同じグループになったことある人が一人以上いた場合
                    if (uniqueMembersArray[index]["sameGroupMember"].length) {
                        // フィルターした受講生と同じ人がいるかどうか判定
                        const n = uniqueMembersArray[index][
                            "sameGroupMember"
                        ].find((f_v) => f_v.name === filteredMemberName);

                        // console.log(n);
                        // いなかった場合は初期カウント1で配列に追加
                        if (!n) {
                            uniqueMembersArray[index]["sameGroupMember"].push({
                                name: filteredMemberName,
                                count: 1,
                            });
                        } else {
                            // いた場合はカウントアップして追加
                            const countNumber = n.count + 1;
                            uniqueMembersArray[index]["sameGroupMember"].push({
                                name: filteredMemberName,
                                count: countNumber,
                            });
                        }
                    } else {
                        // 同じグループになったことある人がいなかった場合
                        uniqueMembersArray[index]["sameGroupMember"].push({
                            name: filteredMemberName,
                            count: 1,
                        });
                        // console.log(
                        //     uniqueMemberArray[index]["sameGroupMember"]
                        // );
                    }
                });
            }
        });
    });
    return uniqueMembersArray;
}

const newlist = nyaaa(uniqueMemberArray, json_groups);

console.log(newlist);

const json_groups1 = filteredRevueGroup(data[1]);
let uniqueMemberArray1 = makeInitUniqueNameArray(json_groups1);
console.log(uniqueMemberArray1);

const uniqueMember = mergingInitialArrays(
    uniqueMemberArray,
    uniqueMemberArray1
);
console.log(uniqueMember);
console.log(uniqueMemberArray);

const newlist1 = nyaaa(uniqueMember, json_groups1);
console.log(newlist1);

function mergingInitialArrays(baseArray = [], margedTargetArray = []) {
    let returnArray = baseArray.map((v) => v);
    console.log(margedTargetArray);

    margedTargetArray.forEach((targetMember) => {
        // マージタイ側の配列にターゲットの受講生がいるかどうかフィルタリング
        // カラの配列が戻ってくる=ユニークとなる受講生が存在しなかった
        const hasTargetInUniqueArray = baseArray.filter(
            (member) => member.name === targetMember.name
        );

        // カラだった場合に配列に追加する
        if (!hasTargetInUniqueArray.length) {
            returnArray.push(targetMember);
            console.log(
                targetMember.name,
                "マージ対象の受講生がいませんでした"
            );
        }
    });

    // こちらで文字列のnameをソート
    returnArray.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });
    return returnArray;
}
