import * as jspb from 'google-protobuf'



export class BinaryPreset extends jspb.Message {
  getName(): string;
  setName(value: string): BinaryPreset;

  getHash(): number;
  setHash(value: number): BinaryPreset;

  getDate(): string;
  setDate(value: string): BinaryPreset;

  getVolume(): number;
  setVolume(value: number): BinaryPreset;

  getPan(): number;
  setPan(value: number): BinaryPreset;

  getDefaultScene(): number;
  setDefaultScene(value: number): BinaryPreset;

  getAuthorName(): string;
  setAuthorName(value: string): BinaryPreset;

  getAuthorId(): string;
  setAuthorId(value: string): BinaryPreset;

  getTempo(): number;
  setTempo(value: number): BinaryPreset;

  getChainsList(): Array<Chain>;
  setChainsList(value: Array<Chain>): BinaryPreset;
  clearChainsList(): BinaryPreset;
  addChains(value?: Chain, index?: number): Chain;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): BinaryPreset;
  clearTagsList(): BinaryPreset;
  addTags(value: string, index?: number): BinaryPreset;

  getLegacyStompModeStompDataList(): Array<LegacyStompModeStompData>;
  setLegacyStompModeStompDataList(value: Array<LegacyStompModeStompData>): BinaryPreset;
  clearLegacyStompModeStompDataList(): BinaryPreset;
  addLegacyStompModeStompData(value?: LegacyStompModeStompData, index?: number): LegacyStompModeStompData;

  getSceneTempoList(): Array<number>;
  setSceneTempoList(value: Array<number>): BinaryPreset;
  clearSceneTempoList(): BinaryPreset;
  addSceneTempo(value: number, index?: number): BinaryPreset;

  getSceneLabelsList(): Array<string>;
  setSceneLabelsList(value: Array<string>): BinaryPreset;
  clearSceneLabelsList(): BinaryPreset;
  addSceneLabels(value: string, index?: number): BinaryPreset;

  getMidiMessagesList(): Array<MidiMessageInfo>;
  setMidiMessagesList(value: Array<MidiMessageInfo>): BinaryPreset;
  clearMidiMessagesList(): BinaryPreset;
  addMidiMessages(value?: MidiMessageInfo, index?: number): MidiMessageInfo;

  getMidiMessagesGeneralList(): Array<MidiMessageInfo>;
  setMidiMessagesGeneralList(value: Array<MidiMessageInfo>): BinaryPreset;
  clearMidiMessagesGeneralList(): BinaryPreset;
  addMidiMessagesGeneral(value?: MidiMessageInfo, index?: number): MidiMessageInfo;

  getBypassList(): Array<Bypass>;
  setBypassList(value: Array<Bypass>): BinaryPreset;
  clearBypassList(): BinaryPreset;
  addBypass(value?: Bypass, index?: number): Bypass;

  getTempoprogramdataList(): Array<Model>;
  setTempoprogramdataList(value: Array<Model>): BinaryPreset;
  clearTempoprogramdataList(): BinaryPreset;
  addTempoprogramdata(value?: Model, index?: number): Model;

  getLayoutCode1List(): Array<number>;
  setLayoutCode1List(value: Array<number>): BinaryPreset;
  clearLayoutCode1List(): BinaryPreset;
  addLayoutCode1(value: number, index?: number): BinaryPreset;

  getLayoutCode2List(): Array<number>;
  setLayoutCode2List(value: Array<number>): BinaryPreset;
  clearLayoutCode2List(): BinaryPreset;
  addLayoutCode2(value: number, index?: number): BinaryPreset;

  getCreatedVersionList(): Array<string>;
  setCreatedVersionList(value: Array<string>): BinaryPreset;
  clearCreatedVersionList(): BinaryPreset;
  addCreatedVersion(value: string, index?: number): BinaryPreset;

  getModifiedVersionList(): Array<string>;
  setModifiedVersionList(value: Array<string>): BinaryPreset;
  clearModifiedVersionList(): BinaryPreset;
  addModifiedVersion(value: string, index?: number): BinaryPreset;

  getOldestCompatibleVersionList(): Array<string>;
  setOldestCompatibleVersionList(value: Array<string>): BinaryPreset;
  clearOldestCompatibleVersionList(): BinaryPreset;
  addOldestCompatibleVersion(value: string, index?: number): BinaryPreset;

  getCloudIdList(): Array<string>;
  setCloudIdList(value: Array<string>): BinaryPreset;
  clearCloudIdList(): BinaryPreset;
  addCloudId(value: string, index?: number): BinaryPreset;

  getDescriptionList(): Array<string>;
  setDescriptionList(value: Array<string>): BinaryPreset;
  clearDescriptionList(): BinaryPreset;
  addDescription(value: string, index?: number): BinaryPreset;

  getStompModeAssignmentsList(): Array<StompModeAssignment>;
  setStompModeAssignmentsList(value: Array<StompModeAssignment>): BinaryPreset;
  clearStompModeAssignmentsList(): BinaryPreset;
  addStompModeAssignments(value?: StompModeAssignment, index?: number): StompModeAssignment;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BinaryPreset.AsObject;
  static toObject(includeInstance: boolean, msg: BinaryPreset): BinaryPreset.AsObject;
  static serializeBinaryToWriter(message: BinaryPreset, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BinaryPreset;
  static deserializeBinaryFromReader(message: BinaryPreset, reader: jspb.BinaryReader): BinaryPreset;
}

