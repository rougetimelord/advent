import { Path } from "../../shared/path.mjs";
import { str2Lines } from "../../shared/string.mjs"

/**
 * @param {string} s
 * @param {boolean} [p2=false]
 * @returns {number}
 */
export const main = (s, p2=false) => {
    const lines = str2Lines(s);
    let currentPath = new Path(),
        inLS = false,
        /** @type {Map<String, Directory>} */
        dirs = new Map();

    console.groupCollapsed("CMDS");
    for(const line of lines) {
        if(line.charAt(0) == "$") {
            inLS = false;
            if(line.match("cd")) {
                const newDir = line.split(" ").pop();
                if (newDir == "..") {
                    currentPath.moveUp();
                    console.groupEnd();
                    console.log(`Moving up: ${currentPath}`)
                }
                else {
                    currentPath.addPart(newDir);
                    console.groupCollapsed(`Moving into ${currentPath}`);
                    if(!dirs.has(currentPath.string)){
                        console.log("Creating new dir");
                        dirs.set(currentPath.string, new Directory(currentPath.string));
                    }
                }
            }
            else if(line.match("ls")) {
                inLS = true;
            }
        }
        else if (inLS) {
            if (line.match(/^dir/)) {
                const temp = new Path([...currentPath.array, line.split(" ").pop()]);
                console.log(`Found dir: ${temp}`);
                const tempDir = new Directory(temp.string);
                dirs.get(currentPath.string).add(tempDir);
                dirs.set(temp.string, tempDir);
            }
            else {
                const desc = line.split(" ");
                console.log(`Found file: ${currentPath}${desc[1]}`);
                const tempFile = new File(desc[1], desc[0]);
                dirs.get(currentPath.string).add(tempFile);
            }
        }
    }
    for(const part of [...currentPath.array,1]) {
        console.groupEnd();
    }

    console.groupCollapsed("Sizing");
    let result = 0;
    for(const [path, dir] of dirs.entries()) {
        const size = dir.size;
        console.log(`${path}: ${size}`);
        if(size <= 100000) {
            result += size;
        }
    }
    console.groupEnd();
    if (!p2) {
        return result;
    }

    console.groupCollapsed("Freeing space")
    const totalSpace = 70000000,
        currentFree = totalSpace - dirs.get("/").size,
        neededFree = 30000000;
    console.log(`Currently ${currentFree}/${neededFree} free`);
    result = null;
    for(const [path, dir] of dirs.entries()) {
        const size = dir.size;
        if(currentFree + size >= neededFree) {
            console.log(`Deleting ${path} would free up enough space`);
            if(result == null) {
                result = size;
            }
            else if(dir.size < result){
                console.log(`Updating result to ${path}`);
                result = size
            }
        }
    }
    console.groupEnd();
    return result;
}

class File {
    /**
     * 
     * @param {String} name 
     * @param {Number} size 
     */
    constructor(name, size) {
        this.name = name;
        this.size = Number(size);
    }
}

class Directory {
    /**
     * @param {String} path 
     */
    constructor(path) {
        this.path = path;
        /**
         * @type {(Directory|File)[]}
         */
        this.contents = [];
        this.sz = null;
    }
    /**
     * @param {File|Directory} item 
     */
    add(item) {
        this.contents.push(item);
    }
    /**
     * Gets the size of all items, recursively
     */
    get size() {
        if(this.sz !== null) {
            return this.sz;
        }
        let res = 0;
        for(const item of this.contents) {
            res += item.size;
        }
        this.sz = res;
        return res;
    }
}