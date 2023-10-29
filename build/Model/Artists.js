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
import { Albums } from "./Albums.js";
import { Tracks } from "./Tracks.js";
let Artists = class Artists {
    id;
    name;
    image;
    albums;
    tracks;
};
__decorate([
    PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Artists.prototype, "id", void 0);
__decorate([
    Column("varchar", { name: "name", unique: true, length: 255 }),
    __metadata("design:type", String)
], Artists.prototype, "name", void 0);
__decorate([
    Column("varchar", {
        name: "image",
        nullable: true,
        length: 1000,
        default: () => "'anon-billed'",
    }),
    __metadata("design:type", Object)
], Artists.prototype, "image", void 0);
__decorate([
    ManyToMany(() => Albums, (albums) => albums.artists, { cascade: true, onDelete: "CASCADE" }),
    JoinTable({
        name: "artists_albums",
        joinColumns: [{ name: "artist_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "album_id", referencedColumnName: "id" }],
        schema: "music_base_db",
    }),
    __metadata("design:type", Array)
], Artists.prototype, "albums", void 0);
__decorate([
    ManyToMany(() => Tracks, (tracks) => tracks.artists, { cascade: true, onDelete: "CASCADE" }),
    JoinTable({
        name: "artists_tracks",
        joinColumns: [{ name: "artist_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "track_id", referencedColumnName: "id" }],
        schema: "music_base_db",
    }),
    __metadata("design:type", Array)
], Artists.prototype, "tracks", void 0);
Artists = __decorate([
    Index("name", ["name"], { unique: true }),
    Entity("artists", { schema: "music_base_db" })
], Artists);
export { Artists };
