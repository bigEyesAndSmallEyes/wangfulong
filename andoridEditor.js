/**
 * Copyright (C) 2017 Wasabeef
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var RE = {};

RE.currentSelection = {
    "startContainer": 0,
    "startOffset": 0,
    "endContainer": 0,
    "endOffset": 0};

RE.editor = document.getElementById('editor');

document.addEventListener("selectionchange", function() { RE.backuprange(); });

// Initializations
//RE.callback = function() {
//    window.location.href = "re-callback://" + encodeURI(RE.getHtml());
//}

/*overwrite callback*/
RE.callback = function(event) {
    console.log(event);
    //TODO：
//    window.location.href = "re-callback://" + encodeURI(JSON.stringify({html: RE.getHtml().toString(), state: [], keyValue: event ? event.data.toString() : 'null', imageUrl: 'null'}));
}

RE.setHtml = function(contents) {
    RE.editor.innerHTML = decodeURIComponent(contents.replace(/\+/g, '%20'));
}

RE.getHtml = function() {
    return RE.editor.innerHTML;
}

RE.getText = function() {
    return RE.editor.innerText;
}

RE.setBaseTextColor = function(color) {
    RE.editor.style.color  = color;
}

RE.setBaseFontSize = function(size) {
    RE.editor.style.fontSize = size;
}

RE.setPadding = function(left, top, right, bottom) {
  RE.editor.style.paddingLeft = left;
  RE.editor.style.paddingTop = top;
  RE.editor.style.paddingRight = right;
  RE.editor.style.paddingBottom = bottom;
}

RE.setBackgroundColor = function(color) {
    document.body.style.backgroundColor = color;
}

RE.setBackgroundImage = function(image) {
    RE.editor.style.backgroundImage = image;
}

RE.setWidth = function(size) {
    RE.editor.style.minWidth = size;
}

RE.setHeight = function(size) {
    RE.editor.style.height = size;
}

RE.setTextAlign = function(align) {
    RE.editor.style.textAlign = align;
}

RE.setVerticalAlign = function(align) {
    RE.editor.style.verticalAlign = align;
}

RE.setPlaceholder = function(placeholder) {
    RE.editor.setAttribute("placeholder", placeholder);
}

RE.setInputEnabled = function(inputEnabled) {
    RE.editor.contentEditable = String(inputEnabled);
}

RE.undo = function() {
    document.execCommand('undo', false, null);
}

RE.redo = function() {
    document.execCommand('redo', false, null);
}

RE.setBold = function() {
    document.execCommand('bold', false, null);
}

RE.setItalic = function() {
    document.execCommand('italic', false, null);
}

RE.setSubscript = function() {
    document.execCommand('subscript', false, null);
}

RE.setSuperscript = function() {
    document.execCommand('superscript', false, null);
}

RE.setStrikeThrough = function() {
    document.execCommand('strikeThrough', false, null);
}

RE.setUnderline = function() {
    document.execCommand('underline', false, null);
}

RE.setBullets = function() {
    document.execCommand('insertUnorderedList', false, null);
}

RE.setNumbers = function() {
    document.execCommand('insertOrderedList', false, null);
}

RE.setTextColor = function(color) {
    RE.restorerange();
    document.execCommand("styleWithCSS", null, true);
    document.execCommand('foreColor', false, color);
    document.execCommand("styleWithCSS", null, false);
}

RE.setTextBackgroundColor = function(color) {
    RE.restorerange();
    document.execCommand("styleWithCSS", null, true);
    document.execCommand('hiliteColor', false, color);
    document.execCommand("styleWithCSS", null, false);
}

RE.setFontSize = function(fontSize){
    document.execCommand("fontSize", false, fontSize);
}

RE.setHeading = function(heading) {
    document.execCommand('formatBlock', false, '<h'+heading+'>');
}

RE.setIndent = function() {
    document.execCommand('indent', false, null);
}

RE.setOutdent = function() {
    document.execCommand('outdent', false, null);
}

RE.setJustifyLeft = function() {
    document.execCommand('justifyLeft', false, null);
}

