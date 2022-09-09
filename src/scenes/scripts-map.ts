import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/CameraHandler.ts": ScriptMap;
	"src/scenes/CubeHandler.ts": ScriptMap;
	"src/scenes/ui.ts": ScriptMap;
	"src/scenes/utils.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/CameraHandler.ts": require("./CameraHandler"),
	"src/scenes/CubeHandler.ts": require("./CubeHandler"),
	"src/scenes/ui.ts": require("./ui"),
	"src/scenes/utils.ts": require("./utils"),
}
