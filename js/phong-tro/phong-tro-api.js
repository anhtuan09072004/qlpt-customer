const API = "https://nguyenanhtuan.taila7e632.ts.net/api/phong-tro";
const HINH_ANH_API = "https://nguyenanhtuan.taila7e632.ts.net/api/hinh-anh";
const IMAGE_BASE_URL = "https://nguyenanhtuan.taila7e632.ts.net";
const KHU_VUC_API = "https://nguyenanhtuan.taila7e632.ts.net/api/khu-vuc";
const LOAI_PHONG_API = "https://nguyenanhtuan.taila7e632.ts.net/api/loai-phong";

async function loadPhong() {
    hienThiLoading();

    try {
        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Không thể kết nối Backend");
        }

        danhSachPhong = await response.json();

        await ganAnhDaiDien(danhSachPhong);

        hienThiPhong(danhSachPhong);

    } catch (error) {
        console.error(error);
        hienThiLoi();
    }
}


async function guiBoLoc(boLoc) {
    hienThiLoading();

    try {
        const response = await fetch(`${API}/loc/nang-cao`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boLoc)
        });

        if (!response.ok) {
            throw new Error("Lỗi API lọc phòng");
        }

        const data = await response.json();

        danhSachPhong = data;

        await ganAnhDaiDien(danhSachPhong);

        hienThiPhong(danhSachPhong);

    } catch (error) {
        console.error(error);
        hienThiLoi();
    }
}


async function getPhongById(id) {
    const response = await fetch(`${API}/${id}`);

    if (!response.ok) {
        throw new Error("Không tìm thấy phòng");
    }

    return await response.json();
}


async function getAnhPhong(id) {
    try {
        const response = await fetch(`${HINH_ANH_API}/phong/${id}`);

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        return Array.isArray(data) ? data : [];

    } catch (error) {
        console.warn("Không thể tải ảnh phòng:", id, error);
        return [];
    }
}


async function loadKhuVuc() {
    const select = document.getElementById("khuVucId");

    if (!select) {
        return;
    }

    try {
        const response = await fetch(KHU_VUC_API);

        if (!response.ok) {
            throw new Error("Không thể lấy danh sách khu vực");
        }

        const danhSach = await response.json();

        select.innerHTML = `<option value="">Tất cả khu vực</option>`;

        if (!Array.isArray(danhSach)) {
            return;
        }

        danhSach.forEach(function (item) {
            select.innerHTML += `
                <option value="${item.id}">
                    ${escapeHtml(item.tenKhuVuc || item.ten || "")}
                </option>
            `;
        });

    } catch (error) {
        console.error("Lỗi tải khu vực:", error);
    }
}


async function loadLoaiPhong() {
    const select = document.getElementById("loaiPhongId");

    if (!select) {
        return;
    }

    try {
        const response = await fetch(LOAI_PHONG_API);

        if (!response.ok) {
            throw new Error("Không thể lấy danh sách loại phòng");
        }

        const danhSach = await response.json();

        select.innerHTML = `<option value="">Tất cả loại phòng</option>`;

        if (!Array.isArray(danhSach)) {
            return;
        }

        danhSach.forEach(function (item) {
            select.innerHTML += `
                <option value="${item.id}">
                    ${escapeHtml(item.tenLoaiPhong || item.ten || "")}
                </option>
            `;
        });

    } catch (error) {
        console.error("Lỗi tải loại phòng:", error);
    }
}
