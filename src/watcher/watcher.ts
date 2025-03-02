import { Component, Notice, TAbstractFile, TFile, TFolder } from "obsidian";
import type StatBlockPlugin from "src/main";
//have to ignore until i fix typing issue
//@ts-expect-error
import Worker, {
    GetFileCacheMessage,
    FileCacheMessage,
    QueueMessage,
    UpdateEventMessage,
    SaveMessage,
    FinishFileMessage
} from "./watcher.worker";

declare global {
    interface Worker {
        postMessage<T>(message: T, transfer?: Transferable[]): void;
    }
}

export class Watcher extends Component {
    announce: boolean;
    get metadataCache() {
        return this.plugin.app.metadataCache;
    }
    get vault() {
        return this.plugin.app.vault;
    }
    constructor(public plugin: StatBlockPlugin) {
        super();
    }

    watchPaths: Map<string, string> = new Map();

    worker = new Worker();
    onload() {
        /** Metadata for a file has changed and the file should be checked. */
        this.registerEvent(
            this.metadataCache.on("changed", async (file) => {
                if (!this.plugin.settings.autoParse) return;
                const { frontmatter } =
                    this.metadataCache.getFileCache(file) ?? {};
                if (!frontmatter || !frontmatter.statblock) {
                    if (this.watchPaths.has(file.path)) {
                        this.delete(file.path);
                    }
                    return;
                }
                this.parsePath(file);
            })
        );
        /** A file has been renamed and should be checked for events.
         * Could this be hashed?
         */
        //TODO: Refactor
        this.registerEvent(
            this.vault.on("rename", async (abstractFile, oldPath) => {
                if (!this.plugin.settings.autoParse) return;
                if (!(abstractFile instanceof TFile)) return;
                if (!this.watchPaths.has(oldPath)) return;

                await this.delete(oldPath);
                this.parsePath(abstractFile);
            })
        );
        /** A file has been deleted and should be checked for events to unlink. */
        //TODO: Refactor
        this.registerEvent(
            this.vault.on("delete", (abstractFile) => {
                if (!this.plugin.settings.autoParse) return;
                if (!(abstractFile instanceof TFile)) return;
                if (!this.watchPaths.has(abstractFile.path)) return;
                this.delete(abstractFile.path);
            })
        );

        //worker messages
        /** The worker will ask for file information from files in its queue here */
        this.worker.addEventListener(
            "message",
            (event: MessageEvent<GetFileCacheMessage>) => {
                if (event.data.type == "get") {
                    const { path } = event.data;
                    const data = this.getFileInformation(path);
                    //TODO: Add in file data parsing for events
                    //TODO: E.g., timelines
                    this.worker.postMessage<FileCacheMessage>({
                        type: "file",
                        path,
                        ...data
                    });
                }
            }
        );

        /** The worker has found an event that should be updated. */
        this.worker.addEventListener(
            "message",
            async (evt: MessageEvent<UpdateEventMessage>) => {
                if (evt.data.type == "update") {
                    const { monster, path } = evt.data;
                    this.watchPaths.set(path, monster.name);
                    this.plugin.saveMonster(monster, false, false);
                }
            }
        );

        /** The worker has parsed all files in its queue. */
        this.worker.addEventListener(
            "message",
            async (evt: MessageEvent<SaveMessage>) => {
                if (evt.data.type == "save") {
                    await this.plugin.saveSettings();
                    if (this.startTime) {
                        console.info(
                            `TTRPG Statblocks: Frontmatter Parsing Complete in ${(
                                (Date.now() - this.startTime) /
                                1000
                            ).toLocaleString()} seconds.`
                        );
                        this.startTime = 0;
                    }
                    if (this.announce) {
                        new Notice(
                            "TTRPG Statblocks: Frontmatter Parsing complete."
                        );
                        this.announce = false;
                    }
                }
            }
        );
        if (!this.plugin.settings.autoParse) return;
        this.plugin.app.workspace.onLayoutReady(() => this.start());
    }
    async delete(path: string) {
        await this.plugin.deleteMonster(this.watchPaths.get(path));
        this.watchPaths.delete(path);
    }
    startTime: number;
    start(announce = false) {
        this.announce = announce;
        this.startTime = Date.now();
        console.info("TTRPG Statblocks: Starting Frontmatter Parsing.");
        const folder = this.vault.getAbstractFileByPath(
            this.plugin.settings.path
        );
        this.parsePath(folder);
    }
    pathContainsFile(file: TAbstractFile) {
        if (!this.plugin.settings.path || this.plugin.settings.path == "/")
            return true;

        return file.path.includes(this.plugin.settings.path, 1);
    }
    parsePath(folder: TAbstractFile) {
        if (!this.pathContainsFile(folder)) return;
        const parsing: Set<string> = new Set();
        for (const path of this.getFiles(folder)) {
            parsing.add(path);
        }
        this.startParsing([...parsing]);
    }
    startParsing(paths: string[]) {
        if (paths.length) {
            this.worker.postMessage<QueueMessage>({
                type: "queue",
                paths
            });
        }
    }
    getFileInformation(path: string) {
        const file = this.plugin.app.vault.getAbstractFileByPath(path);
        if (!(file instanceof TFile)) return;

        const cache = this.metadataCache.getFileCache(file);
        return {
            cache,
            file: { path: file.path, basename: file.basename }
        };
    }
    getFiles(folder: TAbstractFile): string[] {
        let files = [];
        if (folder instanceof TFolder) {
            for (const child of folder.children) {
                files.push(...this.getFiles(child));
            }
        }
        if (folder instanceof TFile) {
            files.push(folder.path);
        }
        return files;
    }
    async reparseVault() {
        for (const monster of this.watchPaths.values()) {
            this.plugin.deleteMonster(monster, false, false);
        }

        const folder = this.vault.getAbstractFileByPath(
            this.plugin.settings.path
        );
        this.parsePath(folder);
    }
    onunload() {
        this.worker.terminate();
        this.worker = null;
    }
}
