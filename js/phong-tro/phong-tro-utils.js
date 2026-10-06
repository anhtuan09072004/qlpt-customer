// =========================================================
// TIỆN ÍCH DÙNG CHUNG
// =========================================================


// =========================================================
// ĐỊNH DẠNG TIỀN
// =========================================================

function formatTien(tien) {

    const soTien = Number(tien || 0);

    return soTien.toLocaleString("vi-VN") + " đ";
}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================================================
// ESCAPE JAVASCRIPT
// =========================================================

function escapeJs(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n");
}