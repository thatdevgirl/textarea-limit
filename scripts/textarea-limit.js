// Text area limit - YUI 2.7 implementation.

var Dom = YAHOO.util.Dom;
var Event = YAHOO.util.Event;


// Set the text limit to whatever number of characters you need.
var textLimit = 300;
Dom.get("yui-textarea-limit").innerHTML = textLimit;

// Initialize the text area limit message in the DOM on page load.
updateTextAreaAlert();

// Add listeners to update the text area limit message in the DOM as the user types.
Event.purgeElement("yui-textarea");
Event.addListener("yui-textarea", "keydown", function(e) { checkTextAreaLimit(e); });
Event.addListener("yui-textarea", "keyup",   function()  { updateTextAreaAlert(); });

// Add listener to the "type over the limit" toggle.
Event.purgeElement("yui-textarea-overlimit");
Event.addListener("yui-textarea-overlimit", "click", function() { truncateTextArea(); });


/* -------------------------------------------------------
 * FUNCTION updateTextAreaAlert()
 *     Updates the text area limit message in the DOM.
 * ------------------------------------------------------- */

function updateTextAreaAlert() {
	// Get the number of characters currently in the text area field.
	var text = Dom.get("yui-textarea").value;
	var charsUsed = text.length || 0;
	
	// Change message color if user has entered in 100% or more of the character limit; truncate text if necessary.
	if (charsUsed >= textLimit) {
		Dom.addClass("yui-textarea-chars", "over-limit");
		truncateTextArea();
	} 
	
	// Change message color if user has entered in at least 90% of the character limit.
	else if (charsUsed >= textLimit * 0.9) {
		Dom.addClass("yui-textarea-chars", "near-limit");
	} 
	
	// Otherwise, display the number of characters entered without any warning colors. 
    else {
		Dom.removeClass("yui-textarea-chars", "near-limit");
		Dom.removeClass("yui-textarea-chars", "over-limit");
	}
	
    // Update the DOM with the number of characters used in the text area.
	Dom.get("yui-textarea-chars").innerHTML = charsUsed;
}

/* -------------------------------------------------------
 * FUNCTION allowOverLimit()
 *     Checks "type over the limit" toggle.
 *     Returns: value of the toggle (boolean).
 * ------------------------------------------------------- */

function allowOverLimit() {
    var overLimitToggle = Dom.get("yui-textarea-overlimit").checked;
    return overLimitToggle;
}

/* -------------------------------------------------------
 * FUNCTION checkTextAreaLimit()
 *     Checks to see if value of the text area is over
 *     the limit; if so, truncates the text.
 *     Used on key-down to prevent text from jumping.
 * ------------------------------------------------------- */

function checkTextAreaLimit(e) {
	var text = Dom.get("yui-textarea").value;
	
	// Check to see if a delete key was pressed; backspace is 8; delete is 46.
	var key = (window.event) ? e.which: e.keyCode;
	var pressedDel = (key == 8 || key == 46) ? true : false;
	
	// Suppress the added text and truncate the text area value if the "tyoe over the limit" toggle is 
	// not checked; the text is over the character limit, and the user has not pressed a delete key.
	if (!allowOverLimit() && text.length >= textLimit && !pressedDel) {
		Event.preventDefault(e);
		truncateTextArea();
	}
}

/* -------------------------------------------------------
 * FUNCTION truncateTextArea()
 *     Truncates the text in the text area if the "type
 *     over the limit" toggle is not checked.
 * ------------------------------------------------------- */

function truncateTextArea() {
	var text = Dom.get("yui-textarea").value;
	
    if (!allowOverLimit()) {
    	Dom.get("yui-textarea").value = Dom.get("yui-textarea").value.substring(0, textLimit);
    	Dom.get("yui-textarea-chars").innerHTML = Dom.get("yui-textarea").value.length;
    }
}