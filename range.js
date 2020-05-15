
var range1 = document.createRange();
var range2 = document.createRange();
var p1 = document.getElementById("p1");
console.log(p1.childNodes);
range1.selectNode(p1);
range2.selectNodeContents(p1);
console.log(range1);
console.log(range2);

// 复杂选择
var range1 = document.createRange();
var range2 = document.createRange();
var p1 = document.getElementById("p1");
var p1Index = -1;
var i, len;
for (i=0, len = p1.parentNode,childNodes.length; i< len; i++) {
  if(p1.parentNode.childNodes[i] == p1) {
    p1Index = i;
    break;
  }
}

range1.setStart(p1.parentNode, p1Index);
range1.setEnd(p1.parentNode, p1Index + 1);
range2.setStart(p1, 0 );
range2.setEnd(p1, p1.childNodes.length);
console.log(range1);
console.log(range2);

//选择区域
var p1 = document.getElementById("p1");
var helloNode = p1.firstChild.firstChild;
var worldNode = p1.lastChild;
var range = document.createRange();
range.setStart(helloNode, 2);
range.setEnd(worldNode, 3);
// range.deleteContents();
// var fragment = range.extractContents();
var fragment = range.cloneContents();
p1.parentNode.appendChild(fragment);
console.log(range);


//插入DOM 范围中的内容
var p1 = document.getElementById("p1");
var helloNode = p1.firstChild.firstChild;
var worldNode = p1.lastChild;
var range = document.createRange();
range.setStart(helloNode, 2);
range.setEnd(worldNode, 3);

var span = document.createElement("span");
span.style.color = "red";
span.appendChild(document.createTextNode("Inserted text"));
range.insertNode(span);

//surroundContents
var p1 = document.getElementById("p1");
var helloNode = p1.firstChild.firstChild;
var worldNode = p1.lastChild;
var range = document.createRange();

range.selectNode(helloNode);
var span = document.createElement("span");
span.style.backgroundColor = "yellow";
range.surroundContents(span);

//折叠
range.collapse(true); //折叠到起点
console.log(range.collapsed); //检查是否完成折叠
//折叠demo
{/* <p id="p1">Paragraph 1</p><p id="p2">Paragraph 2</p> */}
var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var range = document.createRange();
range.setStartAfter(p1);
range.setEndBefore(p2);
console.log(range.collapsed);


