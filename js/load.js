/*function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    //script.defer = true;
    script.async = false; // or script.defer = true;
    document.head.appendChild(script);
}*/


function loadScript(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false); // 'false' makes the request synchronous
    req.send(null);
    if (req.status === 200) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.text = req.responseText; // Set the response as script text
        document.head.appendChild(script); // Append the script to the head
    } else {
        console.error("Error loading script: " + req.status);
    }
}

/*
function executeScript() {
    loadScriptSynchronously("path/to/your/script.js"); // Specify your script path here
    // Now you can call functions defined in the loaded script
    if (typeof someFunction === "function") {
        someFunction(); // Call a function from the loaded script if it exists
    }
}*/
