var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tracks } from "./Tracks.js";
import { Artists } from "./Artists.js";
let Albums = class Albums {
    id;
    title;
    yearOfRelease;
    image;
    tracks;
    artists;
};
__decorate([
    PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Albums.prototype, "id", void 0);
__decorate([
    Column("varchar", {
        name: "title",
        nullable: true,
        unique: true,
        length: 255,
    }),
    __metadata("design:type", Object)
], Albums.prototype, "title", void 0);
__decorate([
    Column("int", { name: "year_of_release", nullable: true }),
    __metadata("design:type", Object)
], Albums.prototype, "yearOfRelease", void 0);
__decorate([
    Column("varchar", {
        name: "image",
        nullable: true,
        length: 1000,
        default: () => "'anon-billed'",
    }),
    __metadata("design:type", Object)
], Albums.prototype, "image", void 0);
__decorate([
    ManyToMany(() => Tracks, (tracks) => tracks.albums),
    JoinTable({
        name: "albums_tracks",
        joinColumns: [{ name: "album_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "track_id", referencedColumnName: "id" }],
        schema: "music_base_db",
    }),
    __metadata("design:type", Array)
], Albums.prototype, "tracks", void 0);
__decorate([
    ManyToMany(() => Artists, (artists) => artists.albums),
    __metadata("design:type", Array)
], Albums.prototype, "artists", void 0);
Albums = __decorate([
    Index("title", ["title"], { unique: true }),
    Entity("albums", { schema: "music_base_db" })
], Albums);
export { Albums };
