$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip(); // Enable on screen help

    var signin = function (login, onSuccess, onFailure) {
        $.post('/session', {memberId: login})
            .done(function (data) {
                onSuccess();
            })
            .fail(function (data) {
                onFailure();
            });
    };

    var livres;

    //Shows catalogue by looping through each book item in JSON and appending it to a table row, then hides sign in screen
    var showCatalogue = function () {
        $.get("/catalogue", function (books) {
            livres = books;

            $.each(livres, function (i, book) {

                var table = $(".table-catalogue");
                var row = $('<tr/>');
                row.append($('<td/>').text(book.Book_ref));
                row.append($('<td/>').text(book.Book_title));
                row.append($('<td/>').text("£" + book.Book_price));
                row.append($('<td/>').text(book.Book_formats));
                table.append(row);

            });

            //when clicking on row, show details
            var rows = $('.table tr');
            rows.click(function (e) {
                if(e.target.classList.contains('no-click'))
                    return;
                var index = $(this).index();
                showDetails(livres[index-1]);
            });
        });

        $(".screen-catalogue").show();
        $(".screen-signin").hide();
    };

    //Hides catalogue and shows sign in screen
    var showSignIn = function () {
        $(".screen-signin").show();
        $(".screen-catalogue").hide();

    };

    //Checks to see whether the user is signed in by checking our express session module and if they are, it shows catalogue otherwise shows sign in
    $.get("/session")
        .done(function () {
            showCatalogue();
        })
        .fail(function () {
            showSignIn();
        }
    );

    //Sign out method, calls the delete defined in our route for session and destroys the current session and shows sign in screen
    var signOut = function () {
        $.ajax({
            url: 'session',
            type: 'DELETE',
            success: function (result) {
                showSignIn();
            }
        });
    };

    //Hides all screens apart from details
    var showDetails = function (book) {
        $(".screen-signin").hide();
        $(".screen-catalogue").hide();
        $(".screen-details").show();

        $(".book-ref").text(book.Book_ref);
        $(".book-title").text(book.Book_title);
        $(".book-price").text(book.Book_price);
        //$(".book-formats").text(book.Book_formats)


        var formats = book.Book_formats;
        var formatsArray = formats.split(",");


        //Creating checkboxes with the formats
        var formatsContainer = $(".formats");
        //if(!formats) { TODO Check if formats have already been fetched and not display again
        $.each(formatsArray, function (index, format) {
            var label = $('<label/>').text(format).attr('for', format);
            var input = $('<input/>').attr('type', 'checkbox').attr('id', format).attr('value', format);
            formatsContainer
                .append(label)
                .append(input);

            // "<label for=" + value + ">" + value + "</label><input type='checkbox' id=" + value + " value=" + value + " name=" + value + ">";
        })
        //} else { TODO finish statment from if above
        //
        //}


        //Button for checkout
        $(".submit-checkout").click(function () {
                var selectedFormats = [];
                var allFormats = $(".formats input");
                $.each(allFormats, function (index, elem) {
                    var formatCheckbox = $(elem);
                    if (formatCheckbox.prop('checked')) {
                        selectedFormats.push(formatCheckbox.val());
                    }
                });


                $.ajax({
                    url: '/basket/' + book.Book_ref,
                    type: 'PUT',
                    data: JSON.stringify({selectedFormats: selectedFormats}),
                    contentType: 'application/json',
                    success: function (data) {
                        showCatalogue();
                        showAddedToBasketAlert();
                        $(".screen-details").hide();
                    },
                    error: function (result) {
                        alert("Error");
                    }
                });
                //})
                //    .done(function () {
                //
                //        //$(".screen-catalogue").show();
                //
                //
                //    })
                //    .fail(function () {
                //        alert("FAILED");
                //
                //    });

            }
        );
    };

//To show checkout
//var showCheckout = function () {
//    $.(".screen-checkout").show();
//    $.(".screen-catalogue").hide();
//    $.(".screen-signin").hide();
//
//};


//The onclick handler for clicking submit on our login button. Takes the input from the textfield and validates it against the database
    $(".submit-login").click(function () {
        var login = $(".input-member-id").val();
        signin(login, function () {
            // login succeeded
            alert("Welcome: " + login);
            showCatalogue();
        }, function () {
            // login failed
            alert("Invalid credentials ");
        });
    });

    //Sign out click handler
    $(".submit-logout").click(function () {
        signOut();
    });


    $("#shopping-basket").click(function () {
        showBasket();
    });

//Show alert for successful insertion of item in to basket
    var showAddedToBasketAlert = function () {
        $(".alert-basket").show();
    };


    var showBasket = function () {
        $.get("/basket", function (books) {

            $.each(books, function (i, book) {


                var table = $(".table-basket");
                table.html("");
                var row = $('<tr/>');
                row.addClass("bookRow" + book.Book_ref)
                row.append($('<td/>').text(book.Book_ref));
                row.append($('<td/>').text(book.Book_title));
                row.append($('<td/>').text("£" + book.Book_price));
                row.append($('<td/>').text(book.Book_formats));
                row.append($('<td/>').append($('<button/>').addClass("submit-delete").attr("value", book.Book_ref).text("Delete")));
                table.append(row);
            });


            $(".submit-delete").click(function () {
                var bookRef = $(this).attr("value");
                $.ajax({
                    url: '/basket/' + bookRef,
                    type: 'DELETE',
                    success: function () {
                        $("tr.bookRow" + bookRef).remove();
                        // Do something with the result
                    }
                });


            });

        });

        $(".submit-purchase").click(function () {


            $.ajax({
                type: "POST",
                url: "/basket/checkout",
                success: function () {
                    showOrderConfirmed()
                    showConfirmedAlert()

                },
            });
        });


        $(".screen-basket").show();
        $(".screen-catalogue").hide();

    };

    var showOrderConfirmed = function () {
        $(".screen-basket").hide();
        $(".screen-confirmed").show();

    };

    var showConfirmedAlert = function () {
        $(".alert-confirmed").show();
    };


});
