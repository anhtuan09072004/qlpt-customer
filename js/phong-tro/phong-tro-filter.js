// =========================================================
// TÌM KIẾM PHÒNG
// =========================================================

async function timKiemPhong() {

    const tuKhoaElement =
        document.getElementById("tuKhoa");

    const khuVucElement =
        document.getElementById("khuVucId");

    const loaiPhongElement =
        document.getElementById("loaiPhongId");


    const tuKhoa =
        tuKhoaElement
            ? tuKhoaElement.value.trim()
            : "";


    const khuVucId =
        khuVucElement
            ? khuVucElement.value
            : "";


    const loaiPhongId =
        loaiPhongElement
            ? loaiPhongElement.value
            : "";


    // Không nhập điều kiện nào
    if (
        !tuKhoa &&
        !khuVucId &&
        !loaiPhongId
    ) {

        loadPhong();

        return;
    }


    const boLoc = {

        tuKhoa:
            tuKhoa || null,

        khuVucId:
            khuVucId
                ? Number(khuVucId)
                : null,

        loaiPhongId:
            loaiPhongId
                ? Number(loaiPhongId)
                : null

    };


    await guiBoLoc(boLoc);
}


// =========================================================
// LỌC NÂNG CAO
// =========================================================

async function locNangCao() {

    const boLoc = {

        giaTu:
            laySo("giaTu"),

        giaDen:
            laySo("giaDen"),

        dienTichTu:
            laySo("dienTichTu"),

        dienTichDen:
            laySo("dienTichDen"),

        khuVucId:
            laySo("khuVucId"),

        loaiPhongId:
            laySo("loaiPhongId"),

        soNguoiToiDa:
            laySo("soNguoiToiDa"),

        trangThai:
            layGiaTri("trangThai")

    };


    console.log(
        "Bộ lọc gửi Backend:",
        boLoc
    );


    await guiBoLoc(boLoc);
}


// =========================================================
// SẮP XẾP PHÒNG
// =========================================================

function sapXepPhong() {

    const select =
        document.getElementById("sapXep");


    if (!select) {
        return;
    }


    const kieu =
        select.value;


    let data =
        Array.isArray(danhSachPhong)
            ? [...danhSachPhong]
            : [];


    // Giá thấp → cao
    if (kieu === "giaTang") {

        data.sort(function (a, b) {

            return (
                Number(a.giaPhong || 0) -
                Number(b.giaPhong || 0)
            );

        });

    }


    // Giá cao → thấp
    if (kieu === "giaGiam") {

        data.sort(function (a, b) {

            return (
                Number(b.giaPhong || 0) -
                Number(a.giaPhong || 0)
            );

        });

    }


    // Diện tích tăng dần
    if (kieu === "dienTichTang") {

        data.sort(function (a, b) {

            return (
                Number(a.dienTich || 0) -
                Number(b.dienTich || 0)
            );

        });

    }


    // Diện tích giảm dần
    if (kieu === "dienTichGiam") {

        data.sort(function (a, b) {

            return (
                Number(b.dienTich || 0) -
                Number(a.dienTich || 0)
            );

        });

    }


    hienThiPhong(data);
}


// =========================================================
// XÓA BỘ LỌC
// =========================================================

function resetBoLoc() {

    const ids = [

        "tuKhoa",
        "khuVucId",
        "loaiPhongId",
        "giaTu",
        "giaDen",
        "dienTichTu",
        "dienTichDen",
        "soNguoiToiDa",
        "trangThai",
        "sapXep"

    ];


    ids.forEach(function (id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }

    });


    loadPhong();
}


// =========================================================
// LẤY SỐ TỪ INPUT / SELECT
// =========================================================

function laySo(id) {

    const element =
        document.getElementById(id);


    if (!element) {
        return null;
    }


    const value =
        element.value;


    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    const number =
        Number(value);


    if (Number.isNaN(number)) {
        return null;
    }


    return number;
}


// =========================================================
// LẤY GIÁ TRỊ SELECT
// =========================================================

function layGiaTri(id) {

    const element =
        document.getElementById(id);


    if (!element) {
        return null;
    }


    const value =
        element.value;


    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    return value;
}