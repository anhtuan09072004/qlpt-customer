// =========================================================
// BIẾN TOÀN CỤC
// =========================================================

let danhSachPhong = [];


// =========================================================
// KHI TRANG ĐƯỢC TẢI
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // Tải khu vực từ Database
    loadKhuVuc();

    // Tải loại phòng từ Database
    loadLoaiPhong();

    // Tải danh sách phòng
    loadPhong();


    // =====================================================
    // ĐÓNG MODAL KHI CLICK RA NGOÀI
    // =====================================================

    const modal =
        document.getElementById("roomModal");

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    dongChiTiet();
                }

            }
        );

    }


    // =====================================================
    // ĐÓNG MODAL BẰNG PHÍM ESC
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.style.display === "flex"
            ) {

                dongChiTiet();

            }

        }
    );

});