export namespace BinaryPreset {
  export type AsObject = {
    name: string,
    hash: number,
    date: string,
    volume: number,
    pan: number,
    defaultScene: number,
    authorName: string,
    authorId: string,
    tempo: number,
    chainsList: Array<Chain.AsObject>,
    tagsList: Array<string>,
    legacyStompModeStompDataList: Array<LegacyStompModeStompData.AsObject>,
    sceneTempoList: Array<number>,
    sceneLabelsList: Array<string>,
    midiMessagesList: Array<MidiMessageInfo.AsObject>,
    midiMessagesGeneralList: Array<MidiMessageInfo.AsObject>,
    bypassList: Array<Bypass.AsObject>,
    tempoprogramdataList: Array<Model.AsObject>,
    layoutCode1List: Array<number>,
    layoutCode2List: Array<number>,
    createdVersionList: Array<string>,
    modifiedVersionList: Array<string>,
    oldestCompatibleVersionList: Array<string>,
    cloudIdList: Array<string>,
    descriptionList: Array<string>,
    stompModeAssignmentsList: Array<StompModeAssignment.AsObject>,
  }
}

export class Chain extends jspb.Message {
  getModelsList(): Array<Model>;
  setModelsList(value: Array<Model>): Chain;
  clearModelsList(): Chain;
  addModels(value?: Model, index?: number): Model;

  getSplitControlPointsList(): Array<SplitControlPoints>;
  setSplitControlPointsList(value: Array<SplitControlPoints>): Chain;
  clearSplitControlPointsList(): Chain;
  addSplitControlPoints(value?: SplitControlPoints, index?: number): SplitControlPoints;

  getSplitterList(): Array<Model>;
  setSplitterList(value: Array<Model>): Chain;
  clearSplitterList(): Chain;
  addSplitter(value?: Model, index?: number): Model;

  getMixerList(): Array<Model>;
  setMixerList(value: Array<Model>): Chain;
  clearMixerList(): Chain;
  addMixer(value?: Model, index?: number): Model;

  getOutputControlList(): Array<Model>;
  setOutputControlList(value: Array<Model>): Chain;
  clearOutputControlList(): Chain;
  addOutputControl(value?: Model, index?: number): Model;

  getSplitbypassList(): Array<SceneBypass>;
  setSplitbypassList(value: Array<SceneBypass>): Chain;
  clearSplitbypassList(): Chain;
  addSplitbypass(value?: SceneBypass, index?: number): SceneBypass;

  getMixbypassList(): Array<SceneBypass>;
  setMixbypassList(value: Array<SceneBypass>): Chain;
  clearMixbypassList(): Chain;
  addMixbypass(value?: SceneBypass, index?: number): SceneBypass;

  getCombinedSplitterList(): Array<Model>;
  setCombinedSplitterList(value: Array<Model>): Chain;
  clearCombinedSplitterList(): Chain;
  addCombinedSplitter(value?: Model, index?: number): Model;

  getInputControlList(): Array<Model>;
  setInputControlList(value: Array<Model>): Chain;
  clearInputControlList(): Chain;
  addInputControl(value?: Model, index?: number): Model;

  getInPortid(): number;
  setInPortid(value: number): Chain;

  getOutPortid(): number;
  setOutPortid(value: number): Chain;

  getRow(): number;
  setRow(value: number): Chain;

  getInPortidCase(): Chain.InPortidCase;

