function getRootElementFontSize() {
    return parseFloat(
        getComputedStyle(
            document.documentElement
        ).fontSize
    );
}

function remConvertToPx(value) {
    return value * getRootElementFontSize();
}

function pxConvertToRem(value) {
    return value / getRootElementFontSize();
}

exports.remConvertToPx = remConvertToPx;
exports.pxConvertToRem = pxConvertToRem;
