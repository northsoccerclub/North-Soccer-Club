
// IE HACK: Define _importNode for IE since it doesnt support importNode
if(!document.importNode) {
    document._importNode = function(oNode, bImportChildren) {
        var oNew;
        
        if(oNode.nodeType == 1) {
            oNew = document.createElement(oNode.nodeName);
            for(var i = 0; i < oNode.attributes.length; i++) {
                if(oNode.attributes[i].nodeValue != null && oNode.attributes[i].nodeValue != '') {
                    var attrName = oNode.attributes[i].name;
                    if(attrName == "class") {
                        oNew.setAttribute("className", oNode.attributes[i].value);
                        oNew.setAttribute("class", oNode.attributes[i].value);
                    } else { 
                        oNew.setAttribute(attrName, oNode.attributes[i].value);
                    }
                }
            }
            
            if(oNode.style != null && oNode.style.cssText != null) {
                oNew.style.cssText = oNode.style.cssText;
            }
        } else if(oNode.nodeType == 3) {
            oNew = document.createTextNode(oNode.nodeValue);
        }
        
        if(bImportChildren && oNode.hasChildNodes()) {
            for(var oChild = oNode.firstChild; oChild; oChild = oChild.nextSibling) {
                oNew.appendChild(document._importNode(oChild, true));
            }
        }
        return oNew;
    }
}
// IE HACK (end)



