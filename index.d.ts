export function editFile(path: string, options: {
    stringify_width?: number;
    stringify_fn?: Function;
    stringify_eol?: boolean;
    ignore_dots?: boolean;
    autosave?: boolean;
}): JsonEditor;
export function createFile(path: string, data?: string): void;
export function createFileSync(path: string, data?: string): Promise<void>;
export function deleteFile(path: string): void;
export function deleteFileSync(path: string): Promise<void>;
export function copyFile(path: string, copyPath?: string): void;
export function copyFileSync(path: string, copyPath?: string): Promise<void>;
export function moveFile(oldPath: string, newPath: string): void;
export function moveFileSync(oldPath: string, newPath: string): Promise<void>;
export function renameFile(path: string, newName: string): void;
export function renameFileSync(path: string, newName: string): Promise<void>;
export function readFile(path: string): any;
export function readFileSync(path: string): any;
export function readAllFiles(path: string, format?: "Map" | "Array"): Map;
export function readAllFilesSync(path: string, format?: "Map" | "Array"): Map;
export function fileExist(path: string): boolean;
export function fileExistSync(path: string): boolean;
export function folderExist(path: string): boolean;
export function folderExistSync(path: string): boolean;
/**
 * The json editor
 *
 * @version `1.1.0`
 * @author `acegoal07`
 *
 * @param {String} path
 * @param {Object} options
 */
declare class JsonEditor {
    constructor(path: any, options: any);
    options: {};
    path: any;
    data: any;
    /**
     * Saves the file and any changes
     *
     * @param {Function} callback An optional callback function which will turn the function into an asynchronous one
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    save(callback: Function): JsonEditor;
    /**
     * Get a value in a specific path
     *
     * @param {String} path The object path
     * @returns {Anything} The object path value
     */
    get(path: string): Anything;
    /**
     * Write the JSON file
     *
     * @param {String} content file content
     * @param {Function} callback An optional callback function which will turn the function into an asynchronous one
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    write(content: string, callback: Function): JsonEditor;
    /**
     * Copy's the data from a file into the file your editing
     *
     * @param {String} path The path to the JSON file
     * @param {Boolean} layout The is used to add a layout out to the data being written to the file
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    writeCopy(path: string, layout?: boolean): JsonEditor;
    /**
     * Empty the JSON file content
     *
     * @param {Function} callback The callback function
     */
    empty(callback: Function): JsonEditor;
    /**
     * Empty an arrays content
     *
     * @param {String} path The object path
     */
    emptyArray(path: string): JsonEditor;
    /**
     * Empty an objects content
     *
     * @param {String} path The object path
     */
    emptyObject(path: string): JsonEditor;
    /**
     * Read the JSON file
     *
     * @param {Function} callback An optional callback function which will turn the function into an asynchronous one
     * @returns {Object} The object parsed as object or an empty object by default
     */
    read(callback: Function): any;
    /**
     * Returns a object from the data path
     *
     * @returns {Object} The data object
     */
    toObject(): any;
    /**
     * Returns a string of the json data
     *
     * @param {Boolean} keepLayout Weather or not the data should keep the object layout from the file
     * @returns {String} The data string
     */
    toString(keepLayout?: boolean): string;
    /**
     * Returns a joined string from the array path
     *
     * @param {String} path The object path
     * @param {String} joiner The character to join the data with (default: `,`)
     * @returns {String} The data string
     */
    arrayToString({ path, joiner }: string): string;
    /**
     * Set a value in a specific path
     *
     * @param {String} path The object path
     * @param {Anything} value The value
     * @param {Object} options The options for set-value (applied only when {ignore_dots} file option is false)
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    set(path: string, value: Anything, options: any): JsonEditor;
    /**
     * Remove a path from a JSON object
     *
     * @param {String} path The object path
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    unset(path: string): JsonEditor;
    /**
     * Pushes the data to the top of the specified array
     *
     * @param {String} path The object path
     * @param {Anything} value The value
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    push(path: string, value: Anything): JsonEditor;
    /**
     * Switches a boolean data type between true and false
     *
     * @param {String} path The object path
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    trigger(path: string): JsonEditor;
    /**
     * Pushes the data to the bottom of the specified array
     *
     * @param {String} path The object path
     * @param {Anything} value The value
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    unshift(path: string, value: Anything): JsonEditor;
    /**
     * Remove the last item from an array
     *
     * @param {String} path The object path
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    popLast(path: string): JsonEditor;
    /**
     * Removes a specific item from an array
     *
     * @param {String} path The object path
     * @param {Number} position The position of the item
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    popTo(path: string, position: number): JsonEditor;
    /**
     * Remove the first item from an array
     *
     * @param {String} path The object path
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    popFirst(path: string): JsonEditor;
    /**
     * Gets the keys of data from the
     *
     * @param {String} path An optional setting to get keys from a path
     * @returns {Array} The keys
     */
    getKeys(path?: string): any[];
    /**
     * Deletes the file that's being edited
     */
    delete(): any;
    /**
     * Copy's the data from one path to a another
     *
     * @param {String} path The object path to the data you want to copy
     * @param {String} copyPath The object path to the place you wanna put the data
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    copy(path: string, copyPath: string): JsonEditor;
    /**
     * Moves the data to a new path and deletes the original
     *
     * @param {String} oldPath The object path to the data you want to move
     * @param {String} newPath The object path to the place you wanna put the data
     * @returns {JsonEditor} The `JsonEditor` instance
     */
    move(oldPath: string, newPath: string): JsonEditor;
}
export {};
