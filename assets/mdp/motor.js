$(document).ready(function(){
    var sukses = function () {
        $(".n_success").show();
        $(".n_success").fadeOut(3000);
    }
    function refresh(data) {
        if (data.length < 1){
            $.ajax({
                method: "POST",
                url: BASE_URL + "unit/ajax_default_list",
                data: {
                    id_pabrik: $("#pabrik").val(),
                    id_station: $("#station").val(),
                }
            }).done(function (msg) {
                console.log(msg);
                data = JSON.parse(msg);
                console.log(data);
                x = data;
                $('#my-spreadsheet').jexcel({
                    data: data,
                    allowInsertColumn: false,

                    colHeaders: [
                        '<br>Unit',
                        'Suhu Coupling<br>(pulley / gearbox)',
                        'Suhu<br>Bearing',
                        'Suhu<br>Body',
                        'Kondisi<br>Fan',
                        'Seal<br>terminal',
                        'Kabel<br>Gland',
                    ],

                    colWidths: [300, 150, 75, 75, 75, 75, 100, 100, 100],
                    columns: [
                        { type: 'text' },
                        { type: 'text' },
                        { type: 'text' },
                        { type: 'text' },
                        { type: 'checkbox' },
                        { type: 'checkbox' },
                        { type: 'checkbox' },
                        { type: 'text' },
                        { type: 'text' },
                    ]
                });
            });
        }else{
            $.ajax({
                method: "POST",
                url: BASE_URL + "motor/load",
                data: {
                    id_pabrik: $("#pabrik").val(),
                    id_station: $("#station").val(),
                    periode: $("#periode").val(),
                    tahun : $("#tahun").val(),
                }
            }).done(function (msg) {
                console.log(msg);
                data = JSON.parse(msg);
                console.log(data);
                $('#my-spreadsheet').jexcel({
                    data: data,
                    allowInsertColumn: false,
                    colHeaders: [
                        '<br>Unit',
                        'Suhu Coupling<br>(pulley / gearbox)',
                        'Suhu<br>Bearing',
                        'Suhu<br>Body',
                        'Kondisi<br>Fan',
                        'Seal<br>terminal',
                        'Kabel<br>Gland',
                    ],

                    colWidths: [300,150, 75, 75, 75, 100, 100, 100],
                    columns: [
                        { type: 'text' },
                        { type: 'text' },
                        { type: 'text' },
                        { type: 'text' },
                        { type: 'checkbox' },
                        { type: 'checkbox' },
                        { type: 'checkbox' },
                        { type: 'text' },
                        { type: 'text' },
                    ]
                });
            });

        }
    }

    $("#simpan").click(function () {
        var data_j = $('#my-spreadsheet').jexcel('getData');
        console.log(data_j);

        $.ajax({
            method: "POST",
            url: BASE_URL+"motor/simpan",
            success: sukses,
            data: {
                pabrik: $("#pabrik").val(),
                station: $("#station").val(),
                periode: $("#periode").val(),
                tahun: $("#tahun").val(),

                data_json: JSON.stringify(data_j),
            }
        }).done(function (msg) {
            console.log(msg);
        });
    });

    function ajax_refresh() {
        $.ajax({
            method: "POST",
            url: BASE_URL + "motor/load",
            data: {
                id_pabrik: $("#pabrik").val(),
                id_station: $("#station").val(),
                periode: $("#periode").val(),
                tahun: $("#tahun").val(),
            }
        }).done(function (msg) {
            console.log(msg);
            data = JSON.parse(msg);
            console.log(data);
            refresh(data);
        });
    }


    function station_refresh() {
        $("#station").load(BASE_URL + "station/ajax_dropdown/" + $("#pabrik").val(),
            function (responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    // alert("success");
                    ajax_refresh();
                } else {
                    // alert("gaagal");
                }
            }
        );
    }

    $("#pabrik").change(function () {
        station_refresh();
    });

    $("#station").change(function () {
        ajax_refresh();
    });

    $("#periode").change(function () {
        ajax_refresh();
    });


    var tgl = new Date();
    var m = tgl.getMonth() + 1;
    if (m < 5) {
        $("#periode").val("1");
    } else if (m < 9) {
        $("#periode").val("2");
    } else {
        $("#periode").val("3");
    }

    station_refresh();

});
