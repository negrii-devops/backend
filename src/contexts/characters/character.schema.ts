import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ICharacter } from './@types/character'

@Schema({ collection: 'characters', timestamps: true })
export class Character extends Document implements ICharacter {
    @Prop({ required: true, unique: true, index: true })
    id: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    status: string

    @Prop({ required: true })
    species: string

    @Prop()
    type: string

    @Prop({ required: true })
    gender: string

    @Prop(raw({ id: String, name: String }))
    origin: { id: string; name: string }

    @Prop(raw({ id: String, name: String }))
    location: { id: string; name: string }

    @Prop({ required: true })
    avatar: string

    @Prop([String])
    episode: string[]

    @Prop({ default: Date.now })
    createdAt: Date

    @Prop({ default: Date.now })
    updatedAt: Date
}

export const CharacterSchema = SchemaFactory.createForClass(Character)
