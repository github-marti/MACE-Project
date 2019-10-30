$("#save-btn").on("click", function() {
    // newWord must refer to the vocab word that the user wants to save
    let newWord = $("#new-word").text();

    // newLang must refer to the language the word is in
    let newLang = $("#new-word").data("lang-id");

    // newDifficulty must refer to the difficulty level the user chooses
    let newDifficulty = $("#difficulty").val();

    let nativeWord = $("word").val();

    let newVocab = {
        nativeword: nativeWord,
        translatedword : newWord,
        difficulty: newDifficulty,
        LanguageId: newLang
    };

    $.post(`/vocab/${newWord}`, newVocab, function(data) {
        console.log(data);
        console.log("Word successfully saved!");
    });
});