  getOutPortidCase(): Chain.OutPortidCase;

  getRowCase(): Chain.RowCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Chain.AsObject;
  static toObject(includeInstance: boolean, msg: Chain): Chain.AsObject;
  static serializeBinaryToWriter(message: Chain, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Chain;
  static deserializeBinaryFromReader(message: Chain, reader: jspb.BinaryReader): Chain;
}

export namespace Chain {
  export type AsObject = {
    modelsList: Array<Model.AsObject>,
    splitControlPointsList: Array<SplitControlPoints.AsObject>,
    splitterList: Array<Model.AsObject>,
    mixerList: Array<Model.AsObject>,
    outputControlList: Array<Model.AsObject>,
    splitbypassList: Array<SceneBypass.AsObject>,
    mixbypassList: Array<SceneBypass.AsObject>,
    combinedSplitterList: Array<Model.AsObject>,
    inputControlList: Array<Model.AsObject>,
    inPortid: number,
    outPortid: number,
    row: number,
  }

  export enum InPortidCase { 
    _IN_PORTID_NOT_SET = 0,
    IN_PORTID = 1,
  }

  export enum OutPortidCase { 
    _OUT_PORTID_NOT_SET = 0,
    OUT_PORTID = 2,
  }

  export enum RowCase { 
    _ROW_NOT_SET = 0,
    ROW = 14,
  }
}

export class Model extends jspb.Message {
  getParamsList(): Array<Param>;
  setParamsList(value: Array<Param>): Model;
  clearParamsList(): Model;
  addParams(value?: Param, index?: number): Param;

  getBypassExpressionList(): Array<Expression>;
  setBypassExpressionList(value: Array<Expression>): Model;
  clearBypassExpressionList(): Model;
  addBypassExpression(value?: Expression, index?: number): Expression;

  getExpressionBypassInfoList(): Array<ExpressionBypassInfo>;
  setExpressionBypassInfoList(value: Array<ExpressionBypassInfo>): Model;
  clearExpressionBypassInfoList(): Model;
  addExpressionBypassInfo(value?: ExpressionBypassInfo, index?: number): ExpressionBypassInfo;

  getHash(): number;
  setHash(value: number): Model;

  getColumn(): number;
  setColumn(value: number): Model;

  getHashCase(): Model.HashCase;

  getColumnCase(): Model.ColumnCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Model.AsObject;
  static toObject(includeInstance: boolean, msg: Model): Model.AsObject;
  static serializeBinaryToWriter(message: Model, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Model;
  static deserializeBinaryFromReader(message: Model, reader: jspb.BinaryReader): Model;
}

export namespace Model {
  export type AsObject = {
    paramsList: Array<Param.AsObject>,
    bypassExpressionList: Array<Expression.AsObject>,
    expressionBypassInfoList: Array<ExpressionBypassInfo.AsObject>,
    hash: number,
    column: number,
  }

  export enum HashCase { 
    _HASH_NOT_SET = 0,
    HASH = 1,
  }

  export enum ColumnCase { 
    _COLUMN_NOT_SET = 0,
    COLUMN = 5,
  }
}

export class SplitControlPoints extends jspb.Message {
  getSplit(): number;
  setSplit(value: number): SplitControlPoints;

  getMix(): number;
  setMix(value: number): SplitControlPoints;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SplitControlPoints.AsObject;
  static toObject(includeInstance: boolean, msg: SplitControlPoints): SplitControlPoints.AsObject;
  static serializeBinaryToWriter(message: SplitControlPoints, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SplitControlPoints;
  static deserializeBinaryFromReader(message: SplitControlPoints, reader: jspb.BinaryReader): SplitControlPoints;
}

export namespace SplitControlPoints {
  export type AsObject = {
    split: number,
    mix: number,
  }
}

export class Bypass extends jspb.Message {
  getColbypassList(): Array<ColBypass>;
  setColbypassList(value: Array<ColBypass>): Bypass;
  clearColbypassList(): Bypass;
  addColbypass(value?: ColBypass, index?: number): ColBypass;

  getRow(): number;
  setRow(value: number): Bypass;

  getRowCase(): Bypass.RowCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bypass.AsObject;
  static toObject(includeInstance: boolean, msg: Bypass): Bypass.AsObject;
  static serializeBinaryToWriter(message: Bypass, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Bypass;
  static deserializeBinaryFromReader(message: Bypass, reader: jspb.BinaryReader): Bypass;
}

export namespace Bypass {
  export type AsObject = {
    colbypassList: Array<ColBypass.AsObject>,
    row: number,
  }

