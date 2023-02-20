import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm'

import Posts from './Posts'

@Entity('postslikes')
class PostsLikes {
    @PrimaryColumn()
    id: string

    @Column()
    postId: string

    @Column()
    user_id: string

    @ManyToOne(() => Posts, post => post.likes, { onDelete: 'CASCADE' })
    post: Posts

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default PostsLikes
