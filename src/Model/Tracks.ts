import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Albums } from "../Album/Model/Albums.js";
import { Artists } from "../Artist/Model/Artists.js";

@Entity("tracks", { schema: "music_base_db" })
export class Tracks {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id!: number;

    @Column("varchar", { name: "title", length: 255 })
    title!: string;

    @Column("int", { name: "duration" })
    duration!: number;

    @ManyToMany(() => Albums, (albums) => albums.tracks)
    albums!: Albums[];

    @ManyToMany(() => Artists, (artists) => artists.tracks)
    artists!: Artists[];
}
