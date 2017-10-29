$(document).ready(function () {

    // podaci od interesa
    var host = window.location.host;
    var token = null;
    var headers = {};
    var newId = 0;

    $("body").on("click", "#edit", setEditProduct);
    $("body").on("click", "#delete", deleteProduct);

    // posto inicijalno nismo prijavljeni, sakrivamo odjavu
    $("#odjava").css("display", "none");

    // prikaz tabele svih Product-a
    function showTable() {
        tableUrl = 'http://' + host + "/api/product"
        $.getJSON(tableUrl, function (data, status) {
            console.log(data);
            //alert("sad radi");     
            for (var i = 0; i < data.length; i++) {
                var buttonEdit = "<button id='edit' name='" + data[i].Id + "'>Edit</button>";
                var buttonDelete = "<button id='delete' name='" + data[i].Id + "'>Delete</button>";

                if (token) {
                    $("#podaci").append("<tr><td>" + data[i].Name + "</td><td>" + data[i].ProductCategoryName + "</td><td>" + "</td><td>" + buttonEdit + "</td><td>" + buttonDelete + "</td></tr>");
                }
                else {
                    $("#productsTable").css("display", "none");
                }
                newId = data[i].Id;
            }
        });
    };
    showTable();  // odmah pozivamo metodu

    // registracija korisnika
    $("#registracija").submit(function (e) {
        e.preventDefault();

        var email = $("#regEmail").val();
        var loz1 = $("#regLoz").val();
        var loz2 = $("#regLoz2").val();

        // objekat koji se salje
        var sendData = {
            "Email": email,
            "Password": loz1,
            "ConfirmPassword": loz2
        };


        $.ajax({
            type: "POST",
            url: 'http://' + host + "/api/Account/Register",
            data: sendData

        }).done(function (data) {
            $("#info").append("Uspešna registracija. Možete se prijaviti na sistem.");
            $("#regEmail").val("");
            $("#regLoz").val("");
            $("#regLoz2").val("");

        }).fail(function (data) {
            alert(data);
        });


    });

    // prijava korisnika
    $("#prijava").submit(function (e) {
        e.preventDefault();

        var email = $("#priEmail").val();
        var loz = $("#priLoz").val();

        // objekat koji se salje
        var sendData = {
            "grant_type": "password",
            "username": email,
            "password": loz
        };

        $.ajax({
            "type": "POST",
            "url": 'http://' + host + "/Token",
            "data": sendData

        }).done(function (data) {
            console.log(data);
            $("#info").empty().append("Prijavljen korisnik: " + data.userName);
            token = data.access_token;
            $("#prijava").css("display", "none");
            $("#registracija").css("display", "none");
            $("#odjava").css("display", "block");
            $("#podaci").empty();
            showTable();
            $("#createDiv").css("display", "block");
            $("#action").html("New Product");
            $("#buttonCreateUpdate").html("Create");
            $("#productsTable").css("display", "block");

        }).fail(function (data) {
            alert(data);
        });
    });

    // odjava korisnika sa sistema
    $("#odjavise").click(function () {
        token = null;
        headers = {};

        $("#prijava").css("display", "block");
        $("#registracija").css("display", "block");
        $("#odjava").css("display", "none");
        $("#info").empty();
        $("#sadrzaj").empty();
        $("#podaci").empty();
        showTable();
        $("#createDiv").css("display", "none");
        $("#priEmail").val("");
        $("#priLoz").val("");
    })

    // kreiranje ili editovanje Product-a
    $("#createEdit").submit(function (e) {
        e.preventDefault();

        if ($("#action").html() == "New Product") {
            createProduct();
        }
        else if ($("#action").html() == "Edit Product") {
            editProduct();
        }
    });

    // ispis podataka za editovanje
    function setEditProduct() {

        $("#action").html("Edit Product");
        $("#buttonCreateUpdate").html("Edit");
        getProductIdUrl = "http://" + host + "/api/product/" + this.name;
        console.log(getProductIdUrl);

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            "type": "GET",
            "url": getProductIdUrl,
            "headers": headers

        }).done(function (data) {
            console.log(data);
    
            $("#nameInput").val(data.Name);
            $("#priceInput").val(data.Price);
            $("#pcInput").val(data.ProductCategoryName);
            $("#buttonCreateUpdate").attr("name", data.Id); // ubacujemo vrednost Id-a u parametar "name" button-a

        }).fail(function (data) {
            alert(data.status + ": " + data.statusText);
        });
    };


    // editovanje Product-a
    function editProduct() {

        var productName = $("#nameInput").val();
        var productPrice = $("#priceInput").val();
        var productPC = $("#pcInput").val();
        var editId = $("#buttonCreateUpdate").attr("name");  // uzimamo vrednost Id-a iz parametra "name" button-a

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var sendData = {
            "Id": editId,
            "Name": productName,
            "Price": productPrice,
            "ProductCategoryName": productPC
        };

        console.log("Objekat za slanje");
        console.log(sendData);

        $.ajax({
            "url": "http://" + host + "/api/product/" + editId,
            "type": "PUT",
            "data": sendData,
            "headers": headers
        })
            .done(function (data, status) {
                refreshProductsTable();
                $("#nameInput").val("");
                $("#priceInput").val("");
                $("#pcInput").val("");
                
                $("#action").html("New Product");
                $("#buttonCreateUpdate").html("Create");
            })
            .fail(function (data, status) {
                alert("Desila se greska!");
            })
    }

    // kreiranje novog Product-a
    function createProduct() {

        var productName = $("#nameInput").val();
        var productPrice = $("#priceInput").val();
        var productPC = $("#pcInput").val();
       

        

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var sendId = newId + 1;
        var sendData = {
            "Id": sendId,
            "Name": productName,
            "Price": productPrice,
            "ProductCategoryName": productPC
            
        };

        console.log("Objekat za slanje");
        console.log(sendData);

        $.ajax({
            "url": "http://" + host + "/api/product/",
            "type": "POST",
            "data": sendData,
            "headers": headers
        })
            .done(function (data, status) {
                refreshProductsTable();
                $("#nameInput").val("");
                $("#priceInput").val();
                $("#pcInput").val("");
               
            })
            .fail(function (data, status) {
                alert("Desila se greska!");
            })
    }

    // brisanje Product-a
    function deleteProduct() {

        $("#podaci").empty();
        var deleteUrl = "http://" + host + "/api/product/" + this.name;

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            "url": deleteUrl,
            "type": "DELETE",
            "headers": headers
        })
            .done(function (data, status) {
                refreshProductsTable();
            })
            .fail(function (data, status) {
                alert("Desila se greska!");
            });

    }

    // osvezi prikaz tabele
    function refreshProductsTable() {
        $("#podaci").empty();

        showTable();

    };

});