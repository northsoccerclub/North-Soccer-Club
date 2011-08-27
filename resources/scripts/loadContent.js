//<![CDATA[
    var xhr = false;
    
    function gotoPage(p_url) {
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (ex) {
                try {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (ex) {
                    xhr = false;
                }  
            }
        }
        
        if (!xhr)
            return (false);
        else {
            xhr.open('get', p_url, true);
            xhr.onreadystatechange = showPageContent;
            xhr.send(null);
        }
        return (false);
    }
    
    function showPageContent() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var newNode = null, tempNode = null, importedNode = null;
            
            /* IE is "special" */
            if (xhr.responseXML.childNodes.length == 0) {
                var tempString = xhr.responseText;
                var start = 0, end = 0;
                start = tempString.indexOf('<div id="documentBodyContent"');
                end = tempString.indexOf('<div id="documentFooter"');
                tempString = tempString.substring(start, end);
                tempNode = new ActiveXObject('Microsoft.XMLDOM');
                tempNode.async = false;
                tempNode.loadXML(tempString);
                tempNode = tempNode.getElementsByTagName('div');
            } else
                tempNode = xhr.responseXML.getElementsByTagName('div');
            
            for (var i = 0, il = tempNode.length; i < il; i++)
                if (tempNode[i].getAttribute('id') == 'documentBodyContent') {
                    newNode = tempNode[i];
                    break;
                }
                
            if (newNode.nodeType != document.ELEMENT_NODE)
                newNode = newNode.nextSibling;
                    
            if (newNode) {
                importedNode = document._importNode(newNode, true);
                document.getElementById('xhrFrame').innerHTML = '';
                document.getElementById('xhrFrame').appendChild(importedNode);
                if (!document.importNode)
                    document.getElementById('xhrFrame').innerHTML = document.getElementById('xhrFrame').innerHTML;
            }
        }
    }
//]]>
