const directoryTree = require("directory-tree");
const path = require("path");

const directory = directoryTree(path.join("./src"), { attributes: ["type"] });

function formatDirectoryTree(node) {
    let result = {
        name: node.name,
        type: node.type === "directory" ? "folder" : node.type,
        path: node.path,
        children: []
    };

    if (node.children && node.children.length > 0) {
        result.children = node.children.map(child => formatDirectoryTree(child));
    }

    return result;
}

function GetSourceLists(directory) {
    if (directory.type === "directory" || directory.type === "file") {
        return [formatDirectoryTree(directory)];
    } else {
        throw new Error("Invalid directory or file");
    }
}

module.exports = {files_list: GetSourceLists(directory), func: GetSourceLists};