  export enum RowCase { 
    _ROW_NOT_SET = 0,
    ROW = 2,
  }
}

export class ColBypass extends jspb.Message {
  getScenebypassList(): Array<SceneBypass>;
  setScenebypassList(value: Array<SceneBypass>): ColBypass;
  clearScenebypassList(): ColBypass;
  addScenebypass(value?: SceneBypass, index?: number): SceneBypass;

  getColumn(): number;
  setColumn(value: number): ColBypass;

  getColumnCase(): ColBypass.ColumnCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ColBypass.AsObject;
  static toObject(includeInstance: boolean, msg: ColBypass): ColBypass.AsObject;
  static serializeBinaryToWriter(message: ColBypass, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ColBypass;
  static deserializeBinaryFromReader(message: ColBypass, reader: jspb.BinaryReader): ColBypass;
}

export namespace ColBypass {
  export type AsObject = {
    scenebypassList: Array<SceneBypass.AsObject>,
    column: number,
  }

  export enum ColumnCase { 
    _COLUMN_NOT_SET = 0,
    COLUMN = 2,
  }
}

export class SceneBypass extends jspb.Message {
  getBypass(): boolean;
  setBypass(value: boolean): SceneBypass;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SceneBypass.AsObject;
  static toObject(includeInstance: boolean, msg: SceneBypass): SceneBypass.AsObject;
  static serializeBinaryToWriter(message: SceneBypass, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SceneBypass;
  static deserializeBinaryFromReader(message: SceneBypass, reader: jspb.BinaryReader): SceneBypass;
}

export namespace SceneBypass {
  export type AsObject = {
    bypass: boolean,
  }
}

export class Param extends jspb.Message {
  getParamValuesList(): Array<ParamValue>;
  setParamValuesList(value: Array<ParamValue>): Param;
  clearParamValuesList(): Param;
  addParamValues(value?: ParamValue, index?: number): ParamValue;

  getExpression(): number;
  setExpression(value: number): Param;

  getExpressionMin(): number;
  setExpressionMin(value: number): Param;

  getExpressionMax(): number;
  setExpressionMax(value: number): Param;

  getSceneMode(): boolean;
  setSceneMode(value: boolean): Param;

  getIndex(): number;
  setIndex(value: number): Param;

  getExpressionCase(): Param.ExpressionCase;

  getExpressionMinCase(): Param.ExpressionMinCase;

  getExpressionMaxCase(): Param.ExpressionMaxCase;

  getSceneModeCase(): Param.SceneModeCase;

  getIndexCase(): Param.IndexCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Param.AsObject;
  static toObject(includeInstance: boolean, msg: Param): Param.AsObject;
  static serializeBinaryToWriter(message: Param, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Param;
  static deserializeBinaryFromReader(message: Param, reader: jspb.BinaryReader): Param;
}

export namespace Param {
  export type AsObject = {
    paramValuesList: Array<ParamValue.AsObject>,
    expression: number,
    expressionMin: number,
    expressionMax: number,
    sceneMode: boolean,
    index: number,
  }

  export enum ExpressionCase { 
    _EXPRESSION_NOT_SET = 0,
    EXPRESSION = 1,
  }

  export enum ExpressionMinCase { 
    _EXPRESSION_MIN_NOT_SET = 0,
    EXPRESSION_MIN = 2,
  }

  export enum ExpressionMaxCase { 
    _EXPRESSION_MAX_NOT_SET = 0,
    EXPRESSION_MAX = 3,
  }

  export enum SceneModeCase { 
    _SCENE_MODE_NOT_SET = 0,
    SCENE_MODE = 4,
  }

  export enum IndexCase { 
    _INDEX_NOT_SET = 0,
    INDEX = 6,
  }
}

export class ParamValue extends jspb.Message {
  getIntValue(): number;
  setIntValue(value: number): ParamValue;

  getFloatValue(): number;
  setFloatValue(value: number): ParamValue;

  getStringValue(): string;
  setStringValue(value: string): ParamValue;

  getValueCase(): ParamValue.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParamValue.AsObject;
  static toObject(includeInstance: boolean, msg: ParamValue): ParamValue.AsObject;
  static serializeBinaryToWriter(message: ParamValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParamValue;
  static deserializeBinaryFromReader(message: ParamValue, reader: jspb.BinaryReader): ParamValue;
}

export namespace ParamValue {
  export type AsObject = {
    intValue: number,
    floatValue: number,
    stringValue: string,
  }

