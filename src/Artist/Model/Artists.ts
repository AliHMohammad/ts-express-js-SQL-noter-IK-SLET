import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Albums } from "../../Album/Model/Albums.js";
import { Tracks } from "../../Track/Model/Tracks.js";

@Index("name", ["name"], { unique: true })
@Entity("artists", { schema: "music_base_db" })
export class Artists {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id!: number;

    @Column("varchar", { name: "name", unique: true, length: 255 })
    name!: string;

    @Column("varchar", {
        name: "image",
        nullable: true,
        length: 1000,
        default: () => "'anon-billed'",
    })
    image!: string | null;

    @ManyToMany(() => Albums, (albums) => albums.artists, { cascade: true, onDelete: "CASCADE" })
    @JoinTable({
        name: "artists_albums",
        joinColumns: [{ name: "artist_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "album_id", referencedColumnName: "id" }],
        schema: "music_base_db",
    })
    albums!: Albums[];

    @ManyToMany(() => Tracks, (tracks) => tracks.artists, { cascade: true, onDelete: "CASCADE" })
    @JoinTable({
        name: "artists_tracks",
        joinColumns: [{ name: "artist_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "track_id", referencedColumnName: "id" }],
        schema: "music_base_db",
    })
    tracks!: Tracks[];
}
