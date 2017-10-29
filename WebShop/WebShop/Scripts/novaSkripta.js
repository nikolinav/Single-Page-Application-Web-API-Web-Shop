$(document).ready(function () {

    // podaci od interesa
    var host = window.location.host;
    var token = null;
    var headers = {};
    var newId = 0;
    var newIdPc = 0;

    $("body").on("click", "#edit", setEditProduct);
    $("body").on("click", "#delete", deleteProduct);
    $("body").on("click", "#editPC", setEditProductCategory);
    $("body").on("click", "#deletePC", deleteProductCategory);
    $("body").on("click", "#buttonCreatePC", setPC); 
    $("body").on("click", "#buttonCreate", setP);
    $("body").on("click", "#btn1", filter);
    $("body").on("click", "#btn2", filterPrice);
    $("body").on("click", "#btnBack", goBack);


    $("#odjava").css("display", "none");

    function showTable() {
        tableUrl = 'http://' + host + "/api/product"
        $.getJSON(tableUrl, function (data, status) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var buttonEdit = "<button class='btn btn-warning btn-sm' id='edit' name='" + data[i].Id + "'>Edit</button>";
                var buttonDelete = "<button class='btn btn-danger btn-sm' id='delete' name='" + data[i].Id + "'>Delete</button>";

                if (token) {
                    $("#podaci").append("<tr><td>" + data[i].Name + "</td><td>" + data[i].ProductCategoryName + "</td>" + "<td>" + buttonEdit + "</td><td>" + buttonDelete + "</td></tr>");
                }
                else {
                    $("#productsTable").css("display", "none");
                }
                newId = data[i].Id;
            }
        });
    };
    showTable();

    function showTablePC() {
        tableUrl = 'http://' + host + "/api/productcategory"
        $.getJSON(tableUrl, function (data, status) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var buttonEdit = "<button class='btn btn-success' id='editPC' name='" + data[i].Id + "'>Edit</button>";
                var buttonDelete = "<button class='btn btn-danger' id='deletePC' name='" + data[i].Id + "'>Delete</button>";

                if (token) {
                    $("#podaciPC").append("<tr><td>" + data[i].Name + "</td><td>" + buttonEdit + "</td><td>" + buttonDelete + "</td></tr>");
                }
                else {
                    $("#productCategoryTable").css("display", "none");
                }
                newIdPc = data[i].Id;
            }
        });
    };
    showTablePC();

    $("#registracija").submit(function (e) {
        e.preventDefault();

        var email = $("#regEmail").val();
        var loz1 = $("#regLoz").val();
        var loz2 = $("#regLoz2").val();

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
            $("#info").append("Uspesna registracija. Mozete se prijaviti na sistem.");
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
            $("#podaciPC").empty();
            showTable();
            $("#productsTable").css("display", "block");
            showTablePC();
            $("#productCategoryTable").css("display", "block");
            $("#con").css("display", "block");
            setProductCategoryFilter();
        


        }).fail(function (data) {
            alert(data);
        });
    });

    $("#odjavise").click(function () {
        token = null;
        headers = {};

        $("#prijava").css("display", "block");
        $("#registracija").css("display", "block");
        $("#odjava").css("display", "none");
        $("#info").empty();
        $("#sadrzaj").empty();
        $("#podaci").empty();
        $("#y").empty();
        $("#createDiv").css("display", "none");
        $("#editDiv").css("display", "none");
        $("#createDivPC").css("display", "none");
        $("#editDivPC").css("display", "none");
        $("#priEmail").val("");
        $("#priLoz").val("");
        $("#productsTable").css("display", "none");
        $("#productCategoryTable").css("display", "none");
        $("#filterTablePrice").css("display", "none");
        $("#filterTable").css("display", "none");
        $("#con").css("display", "none");
        
        
    })

    function setProductCategory() {

        $.getJSON("http://" + host + "/api/productcategory", function (data, status) {
            console.log(data);

            $("#pcInput option").remove();
            for (i = 0; i < data.length; i++) {
                if (token) {
                    $("#pcInput").append("<option value=" + data[i].Id + ">" + data[i].Name + "</option>");
                }
            }

            $("#pcInput1 option").remove();
            for (i = 0; i < data.length; i++) {
                if (token) {
                    $("#pcInput1").append("<option value=" + data[i].Id + ">" + data[i].Name + "</option>");
                }
            }
        });
    }

    function setProductCategoryFilter() {

        $.getJSON("http://" + host + "/api/productcategory", function (data, status) {
            console.log(data);

            $("#pcInput2 option").remove();
            for (i = 0; i < data.length; i++) {
                if (token) {
                    $("#y").append("<option value=" + data[i].Id + ">" + data[i].Name + "</option>");
                }
            }
        });
    }

    //function setProductCategoryFilter2() {

    //    $.getJSON("http://" + host + "/api/productcategory", function (data, status) {
    //        console.log(data);

    //        $("#pcInput3 option").remove();
    //        for (i = 0; i < data.length; i++) {
    //            if (token) {
    //                $("#p").append("<option value=" + data[i].Id + ">" + data[i].Name + "</option>");
    //            }
    //        }
    //    });
    //}


    function setEditProduct() {
        $("#createDiv").css("display", "none");
        $("#editDiv").css("display", "block");
        $("#createDivPC").css("display", "none");
        $("#editDivPC").css("display", "none");

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

            $("#nameInputEdit").val(data.Name);
            $("#priceInputEdit").val(data.Price);
            setProductCategory();
            $("#buttonCreateUpdateEdit").attr("name", data.Id); // ubacujemo vrednost Id-a u parametar "name" button-a
            setProductCategoryFilter();
            


        }).fail(function (data) {
            alert(data.status + ": " + data.statusText);
        });
    };

    function setP() {
        setProductCategory();
        $("#createDivPC").css("display", "none");
        $("#editDivPC").css("display", "none");
        $("#createDiv").css("display", "block");
        $("#editDiv").css("display", "none");
    }

    function setPC() {
        $("#createDivPC").css("display", "block");
        $("#editDivPC").css("display", "none");
        $("#createDiv").css("display", "none");
        $("#editDiv").css("display", "none");
    }

    function setEditProductCategory() {
        $("#createDivPC").css("display", "none");
        $("#editDiv").css("display", "none");
        $("#editDivPC").css("display", "block");


        getProductIdUrl = "http://" + host + "/api/productcategory/" + this.name;
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

            $("#nameInputEditPC").val(data.Name);
            $("#buttonCreateUpdateEditPC").attr("name", data.Id); // ubacujemo vrednost Id-a u parametar "name" button-a

        }).fail(function (data) {
            alert(data.status + ": " + data.statusText);
        });
    };

    $("#createP").submit(function (e) {
        e.preventDefault();
        createProduct();

    });

    $("#editP").submit(function (e) {
        e.preventDefault();
        editProduct();

    });
    $("#createPC").submit(function (e) {
        e.preventDefault();
        createProductCategory();

    });

    $("#editPC").submit(function (e) {
        e.preventDefault();
        editProductCategory();

    });

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
            "ProductCategoryId": productPC

        };

        console.log("Objekat za slanje");
        console.log(sendData);

        $.ajax({
            "url": "http://" + host + "/api/product",
            "type": "POST",
            "data": sendData,
            "headers": headers
        })
            .done(function (data, status) {
                refreshProductsTable();
                $("#nameInput").val("");
                $("#priceInput").val("");
                    


            })
            .fail(function (data, status) {
                alert("Desila se greska!");
            })
    }

    function editProduct() {

        var productName = $("#nameInputEdit").val();
        var productPrice = $("#priceInputEdit").val();
        var productPC = $("#pcInput1").val();
        var editId = $("#buttonCreateUpdateEdit").attr("name");  // uzimamo vrednost Id-a iz parametra "name" button-a

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var sendData = {
            "Id": editId,
            "Name": productName,
            "Price": productPrice,
            "ProductCategoryId": productPC,
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
                $("#nameInputEdit").val("");
                $("#priceInputEdit").val("");
                $("#editDiv").css("display", "none");
                $("#createDiv").css("display", "block");
                refreshProductCategoryDropdownFilter();
                refreshProductCategoryDropdown();
            })
            .fail(function (data, status) {
                alert("Desila se greska!");
            })
    }

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
                refreshProductCategoryDropdownFilter();
                
            })
            .fail(function (data, status) {
                alert("Desila se greska!");
            });
    }

    function createProductCategory() {

        var productCategoryName = $("#nameInputPC").val();

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var sendId = newIdPc + 1;
        var sendData = {
            "Id": sendId,
            "Name": productCategoryName,
        };

        console.log("Objekat za slanje");
        console.log(sendData);

        $.ajax({
            "url": "http://" + host + "/api/productcategory",
            "type": "POST",
            "data": sendData,
            "headers": headers
        })
            .done(function (data, status) {
                refreshProductCategoryTable();
                $("#nameInputPC").val("");
                $("#createDivPC").css("display", "none");
                $("#createDiv").css("display", "block");
                refreshProductCategoryDropdownFilter();
                refreshProductCategoryDropdown();
            })
            .fail(function (data, status) {
                alert("Desila se greska!");
            })
    }

    function editProductCategory() {
        

        var productCategoryName = $("#nameInputEditPC").val();

        var editIdPC = $("#buttonCreateUpdateEditPC").attr("name");  // uzimamo vrednost Id-a iz parametra "name" button-a

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var sendData = {
            "Id": editIdPC,
            "Name": productCategoryName,

        };

        console.log("Objekat za slanje");
        console.log(sendData);

        $.ajax({
            "url": "http://" + host + "/api/productcategory/" + editIdPC,
            "type": "PUT",
            "data": sendData,
            "headers": headers
        })
            .done(function (data, status) {
                refreshProductCategoryTable();
                $("#nameInputEditPC").val("");
                $("#editDivPC").css("display", "none");
                $("#createDivPC").css("display", "block");
                refreshProductCategoryDropdownFilter();
                refreshProductCategoryDropdown();
            })
            .fail(function (data, status) {
                alert("Desila se greska!");
            })
    }

    function deleteProductCategory() {

        $("#podaciPC").empty();
        var deleteUrl = "http://" + host + "/api/productcategory/" + this.name;

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            "url": deleteUrl,
            "type": "DELETE",
            "headers": headers
        })
            .done(function (data, status) {
                refreshProductCategoryTable();
                refreshProductCategoryDropdownFilter();
                
                
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

    function refreshProductCategoryTable() {
        $("#podaciPC").empty();
        showTablePC();
    };

    function refreshProductCategoryDropdown() {
        $("#pcInput").empty();
        setProductCategory();
    };

    function refreshProductCategoryDropdownFilter() {
        $("#y").empty();
        setProductCategoryFilter();
    };
    


    function filter() {
        $("#filterTable").empty();
        $("#btnBack").css("display", "block");

        var pc = $("#y").val();
        var requestUrl = "http://" + host + "/api/product?y=" + pc;

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            "url": requestUrl,
            "type": "GET",
            "headers": headers
        })
            .done(function (data, status) {
                var table = $("<table class='table table-striped table-hover'></table>");
                var header = $("<thead><tr><th>Name</th><th>Price</th></tr></thead>");
                table.append(header);

                for (i = 0; i < data.length; i++) {
                    // prikazujemo novi red u tabeli
                    var row = "<tbody><tr>";
                    // prikaz podataka
                    var displayData = "<td>" + data[i].Name + "</td><td>" + data[i].Price + "</td>";

                    row += displayData + "</tr></tbody>";
                    table.append(row);
                }
                $("#productCategoryTable").css("display", "none");
                $("#productsTable").css("display", "none");
                $("#createDiv").css("display", "none");
                $("#editDiv").css("display", "none");
                $("#createDivPC").css("display", "none");
                $("#editDivPC").css("display", "none");
                $("#filterTable").append(table);

            });
    }

    function filterPrice() { 
        $("#filterTablePrice").empty();
        $("#btnBack").css("display", "block");

        var pc = $("#p").val();
        var requestUrl = "http://" + host + "/api/product?p=" + pc;

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            "url": requestUrl,
            "type": "GET",
            "headers": headers
        })
            .done(function (data, status) {
                var table = $("<table class='table table-striped table-hover'></table>");
                var header = $("<thead><tr><th>Name</th><th>Price</th></tr></thead>");
                var back = $("<button id='btnBack' class='btn btn-info'>Idi nazad</button>")
                table.append(header);
                table.append(back);

                for (i = 0; i < data.length; i++) {
                    // prikazujemo novi red u tabeli
                    var row = "<tbody><tr>";
                    // prikaz podataka
                    var displayData = "<td>" + data[i].Name + "</td><td>" + data[i].Price + "</td>";

                    row += displayData + "</tr></tbody>";
                    table.append(row);
                }
                $("#createDiv").css("display", "none");
                $("#editDiv").css("display", "none");
                $("#createDivPC").css("display", "none");
                $("#editDivPC").css("display", "none");
                $("#productCategoryTable").css("display", "none");
                $("#productsTable").css("display", "none");
                $("#filterTablePrice").append(table);

            });
    }

    function goBack() {

        $("#productsTable").css("display", "block");
        $("#productCategoryTable").css("display", "block");
        $("#filterTablePrice").empty;
        $("#filterTable").empty;

    }
    });


