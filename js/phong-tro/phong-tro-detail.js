// =========================================================
// XEM CHI TIẾT PHÒNG
// =========================================================

async function xemChiTiet(id) {

    try {

        const phong =
            await getPhongById(id);

        const danhSachAnh =
            await getAnhPhong(id);

        hienThiChiTiet(
            phong,
            danhSachAnh
        );

    } catch (error) {

        console.error(
            "Không thể tải chi tiết phòng:",
            error
        );

        alert(
            "Không thể tải thông tin phòng."
        );
    }
}


// =========================================================
// HIỂN THỊ CHI TIẾT
// =========================================================

function hienThiChiTiet(
    phong,
    danhSachAnh
) {

    const modal =
        document.getElementById("roomModal");

    const container =
        document.getElementById("chiTietPhong");


    if (!modal || !container) {
        return;
    }


    const anh =
        Array.isArray(danhSachAnh)
            ? danhSachAnh
            : [];


    const anhDaiDien =
        anh.find(function (item) {

            return item.laAnhDaiDien === true;

        }) || anh[0] || null;


    const urlAnhChinh =
        anhDaiDien
            ? taoUrlAnh(
                anhDaiDien.duongDan ||
                anhDaiDien.url ||
                anhDaiDien.tenFile
            )
            : "";


    // =====================================================
    // GALLERY
    // =====================================================

    let galleryHtml = "";


    if (anh.length > 0) {

        galleryHtml = `

            <div class="detail-gallery">

                <img
                    id="anhChinhChiTiet"
                    src="${escapeHtml(urlAnhChinh)}"
                    alt="Ảnh phòng"
                >


                <div class="detail-thumbnails">

                    ${
                        anh.map(function (
                            item,
                            index
                        ) {

                            const url =
                                taoUrlAnh(
                                    item.duongDan ||
                                    item.url ||
                                    item.tenFile
                                );


                            return `

                                <img
                                    src="${escapeHtml(url)}"
                                    alt="Ảnh ${index + 1}"
                                    class="detail-thumbnail ${
                                        index === 0
                                            ? "active"
                                            : ""
                                    }"
                                    onclick="doiAnhChiTiet(
                                        '${escapeJs(url)}',
                                        this
                                    )"
                                >

                            `;

                        }).join("")
                    }

                </div>

            </div>

        `;

    } else {

        galleryHtml = `

            <div class="detail-gallery no-image">

                Không có ảnh phòng

            </div>

        `;
    }


    // =====================================================
    // THÔNG TIN PHÒNG
    // =====================================================

    const tenPhong =
        phong.tenPhong ||
        phong.maPhong ||
        "Phòng trọ";


    const giaPhong =
        formatTien(
            phong.giaPhong
        );


    const trangThai =
        phong.trangThai ||
        "Không xác định";


    container.innerHTML = `

        ${galleryHtml}


        <div class="detail-content">

            <h2 class="detail-title">

                ${escapeHtml(tenPhong)}

            </h2>


            <div class="detail-price">

                ${giaPhong}

                <span>
                    / tháng
                </span>

            </div>


            <div class="detail-address">

                📍

                ${escapeHtml(
                    phong.diaChi ||
                    phong.tenKhuVuc ||
                    "Chưa có địa chỉ"
                )}

            </div>


            <div class="detail-grid">


                <div class="detail-item">

                    <strong>
                        Diện tích
                    </strong>

                    <span>
                        ${phong.dienTich || 0} m²
                    </span>

                </div>


                <div class="detail-item">

                    <strong>
                        Số người tối đa
                    </strong>

                    <span>
                        ${phong.soNguoiToiDa || 0} người
                    </span>

                </div>


                <div class="detail-item">

                    <strong>
                        Loại phòng
                    </strong>

                    <span>

                        ${escapeHtml(
                            phong.tenLoaiPhong ||
                            phong.loaiPhong?.tenLoaiPhong ||
                            "Chưa cập nhật"
                        )}

                    </span>

                </div>


                <div class="detail-item">

                    <strong>
                        Khu vực
                    </strong>

                    <span>

                        ${escapeHtml(
                            phong.tenKhuVuc ||
                            phong.khuVuc?.tenKhuVuc ||
                            "Chưa cập nhật"
                        )}

                    </span>

                </div>


                <div class="detail-item">

                    <strong>
                        Trạng thái
                    </strong>

                    <span>

                        ${escapeHtml(
                            trangThai
                        )}

                    </span>

                </div>


            </div>


            <div class="detail-description">

                <h3>
                    Mô tả
                </h3>


                <p>

                    ${escapeHtml(
                        phong.moTa ||
                        "Chưa có mô tả."
                    )}

                </p>

            </div>


            <button
                type="button"
                class="contact-button"
                onclick="lienHePhong(${phong.id})"
            >

                💬 Liên hệ qua Zalo

            </button>


        </div>

    `;


    modal.style.display =
        "flex";


    document.body.style.overflow =
        "hidden";
}


// =========================================================
// ĐỔI ẢNH CHI TIẾT
// =========================================================

function doiAnhChiTiet(
    url,
    element
) {

    const anhChinh =
        document.getElementById(
            "anhChinhChiTiet"
        );


    if (
        anhChinh &&
        url
    ) {

        anhChinh.src =
            url;
    }


    const thumbnails =
        document.querySelectorAll(
            ".detail-thumbnail"
        );


    thumbnails.forEach(
        function (item) {

            item.classList.remove(
                "active"
            );

        }
    );


    if (element) {

        element.classList.add(
            "active"
        );

    }
}


// =========================================================
// LIÊN HỆ QUA ZALO
// =========================================================

function lienHePhong(id) {

    const modal =
        document.getElementById(
            "zaloModal"
        );


    if (!modal) {

        console.error(
            "Không tìm thấy zaloModal"
        );

        return;
    }


    modal.style.display =
        "flex";


    document.body.style.overflow =
        "hidden";
}


// =========================================================
// ĐÓNG QR ZALO
// =========================================================

function dongZalo() {

    const modal =
        document.getElementById(
            "zaloModal"
        );


    if (!modal) {
        return;
    }


    modal.style.display =
        "none";


    document.body.style.overflow =
        "hidden";
}


// =========================================================
// ĐÓNG CHI TIẾT PHÒNG
// =========================================================

function dongChiTiet() {

    const modal =
        document.getElementById(
            "roomModal"
        );


    if (!modal) {
        return;
    }


    modal.style.display =
        "none";


    document.body.style.overflow =
        "";
}


// =========================================================
// CLICK RA NGOÀI MODAL
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const zaloModal =
            document.getElementById(
                "zaloModal"
            );


        if (zaloModal) {

            zaloModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        zaloModal
                    ) {

                        dongZalo();

                    }

                }
            );

        }

    }
);