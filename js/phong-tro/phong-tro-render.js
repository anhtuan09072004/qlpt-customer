// =========================================================
// HIỂN THỊ DANH SÁCH PHÒNG
// =========================================================

function hienThiPhong(danhSach) {

    const container =
        document.getElementById("danhSachPhong");

    const empty =
        document.getElementById("khongCoPhong");

    const soLuong =
        document.getElementById("soLuongPhong");


    if (!container) {
        return;
    }


    // Xóa nội dung cũ
    container.innerHTML = "";


    // Cập nhật số lượng
    if (soLuong) {
        soLuong.textContent =
            Array.isArray(danhSach)
                ? danhSach.length
                : 0;
    }


    // Không có phòng
    if (
        !Array.isArray(danhSach) ||
        danhSach.length === 0
    ) {

        if (empty) {
            empty.style.display = "block";
        }

        return;
    }


    // Có phòng
    if (empty) {
        empty.style.display = "none";
    }


    danhSach.forEach(function (phong) {

        const card =
            document.createElement("div");

        card.className = "room-card";


        // -------------------------------------------------
        // ẢNH
        // -------------------------------------------------

        let urlAnh =
            phong.anhDaiDien
                ? taoUrlAnh(
                    phong.anhDaiDien.duongDan ||
                    phong.anhDaiDien.url ||
                    phong.anhDaiDien.tenFile
                )
                : "";


        const anhHtml = urlAnh
            ? `
                <img
                    src="${escapeHtml(urlAnh)}"
                    alt="${escapeHtml(phong.tenPhong || "Phòng trọ")}"
                    class="room-image"
                    onerror="this.style.display='none';"
                >
            `
            : `
                <div class="room-image no-image">
                    Không có ảnh
                </div>
            `;


        // -------------------------------------------------
        // TRẠNG THÁI
        // -------------------------------------------------

        const trangThai =
            phong.trangThai || "Không xác định";


        const trangThaiClass =
            trangThai === "Còn phòng"
                ? "available"
                : trangThai === "Đã thuê"
                    ? "rented"
                    : "repair";


        // -------------------------------------------------
        // CARD
        // -------------------------------------------------

        card.innerHTML = `

            ${anhHtml}

            <div class="room-body">

                <h3 class="room-title">
                    ${escapeHtml(
                        phong.tenPhong ||
                        phong.maPhong ||
                        "Phòng trọ"
                    )}
                </h3>


                <div class="room-price">
                    ${formatTien(phong.giaPhong)}
                    <span>/ tháng</span>
                </div>


                <div class="room-address">
                    📍
                    ${escapeHtml(
                        phong.diaChi ||
                        phong.tenKhuVuc ||
                        "Chưa có địa chỉ"
                    )}
                </div>


                <div class="room-info">

                    <span>
                        📐
                        ${phong.dienTich || 0} m²
                    </span>

                    <span>
                        👥
                        ${phong.soNguoiToiDa || 0} người
                    </span>

                </div>


                <div class="room-status ${trangThaiClass}">
                    ${escapeHtml(trangThai)}
                </div>


                <button
                    type="button"
                    class="room-button"
                    onclick="xemChiTiet(${phong.id})"
                >
                    Xem chi tiết
                </button>

            </div>
        `;


        container.appendChild(card);

    });
}


// =========================================================
// HIỂN THỊ LOADING
// =========================================================

function hienThiLoading() {

    const container =
        document.getElementById("danhSachPhong");

    const empty =
        document.getElementById("khongCoPhong");


    if (empty) {
        empty.style.display = "none";
    }


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="loading">

            <div class="loading-spinner"></div>

            <p>
                Đang tải danh sách phòng...
            </p>

        </div>

    `;
}


// =========================================================
// HIỂN THỊ LỖI
// =========================================================

function hienThiLoi() {

    const container =
        document.getElementById("danhSachPhong");


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="error-message">

            <h3>
                Không thể tải danh sách phòng
            </h3>

            <p>
                Vui lòng kiểm tra Backend
                và thử lại.
            </p>

            <button
                type="button"
                onclick="loadPhong()"
            >
                Thử lại
            </button>

        </div>

    `;
}