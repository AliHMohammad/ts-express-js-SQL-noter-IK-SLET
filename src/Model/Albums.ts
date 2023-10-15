import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tracks } from "./Tracks.js";
import { Artists } from "./Artists.js";

@Index("title", ["title"], { unique: true })
@Entity("albums", { schema: "music_base_db" })
export class Albums {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id!: number;

    @Column("varchar", {
        name: "title",
        nullable: true,
        unique: true,
        length: 255,
    })
    title!: string | null;

    @Column("int", { name: "year_of_release", nullable: true })
    yearOfRelease!: number | null;

    @Column("varchar", {
        name: "image",
        nullable: true,
        length: 1000,
        default: () => "'anon-billed'",
    })
    image!: string | null;

    @ManyToMany(() => Tracks, (tracks) => tracks.albums, { cascade: true })
    @JoinTable({
        name: "albums_tracks",
        joinColumns: [{ name: "album_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "track_id", referencedColumnName: "id" }],
        schema: "music_base_db",
    })
    tracks!: Tracks[];

    @ManyToMany(() => Artists, (artists) => artists.albums)
    artists!: Artists[];
}
