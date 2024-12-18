// Author: nakinor
// Created: 2014-04-06
// Revised: 2024-12-15

function gsub(str, key, val) {
  return str.split(key).join(val);
}

// for pc page
function del() {
    document.kkh.bef.value = "";
}

function toBeforeTextArea() {
    var str = document.kkh.aft.value;
    document.kkh.bef.value = str;
    document.kkh.aft.value = "";
}

function replaceStrings2(jisyo1, jisyo2, flag) {
    var str = document.kkh.bef.value;
    if (flag == 0) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = str.replaceAll(jisyo1[i][0], jisyo1[i][1]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = str.replaceAll(jisyo2[i][0], jisyo2[i][1]);
        }
    } else if (flag == 1) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = str.replaceAll(jisyo1[i][1], jisyo1[i][0]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = str.replaceAll(jisyo2[i][1], jisyo2[i][0]);
        }
    }
    document.kkh.aft.value = str;
}

function replaceStrings(jisyo, flag) {
    var str = document.kkh.bef.value;
    if (flag == 0) {
        for (var i = 0; i < jisyo.length; i++) {
            str = str.replaceAll(jisyo[i][0], jisyo[i][1]);
        }
    } else if (flag == 1) {
        for (var i = 0; i < jisyo.length; i++) {
            str = str.replaceAll(jisyo[i][1], jisyo[i][0]);
        }
    }
    document.kkh.aft.value = str;
}

function dictElements() {
    document.write(
        "<p>現時点での辞書の要素数は<br />" +
            "（かな: 旧→新: " + toModernKanaArray.length +
            "、新→旧: " + toTradKanaArray.length + "）<br />" +
            "（漢字: 旧→新: " + toNewKanjiArray.length +
            "、新→旧: " + toOldKanjiArray.length + "）<br />" +
            "（拡張: 踊り字: " + odoriEnhanceArray.length + "）" +
            "（拡張: 外来語: " + gairaiEnhanceArray.length + "）<br />" +
            "（拡張: 合略仮名: " + gouryakuEnhanceArray.length + "）" +
            "（拡張: ヤ行エ: " + yeEnhanceArray.length + "）</p>"
    );
}

function readFileInLocal() {
    document.getElementById('ifile')
        .addEventListener('change',
                          function(evt) {
                              var file = evt.target.files[0];
                              var reader = new FileReader();
                              reader.readAsText(file, 'UTF-8');
                              reader.onload = function(e) {
                                  document.kkh.bef.value = reader.result;
                              }},
                          false);
}

function saveAfterStrings() {
    document.getElementById("ofile")
        .addEventListener(
            "click",
            function () {
                var Stfings = document.kkh.aft.value;
                var blob = new Blob([Stfings], { type: "text/plain" });
                var dlAnchor = document.createElement("a");
                dlAnchor.href = URL.createObjectURL(blob);
                dlAnchor.download = "replaced.txt";
                dlAnchor.click();
                URL.revokeObjectURL(dlAnchor.href);
            },
            false);
}

// for mobile page
function mDel() {
    document.kkh.tArea.value = "";
}

function mReplaceStrings2(jisyo1, jisyo2, flag) {
    var str = document.kkh.tArea.value;
    if (flag == 0) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = str.replaceAll(jisyo1[i][0], jisyo1[i][1]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = str.replaceAll(jisyo2[i][0], jisyo2[i][1]);
        }
    } else if (flag == 1) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = str.replaceAll(jisyo1[i][1], jisyo1[i][0]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = str.replaceAll(jisyo2[i][1], jisyo2[i][0]);
        }
    }
    document.kkh.tArea.value = str;
}
