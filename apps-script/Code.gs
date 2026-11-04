const SPREADSHEET_ID = "12rL5x4k3GxTMN3zwO_B797Ms29HyZkNoedjpc_XYjeU";
const SHEET_NAME = "댓글";
const MAX_COMMENT_LENGTH = 200;

function doGet() {
  return jsonOutput_({ ok: true, message: "MOVE ON comment API is ready." });
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const payload = JSON.parse(raw);
    const comment = String(payload.comment || "").trim();

    if (!comment) return jsonOutput_({ ok: false, error: "empty_comment" });
    if (comment.length > MAX_COMMENT_LENGTH) {
      return jsonOutput_({ ok: false, error: "comment_too_long" });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getOrCreateSheet_();
      sheet.appendRow([new Date(), comment]);
    } finally {
      lock.releaseLock();
    }

    return jsonOutput_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonOutput_({ ok: false, error: "server_error" });
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["작성 시각", "댓글"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
