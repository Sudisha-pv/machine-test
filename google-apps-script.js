// Google Apps Script code for Contact Form Submissions
// Copy this entire code and follow the instructions in google-sheets-setup.md

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ result: "success", message: "Unique Hashtagers Contact Apps Script is live!" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if sheet has a header row, if not create one
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Subject", "Message"]);
    }
    
    // Parse the JSON payload
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = new Date();
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var subject = data.subject || "";
    var message = data.message || "";
    
    // Append the row to Google Sheets
    sheet.appendRow([timestamp, name, email, phone, subject, message]);
    
    // Return a success JSON response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (error) {
    // Return an error JSON response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}
