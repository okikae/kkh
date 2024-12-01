// Author: nakinor
// Created: 2014-04-06
// Revised: 2024-12-01

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

function deleteIVS(str) {
    var vs_re = /%F3%A0%84%8[0-9|A-F]/;
    var enc_str = encodeURIComponent(str);
    var novs_str = gsub(enc_str, vs_re, "");
    var dec_str = decodeURIComponent(novs_str);
    return dec_str;
}

function replaceStrings2(jisyo1, jisyo2, flag) {
    var str = document.kkh.bef.value;
    var del_ivs = document.forms.kkh.del_IVS_yes.checked
    if (del_ivs == true) {
        str = deleteIVS(str);
    }
    if (flag == 0) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][0], jisyo1[i][1]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][0], jisyo2[i][1]);
        }
    } else if (flag == 1) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][1], jisyo1[i][0]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][1], jisyo2[i][0]);
        }
    }
    document.kkh.aft.value = str;
}

function replaceStrings(jisyo, flag) {
    var str = document.kkh.bef.value;
    var del_ivs = document.forms.kkh.del_IVS_yes.checked
    if (del_ivs == true) {
        str = deleteIVS(str);
    }
    if (flag == 0) {
        for (var i = 0; i < jisyo.length; i++) {
            str = gsub(str, jisyo[i][0], jisyo[i][1]);
        }
    } else if (flag == 1) {
        for (var i = 0; i < jisyo.length; i++) {
            str = gsub(str, jisyo[i][1], jisyo[i][0]);
        }
    }
    document.kkh.aft.value = str;
}

function dictElements() {
    var total = kanaArray.length + kanjiArray.length;
    document.write("<p>現時点での辞書の要素数は " + total +
                   "（かな変換用:" + kanaArray.length +
                   " 漢字変換用:" + kanjiArray.length + "）</p>");
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

// for mobile page
function mDel() {
    document.kkh.tArea.value = "";
}

function mReplaceStrings2(jisyo1, jisyo2, flag) {
    var str = document.kkh.tArea.value;
    var del_ivs = document.forms.kkh.del_IVS_yes.checked
    if (del_ivs == true) {
        str = deleteIVS(str);
    }
    if (flag == 0) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][0], jisyo1[i][1]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][0], jisyo2[i][1]);
        }
    } else if (flag == 1) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][1], jisyo1[i][0]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][1], jisyo2[i][0]);
        }
    }
    document.kkh.tArea.value = str;
}
