$(document).ready(function () {

  $(".listdeletebutton").on("click", function () {
    //alert("DELETE BUTTON " + $(this).attr("data-value"));
    let id = $(this).attr("data-value");

    $.ajax("/api/vocabperlist/" + id,
      {
        method: "DELETE"
      }).then(function () {
        location.reload();
      })

    $.ajax("/api/vocablist/" + id,
      {
        method: "DELETE"
      }).then(function () {
        location.reload();
      })
  })

  $(".listupdatebutton").on("click", function () {
    let id = $(this).attr("data-value");
    let name = $(".updateinput" + id).val();
    // alert("UPDATE BUTTON " + $(this).attr("data-value") + " " + textinput);

    let newobj = {
      id: id,
      name: name
    };
    $.ajax({
      method: "PUT",
      url: "/api/updatelistname",
      data: newobj
    }).then(function (res) {
      location.reload();
    })
  })

  $(".deletebtn").on("click", function () {
    // alert($(this).attr("id"))
    let id = $(this).attr("id");
    $.ajax("/api/vocabs/" + id,
      {
        method: "DELETE",

      }).then(function () {
        location.reload();
      })
  })

  $(".updatebtn").on("click", function () {
    
    let id = $(this).attr("id");
    let difficulty = $("input[type=radio][name=answer]:checked").attr("data-value");
    
    idandnewdiff = {
      id: id,
      difficulty: difficulty
    };
    // alert(idandnewdiff.id);
    // alert(idandnewdiff.difficulty);
    $.ajax({
      method: "PUT",
      url: "/api/updatevocabdiff",
      data: idandnewdiff
    }).then(function (res) {
      console.log(res);
      location.reload();
    })
  })

  $("#save-btn").on("click", function () {
    let newWord = $("#translated-word").text();

    $(".modal").addClass("is-active");
    $("#word-to-save").text(newWord)
  });

  $("#existing-list-save").on("click", function () {
    let newWord = $("#translated-word").text();
    let nativeWord = $("#word").val();
    let newLang = $("#toLanguage").attr("lang-id");
    let vocabListId = $("#target-list").attr("list-id");
    let nativelanguage = $("#fromLanguage").text();
    let difficulty = $("input[type=radio][name=answer]:checked").attr("data-value");


    let newVocab = {
      nativeword: nativeWord,
      nativelanguage: nativelanguage,
      translatedword: newWord,
      difficulty: difficulty,
      LanguageId: newLang,
      VocabListId: vocabListId
    };

    $.post(`/vocab/${newWord}`, newVocab, function (data) {
      console.log("Word successfully saved");
    });

    location.reload();
  })

  $("#new-list-save").on("click", function () {
    let userId = $(".member-username").attr("user-id");
    let newWord = $("#translated-word").text();
    let nativeWord = $("#word").val();
    let newLang = $("#toLanguage").attr("lang-id");
    let newVocabList = $("#new-vocab-list").val();
    let nativelanguage = $("#fromLanguage").text();
    let difficulty = $("input[type=radio][name=answer]:checked").attr("data-value");
    let userData = {
      UserId: userId
    };

    console.log('newVocabList', newVocabList)
    console.log('nativeWord', nativeWord)
    console.log('nativelanguage', nativelanguage);

    $.post(`/vocablist/${newVocabList}`, userData, function (data) {
      console.log(data.id);

      let newVocab = {
        nativeword: nativeWord,
        nativelanguage: nativelanguage,
        translatedword: newWord,
        difficulty: difficulty,
        LanguageId: newLang,
        VocabListId: data.id
      };

      $.post(`/vocab/${newWord}`, newVocab, function (data) {
        console.log(data);
        console.log("Word successfully saved!");
      });
    })
    location.reload();
  })

  $(".delete").on("click", function () {
    $(".modal").removeClass("is-active");
  })
  
  $("#cancel").on("click", function () {
    $(".modal").removeClass("is-active");
  })

  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $(".to-option").on("click", function (event) {
    event.preventDefault();
    $("#toLanguage").text($(this).text());
    $("#toLanguage").attr("lang-id", $(this).attr("lang-id"));
    $("#toLanguage").attr("lang-code", $(this).attr("lang-code"));
  });

  $(".from-option").on("click", function (event) {
    event.preventDefault();
    $("#fromLanguage").text($(this).text());
    $("#fromLanguage").attr("lang-id", $(this).attr("lang-id"));
    $("#fromLanguage").attr("lang-code", $(this).attr("lang-code"));
  });

  $(".list-option").on('click', function (event) {
    event.preventDefault();
    $("#target-list").text($(this).text());
    $("#target-list").attr("list-id", $(this).attr("list-id"));
  })

  $("#search").on("click", function () {
    let fromLanguage = $("#fromLanguage").attr("lang-code");
    let toLanguage = $("#toLanguage").attr("lang-code");
    let wordSearch = $("#word").val();

    if (wordSearch && toLanguage) {

      $("#translate").html("");
      $("#definition").html("");
      $("#expressions").html("");

      $(".results-container").attr("style", "display:block");

      let queryURLTranslate = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=${fromLanguage}&target=${toLanguage}&input=${wordSearch}`;
      
      $.ajax({
        url: queryURLTranslate,
        method: "GET",
        headers: {
          "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
          "x-rapidapi-key": "b98198b437mshea0ca9221f948fdp104f05jsneed7015c919a"
        }
      }).then(function (response) {
        console.log(queryURLTranslate);
        console.log(response);
        let newP = $("<p>");
        newP.text(response.outputs[0].output);
        newP.addClass("subtitle");
        newP.attr("id", "translated-word")
        $("#translate").append(newP);
      });
      let queryURLExpression = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${fromLanguage}&target=${toLanguage}&input=${wordSearch}`;

      $.ajax({
        url: queryURLExpression,
        method: "GET",
        headers: {
          "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.API_KEY
        }
      }).then(function (response) {

        let totalNoOfExpressions = response.outputs[0].output.matches[0].targets[0].expressions.length;
        for (let i = 0; i < totalNoOfExpressions; i++) {

          let newPTarget = $("<p>");
          newPTarget.text(response.outputs[0].output.matches[0].targets[0].expressions[i].target);

          let newPSource = $("<p>");
          newPSource.text(response.outputs[0].output.matches[0].targets[0].expressions[i].source);
          newPSource.attr("style", "font-style:italic");

          $("#expressions").append(newPTarget);
          $("#expressions").append(newPSource);
        }

      })
    };
  });

})