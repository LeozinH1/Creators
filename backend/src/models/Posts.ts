import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'

import PostsLikes from './PostsLikes'

@Entity('posts')
class Posts {
    @PrimaryColumn()
    id: string

    @Column()
    creator_id: string

    @Column()
    banner: string

    @Column()
    title: string

    @Column()
    body: string

    @Column()
    public: boolean

    @OneToMany(() => PostsLikes, like => like.post, { onDelete: 'CASCADE' })
    likes: PostsLikes[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Posts
