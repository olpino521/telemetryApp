//Copyright (C) 2020. Omar Pino. All rights Reserved

export default class TelemetryRecord {
    constructor(buildId = 0, playerId = 0, pos = {x: 0, y:0}, action = 0, recCount= 0) {
      this.data = {
        buildId,
        playerId,
        pos,
        action
      };
      this.recCount = recCount;
    }
  
    get buildId() {
      return this.data.buildId;
    }
    set buildId(value) {
      this.data.buildId = value;
    }
  
    get playerId() {
      return this.data.playerId;
    }
    set playerId(value) {
      this.data.playerId = value;
    }
  
    get pos() {
      return this.data.pos;
    }
    set pos(value) {
      this.data.pos = value;
    }
  
    get action() {
      return this.data.action;
    }
    set action(value) {
      this.data.action = value;
    }
  
    asString() {
      return `${this.recCount} Build: ${this.data.buildId} Player: ${this.data.playerId} Position: X->${this.data.pos.x} Y-> ${this.data.pos.y} is doing ${this.data.action}`;
    }
  
    serialize() {
      return JSON.stringify(this.data);
    }
  
    deserialize(JSONString) {
      this.data = JSON.parse(JSONString);
    }
  }