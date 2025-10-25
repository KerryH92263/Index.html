/*
  File: app.js
  Purpose:
    Implements the assignment requirements WITHOUT using addEventListener or inline HTML JS.
    We use: decision logic (if/else), loops, string manipulation & validation, functions, and a class/object.
    All user messages are shown via innerHTML. Form submit is used for input. No alerts. No functions in HTML.
*/

"use strict"; // Enforce safer JavaScript

// =======================
// DOM ELEMENT REFERENCES
// =======================

// Get a reference to the form (we'll assign form.onsubmit below; not using addEventListener)
const form = document.getElementById("palForm");

// Get the input field where the user types a phrase
const phraseInput = document.getElementById("phrase");

// Get option checkboxes for how to clean/process the string
const ignoreSpacesChk = document.getElementById("ignoreSpaces");
const ignorePunctChk = document.getElementById("ignorePunct");
const caseInsensitiveChk = document.getElementById("caseInsensitive");

// Get the message panels where we MUST write via innerHTML (per assignment)
const validationMsg = document.getElementById("validationMsg");
const palindromeMsg = document.getElementById("palindromeMsg");
const detailsMsg = document.getElementById("detailsMsg");

// =======================
// CLASS: PalindromeAnalyzer
// =======================
/*
  This class encapsulates our palindrome logic and related string utilities.
  It demonstrates "classes & objects" as required by the assignment.
*/
class PalindromeAnalyzer {
  // Helper to clean a string according to options
  clean(input, opts) {
    // Start with the raw input
    let s = input;

    // If case-insensitive is requested, convert to lower case
    if (opts.caseInsensitive) {
      s = s.toLowerCase();
    }

    // If we should ignore spaces, remove them
    if (opts.ignoreSpaces) {
      // Replace all whitespace with nothing
      s = s.replace(/\s+/g, "");
    }

    // If we should ignore punctuation, strip all non-alphanumeric characters
    if (opts.ignorePunct) {
      // Keep only letters and digits (unicode-safe letters could be handled with \p{L}, but this is fine for class)
      s = s.replace(/[^a-z0-9]/gi, "");
    }

    // Return the cleaned string
    return s;
  }

  // Reverse a string using a simple for-loop (demonstrates "loops")
  reverseWithLoop(input) {
    // Start with an empty result
    let reversed = "";

    // For-loop to iterate from the end of the string to the beginning
    for (let i = input.length - 1; i >= 0; i--) {
      // Build the reversed string one character at a time
      reversed += input[i];
    }

    // Return the reversed string
    return reversed;
  }

  // Check whether a cleaned string is a palindrome
  isPalindrome(cleaned) {
    // Reverse the cleaned string using our loop function
    const reversed = this.reverseWithLoop(cleaned);

    // Decision logic (if/else): compare the cleaned string with its reverse
    if (cleaned.length === 0) {
      // Edge case: empty cleaned string is not considered a valid palindrome here
      return { ok: false, reversed, reason: "Nothing to evaluate after cleaning." };
    } else if (cleaned === reversed) {
      // The text is a palindrome
      return { ok: true, reversed, reason: "" };
    } else {
      // The text is not a palindrome
      return { ok: false, reversed, reason: "" };
    }
  }

  // Provide extra stats/details we can show in the UI
  getStats(raw, cleaned, reversed) {
    return {
      rawLength: raw.length,
      cleanedLength: cleaned.length,
      reversedLength: reversed.length
    };
  }
}

// =======================
// INSTANCE OF OUR CLASS
// =======================

// Create an instance of the PalindromeAnalyzer to use in our handler
const analyzer = new PalindromeAnalyzer();

// =======================
// HELPER: validate input
// =======================
/*
  This function validates the raw input string, demonstrating string manipulation and decision logic.
*/
function validateInput(raw) {
  // Trim whitespace from both ends to avoid accidental spaces being counted as content
  const trimmed = raw.trim();

  // If the trimmed input is empty, return an error message
  if (trimmed.length === 0) {
    return { ok: false, msg: "Please enter some text first. (Input was empty.)" };
  }

  // Optionally, check for a minimum length to avoid trivial inputs like a single character
  if (trimmed.length < 2) {
    return { ok: false, msg: "Please enter at least 2 characters to evaluate." };
  }

  // The input looks OK
  return { ok: true, msg: "Looks good! Submitting for palindrome check…" };
}

// =======================
// FORM SUBMIT HANDLER
// =======================
/*
  IMPORTANT: We are NOT using addEventListener (disallowed).
  We also have NO inline JavaScript in the HTML.
  Instead, we assign to the DOM property form.onsubmit.
*/
form.onsubmit = function (evt) {
  // Prevent the page from reloading on submit
  evt.preventDefault();

  // Read the raw input string from the text box
  const raw = phraseInput.value;

  // Validate the input first
  const valid = validateInput(raw);

  // Show validation feedback using innerHTML (as required)
  validationMsg.innerHTML = valid.ok
    ? `<span class="ok">✅ ${valid.msg}</span>`
    : `<span class="no">⛔ ${valid.msg}</span>`;

  // If validation failed, clear result/details and stop
  if (!valid.ok) {
    palindromeMsg.innerHTML = "No result.";
    detailsMsg.innerHTML = "—";
    return;
  }

  // Build the options object from the checkboxes
  const opts = {
    ignoreSpaces: ignoreSpacesChk.checked,
    ignorePunct: ignorePunctChk.checked,
    caseInsensitive: caseInsensitiveChk.checked
  };

  // Clean the input string according to the selected options
  const cleaned = analyzer.clean(raw, opts);

  // Determine if it's a palindrome (and also get the reversed string)
  const result = analyzer.isPalindrome(cleaned);

  // Compute extra stats about the strings
  const stats = analyzer.getStats(raw, cleaned, result.reversed);

  // Display the palindrome result via innerHTML (required)
  if (result.ok) {
    palindromeMsg.innerHTML = `<span class="ok">🎉 Yes! That’s a palindrome.</span>`;
  } else {
    // If we have a special reason (like nothing left after cleaning), show it;
    // otherwise, just say it's not a palindrome.
    const extra = result.reason ? ` <em>(${result.reason})</em>` : "";
    palindromeMsg.innerHTML = `<span class="no">🙁 Not a palindrome.${extra}</span>`;
  }

  // Display details (cleaned string, reversed string, and lengths) via innerHTML
  detailsMsg.innerHTML = `
    <div><strong>Raw:</strong> ${escapeHtml(raw)}</div>
    <div><strong>Cleaned:</strong> ${escapeHtml(cleaned)}</div>
    <div><strong>Reversed (of cleaned):</strong> ${escapeHtml(result.reversed)}</div>
    <div style="margin-top:0.5rem">
      <strong>Lengths</strong> — raw: ${stats.rawLength},
      cleaned: ${stats.cleanedLength}, reversed: ${stats.reversedLength}
    </div>
  `;
};

// =======================
// UTILITY: escape HTML
// =======================
/*
  This helper demonstrates another small function. It prevents user-provided strings from
  rendering HTML by escaping special characters before we assign innerHTML.
*/
function escapeHtml(s) {
  // Replace characters that have special meaning in HTML with their entity equivalents
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
