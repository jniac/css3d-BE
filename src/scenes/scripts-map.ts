import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/CameraHandler.ts": ScriptMap;
	"src/scenes/CubeHandler.ts": ScriptMap;
	"src/scenes/ui/dom/elements.ts": ScriptMap;
	"src/scenes/ui/dom/frame.ts": ScriptMap;
	"src/scenes/ui/dom/style.ts": ScriptMap;
	"src/scenes/ui/input/buttons.ts": ScriptMap;
	"src/scenes/ui/input/range.ts": ScriptMap;
	"src/scenes/ui/types.ts": ScriptMap;
	"src/scenes/ui/utils.ts": ScriptMap;
	"src/scenes/utils.ts": ScriptMap;
	"src/scenes/vertigo/drag.ts": ScriptMap;
	"src/scenes/vertigo/vertigo.ts": ScriptMap;
	"src/scenes/vertigo/VertigoHandler.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/CameraHandler.ts": require("./CameraHandler"),
	"src/scenes/CubeHandler.ts": require("./CubeHandler"),
	"src/scenes/ui/dom/elements.ts": require("./ui/dom/elements"),
	"src/scenes/ui/dom/frame.ts": require("./ui/dom/frame"),
	"src/scenes/ui/dom/style.ts": require("./ui/dom/style"),
	"src/scenes/ui/input/buttons.ts": require("./ui/input/buttons"),
	"src/scenes/ui/input/range.ts": require("./ui/input/range"),
	"src/scenes/ui/types.ts": require("./ui/types"),
	"src/scenes/ui/utils.ts": require("./ui/utils"),
	"src/scenes/utils.ts": require("./utils"),
	"src/scenes/vertigo/drag.ts": require("./vertigo/drag"),
	"src/scenes/vertigo/vertigo.ts": require("./vertigo/vertigo"),
	"src/scenes/vertigo/VertigoHandler.ts": require("./vertigo/VertigoHandler"),
}
