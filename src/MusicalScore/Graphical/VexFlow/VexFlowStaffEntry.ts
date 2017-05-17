import {GraphicalStaffEntry} from "../GraphicalStaffEntry";
import {VexFlowMeasure} from "./VexFlowMeasure";
import {SourceStaffEntry} from "../../VoiceData/SourceStaffEntry";
import {GraphicalNote} from "../GraphicalNote";
import {unitInPixels} from "./VexFlowMusicSheetDrawer";

export class VexFlowStaffEntry extends GraphicalStaffEntry {
    constructor(measure: VexFlowMeasure, sourceStaffEntry: SourceStaffEntry, staffEntryParent: VexFlowStaffEntry) {
        super(measure, sourceStaffEntry, staffEntryParent);
    }

    // The Graphical Notes belonging to this StaffEntry, sorted by voiceID
    public graphicalNotes: { [voiceID: number]: GraphicalNote[]; } = {};
    // The corresponding VexFlow.StaveNotes
    public vfNotes: { [voiceID: number]: Vex.Flow.StaveNote; } = {};
    public vfTabNotes: { [voiceID: number]: Vex.Flow.TabNote; } = {};

    /**
     *
     * @returns {number} the x-position (in units) of this StaffEntry
     */
    public getX(): number {
        let x: number = 0;
        let n: number = 0;
        let vfNotes: { [voiceID: number]: Vex.Flow.StaveNote; } = this.vfNotes;
        for (let voiceId in vfNotes) {
            if (vfNotes.hasOwnProperty(voiceId)) {
                x += (vfNotes[voiceId].getNoteHeadBeginX() + vfNotes[voiceId].getNoteHeadEndX()) / 2;
                n += 1;
            }
        }
        if (n === 0) {
            return 0;
        }
        return x / n / unitInPixels;
    }

    public getTabX(): number {
        let x: number = 0;
        let n: number = 0;
        let vfTabNotes: { [voiceID: number]: Vex.Flow.TabNote; } = this.vfTabNotes;
        for (let voiceId in vfTabNotes) {
            if (vfTabNotes.hasOwnProperty(voiceId)) {
                x += (vfTabNotes[voiceId].getTieLeftX() + vfTabNotes[voiceId].getTieRightX()) / 2;
                n += 1;
            }
        }
        if (n === 0) {
            return 0;
        }
        return x / n / unitInPixels;
    }
}
