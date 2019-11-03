function getVocab(listId) {
    return $.get(`/api/vocablists/${listId}`)
}

$(".fc-list-option").on("click", async function () {
    let listId = $(this).attr("list-id");
    let data = await getVocab(listId);
    let vocabList = data[0].Vocabs;

    if (vocabList.length > 0) {
        $('.fc-modal').addClass('is-active');
        $('.fc-modal').attr('list-id', listId);
        $('.modal-card-title').text(data[0].name);
        $('.fc-current-word').text(vocabList[0].translatedword);
        $('#fc-vocab').addClass(`fc-difficulty-${vocabList[0].difficulty}`);
        $('#fc-vocab').attr('index', "0");

        $("#previous-btn").on("click", function () {
            let newIndex = parseInt($('#fc-vocab').attr('index')) - 1;
            if (newIndex >= 0) {
                $('.fc-current-word').text(vocabList[newIndex].translatedword);
                $('#fc-vocab').attr('index', `${newIndex}`);
                $('#fc-vocab').removeClass();
                $('#fc-vocab').addClass(`fc-difficulty-${vocabList[newIndex].difficulty}`);
            };
        });

        $("#next-btn").on("click", function () {
            let newIndex = parseInt($('#fc-vocab').attr('index')) + 1;
            if (newIndex < vocabList.length) {
                $('.fc-current-word').text(vocabList[newIndex].translatedword);
                $('#fc-vocab').attr('index', `${newIndex}`);
                $('#fc-vocab').removeClass();
                $('#fc-vocab').addClass(`fc-difficulty-${vocabList[newIndex].difficulty}`)
            };
        })

        $("#flip-btn").on("click", function () {
            let currentIndex = $("#fc-vocab").attr("index");
            if ($('.fc-current-word').data("side") === "side-a") {
                let sideB = vocabList[currentIndex].nativeword;
                $('.fc-current-word').text(sideB);
                $('.fc-current-word').data("side", "side-b");
            } else {
                let sideA = vocabList[currentIndex].translatedword;
                $('.fc-current-word').text(sideA);
                $('.fc-current-word').data("side", "side-a");
            };
        });

        $("#fc-delete").on("click", function () {
            $('.fc-current-word').text('');
            $("#fc-model").removeClass("is-active");
        });
    }
});


