// docker-compose run --rm web yarn run version v1.13.0

// git clone --branch  v1.13 --single-branch --depth 1 git@github.com:reactioncommerce/reaction-docs.git

// node migrater.js

var fs = require('fs');
var path = require('path');

var redoc = fs.readFileSync("reaction-docs/redoc.json");
var redocParsed = JSON.parse(redoc);
var tocData = redocParsed.tocData;
console.log(tocData.length + " files found")

// Removes double instance of Permissions, Registry, PopOver, Customizing Templates
console.log("Removing duplicates...")
var unique = {};
var out = [];
tocData.forEach(function (content) {
    var key = JSON.stringify(content)
    if (unique[key]) return;
    unique[key] = true;
    out.push(content);
});
console.log(out.length + " unique files found")

// Remove Theme/Appearance double
var themeIndex = out.findIndex(content => content.alias == "themes");
if (themeIndex > 1) {
    out.splice(themeIndex, 1);
    console.log("Duplicate theme removed.");
    console.log(out.length + " unique files found");
}
irregular = out.filter(content => Object.keys(content).length < 5);
console.log("Found " + irregular.length + " irregular files");

// Add label to Guidelines
guidelines = out.find(content => content.alias == "guidelines");
if (guidelines) {
    guidelines.label = "Guidelines";
    console.log("Cleaned guidelines.md");
};

// Add alias for Components
irregular = out.filter(content => Object.keys(content).length < 3);
console.log("Found " + irregular.length + " irregular files");
irregular.forEach(function (content) {
    irregularContent = out.find(outContent => outContent.docPath === content.docPath);
    if (irregularContent) {
        irregularContent.alias = irregularContent.docPath.replace("developer/components/", "").replace(".md", "");
        console.log("Added alias for " + irregularContent.label)
    };
});

irregular = out.filter(content => Object.keys(content).length < 3);
if (irregular.length == 0) {
    console.log("Found " + irregular.length + " irregular files ✨");
    console.log("Ready to move all " + out.length + " files");
} else {
    console.log("Warning: Found " + irregular.length + "irregular files");
    console.log(irregular);
};

// clean, move files
out.forEach(function (content, index) {
    // go to file
    path.join(process.cwd());
    fileName = "reaction-docs/" + content.docPath;
    if (!fs.existsSync(fileName)) {
        console.log("File not found:" + fileName);
        return
    } else if (content.label == "Navigation Tags") {
        file = fs.readFileSync(fileName)
        // delete first line
        file = file.toString().split('\n').slice(1).join('\n')
        // prepend frontmatter
        file = `---
id: navigation-bar-and-grid
title: Navigation and Product tags
---
    ` + file
        // write changes to file at fileName
        fs.writeFileSync(fileName, file);
        // move to public-docs/navigation-bar-and-grid.md
        fs.renameSync(fileName, "public-docs/navigation-bar-and-grid.md");
        console.log(index + " - Updated " + fileName + " to: navigation-bar-and-grid.md");
    } else {
        file = fs.readFileSync(fileName)
        // delete first line
        file = file.toString().split('\n').slice(1).join('\n')
        // prepend frontmatter
        file = `---
id: ${content.alias}
title: ${content.label}
---
    ` + file
        // write changes to file at fileName
        fs.writeFileSync(fileName, file);
        // move file from reaction-docs/<nested>/<nested> to public-docs/<alias>.md
        publicDocsPath = "public-docs/" + content.alias + ".md";
        fs.renameSync(fileName, publicDocsPath);
        console.log(index + " - Updated " + fileName + " to: " + publicDocsPath);
    }
});

// create new redoc blob
docOut = {};
out.forEach(function (content, index) {
    if (content.class == "guide-nav-item") {
        docOut[content.label] = []
        docOut[content.label].push(content.alias)
    } else {
        keys = Object.keys(docOut)
        lastCategory = docOut[keys[keys.length - 1]]
        lastCategory.push(content.alias)
    };
});
docs = {"docs": docOut}
fs.writeFileSync("website/sidebars.json", JSON.stringify(docs));
console.log("📝 Sidebars: Table of contents saved")

// docker-compose stop && docker-compose up --build
// open http://localhost:4242/docs/next/intro
// open https://github.com/reactioncommerce/reaction-docs/blob/v1.3.0/redoc.json
// open https://docs.reactioncommerce.com/reaction-docs/v1.3.0/intro
// Confirm: number of files in `public-docs` matches `out.length`
// Confirm: newNav.length == oldNav.length

// var oldNavTotal = []
// Array.prototype.forEach.call($(".guide-nav-item"), item => {
//     oldNavTotal.push(item.childNodes[0].pathname.replace("/reaction-docs/v1.7.0/",""))
// });
// Array.prototype.forEach.call($(".guide-sub-nav-item"), item => {
//     oldNavTotal.push(item.childNodes[0].pathname.replace("/reaction-docs/v1.7.0/",""))
// });
// console.log(oldNavTotal.length);
// oldNavTotal.sort()
// var oldNavUniqued = Array.from(new Set(oldNavTotal))
// console.log(oldNavUniqued.length)


// var oldNav = JSON.stringify(oldNavUniqued)
// oldNav = JSON.parse(oldNav)

// newNav = []
// $(".navItem").forEach(function (item) {
//     newNav.push(item.pathname.replace("/docs/next/", ""));
// });
// console.log(newNav.length)
// newNav.sort()

// Array.prototype.diff = function (a) {
//     return this.filter(function (i) { return a.indexOf(i) < 0; });
// };
// oldNav.diff(newNav);

// rm -rf reaction-docs/
