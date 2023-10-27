var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Albums } from "./Albums.js";
import { Artists } from "../Artist/Model/Artists.js";
let Tracks = class Tracks {
    id;
    title;
    duration;
    albums;
    artists;
};
__decorate([
    PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Tracks.prototype, "id", void 0);
__decorate([
    Column("varchar", { name: "title", length: 255 }),
    __metadata("design:type", String)
], Tracks.prototype, "title", void 0);
__decorate([
    Column("int", { name: "duration" }),
    __metadata("design:type", Number)
], Tracks.prototype, "duration", void 0);
__decorate([
    ManyToMany(() => Albums, (albums) => albums.tracks),
    __metadata("design:type", Array)
], Tracks.prototype, "albums", void 0);
__decorate([
    ManyToMany(() => Artists, (artists) => artists.tracks),
    __metadata("design:type", Array)
], Tracks.prototype, "artists", void 0);
Tracks = __decorate([
    Entity("tracks", { schema: "music_base_db" })
], Tracks);
export { Tracks };
