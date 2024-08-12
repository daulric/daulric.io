const directoryTree = require("directory-tree");
const path = require("path");

const directory = directoryTree(path.join("./"), { attributes: ["type"] });
const children_files = [...directory.children]

const only_show_files = children_files.filter((kids) => {
    if (kids.type === "directory") {
        return (kids.name === "src" || kids.name === "public")
    }

    return (kids.type === "file")
})

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
    if (directory.type) {
        return [formatDirectoryTree(directory)];
    } else {
        throw new Error("No Files or Directories Listed!");
    }
}

const new_files = only_show_files.map((files) => formatDirectoryTree(files));

const nestedFilter = (files) => {
    const folders = files.filter(file => file.type === "folder").map(folder => ({
      ...folder,
      children: folder.children ? nestedFilter(folder.children) : []
    }));
    
    const regularFiles = files.filter(file => file.type === "file");
    
    return [...folders, ...regularFiles];
};

const files = nestedFilter(new_files)

module.exports = {files_list: files, func: GetSourceLists};