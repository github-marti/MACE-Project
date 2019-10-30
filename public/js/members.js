$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    $(".member-name").attr("id", data.id);
  });


  $(".dropdown-item").on("click", function(event){
    event.preventDefault();
    $("#toLanguage").text($(this).text());
    $("#toLanguage").attr("lang-id", $(this).attr("lang-id"));
  });

  $("#search").on("click", function () {
    let fromLanguage = "en";
    let toLanguage = $("#toLanguage").attr("lang-id");
    let wordSearch = $("#word").val();

    $("#translate").html("");
    $("#definition").html("");
    $("#expressions").html("");

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
        //console.log(response.outputs[0].output);
        let newP = $("<p>");
        newP.text("Translation :" + response.outputs[0].output);
        $("#translate").append(newP);
    });
    let queryURLExpression = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${fromLanguage}&target=${toLanguage}&input=${wordSearch}`;

    $.ajax({
        url: queryURLExpression,
        method: "GET",
        headers: {
            "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
            "x-rapidapi-key": "b98198b437mshea0ca9221f948fdp104f05jsneed7015c919a"
        }
    }).then(function (response) {
        console.log(response);
        //console.log(response.outputs[0].output.matches[0].targets[0].expressions.length);

        let totalNoOfExpressions = response.outputs[0].output.matches[0].targets[0].expressions.length;
        for (let i = 0; i < totalNoOfExpressions; i++) {
            // console.log(response.outputs[0].output.matches[0].targets[0].expressions[i].source);
            // console.log(response.outputs[0].output.matches[0].targets[0].expressions[i].target);
            //console.log(response);

            let newPSource = $("<p>");
            newPSource.text("FROM: " + response.outputs[0].output.matches[0].targets[0].expressions[i].source);
            let newPTarget = $("<p>");
            newPTarget.text("TO: " + response.outputs[0].output.matches[0].targets[0].expressions[i].target);
            $("#expressions").append(newPSource);
            $("#expressions").append(newPTarget);
        }

        // if()
        let totalNoOfDefinitions = response.outputs[0].output.matches[0].targets[0].invmeanings.length;

        for(let i = 0; i < totalNoOfDefinitions; i++)
        {
            let newDefinition = $("<p>");
            newDefinition.text("Definition: " + response.outputs[0].output.matches[0].targets[0].invmeanings[i]);
            $("#definition").append(newDefinition);
        }

    })
  });

})