  export enum ValueCase { 
    VALUE_NOT_SET = 0,
    INT_VALUE = 1,
    FLOAT_VALUE = 2,
    STRING_VALUE = 3,
  }
}

export class LegacyStompModeStompData extends jspb.Message {
  getRow(): number;
  setRow(value: number): LegacyStompModeStompData;

  getColumn(): number;
  setColumn(value: number): LegacyStompModeStompData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LegacyStompModeStompData.AsObject;
  static toObject(includeInstance: boolean, msg: LegacyStompModeStompData): LegacyStompModeStompData.AsObject;
  static serializeBinaryToWriter(message: LegacyStompModeStompData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LegacyStompModeStompData;
  static deserializeBinaryFromReader(message: LegacyStompModeStompData, reader: jspb.BinaryReader): LegacyStompModeStompData;
}

export namespace LegacyStompModeStompData {
  export type AsObject = {
    row: number,
    column: number,
  }
}

export class StompModeAssignment extends jspb.Message {
  getRow(): number;
  setRow(value: number): StompModeAssignment;

  getColumn(): number;
  setColumn(value: number): StompModeAssignment;

  getStompIndex(): number;
  setStompIndex(value: number): StompModeAssignment;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StompModeAssignment.AsObject;
  static toObject(includeInstance: boolean, msg: StompModeAssignment): StompModeAssignment.AsObject;
  static serializeBinaryToWriter(message: StompModeAssignment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StompModeAssignment;
  static deserializeBinaryFromReader(message: StompModeAssignment, reader: jspb.BinaryReader): StompModeAssignment;
}

export namespace StompModeAssignment {
  export type AsObject = {
    row: number,
    column: number,
    stompIndex: number,
  }
}

export class MidiMessageInfo extends jspb.Message {
  getType(): number;
  setType(value: number): MidiMessageInfo;

  getChannel(): number;
  setChannel(value: number): MidiMessageInfo;

  getParam1(): number;
  setParam1(value: number): MidiMessageInfo;

  getParam2(): number;
  setParam2(value: number): MidiMessageInfo;

  getParam3(): number;
  setParam3(value: number): MidiMessageInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MidiMessageInfo.AsObject;
  static toObject(includeInstance: boolean, msg: MidiMessageInfo): MidiMessageInfo.AsObject;
  static serializeBinaryToWriter(message: MidiMessageInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MidiMessageInfo;
  static deserializeBinaryFromReader(message: MidiMessageInfo, reader: jspb.BinaryReader): MidiMessageInfo;
}

export namespace MidiMessageInfo {
  export type AsObject = {
    type: number,
    channel: number,
    param1: number,
    param2: number,
    param3: number,
  }
}

export class Expression extends jspb.Message {
  getExpression(): number;
  setExpression(value: number): Expression;

  getExpressionMin(): number;
  setExpressionMin(value: number): Expression;

  getExpressionMax(): number;
  setExpressionMax(value: number): Expression;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Expression.AsObject;
  static toObject(includeInstance: boolean, msg: Expression): Expression.AsObject;
  static serializeBinaryToWriter(message: Expression, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Expression;
  static deserializeBinaryFromReader(message: Expression, reader: jspb.BinaryReader): Expression;
}

export namespace Expression {
  export type AsObject = {
    expression: number,
    expressionMin: number,
    expressionMax: number,
  }
}

export class ExpressionBypassInfo extends jspb.Message {
  getType(): number;
  setType(value: number): ExpressionBypassInfo;

  getInvert(): boolean;
  setInvert(value: boolean): ExpressionBypassInfo;

  getDelayMs(): number;
  setDelayMs(value: number): ExpressionBypassInfo;

  getLatchEmulation(): boolean;
  setLatchEmulation(value: boolean): ExpressionBypassInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExpressionBypassInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ExpressionBypassInfo): ExpressionBypassInfo.AsObject;
  static serializeBinaryToWriter(message: ExpressionBypassInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExpressionBypassInfo;
  static deserializeBinaryFromReader(message: ExpressionBypassInfo, reader: jspb.BinaryReader): ExpressionBypassInfo;
}

export namespace ExpressionBypassInfo {
  export type AsObject = {
    type: number,
    invert: boolean,
    delayMs: number,
    latchEmulation: boolean,
  }
}

