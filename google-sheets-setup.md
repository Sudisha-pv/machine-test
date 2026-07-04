# Google Sheets Setup Guide

Follow these steps to connect your contact form submissions to a Google Sheet:

## 1. Create a New Google Sheet
1. Open [Google Sheets](https://sheets.google.com).
2. Create a blank spreadsheet.
3. You can optionally name your sheet (e.g. `Contact Submissions`), but the script will work automatically with whatever name you choose.

## 2. Add the Google Apps Script
1. In the top menu of your Google Sheet, click on **Extensions** -> **Apps Script**.
2. Delete any default code inside the editor (`function myFunction() { ... }`).
3. Open the [google-apps-script.js](file:///d:/sudu/google-apps-script.js) file from your project root.
4. Copy the entire contents of `google-apps-script.js` and paste it into the Apps Script editor.
5. Click the **Save** icon (floppy disk) or press `Ctrl + S` (`Cmd + S` on Mac) to save the project.

## 3. Deploy the Apps Script as a Web App
1. In the top right of the Apps Script page, click **Deploy** -> **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Contact Form API` (or any name you like)
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** (⚠️ *This is critical so the website can send data to it!*)
4. Click **Deploy**.
5. Google will prompt you to authorize access. Click **Authorize access**, choose your Google account, click **Advanced** at the bottom, then click **Go to Untitled project (unsafe)** and click **Allow**.
6. Once deployed, copy the **Web app URL** (it ends with `/exec`).

## 4. Update your Environment Variables
1. Open the [.env](file:///d:/sudu/.env) file in your project root.
2. Replace the value of `VITE_GOOGLE_SHEETS_SCRIPT_URL` with the Web App URL you just copied:
   ```env
   VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXX/exec
   ```
3. Save the `.env` file.
4. If you have a local dev server running, restart it to load the new environment variables (`Ctrl + C` and then run `npm run dev` again).

---

### How to Test It
1. Once set up, open the site locally and submit the contact form.
2. Open your Google Sheet, and you should see a new row automatically appear containing the timestamp, name, email, phone, subject, and message!