RE.setJustifyCenter = function() {
    document.execCommand('justifyCenter', false, null);
}

RE.setJustifyRight = function() {
    document.execCommand('justifyRight', false, null);
}

RE.setBlockquote = function() {
    document.execCommand('formatBlock', false, '<blockquote>');
}

//RE.insertImage = function(url, alt) {
//    var html = '<img src="' + url + '" alt="' + alt + '" />';
//    RE.insertHTML(html);
//}
/*overwrite*/
RE.insertImage = function(url, originUrl, alt, width, height) {
    var html = '<img src="' + url + '" data-origin="' + originUrl + '" data-width="' + width  + '" data-height="' + height  + '" width="' + width + '" height="' + height + '" />';
    RE.insertHTML(html);
    RE.addImageClickListener();
}

//RE.insertHTML = function(html) {
//    RE.restorerange();
//    document.execCommand('insertHTML', false, html);
//}

/*overwrite*/
RE.insertHTML = function(html) {
    RE.restorerange();
    document.execCommand('insertHTML', false, html);
    RE.addCheckBoxClickListener();
}

RE.insertLink = function(url, title) {
    RE.restorerange();
    var sel = document.getSelection();
    if (sel.toString().length == 0) {
        document.execCommand("insertHTML",false,"<a href='"+url+"'>"+title+"</a>");
    } else if (sel.rangeCount) {
       var el = document.createElement("a");
       el.setAttribute("href", url);
       el.setAttribute("title", title);

       var range = sel.getRangeAt(0).cloneRange();
       range.surroundContents(el);
       sel.removeAllRanges();
       sel.addRange(range);
   }
    RE.callback();
}

RE.setTodo = function(text) {
    var html = '<input type="checkbox" name="'+ text +'" value="'+ text +'"/> &nbsp;';
    document.execCommand('insertHTML', false, html);
}

RE.prepareInsert = function() {
    RE.backuprange();
}

RE.backuprange = function(){
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      var range = selection.getRangeAt(0);
      RE.currentSelection = {
          "startContainer": range.startContainer,
          "startOffset": range.startOffset,
          "endContainer": range.endContainer,
          "endOffset": range.endOffset};
    }
}

RE.restorerange = function(){
    var selection = window.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.setStart(RE.currentSelection.startContainer, RE.currentSelection.startOffset);
    range.setEnd(RE.currentSelection.endContainer, RE.currentSelection.endOffset);
    selection.addRange(range);
}

RE.enabledEditingItems = function(e) {
    var items = [];
    if (document.queryCommandState('bold')) {
        items.push('bold');
    }
    if (document.queryCommandState('italic')) {
        items.push('italic');
    }
    if (document.queryCommandState('subscript')) {
        items.push('subscript');
    }
    if (document.queryCommandState('superscript')) {
        items.push('superscript');
    }
    if (document.queryCommandState('strikeThrough')) {
        items.push('strikeThrough');
    }
    if (document.queryCommandState('underline')) {
        items.push('underline');
    }
    if (document.queryCommandState('insertOrderedList')) {
        items.push('orderedList');
    }
    if (document.queryCommandState('insertUnorderedList')) {
        items.push('unorderedList');
    }
    if (document.queryCommandState('justifyCenter')) {
        items.push('justifyCenter');
    }
    if (document.queryCommandState('justifyFull')) {
        items.push('justifyFull');
    }
    if (document.queryCommandState('justifyLeft')) {
        items.push('justifyLeft');
    }
    if (document.queryCommandState('justifyRight')) {
        items.push('justifyRight');
    }
    if (document.queryCommandState('insertHorizontalRule')) {
        items.push('horizontalRule');
    }
    var formatBlock = document.queryCommandValue('formatBlock');
    if (formatBlock.length > 0) {
        items.push(formatBlock);
    }
    console.log("enabledEditingItems ##########", items)
//    window.location.href = "re-state://" + encodeURI(items.join(','));
}

RE.focus = function() {
    var range = document.createRange();
    range.selectNodeContents(RE.editor);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    RE.editor.focus();
}

