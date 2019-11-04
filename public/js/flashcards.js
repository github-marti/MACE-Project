function getVocab(listId) {
    return $.get(`/api/vocablists/${listId}`)
}

$(".fc-list-option").on("click", async function () {
    
    let listId = $(this).attr("list-id");
    let data = await getVocab(listId);
    let vocabList = data[0].Vocabs;
    let nextIndex = 0;
    let currentIndex = 0;
    let prevIndex = 0;

    if (vocabList.length > 0) {
        $('.fc-modal').addClass('is-active');
        $('.fc-modal').attr('list-id', listId);
        $('.modal-card-title').text(data[0].name);
        $('.fc-current-word').text(vocabList[0].translatedword);
        $('#fc-vocab').addClass(`fc-difficulty-${vocabList[0].difficulty}`);
        $('#fc-vocab').attr('index', "0");

        $("#previous-btn").on("click", function () {
            prevIndex = parseInt($('#fc-vocab').attr('index')) - 1;
            console.log(prevIndex);
            if (prevIndex >= 0) {
                $('.fc-current-word').text(vocabList[prevIndex].translatedword);
                $('#fc-vocab').attr('index', `${prevIndex}`);
                $('#fc-vocab').removeClass();
                $('#fc-vocab').addClass(`fc-difficulty-${vocabList[prevIndex].difficulty}`);
            };
        });

        $("#next-btn").on("click", function (e) {
            nextIndex = parseInt($('#fc-vocab').attr('index')) + 1;
            console.log($('#fc-vocab').attr('index'))
            console.log(nextIndex);
            if (nextIndex < vocabList.length) {
                $('.fc-current-word').text(vocabList[nextIndex].translatedword);
                $('#fc-vocab').attr('index', `${nextIndex}`);
                $('#fc-vocab').removeClass();
                $('#fc-vocab').addClass(`fc-difficulty-${vocabList[nextIndex].difficulty}`)
            };
        })

        $("#flip-btn").on("click", function (e) {
            currentIndex = $("#fc-vocab").attr("index");
            if ($('.fc-current-word').attr("data-side") === "side-a") {
                $('.fc-current-word').attr("data-side", "side-b");
                let sideB = vocabList[currentIndex].nativeword;
                $('.fc-current-word').text(sideB);
            } else {
                $('.fc-current-word').attr("data-side", "side-a");
                let sideA = vocabList[currentIndex].translatedword;
                $('.fc-current-word').text(sideA);
            };
        });

        $("#fc-delete").on("click", function () {
            $("#fc-modal").removeClass("is-active");
            location.reload();
        });
    }
});


