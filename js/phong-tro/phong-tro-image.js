// =========================================================
// XỬ LÝ HÌNH ẢNH PHÒNG
// =========================================================


// =========================================================
// LẤY ẢNH ĐẠI DIỆN CHO DANH SÁCH PHÒNG
// =========================================================

async function ganAnhDaiDien(danhSach) {

    if (!Array.isArray(danhSach)) {
        return;
    }

    await Promise.all(

        danhSach.map(async function (phong) {

            try {

                const response = await fetch(
                    `${HINH_ANH_API}/phong/${phong.id}`
                );

                if (!response.ok) {
                    phong.anhDaiDien = null;
                    return;
                }

                const danhSachAnh = await response.json();

                if (
                    !Array.isArray(danhSachAnh) ||
                    danhSachAnh.length === 0
                ) {
                    phong.anhDaiDien = null;
                    return;
                }

                // Ưu tiên ảnh được đánh dấu là ảnh đại diện
                const anhDaiDien = danhSachAnh.find(
                    function (anh) {
                        return anh.laAnhDaiDien === true;
                    }
                );

                // Nếu không có ảnh đại diện
                // thì lấy ảnh đầu tiên
                phong.anhDaiDien =
                    anhDaiDien ||
                    danhSachAnh[0] ||
                    null;

            } catch (error) {

                console.warn(
                    "Không lấy được ảnh phòng:",
                    phong.id,
                    error
                );

                phong.anhDaiDien = null;
            }

        })

    );
}


// =========================================================
// TẠO URL ẢNH
// =========================================================

function taoUrlAnh(duongDan) {

    if (!duongDan) {
        return "";
    }


    // URL đầy đủ
    if (
        duongDan.startsWith("http://") ||
        duongDan.startsWith("https://")
    ) {
        return duongDan;
    }


    // Đường dẫn bắt đầu bằng /
    // Ví dụ: /uploads/phong1.jpg
    if (duongDan.startsWith("/")) {

        return IMAGE_BASE_URL + duongDan;

    }


    // Đường dẫn dạng:
    // uploads/phong1.jpg

    return IMAGE_BASE_URL + "/" + duongDan;
}