RE.blurFocus = function() {
    RE.editor.blur();
}

RE.removeFormat = function() {
    document.execCommand('removeFormat', false, null);
}

// Event Listeners
//RE.editor.addEventListener("input", RE.callback);
/*overwrite*/
RE.editor.addEventListener("input", function(e) {
    RE.callback();
    RE.enabledEditingItems();
});

RE.editor.addEventListener("keyup", function(e) {
    var KEY_LEFT = 37, KEY_RIGHT = 39;
    if (e.which == KEY_LEFT || e.which == KEY_RIGHT) {
        RE.enabledEditingItems(e);
    }
});
RE.editor.addEventListener("click", RE.enabledEditingItems);



/**
* Custom
*/

RE.setEditable = function(isEditable) {
   RE.editor.setAttribute("contenteditable", isEditable);
}

RE.addCheckBoxClickListener = function() {
     const buttons = document.querySelectorAll("ul[data-checked]");
     for (const button of buttons) {
       button.addEventListener('click', function(event) {
         let parentNode = event.target.parentNode;

         if(parentNode && parentNode.hasAttribute("data-checked")) {
           const checked = parentNode.getAttribute("data-checked") == "true" ? "false" : "true";
           parentNode.setAttribute("data-checked",checked);
           event.target.setAttribute("data-checked",checked)
         }
         RE.callback();
       })
     }
}

RE.addImageClickListener = function() {
     const images = document.querySelectorAll("img");
     for (const img of images) {
       img.addEventListener('click', function(event) {
           const imageUrl = event.target.getAttribute("data-origin");
           window.location.href = "re-callback://" + encodeURI(JSON.stringify({html: RE.getHtml().toString(), state: RE.enabledEditingItems().toString(), keyValue: 'null', imageUrl: imageUrl || 'null'}));
       });
     }
}

RE.insertMention = function (name, userId) {

   var sel, range;
   if (window.getSelection && (sel = window.getSelection()).rangeCount) {
     range = sel.getRangeAt(0);
     range.collapse(true);
     var spanOuter = document.createElement("span");
     spanOuter.setAttribute("class", "mention");
     spanOuter.setAttribute("data-denotation-char", "@");
     spanOuter.setAttribute("data-id", userId);
     spanOuter.setAttribute("data-value", name);
     spanOuter.setAttribute("contenteditable", "false");
     var spanMiddle = document.createElement("span");
     spanMiddle.setAttribute("contenteditable", "false");
     var spanInner = document.createElement("span");
     spanInner.appendChild(document.createTextNode("@"));

     spanMiddle.appendChild(spanInner)
     spanMiddle.appendChild(document.createTextNode(name));
     spanOuter.appendChild(document.createTextNode("\uFEFF"));
     spanOuter.appendChild(spanMiddle);
     spanOuter.appendChild(document.createTextNode("\uFEFF"));

     range.insertNode(spanOuter);

     // Move the caret immediately after the inserted span
     range.setStartAfter(spanOuter);
     range.collapse(true);
     sel.removeAllRanges();
     sel.addRange(range);
   }
}

RE.insertCheckbox = function() {
//    RE.clearHeadingStyle();
    RE.restorerange();
    RE.removeFormat();
    document.execCommand('insertUnorderedList', false, null);
    if (window.getSelection) {
      const checkbox = window.getSelection().focusNode.parentNode;
      checkbox.setAttribute("data-checked", "false")
      checkbox.parentNode.setAttribute("data-checked", "false")
    }
    RE.callback();
}

//RE.clearHeadingStyle = function() {
//    var formatBlock = document.queryCommandValue('formatBlock');
//    if (formatBlock.length) {
//       document.execCommand('formatBlock', false, 'p');
//    }
//}

//RE.clearFontStyle = function() {
//    if (document.queryCommandState('bold')) {
//        RE.setBold();
//    }
//    if (document.queryCommandState('italic')) {
//        RE.setItalic();
//    }
//    if (document.queryCommandState('strikeThrough')) {
//        RE.setStrikeThrough();
//    }
//}
