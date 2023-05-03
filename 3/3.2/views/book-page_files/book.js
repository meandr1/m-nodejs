var pathname = $(location).attr('pathname');
var bookIdPosition = pathname.lastIndexOf('/') + 1;

/*------------------ Sending ajax query by clicking on the button ----------------*/
$('.btnBookID').click(function (event) {
    $.ajax({
        url: "/api/v1/book/",
        method: 'GET',
        dataType: 'json',
        data: { id: pathname.substr(bookIdPosition) },
        success: function (data) {
            document.getElementById('wanted').innerHTML = data.wanted;
            setTimeout(() => { alert(
                "Книга свободна и ты можешь прийти за ней." +
                " Наш адрес: г. Кропивницкий, переулок Васильевский 10, 5 этаж." +
                " Лучше предварительно прозвонить и предупредить нас, чтоб " +
                " не попасть в неловкую ситуацию. Тел. 099 196 24 69"
            )}, 1);
        },
        error: (jqXHR, exception) => {
            alert(`Server error, status: ${jqXHR.responseText}`)
        }
    });
});