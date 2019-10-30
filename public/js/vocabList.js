$("#save-btn").on("click", function() {
    let userId = $("#user-id").text();
    let newWord = $("#new-word").text();
    let newLang = $("#new-word").data("lang-id");
    let newDifficulty = $("#difficulty").val();
    let nativeWord = $("word").val();
    let newVocabList = $("#vocab-list").val();

    let newVocab = {
        nativeword: nativeWord,
        translatedword : newWord,
        difficulty: newDifficulty,
        LanguageId: newLang,
        UserId: userId,
        VocabListId: newVocabList
    };

    $.post(`/vocab/${newWord}`, newVocab, function(data) {
        console.log(data);
        console.log("Word successfully saved!");
    });
});