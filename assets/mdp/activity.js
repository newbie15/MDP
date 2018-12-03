$(document).ready(function () {
    dx = [];
    data = [];
    data_detail = {};
    keterangan_detail = [];
    data_detailnya = "";
    no_wo_aktif = "";

    var option2 = "";

    function add(no) {
        var sama = 0;
        var index = 0;
        dx = $('#my-spreadsheet').jexcel('getData');
        console.log(dx);
        dx.forEach(element => {
            if (no == element[0]) {
                sama = 1;
            }
            index++;
        });
        $("#wo").val("");
        if (sama == 0) {
            if(dx.length==1){
                if(dx[0][0]==""){ // kosong
                    dx[0][0] = no;
                }else{ // isi satu
                    dx.push([no, "", "", ""]);
                }
            }else{ // isi lebih dari 1
                dx.push([no, "", "", ""]);
            }
            refresh(dx);
        }
        $("#wo").val("");
    }

    function detail_refresh(no) {
        if (keterangan_detail[no] == undefined) {
            console.log("g ada");
            $.ajax({
                method: "POST",
                url: BASE_URL + "wo/detail_wo/" + no,
            }).done(function (msg) {
                console.log(msg);
                data = JSON.parse(msg);
                console.log(data);
                // refresh(data);
                var t = "";
                t += "Station : " + data['station'] + "<br>";
                t += "Unit : " + data['unit'] + "<br>";
                t += "Problem : " + data['problem'] + "<br>";
                t += "Desc Problem : " + data['desc_masalah'] + "<br>";
                $("#keterangan").html(t);
                keterangan_detail[no] = t;
            });
        } else {
            $("#keterangan").html(keterangan_detail[no]);
            console.log("ada");
        }

        if(data_detail[no_wo_aktif]==undefined){
            data_detail[no_wo_aktif] = [["","","",""]];
            data_detailnya = data_detail[no_wo_aktif];            
        }else{
            data_detailnya = data_detail[no_wo_aktif];
        }

        $('#my-spreadsheet2').jexcel({
            allowInsertColumn: false,
            data: data_detailnya,
            allowInsertColumn: false,
            onchange: handler,
            colHeaders: [
                'Nama Teknisi',
                'Target<br>Jam<br>Mulai',
                'Target<br>Jam<br>Selesai',
                'Real<br>Jam<br>Mulai',
                'Real<br>Jam<br>Selesai',
                'Durasi',
            ],
            colWidths: [150, 50, 53, 50, 53, 100, 75, 80, 80],
            columns: [
                { type: 'autocomplete', url: BASE_URL + 'karyawan/ajax/' + $("#pabrik").val() },
                { type: 'text', mask: '##:##' },
                { type: 'text', mask: '##:##' },
                { type: 'text', mask: '##:##' },
                { type: 'text', mask: '##:##' },
                { type: 'text' },
            ]
        });

    }

    function refresh(data) {
        handler = function (obj, cell, val) {
            data_detail[no_wo_aktif] = $('#my-spreadsheet2').jexcel('getData');
            pos = $(cell).prop('id').split("-");

            console.log(pos);

            dt_start = data_detail[no_wo_aktif][pos[1]][3];
            dt_stop = data_detail[no_wo_aktif][pos[1]][4];

            if(dt_start!="" && dt_stop!="" && (pos[0]==3 || pos[0]==4)){
                var date1 = new Date("08/05/2015 "+ dt_start+":00");
                var date2 = new Date("08/05/2015 "+ dt_stop +":00");

                var diff = date2.getTime() - date1.getTime();
                if(diff<0){
                    date2 = new Date("08/06/2015 " + dt_stop + ":00");
                    diff = date2.getTime() - date1.getTime();
                }

                console.log("diff ="+diff);
                var msec = diff;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                console.log(hh);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                console.log(mm);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                hour = "";
                min = "";

                if (hh < 10) { hour = "0" + hh.toString(); } else { hour = hh.toString(); }
                if (mm < 10) { min = "0" + mm.toString(); } else { min = mm.toString(); }

                console.log(hour + ':' + min);
                console.log(hh + ':' + mm);

                $("#my-spreadsheet2").jexcel('setValue', 'F' + (parseInt(pos[1])+1).toString() ,hour+':'+min);
                // data_detail[no_wo_aktif][0][5] = hour + ':' + min;
                // data_detail[no_wo_aktif] = $('#my-spreadsheet2').jexcel('getData');
            }

        };

        selection = function (obj, cell, val) {
            var pos = $(cell).prop('id').split("-");

            console.log('Cell select: ' + $(cell).prop('id'));
            var value = pos[1];
            var data = $("#my-spreadsheet").jexcel('getRowData', value)
            console.log(data);
            // data_detail[value] = $('#my-spreadsheet2').jexcel('getData');
            if(data[0]!=""){
                // console.log("ada");
                $("#side-note").show();
                no_wo_aktif = data[0];
                detail_refresh(no_wo_aktif);
            }else{
                console.log("kosong");
                $("#side-note").hide();
            }
        }

        if (data == undefined) {
            data = [];
        }

        $('#my-spreadsheet').jexcel({
            data: data,
            allowInsertColumn: false,
            colHeaders: [
                'No WO',
                'Perbaikan',
                'Jenis<br>Breakdown',
                'Jenis<br>Problem'
            ],
            colWidths: [160, 230, 95, 90, 50, 100, 60, 100, 100],
            columns: [
                { type: 'autocomplete', url: BASE_URL+'wo/ajax/open/' + $("#pabrik").val() },
                { type: 'text', wordWrap: true },
                { type: 'dropdown', source: ['unit', 'line', 'pabrik'] },
                { type: 'dropdown', source: ['alat', 'proses'] },
            ],
            // onfocus: selection,
            onselection:selection,
        });
        detail_refresh();
    }


    $("#pabrik").change(function () {
        ajax_refresh();
        $("#side-note").hide();
    });
    $("#tahun").change(function () {
        ajax_refresh();
        $("#side-note").hide();
    });
    $("#bulan").change(function () {
        ajax_refresh();
        $("#side-note").hide();
    });
    $("#tanggal").change(function () {
        ajax_refresh();
        $("#side-note").hide();
    });

    $("#wo").keydown(function (e) {
        if (e.which == 13 && $(this).val() != "") {
            var t = $(this).val();
            $(this).val("");
            var x = t.split(" - ");
            console.log(x.length);
            console.log(t);
            add(x[0]);
        }
    });

    $("#tambah").click(function(){
        if ($("#wo").val()!=""){
            var t = $("#wo").val().split(' - ');
            add(t[0]);
            console.log(t[0]);
        }
    });

    $("#simpan").click(function () {
        var data_j = $('#my-spreadsheet').jexcel('getData');
        console.log(data_j);
        console.log(JSON.stringify(data_detail));

        $.ajax({
            method: "POST",
            url: BASE_URL+"activity/simpan",
            data: {
                pabrik: $("#pabrik").val(),
                d: $("#tanggal").val(),
                m: $("#bulan").val(),
                y: $("#tahun").val(),
                data_json: JSON.stringify(data_j),
                detail: JSON.stringify(Object.assign({}, data_detail)),
            }
        }).done(function (msg) {
            console.log(msg);
        });
    });

    function ajax_refresh() {
        options2 = {
            url: BASE_URL + "wo/list_open/" + $("#pabrik").val(),
            getValue: "daftar",
            requestDelay: 500,
            list: {
                match: {
                    enabled: true
                }
            }
        };

        $("#wo").easyAutocomplete(options2);

        $.ajax({
            method: "POST",
            url: BASE_URL + "activity/load",
            data: {
                id_pabrik: $("#pabrik").val(),
                d: $("#tanggal").val(),
                m: $("#bulan").val(),
                y: $("#tahun").val(),
            }
        }).done(function (msg) {
            console.log(msg);
            data = JSON.parse(msg);
            console.log(data);
            refresh(data);
        });

        $.ajax({
            method: "POST",
            url: BASE_URL + "activity/load_detail",
            data: {
                id_pabrik: $("#pabrik").val(),
                d: $("#tanggal").val(),
                m: $("#bulan").val(),
                y: $("#tahun").val(),
            }
        }).done(function (msg) {
            console.log("detail");
            // console.log(msg);
            data = JSON.parse(msg);
            // console.log(data);
            // // refresh(data);
            // var obj = data.reduce(function (acc, cur, i) {
            //     acc[i] = cur;
            //     return acc;
            // }, {});
            console.log(data_detail);
            data_detail = data;
            console.log(data_detail);

            // data.forEach(element => {
            //     console.log(element);
            // });
        });
    }

    var tgl = new Date();
    var m = tgl.getMonth() + 1;
    if (m < 10) {
        $("#bulan").val("0" + m.toString());
    } else {
        $("#bulan").val(m.toString());
    }
    var y = tgl.getFullYear();
    $("#tahun").val(y.toString());
    var d = tgl.getDate();
    if (d < 10) {
        $("#tanggal").val("0" + d.toString());
    } else {
        $("#tanggal").val(d.toString());
    }

    options2 = {
        url: BASE_URL + "wo/list_open/" + $("#pabrik").val() ,
        getValue: "daftar",
        requestDelay: 500,
        list: {
            match: {
                enabled: true
            }
        }
    };
    
    $("#wo").easyAutocomplete(options2);
    $("#side-note").hide();

    ajax_refresh();

});
